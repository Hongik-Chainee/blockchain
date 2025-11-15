#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("2jvBhHuURWmSPevRB1YU21nBteh6gQGoLnEZdmMyjPXb");

const COMPLETE_FEE: u64 = 5;
const DEFAULT_FEE: u64 = 1;
const REVIEW_DURATION: u64 = 14 * 24 * 60 * 60;

#[error_code]
pub enum Error {
    #[msg("Invalid contract")]
    InvalidContract,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Escrow already released")]
    EscrowAlreadyReleased,
    #[msg("Escrow not released")]
    EscrowNotReleased,
    #[msg("Contract not ended")]
    ContractNotEnded,
}

#[account]
pub struct Contract {
    pub id: [u8; 32],
    pub employer: Pubkey,
    pub employee: Pubkey,
    pub salary: u64,
    pub amount: u64,
    pub start_date: i64,
    pub due_date: i64,
    pub end_date: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

#[account]
pub struct Escrow {
    pub contract: Pubkey,
    pub employer: Pubkey,
    pub employee: Pubkey,
    pub amount: u64,
    pub fee: u8,
    pub bump: u8,
    pub released: bool,
}

#[derive(Accounts)]
pub struct CreateContract<'info> {
    #[account(mut)]
    pub employer: Signer<'info>,

    #[account(mut)]
    pub employee: Signer<'info>,

    #[account(
        init,
        payer = employer,
        space = 168,
    )]
    pub contract: Account<'info, Contract>,

    #[account(
        init,
        payer = employer,
        seeds = [b"escrow", contract.key().as_ref()],
        bump,
        space = 120,
    )]
    pub escrow: Account<'info, Escrow>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EndContract<'info> {
    #[account(mut)]
    /// CHECK: This is the employer account, used as the refund recipient.
    pub employer: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: This is the employee account, used as the recipient of salary payments.
    pub employee: UncheckedAccount<'info>,

    #[account(
        mut,
        has_one = employer,
        has_one = employee,
    )]
    pub contract: Account<'info, Contract>,

    #[account(
        mut,
        has_one = employer,
        has_one = employee,
        constraint = escrow.contract == contract.key() @ Error::InvalidContract,
        constraint = !escrow.released @ Error::EscrowAlreadyReleased,
    )]
    pub escrow: Account<'info, Escrow>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExpireContract<'info> {
    #[account(mut, address=escrow.employer)]
    /// CHECK: This is the employer account, used as the refund recipient.
    pub employer: UncheckedAccount<'info>,

    #[account(
        mut,
        has_one = employer
    )]
    pub contract: Account<'info, Contract>,

    #[account(
        mut,
        has_one = employer,
        constraint = escrow.contract == contract.key() @ Error::InvalidContract,
        constraint = !escrow.released @ Error::EscrowAlreadyReleased,
    )]
    pub escrow: Account<'info, Escrow>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseEscrow<'info> {
    #[account(mut)]
    pub platform: Signer<'info>,

    #[account(
        mut,
        seeds = [b"escrow", escrow.contract.as_ref()],
        bump = escrow.bump,
        close = platform,
        constraint = escrow.released @ Error::EscrowNotReleased,
    )]
    pub escrow: Account<'info, Escrow>,

    pub system_program: Program<'info, System>,
}

#[program]
pub mod contract_program {
    use super::*;

    pub fn create_contract(
        ctx: Context<CreateContract>,
        salary: u64,
        start_date: i64,
        due_date: i64,
    ) -> Result<()> {
        let contract = &mut ctx.accounts.contract;
        let escrow = &mut ctx.accounts.escrow;

        let now = Clock::get()?.unix_timestamp;
        contract.id = contract.key().to_bytes();
        contract.employer = ctx.accounts.employer.key();
        contract.employee = ctx.accounts.employee.key();
        contract.salary = salary;
        contract.amount = salary;
        contract.start_date = start_date;
        contract.due_date = due_date;
        contract.end_date = due_date
            .checked_add(REVIEW_DURATION as i64)
            .ok_or(Error::InvalidAmount)?;
        contract.created_at = now;
        contract.updated_at = now;

        escrow.contract = contract.key();
        escrow.employer = ctx.accounts.employer.key();
        escrow.employee = ctx.accounts.employee.key();
        escrow.amount = salary;
        escrow.fee = COMPLETE_FEE as u8;
        escrow.released = false;

        let cpi_accounts = system_program::Transfer {
            from: ctx.accounts.employer.to_account_info(),
            to: ctx.accounts.escrow.to_account_info(),
        };
        let cpi_program = ctx.accounts.system_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        system_program::transfer(cpi_ctx, salary)?;

        Ok(())
    }

    pub fn end_contract(ctx: Context<EndContract>, amount: u64) -> Result<()> {
        let contract = &mut ctx.accounts.contract;
        let escrow = &mut ctx.accounts.escrow;

        if amount == 0 {
            let fee = escrow
                .amount
                .checked_mul(DEFAULT_FEE)
                .ok_or(Error::InvalidAmount)?
                .checked_div(100)
                .ok_or(Error::InvalidAmount)?;
            let refund = escrow.amount.checked_sub(fee).ok_or(Error::InvalidAmount)?;
            **escrow.to_account_info().lamports.borrow_mut() -= refund;
            **ctx
                .accounts
                .employer
                .to_account_info()
                .lamports
                .borrow_mut() += refund;
        } else {
            let fee_pct = escrow.fee as u64;
            let pct = 100u64.checked_sub(fee_pct).ok_or(Error::InvalidAmount)?;
            let numerator = amount.checked_mul(pct).ok_or(Error::InvalidAmount)?;
            let net = numerator.checked_div(100).ok_or(Error::InvalidAmount)?;

            **escrow.to_account_info().lamports.borrow_mut() -= net;
            **ctx
                .accounts
                .employee
                .to_account_info()
                .lamports
                .borrow_mut() += net;

            let refund = escrow
                .amount
                .checked_sub(amount)
                .ok_or(Error::InvalidAmount)?;
            if refund > 0 {
                **escrow.to_account_info().lamports.borrow_mut() -= refund;
                **ctx
                    .accounts
                    .employer
                    .to_account_info()
                    .lamports
                    .borrow_mut() += refund;
            }
        }

        let now = Clock::get()?.unix_timestamp;
        contract.amount = amount;
        contract.updated_at = now;

        escrow.released = true;

        Ok(())
    }

    pub fn expire_contract(ctx: Context<ExpireContract>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        let contract = &mut ctx.accounts.contract;

        let now = Clock::get()?.unix_timestamp;
        require!(contract.end_date <= now, Error::ContractNotEnded);

        let fee = escrow
            .amount
            .checked_mul(DEFAULT_FEE)
            .ok_or(Error::InvalidAmount)?
            .checked_div(100)
            .ok_or(Error::InvalidAmount)?;
        let refund = escrow.amount.checked_sub(fee).ok_or(Error::InvalidAmount)?;
        **escrow.to_account_info().lamports.borrow_mut() -= refund;
        **ctx
            .accounts
            .employer
            .to_account_info()
            .lamports
            .borrow_mut() += refund;

        contract.amount = 0;
        contract.updated_at = contract.end_date;

        escrow.released = true;

        Ok(())
    }

    pub fn close_escrow(_ctx: Context<CloseEscrow>) -> Result<()> {
        Ok(())
    }
}

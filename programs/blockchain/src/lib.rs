use anchor_lang::prelude::*;

declare_id!("2jvBhHuURWmSPevRB1YU21nBteh6gQGoLnEZdmMyjPXb");

#[program]
pub mod blockchain {
    use super::*;

     // DID 생성
    pub fn create_did(ctx: Context<CreateDid>, did_data: Vec<u8>) -> Result<()> {
        let did_account = &mut ctx.accounts.did_account;
        require!(did_account.did.is_empty(), DidError::AlreadyExists);
        did_account.did = did_data;
        Ok(())
    }

    // DID 업데이트
    pub fn update_did(ctx: Context<UpdateDid>, did_data: Vec<u8>) -> Result<()> {
        let did_account = &mut ctx.accounts.did_account;
        did_account.did = did_data;
        Ok(())
    }
}
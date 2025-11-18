# Contract

## 1. Introduction
이 문서는 계약 프로그램의 이해를 돕고자 작성되었다.

## 2. Structure
### 2.1. Contract
* id: 계약서의 id
* employer: 고용주의 PublicKey
* employee: 고용인의 PublicKey
* salary: 공고 상의 보수. 고용주가 지급할 수 있는 보수의 최댓값이다.
* amount: 실제 보수
* startDate: 계약의 시작일시
* dueDate: 계약 종료일시. 고용인은 이 때까지 계약 사항을 이행해야 한다.
* endDate: 계약 시한. dueDate로부터 2주 뒤로 고용주와 고용인은 이 2주간 결과물을 확인하여 보수(amount)를 확정한다. endDate가 지나고도 종료되지 않은 계약은 파기되고 Escrow의 잔금은 수수료를 제외, 전부 고용주에게 반환된다.
* createdAt: 계약서 생성일시.
* updatedAt: 계약서의 최종 수정일시.
### 2.2. Escrow
* contract: Contract의 PublicKey(PDA)
* employer: 고용주의 PublicKey
* employee: 고용인의 PublicKey
* amount: 실제 보수
* fee: 수수료. 현재는 계약을 완료했을 경우 5%, 완료하지 못했을 경우 1%로 책정되어 있다.
* bump: Escrow의 bump
* released: 보수 지급 & 잔금 반환 여부. 보수 지급과 잔금 반환이 모두 완료되어 Escrow 계정에 수수료(fee)만큼의 액수만 남아있는 상태일 때 released = true이다.
### 2.3. Badge

## 3. Contexts
### 3.1. CreateContract
create_contract instruction에 사용되는 context이다.
* Signer: employer, employee(multi-sig)
* Account: contract, escrow
### 3.2. EndContract
end_contract instruction에 사용되는 context이다.
* Signer: none
* Account: employer, employee, contract, escrow
### 3.3. ExpireContract
expire_contract instruction에 사용되는 context이다.
* Signer: none
* Account: employer, contract, escrow
### 3.4. MintBadge
mint_badge instruction에 사용되는 context이다.
* Signer: platform
* Account: employee, escrow
### 3.4. CloseEscrow
close_escrow instruction에 사용되는 context이다.
* Signer: platform
* Account: escrow

## 4. Instructions
### 4.1. create_contract(salary, start_date, due_date)
계약 사항을 on-chain에 게시하고 escrow에 보수를 예치한다.
### 4.2. end_contract(amount)
실제 지급될 보수를 확정하여 지급하고 계약을 종료한다. amount가 0일 경우 계약이 해제된 것으로 간주하여 1%의 수수료가 적용된다.
### 4.3. expire_contract()
end_date가 지나 효력이 없는 계약을 파기하고 예치금을 employer에게 반환한다. 1%의 수수료가 적용된다. Solana에는 일시에 맞춰 instruction을 자동 실행하는 기능이 없기 때문에 반드시 off-chain에서 트랜잭션을 전송하는 기능을 구현해야 한다.
### 4.4. mint_badge
### 4.5. close_escrow()
잔금을 platform으로 전송하고 escrow를 닫는다. close_escrow가 실행되는 시점의 escrow에는 항상 수수료만큼의 잔금만이 남는다.

## 5. Transactions
* create_contract
* end_contract + mint_badge + close_escrow
* expire_contract + close_escrow

## 6. Terminology
* account: PublicKey로 식별되는 모든 on-chain 객체(wallet, PDA, system program, etc.)
* PDA(Program Derived Address): PublicKey는 계정 식별자일 뿐 어떠한 권한도 가지지 않는다. 실제 서명의 권한을 갖는 것은 PrivateKey이다. 그런데 Solana에서는 Program의 서명 권한 대행을 허용한다. 따라서 PublicKey만을 갖는 계정이 존재할 수 있는데 이것을 PDA라 한다.
* seeds: PDA를 생성할 때 사용되는 입력값이 포함된 배열
* bump: PDA가 유효한 계정이 될 수 있도록 seeds에 추가되는 1바이트 값
* program signer: PDA를 다르게 이르는 말. PDA는 서명할 수 없지만 program이 대신 서명하며 PDA가 서명한 것처럼 동작한다.
* context: Anchor에서 제공하는 Solana 전용 계정 정의 구조체
* signer: 서명의 주체가 되는 계정. multi-sig에서는 feepayer가 명시되지 않았을 경우 처음으로 서명한 Signer가 feepayer로 지정된다.
* payer: 계정 생성 비용을 지불하는 계정
* feepayer: 트랜잭션 수수료를 지불하는 계정
* instruction: on-chain에서 실행되는 함수. instruction이 모여 transaction을 구성한다.
* transaction: on-chain에 실제로 저장되는 데이터. 한 트랜잭션에는 반드시 하나 이상의 signer와 정확히 하나의 feeayer가 필요하다.
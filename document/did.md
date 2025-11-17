# DID

## 1. Introduction
이 문서는 DID 인증에 관한 이해를 돕고자 작성된 것으로 회원가입 및 로그인 과정을 서버의 동작 중심으로 설명한다.  

## 2. Register
회원가입은 Issuer Server가 담당한다. DID와 VC를 발급하는 것이 주요 역할이다. 
### 2.1. Initialize
사용자의 DID를 생성하고 on-chain에 DID 문서를 저장한다.
### 2.2. Add VM(Verification Method)
사용자가 VP(Verifiable Presentation)를 생성할 때 필요한 Authentication Key ID를 DID 문서에 추가한다.
### 2.3. Issue VC(Verifiable Credential)
Issuer Serever의 DID(Assertion Method Key ID)로 서명된 VC를 발급한다. VC payload에는 사용자의 KYC 인증 정보가 담긴다.

## 3. Login
로그인은 Verifier Server가 담당한다. 사용자의 로그인 요청을 받으면 Challenge를 생성하고 사용자로부터 받은 VC와 VP가 유효한지 검증하는 역할을 한다.
### 3.1. Issue Challenge
nonce를 발급하여 서명한 뒤 사용자에게 전달한다.
### 3.2. Verify Challenge
nonce와 사용자로부터 전달받은 VC, VP가 유효한지 검사한다.
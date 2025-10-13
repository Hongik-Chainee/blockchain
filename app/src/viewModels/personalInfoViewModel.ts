import { kycPhoneRequest, kycPhoneVerify } from "@/services/kyc/kycApi";
export type TelCarrier = 'SKT' | 'KT' | 'LGU+' | '';

export class PersonalInfoViewModel {
  // 약관
  agreeAll = false;
  agreeRequired = {
    privacy: false,   // [필수] 개인정보 수집/이용
    idService: false, // [필수] 본인확인 서비스 이용약관
    thirdParty: false,// [필수] 고유식별정보 처리
    telTerms: false,  // [필수] 통신사 이용약관
  };

  setAgreeAll(v: boolean) {
    this.agreeAll = v;
    Object.keys(this.agreeRequired).forEach(k => {
      // @ts-ignore
      this.agreeRequired[k] = v;
    });
  }
  setAgree(key: keyof typeof this.agreeRequired, v: boolean) {
    this.agreeRequired[key] = v;
    this.agreeAll = Object.values(this.agreeRequired).every(Boolean);
  }
  get allRequiredAgreed() {
    return Object.values(this.agreeRequired).every(Boolean);
  }

  // 휴대폰 인증 (UI 상태만)
  name = '';
  rrnFront = '';   // 생년월일 6자리
  rrnBack = '';    // 뒤 1자리 + **** (UI에선 1자리만 입력)
  carrier: TelCarrier = '';
  phone = '';
  code = '';
  requested = false; // 인증요청 눌렀는지
  verified = false;  // 확인 완료 여부(지금은 더미)

  canRequest() {
    return this.name && this.rrnFront.length === 6 && this.rrnBack.length === 1
      && this.carrier && /^\d{10,11}$/.test(this.phone);
  }
  canConfirm() {
    return this.requested && this.code.length >= 4;
  }
  // 더미 동작
  requestCode() { this.requested = true; }
  confirmCode() { if (this.canConfirm()) this.verified = true; }

  get canGoNext() {
    return this.allRequiredAgreed && this.verified;
  }

  requestId: string | null = null;

  async requestCodeReal(): Promise<boolean> {
    if (!this.canRequest()) return false;
    const { requestId } = await kycPhoneRequest(this.phone);
    this.requestId = requestId;
    this.requested = true;
    return true;
  }

  async confirmCodeReal(): Promise<boolean> {
    if (!this.canConfirm() || !this.requestId) return false;
    const r = await kycPhoneVerify(this.requestId, this.code);
    this.verified = !!r.kycVerified;
    return this.verified;
  }
}

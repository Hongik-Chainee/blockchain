# BlockTalent - 블록체인 기반 인재 매칭 플랫폼

BlockTalent는 블록체인 기술과 AI를 활용한 인재 매칭 및 프로젝트 관리 플랫폼입니다.

## 주요 기능

### 1. 블록체인 기반 신원 및 경력 검증

- 블록체인을 이용한 후보자의 신원 및 경력 검증
- 사용자 데이터를 개인 단말에 저장하여 보안 강화
- Dilithium, Falcon과 같은 PQC(Post-Quantum Cryptography)를 적용하여 양자 컴퓨터 상용화에 대비

### 2. AI 기반 매칭 시스템

- 기업 측 요구사항과 후보자의 스킬, 평판, 프로젝트 이력을 분석하여 최적의 매칭을 자동으로 추천
- 단기 프로젝트, TF팀, 외주 작업 등 다양한 고용 형태 지원
- 데이터 단계별 알고리즘 적용
  - 초기: 콘텐츠 기반 필터링 (TF-IDF, Cosine Similarity)
  - 중기: 협업 필터링 (Surprise Library, SVD)
  - 대량 데이터 확보 후: 딥러닝 모델 도입 (TensorFlow, PyTorch)

### 3. 스마트 계약 생성

- 프로젝트 시작 시 계약 자동 생성
- 투명한 계약 조건 관리

### 4. NFT 기반 평판 시스템

- 프로젝트 완료 시 평판 점수를 NFT로 발행
- NFT를 통한 경력 증명 및 신뢰도 표시
- 차후 프로젝트에서 우선 매칭 요소로 활용
- 팀 내 권한에 따라 차등적으로 NFT 부여

## 기술 스택

- **프론트엔드**: Next.js, TypeScript, TailwindCSS, Framer Motion
- **백엔드**: Node.js (추후 개발 예정)
- **블록체인**: Ethereum, Solidity (추후 개발 예정)
- **AI/ML**: TensorFlow/PyTorch, Scikit-learn (추후 개발 예정)

## 설치 및 실행 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/blocktalent.git

# 디렉토리 이동
cd blocktalent

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
<<<<<<< HEAD
src/
├── app/                  # 주요 페이지
│   ├── auth/             # 인증 관련 페이지 (로그인, 회원가입)
│   ├── dashboard/        # 대시보드
│   ├── matching/         # 인재 매칭
│   ├── profile/          # 사용자 프로필
│   ├── projects/         # 프로젝트 목록 및 상세
│   ├── reputation/       # NFT 평판 시스템
│   ├── verification/     # 블록체인 검증
│   ├── layout.tsx        # 앱 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/           # 재사용 가능한 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트 (헤더, 푸터)
│   └── ui/               # UI 컴포넌트
└── styles/               # 전역 스타일
=======
solbintest-main/
├── eslint.config.mjs
├── Landing page.png
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── signin/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── reputation/page.tsx
│   │   ├── talent/page.tsx
│   │   └── verification/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── talent/
│   │       ├── TalentCard.tsx
│   │       └── TalentSearch.tsx
│   ├── models/
│   │   ├── profile.ts
│   │   └── talent.ts
│   ├── viewModels/
│   │   ├── profileViewModel.ts
│   │   └── talentViewModel.ts
│   └── views/
│       ├── auth/
│       │   ├── SignInView.tsx
│       │   └── SignUpView.tsx
│       ├── profile/
│       │   ├── Introduction.tsx
│       │   ├── JobPostings.tsx
│       │   ├── MyProject.tsx
│       │   ├── Resume.tsx
│       │   ├── UserInfo.tsx
│       │   └── UserProfile.tsx
│       ├── projects/ProjectsView.tsx
│       ├── reputation/ReputationView.tsx
│       ├── talent/TalentView.tsx
│       └── verification/VerificationView.tsx
├── tailwind.config.ts
└── tsconfig.json
>>>>>>> 151d1069 (first commit)
```

## 라이선스

MIT

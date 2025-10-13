'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserPlusIcon, FingerPrintIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export function SignUpView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'individual', // 'individual' 또는 'company'
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      userType: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 일치 확인
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 회원가입 로직 구현 (API 호출 등)
    console.log('회원가입 시도:', formData);
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary">
          새 계정 등록하기
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-light">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/signin" className="font-medium text-primary hover:text-primary-dark">
            로그인하기
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background-card py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="mb-6 rounded-md bg-primary-light p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-primary">보안 강화된 계정</h3>
                <div className="mt-2 text-sm text-primary-dark">
                  <p>
                    PQC(Post Quantum Cryptography) 기반의 보안 시스템으로
                    미래 양자 컴퓨터의 공격에도 안전한 계정을 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-secondary">
                이름 (실명)
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary">
                이메일 주소
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-secondary">
                비밀번호
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <p className="mt-1 text-xs text-secondary-light">
                8자 이상, 대소문자, 숫자, 특수문자를 포함해주세요.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-secondary">
                비밀번호 확인
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium leading-6 text-secondary mb-2">
                계정 유형
              </span>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="individual"
                    name="userType"
                    type="radio"
                    value="individual"
                    checked={formData.userType === 'individual'}
                    onChange={handleRadioChange}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="individual" className="ml-2 block text-sm text-secondary-light">
                    개인 (인재)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="company"
                    name="userType"
                    type="radio"
                    value="company"
                    checked={formData.userType === 'company'}
                    onChange={handleRadioChange}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="company" className="ml-2 block text-sm text-secondary-light">
                    기업 (프로젝트 등록)
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-secondary-light">
                <span>
                  <Link href="/terms" className="text-primary hover:text-primary-dark">
                    이용약관
                  </Link>
                  {' '}및{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary-dark">
                    개인정보 처리방침
                  </Link>
                  에 동의합니다.
                </span>
              </label>
            </div>

            <div className="flex items-center">
              <FingerPrintIcon className="h-5 w-5 text-secondary-light mr-2" />
              <span className="text-xs text-secondary-light">
                회원가입 시 본인의 기기에 안전하게 암호화된 개인 키가 생성됩니다.
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center btn-primary py-3"
              >
                <UserPlusIcon className="h-5 w-5 mr-2" />
                계정 등록하기
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background-card px-2 text-secondary-light">소셜 계정으로 계속하기</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="inline-flex w-full justify-center rounded-md bg-background px-4 py-2 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <span className="sr-only">Google로 가입</span>
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0353 3.12C17.9503 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.23028 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88498 12.7999 4.88498 11.9999C4.88498 11.1999 5.01998 10.4299 5.26498 9.7049L1.27498 6.60986C0.45498 8.22986 -0.000488281 10.0599 -0.000488281 11.9999C-0.000488281 13.9399 0.45498 15.7699 1.27498 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.23039 17.135 5.26539 14.29L1.27539 17.385C3.25539 21.31 7.31039 24 12.0004 24Z"
                      fill="#34A853"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="inline-flex w-full justify-center rounded-md bg-background px-4 py-2 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <span className="sr-only">GitHub로 가입</span>
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',     // 이 줄 추가
    './src/viewModels/**/*.{js,ts,jsx,tsx,mdx}', // 이것도 추가하면 좋아요
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E2068', // 더 밝은 웹3 메인 컬러
          dark: '#0E0F37',
          light: '#4F51A9',
        },
        secondary: {
          DEFAULT: '#191B26', // 더 밝은 배경색
          dark: '#121318',
          light: '#4E5164',
        },
        accent: {
          DEFAULT: '#00D0FF', // 웹3 강조 색상 (밝은 청록색)
          dark: '#00A3C4',
          light: '#5CDEFF',
        },
        background: {
          DEFAULT: '#0F1015', // 어두운 웹3 배경
          dark: '#060708',
          card: '#1A1B25',
          start: 'rgb(15, 16, 21)',
          end: 'rgb(10, 11, 18)',
        },
        web3: {
          purple: '#9D50FF',
          blue: '#3D7BF4',
          cyan: '#00D0FF',
          green: '#00FF95',
          mint: '#71FF9C',
          mintDark: '#00FF95'
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,208,255,0.3)', border: '1px solid rgba(0,208,255,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0,208,255,0.8)', border: '1px solid rgba(0,208,255,0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config 
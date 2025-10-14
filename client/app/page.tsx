'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      {/* 상단 영역 */}
      <div className="pt-20 pb-20 px-80 bg-gradient-to-r from-green-400 to-blue-800">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-left">
          <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
            Reliable.
            <br />
            Guaranteed.
            <br />
            Secure.
          </h1>
          
          {/* Chaniee와 Sign In 버튼을 같은 줄에 배치 */}
          <div className="flex justify-between items-end mt-10">
            <h2 className="text-4xl md:text-4xl font-bold tracking-tight text-purple-400">
              Chaniee.
            </h2>
            
            <Link href="/auth/signin">
              <motion.button
                className="bg-web3-mint hover:bg-web3-mintDark text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in
              </motion.button>
            </Link>
            <Link href="/auth/walletguide">
              <motion.button
                className="bg-web3-mint hover:bg-web3-mintDark text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Wallet guide test
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 중앙 영역 - 서치바 */}
      <main className="flex flex-col justify-center flex-1 px-4 w-full">
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search new projects for you"
              className="w-full bg-gray-800/50 text-white rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

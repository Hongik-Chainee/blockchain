import Link from 'next/link';

const navigation = {
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0 1.623c-2.403 0-2.74.01-3.75.058-.975.045-1.504.207-1.857.344-.467.182-.86.399-1.249.787-.389.389-.605.782-.787 1.249-.137.353-.3.882-.344 1.857-.048.98-.058 1.327-.058 3.75s.01 2.77.058 3.75c.045.975.207 1.504.344 1.857.182.466.399.86.787 1.249.389.389.782.605 1.249.787.353.137.882.3 1.857.344.98.048 1.327.058 3.75.058s2.77-.01 3.75-.058c.975-.045 1.504-.207 1.857-.344.467-.182.86-.399 1.249-.787.389-.389.605-.782-.787-1.249.137-.353.3-.882.344-1.857.048-.98.058-1.327.058-3.75s-.01-2.77-.058-3.75c-.045-.975-.207-1.504-.344-1.857-.182-.467-.399-.86-.787-1.249-.389-.389-.782-.605-1.249-.787-.353-.137-.882-.3-1.857-.344C15.05 3.633 14.715 3.623 12.315 3.623zM12 9.377a2.623 2.623 0 100 5.246 2.623 2.623 0 000-5.246zm0 6.873a4.25 4.25 0 110-8.5 4.25 4.25 0 010 8.5zm4.875-7.822a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-transparent" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <span className="text-white font-bold text-2xl">Chainee</span>
            <p className="text-sm leading-6 text-gray-300">
              서비스 설명 서비스 설명 서비스 설명
            </p>
            <p className="text-sm leading-6 text-gray-300">
              전화번호 등 기타 정보
            </p>
            <p className="text-sm leading-6 text-gray-300">
              전화번호 등 기타 정보
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex items-center justify-between">
          <div className="flex space-x-6">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="text-xs leading-5 text-gray-400">&copy; 2025 Chainee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
 
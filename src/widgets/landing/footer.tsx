import Link from 'next/link';
import { FaTelegram, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';

import { Container } from '@components/container';
import { useMyTheme } from '@hooks/use-my-theme';

const footerLinks = {
  product: [
    { label: 'Kurslar', href: '#features' },
    { label: 'Narxlar', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  company: [
    { label: 'Biz haqimizda', href: '/about' },
    { label: "Bog'lanish", href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Foydalanish shartlari', href: '/terms' },
    { label: 'Maxfiylik siyosati', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: FaTelegram, href: 'https://t.me/hbsacademy', label: 'Telegram' },
  { icon: FaInstagram, href: 'https://instagram.com/hbsacademy', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com/@hbsacademy', label: 'YouTube' },
];

function Footer() {
  const { isDarkMode } = useMyTheme();

  return (
    <footer className="border-t border-gray-100 dark:border-dark-200 bg-gray-50 dark:bg-dark-100">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src={`/logo/${isDarkMode ? 'dark' : 'light'}/logo.png`}
                alt="HBS Academy Logo"
                height={36}
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
              HBS Academy - Moliyaviy bozorlarda professional treyder bo'lish uchun eng yaxshi ta'lim platformasi.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Mahsulot</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Kompaniya</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Aloqa</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+998978881027"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +998 97 888 10 27
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hbsacademy.uz"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@hbsacademy.uz
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  Toshkent, O'zbekiston
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-dark-200">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} HBS Academy. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;

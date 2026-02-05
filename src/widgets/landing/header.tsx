import { Drawer, Segmented } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CiLogin } from 'react-icons/ci';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';

import { Container } from '@components/container';
import { useMyTheme } from '@hooks/use-my-theme';
import { useTranslation } from 'react-i18next';
import { BiMoney } from 'react-icons/bi';
import { GoMoon, GoSun } from 'react-icons/go';
import { HiOutlineSparkles, HiOutlineLightningBolt } from 'react-icons/hi';
import { RiRocketLine } from 'react-icons/ri';
import { BookOpen } from 'lucide-react';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';

const navLinks = [
  { href: '/#features', label: 'Kurslar' },
  { href: '/#how-it-works', label: "O'qitish jarayoni" },
  { href: '/#pricing', label: 'Narxlar' },
  { href: '/blog', label: 'Blog' },
];

function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const { toggleTheme, isDarkMode } = useMyTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/50 dark:bg-dark-100/50 backdrop-blur-xl transition-all duration-300">
      <Container className="flex h-16 items-center justify-between">
        <Fade triggerOnce direction="left" duration={600}>
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={`/logo/${isDarkMode ? 'dark' : 'light'}/logo.png`}
              alt="HBS Academy Logo"
              height={36}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </Fade>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <Fade key={link.href} triggerOnce delay={index * 100}>
              <Link
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
              >
                {link.label}
              </Link>
            </Fade>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Fade triggerOnce delay={300}>
            <GhostButton onClick={toggleTheme} className="!h-10 !w-10 !rounded-xl !p-0 flex items-center justify-center">
              {!isDarkMode ? <GoSun className="text-gray-600" /> : <GoMoon className="text-gray-300" />}
            </GhostButton>
          </Fade>
          <Fade triggerOnce delay={400}>
            <Link href="/login">
              <PrimaryButton className="!h-10 !px-6 !rounded-xl flex items-center gap-2">
                <RiRocketLine className="text-lg" />
                Kirish
              </PrimaryButton>
            </Link>
          </Fade>
        </div>

        <div className="md:hidden">
          <GhostButton onClick={showDrawer} className="!h-10 !w-10 !rounded-xl !p-0 flex items-center justify-center">
            <HiOutlineMenuAlt3 className="text-2xl text-gray-700 dark:text-gray-300" />
          </GhostButton>
        </div>
      </Container>

      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        width={300}
        closeIcon={<HiX className="text-xl" />}
        className="backdrop-blur-xl"
        styles={{
          body: { padding: 0 },
          header: { borderBottom: 'none', padding: '16px 20px' },
        }}
        title={<img src={`/logo/${isDarkMode ? 'dark' : 'light'}/logo.svg`} alt="Logo" height={32} />}
      >
        <div className="flex flex-col justify-between h-full p-5">
          <div className="flex flex-col gap-2">
            {[
              { href: '#features', icon: HiOutlineSparkles, label: 'Kurslar' },
              { href: '#how-it-works', icon: HiOutlineLightningBolt, label: "O'qitish jarayoni" },
              { href: '#pricing', icon: BiMoney, label: 'Narxlar' },
              { href: '/blog', icon: BookOpen, label: 'Blog' },
              { href: 'tel:+998978881027', icon: FiPhone, label: "Bog'lanish" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary transition-all duration-200"
              >
                <item.icon className="text-lg text-primary" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-gray-100 dark:border-dark-200">
            <div className="flex justify-center">
              <Segmented
                options={[
                  { label: t('Kun'), value: 'light', icon: <GoSun className="m-0 size-3.5" /> },
                  { label: t('Tun'), value: 'dark', icon: <GoMoon className="m-0 size-3.5" /> },
                ]}
                value={!isDarkMode ? 'light' : 'dark'}
                onChange={toggleTheme}
                className="bg-gray-100 dark:bg-dark-200"
              />
            </div>
            <Link href="/login" onClick={onClose}>
              <PrimaryButton className="!h-12 !rounded-xl flex items-center justify-center gap-2">
                <RiRocketLine className="text-lg" />
                Kirish
              </PrimaryButton>
            </Link>
            <Link href="/register" onClick={onClose}>
              <SecondaryButton className="!h-12 !rounded-xl flex items-center justify-center gap-2">
                Ro'yxatdan o'tish
                <CiLogin size={20} />
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}

export default Header;

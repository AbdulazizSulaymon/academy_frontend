import { observer } from 'mobx-react';
import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { GoMoon, GoSun } from 'react-icons/go';
import { Sparkles } from 'lucide-react';

import { Props } from '@src/types';
import { useMyTheme } from '@hooks/use-my-theme';

export const LoginPageLayout = observer(function Page({ children }: Props) {
  const { theme: currentTheme, toggleTheme, isDarkMode } = useMyTheme();

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary via-primary-600 to-primary-700 p-12 flex-col justify-between">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

        {/* Floating elements - Trading themed */}
        <div className="absolute top-20 right-20 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-32 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-bounce-soft">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-16 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center animate-pulse-slow">
          <span className="text-white font-bold text-xs">$</span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Link href="/">
            <img src="/logo/dark/logo.png" alt="HBS Academy Logo" className="h-10" />
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium w-fit backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Trading Academy</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
            Professional treyder bo'ling
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            HBS Academy bilan moliyaviy bozorlarda professional treyder bo'lish yo'lingizni boshlang
          </p>

          {/* Key Features */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/90">Amaliy darslar va real trading</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/90">Professional mentorlar</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/90">Sertifikat va umrbod qo'llab-quvvatlash</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-white/70 text-sm">Talabalar</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">85%</p>
              <p className="text-white/70 text-sm">Muvaffaqiyat</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-white/70 text-sm">Mentorlar</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} HBS Academy. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div
        className={`w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative ${
          isDarkMode ? 'bg-dark' : 'bg-gray-50'
        }`}
      >
        {/* Background gradient for mobile */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Theme toggle */}
        <Button
          onClick={toggleTheme}
          type="text"
          className="absolute top-6 right-6 z-10 flex items-center justify-center h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
        >
          {currentTheme === 'light' ? (
            <GoSun className="text-lg text-gray-600" />
          ) : (
            <GoMoon className="text-lg text-gray-300" />
          )}
        </Button>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 relative z-10">
          <Link href="/">
            <img src={`/logo/${!isDarkMode ? 'light' : 'dark'}/logo.png`} alt="HBS Academy Logo" className="h-10" />
          </Link>
        </div>

        {/* Form container */}
        <div
          className={`w-full max-w-md relative z-10 p-8 rounded-3xl ${
            isDarkMode
              ? 'bg-dark-100 border border-dark-200'
              : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50'
          }`}
        >
          {/* Desktop logo inside card */}
          <div className="hidden lg:flex justify-center mb-8">
            <Link href="/">
              <img src={`/logo/${!isDarkMode ? 'light' : 'dark'}/logo.png`} alt="HBS Academy Logo" className="h-9" />
            </Link>
          </div>

          {children}
        </div>

        {/* Footer for mobile */}
        <p className="lg:hidden mt-8 text-gray-500 dark:text-gray-400 text-sm text-center relative z-10">
          &copy; {new Date().getFullYear()} HBS Academy
        </p>
      </div>
    </div>
  );
});

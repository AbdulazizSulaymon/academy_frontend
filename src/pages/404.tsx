import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { Home, Search, ArrowLeft, AlertCircle, Compass } from 'lucide-react';
import Link from 'next/link';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/container';

const Error404: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <DynamicProviders>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-dark dark:via-dark-100 dark:to-dark-200">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-primary-600/5 to-primary/5 rounded-full blur-3xl" />

        <Container className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated 404 Number */}
            <Zoom triggerOnce duration={1000}>
              <div className="relative mb-8">
                <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-600 to-primary-700 leading-none select-none">
                  404
                </h1>
                {/* Floating decorative elements */}
                <div className="absolute top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl animate-float opacity-60 blur-sm" />
                <div className="absolute bottom-10 -right-10 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full animate-bounce-soft opacity-60 blur-sm" />
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-primary-200 to-primary rounded-lg animate-pulse-slow opacity-60 blur-sm" />
              </div>
            </Zoom>

            {/* Main Content */}
            <Fade triggerOnce duration={800} delay={300}>
              <div className="space-y-6 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit mx-auto">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t('Sahifa topilmadi') || 'Sahifa topilmadi'}</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  {t('Oops! Bu sahifa mavjud emas') || 'Oops! Bu sahifa mavjud emas'}
                </h2>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {t(
                    "Kechirasiz, siz tashrif buyurgan sahifa o'chirilgan yoki mavjud emas. Quyidagi tugmalar orqali boshqa sahifalarga o'ting.",
                  ) ||
                    "Kechirasiz, siz tashrif buyurgan sahifa o'chirilgan yoki mavjud emas. Quyidagi tugmalar orqali boshqa sahifalarga o'ting."}
                </p>

                {/* Path display */}
                {router.asPath && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-mono">
                    <Compass className="w-4 h-4" />
                    <span>{router.asPath}</span>
                  </div>
                )}
              </div>
            </Fade>

            {/* Action Buttons */}
            <Fade triggerOnce duration={800} delay={500}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<Home className="w-5 h-5" />}
                  onClick={() => router.push('/')}
                  className="h-12 px-8 rounded-xl font-semibold text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                >
                  {t('Bosh sahifaga qaytish') || 'Bosh sahifaga qaytish'}
                </Button>

                <Button
                  size="large"
                  icon={<ArrowLeft className="w-5 h-5" />}
                  onClick={() => router.back()}
                  className="h-12 px-8 rounded-xl font-semibold text-base border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  {t('Orqaga') || 'Orqaga'}
                </Button>

                <Link href="/shop/dashboard">
                  <Button
                    size="large"
                    icon={<Search className="w-5 h-5" />}
                    className="h-12 px-8 rounded-xl font-semibold text-base border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {t('Dashboard') || 'Dashboard'}
                  </Button>
                </Link>
              </div>
            </Fade>

            {/* Helpful Links */}
            <Fade triggerOnce duration={800} delay={700}>
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t('Yoki quyidagi sahifalardan birini tanlang:') || 'Yoki quyidagi sahifalardan birini tanlang:'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {t('Kirish') || 'Kirish'}
                  </Link>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <Link
                    href="/register"
                    className="text-primary hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {t('Ro\'yxatdan o\'tish') || "Ro'yxatdan o'tish"}
                  </Link>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <Link
                    href="/blog"
                    className="text-primary hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {t('Blog') || 'Blog'}
                  </Link>
                </div>
              </div>
            </Fade>
          </div>
        </Container>
      </div>
    </DynamicProviders>
  );
};

export default Error404;

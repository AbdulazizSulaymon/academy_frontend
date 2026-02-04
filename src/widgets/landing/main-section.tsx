import { Button } from 'antd';
import { ArrowRight, Play, Sparkles, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Fade, Zoom } from 'react-awesome-reveal';

import { Container } from '@components/container';

const stats = [
  { icon: Users, value: '500+', label: 'Talabalar' },
  { icon: TrendingUp, value: '85%', label: 'Muvaffaqiyat darajasi' },
  { icon: Sparkles, value: '50+', label: 'Professional mentorlar' },
];

function MainSection() {
  return (
    <section
      itemScope
      itemType="https://schema.org/Organization"
      aria-label="Asosiy bo'lim"
      className="relative overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark dark:via-dark-100 dark:to-dark-200" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <Container className="relative py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <Fade triggerOnce duration={800}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
                <Sparkles className="w-4 h-4" />
                <span>Professional Trading Ta'limi</span>
              </div>
            </Fade>

            <Fade triggerOnce duration={800} delay={200}>
              <div className="space-y-4">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white !leading-[1.1]"
                  itemProp="name"
                >
                  Muvaffaqiyatli{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-600 to-primary-700">
                    Treyder
                  </span>{' '}
                  bo'ling
                </h1>
                <p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl !leading-relaxed"
                  itemProp="description"
                >
                  HBS Academy bilan moliyaviy bozorlarda professional treyder bo'ling. Amaliy darslar, tajribali mentorlar va real trading tajribasi bilan karyerangizni boshlang.
                </p>
              </div>
            </Fade>

            <Fade triggerOnce duration={800} delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" itemProp="url">
                  <Button
                    type="primary"
                    size="large"
                    className="h-14 px-8 rounded-2xl font-semibold text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    Kursga yozilish
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    size="large"
                    className="h-14 px-8 rounded-2xl font-semibold text-base border-2 border-gray-200 dark:border-dark-200 hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Kurs haqida
                  </Button>
                </Link>
              </div>
            </Fade>

            <Fade triggerOnce duration={800} delay={600}>
              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          <div className="flex justify-center lg:justify-end relative">
            <Zoom triggerOnce duration={1000}>
              <div className="relative">
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl animate-float opacity-80" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full animate-bounce-soft" />
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-primary-200 to-primary rounded-lg animate-pulse-slow" />

                {/* Main image with glow effect */}
                <div className="relative z-10 p-2 rounded-3xl bg-gradient-to-br from-white/50 to-white/30 dark:from-dark-100/50 dark:to-dark-200/30 backdrop-blur-sm shadow-2xl">
                  <img
                    src="/images/pupilwithmacbook.png"
                    alt="HBS Academy - Professional Trading Ta'limi"
                    className="rounded-2xl object-contain w-full max-w-[550px]"
                    loading="lazy"
                    itemProp="image"
                  />
                </div>

                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-600/20 to-primary/20 rounded-3xl blur-2xl -z-10 scale-110" />
              </div>
            </Zoom>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MainSection;

import { Button } from 'antd';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { ArrowRight, Rocket, Sparkles } from 'lucide-react';

import { Container } from '@components/container';

function StartNow() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Fade triggerOnce duration={800}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary-600 to-primary-700 p-10 md:p-16 lg:p-20">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            {/* Floating icons */}
            <div className="absolute top-10 right-10 md:right-20 animate-float">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-10 left-10 md:left-20 animate-bounce-soft">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Hoziroq boshlang</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl !leading-tight">
                Professional treyder bo'lishga tayyormisiz?
              </h2>

              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
                Yuzlab talabalar HBS Academy bilan moliyaviy bozorlarda muvaffaqiyatga erishmoqda.
                Sizning navbatingiz!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button
                    size="large"
                    className="h-14 px-8 rounded-2xl font-semibold text-base bg-white text-primary hover:bg-gray-100 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    Ro'yxatdan o'tish
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button
                    size="large"
                    className="h-14 px-8 rounded-2xl font-semibold text-base bg-white/10 text-white hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm transition-all duration-300"
                  >
                    Kurslarni ko'rish
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </section>
  );
}

export default StartNow;

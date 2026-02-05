import { Check, Sparkles, Crown, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';

import { Container } from '@components/container';
import { PrimaryButton, GhostButton } from '@/components/ui/button';

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  features: string[];
  popular?: boolean;
  icon: React.ElementType;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Boshlang'ich kurs",
    description: 'Trading asoslarini o\'rganish',
    price: '500,000',
    priceUnit: "so'm",
    features: ['Trading asoslari', '30 kun davomida darslar', 'Video darsliklar', 'Demo hisob amaliyoti', 'Guruh yordami'],
    icon: Zap,
  },
  {
    title: 'Professional kurs',
    description: 'To\'liq professional tayyorgarlik',
    price: '1,500,000',
    priceUnit: "so'm",
    features: [
      'To\'liq trading kursi',
      '90 kun intensiv dastur',
      'Shaxsiy mentor',
      'Real hisob amaliyoti',
      'Umrbod qo\'llab-quvvatlash',
      'Trading strategiyalar',
      'Risk management',
    ],
    popular: true,
    icon: Crown,
  },
  {
    title: 'VIP Mentorlash',
    description: 'Individual shaxsiy o\'qitish',
    price: 'Individual',
    priceUnit: 'narx',
    features: [
      'Shaxsiy 1-on-1 darslar',
      'Moslashuvchan jadval',
      'Real trading bilan mentorlash',
      'Portfel boshqaruvi',
      '24/7 Mentor yordami',
      'Professional network',
      'Barcha resurslar',
    ],
    icon: Star,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark dark:via-dark-100 dark:to-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl" />

      <Container className="relative">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Shaffof narxlar</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              O'zingizga mos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">kurs</span>ni
              tanlang
            </h2>
            <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
              Har qanday darajadagi o'quvchi uchun qulay narxlar va kurslar
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Fade key={plan.title} triggerOnce delay={index * 150}>
                <div
                  className={`relative flex flex-col h-full rounded-3xl p-8 transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-primary to-primary-600 text-white shadow-2xl shadow-primary/30 scale-105 z-10'
                      : 'bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-primary text-sm font-semibold shadow-lg">
                      Mashhur
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 ${
                      plan.popular ? 'bg-white/20' : 'bg-primary/10'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                  </div>

                  <div className="mb-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {plan.title}
                    </h3>
                    <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-bold ${
                          plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                        {plan.priceUnit}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.popular ? 'bg-white/20' : 'bg-primary/10'
                          }`}
                        >
                          <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <span
                          className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register" className="mt-auto w-full">
                    {plan.popular ? (
                      <GhostButton className="!h-12 !rounded-xl !font-semibold !w-full !bg-white !text-primary hover:!bg-gray-100">
                        Boshlash
                      </GhostButton>
                    ) : (
                      <PrimaryButton className="!h-12 !rounded-xl !font-semibold !w-full">
                        Boshlash
                      </PrimaryButton>
                    )}
                  </Link>
                </div>
              </Fade>
            );
          })}
        </div>

        <Fade triggerOnce delay={600}>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-12 max-w-xl mx-auto">
            Bo'lib-bo'lib to'lash imkoniyati mavjud. Bir oyda to'lovda <span className="text-primary font-semibold">10% chegirma</span> taqdim etiladi.
          </p>
        </Fade>
      </Container>
    </section>
  );
}

export default Pricing;

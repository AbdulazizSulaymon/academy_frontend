import { BookOpen, Store, Zap, Shield, BarChart3, HeadphonesIcon } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';
import { Container } from '@components/container';

const features = [
  {
    title: 'Amaliy darslar',
    description: "Real bozor sharoitida amaliy mashg'ulotlar. Nazariya va amaliyot to'liq birlashgan.",
    icon: BookOpen,
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    title: 'Professional mentorlar',
    description: "Tajribali treyder-mentorlar tomonidan shaxsiy yo'nalish va maslahatlar.",
    icon: Store,
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'Tez boshlash',
    description: 'Hech qanday dastlabki tajribasiz 0 dan professional darajaga yetishish.',
    icon: Zap,
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    title: 'Risk management',
    description: "Kapitalingizni himoya qilish va xavflarni boshqarish strategiyalari.",
    icon: Shield,
    gradient: 'from-emerald-400 to-emerald-600',
  },
  {
    title: 'Texnik tahlil',
    description: "Bozorni tahlil qilish, grafik o'qish va trading strategiyalarini o'rganish.",
    icon: BarChart3,
    gradient: 'from-primary to-primary-700',
  },
  {
    title: 'Doimiy qo\'llab-quvvatlash',
    description: "Kurs tugagandan keyin ham mentorlarga savol berish va yordam olish imkoniyati.",
    icon: HeadphonesIcon,
    gradient: 'from-rose-400 to-red-500',
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="features-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-primary-100/20 to-primary/5 dark:from-primary/10 dark:via-dark-200/50 dark:to-primary/10 rounded-full blur-3xl" />

      <Container className="relative">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Kurslar</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Nima{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                o'rganasiz?
              </span>
            </h2>
            <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
              HBS Academy bilan professional treyder bo'lish uchun zarur barcha bilim va ko'nikmalar
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Fade key={index} triggerOnce delay={index * 100}>
                <div
                  className="group relative p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={`${index + 1}`} />

                  {/* Icon with gradient background */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3" itemProp="name">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed" itemProp="description">
                    {feature.description}
                  </p>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-primary-600/0 group-hover:from-primary/[0.02] group-hover:to-primary-600/[0.02] transition-all duration-500" />
                </div>
              </Fade>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Features;

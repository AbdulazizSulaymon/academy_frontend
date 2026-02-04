import { Clock, Globe, TrendingUp, BookOpen, Award, Zap, MessageCircle, Users, Layers } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';
import { Container } from '@components/container';

const benefits = [
  {
    title: 'Moslashuvchan o\'qish',
    description: "O'zingizga qulay vaqt va joyda o'qish imkoniyati.",
    icon: Clock,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Global bozorlar',
    description: "Crypto, aksiyalar va xalqaro bozorlarda trading o'rganing.",
    icon: Globe,
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    title: 'Real daromad',
    description: "O'rgangan bilimlaringiz bilan real daromad qilish.",
    icon: TrendingUp,
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    title: 'Amaliy tajriba',
    description: 'Demo va real hisoblarda amaliy mashg\'ulotlar.',
    icon: Layers,
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    title: 'Sertifikat',
    description: 'Kurs yakunida rasmiy sertifikat olish.',
    icon: Award,
    gradient: 'from-rose-500 to-pink-400',
  },
  {
    title: 'Tezkor o\'rganish',
    description: 'Samarali va tez natijaga erishadigan dastur.',
    icon: Zap,
    gradient: 'from-yellow-500 to-primary-500',
  },
  {
    title: 'To\'liq qo\'llab-quvvatlash',
    description: "Kurs davomida va keyin ham mentor qo'llab-quvvatlash.",
    icon: MessageCircle,
    gradient: 'from-sky-500 to-blue-400',
  },
  {
    title: 'Video darsliklar',
    description: "Yozib olingan va jonli video darslar to'plami.",
    icon: BookOpen,
    gradient: 'from-indigo-500 to-violet-400',
  },
  {
    title: 'Jamoa va networking',
    description: "Bir xil fikrli odamlar bilan aloqa va tajriba ulashish.",
    icon: Users,
    gradient: 'from-primary to-primary-600',
  },
];

function OnlineStoreBenefits() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-dark-100 dark:to-dark"
      id="online-store-benefits"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Trading akademiya afzalliklari"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl" />

      <Container className="relative">
        <div className="text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Afzalliklar</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Kelajagingizni{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                quring
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
              Trading o'rganish sizga beradigan imkoniyatlar
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Fade key={index} triggerOnce delay={index * 80}>
                <div
                  className="group relative p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={`${index + 1}`} />

                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1" itemProp="name">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" itemProp="description">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default OnlineStoreBenefits;

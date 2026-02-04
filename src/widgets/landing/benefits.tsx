import { Clock, TrendingUp, Coins, HeadphonesIcon, Users, Video, Award } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';
import { Container } from '@components/container';

const benefits = [
  {
    title: "Moslashuvchan jadval",
    description: "Online darslar va yozib olingan video materiallar orqali o'zingizga qulay vaqtda o'qing.",
    icon: Clock,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Real bozor tajribasi',
    description: "Demo va real hisoblar bilan amaliy mashg'ulotlar. Haqiqiy trading tajribasi.",
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Qulay to\'lov rejalari',
    description: "Turli xil to'lov variantlari va bo'lib-bo'lib to'lash imkoniyati.",
    icon: Coins,
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    title: 'Mentor yordami',
    description: "Professional treyder-mentorlar tomonidan shaxsiy maslahatlar va qo'llab-quvvatlash.",
    icon: HeadphonesIcon,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Jamoa va networking',
    description: "O'quvchilar jamoasi bilan fikr almashish va tajriba ulashish imkoniyati.",
    icon: Users,
    gradient: 'from-rose-500 to-red-500',
  },
  {
    title: 'Darslik materiallari',
    description: "Video darslar, kitoblar, strategiyalar va trading ko'rsatmalar to'plami.",
    icon: Video,
    gradient: 'from-cyan-500 to-blue-500',
  },
];

function Benefits() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="benefits">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />

      <Container className="relative">
        <div className="text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Afzalliklar</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Nega{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                HBS Academy?
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
              Professional treyder bo'lish yo'lingizda sizni qo'llab-quvvatlaydigan imkoniyatlar
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Fade key={index} triggerOnce delay={index * 100}>
                <div
                  className="group relative p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full"
                  aria-label={benefit.title}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
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

export default Benefits;

import { Fade } from 'react-awesome-reveal';
import { Container } from '@components/container';
import { UserPlus, BookOpen, Rocket, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: "Ro'yxatdan o'ting",
    description: "Platformaga ro'yxatdan o'ting va o'zingizga mos kurs va to'lov rejasini tanlang.",
    icon: UserPlus,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: "Darslarni boshlang",
    description: "Video darslar, amaliy mashg'ulotlar va mentorlar bilan birgalikda o'qishni boshlang.",
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Trading boshlang',
    description: "O'rgangan bilimlaringizni real bozorda qo'llang va daromad qilishni boshlang!",
    icon: Rocket,
    color: 'from-primary to-primary-700',
  },
];

function HowWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-dark-100 dark:to-dark"
      aria-labelledby="how-it-works-heading"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />

      <Container className="relative">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span>3 ta oddiy qadam</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              O'qitish{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                jarayoni
              </span>
            </h2>
            <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
              HBS Academy bilan professional treyder bo'lish yo'li hech qachon bu qadar sodda bo'lmagan
            </p>
          </Fade>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <Fade key={index} triggerOnce delay={index * 200}>
                  <div
                    className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    itemProp="step"
                    itemScope
                    itemType="https://schema.org/HowToStep"
                  >
                    <meta itemProp="position" content={`${index + 1}`} />

                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div
                        className={`inline-block p-6 rounded-3xl bg-white dark:bg-dark-100 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-dark-200 ${
                          isEven ? 'md:ml-auto' : 'md:mr-auto'
                        }`}
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" itemProp="name">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm" itemProp="text">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Step number with icon */}
                    <div className="relative z-10">
                      <div
                        className={`flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} shadow-lg`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-dark-100 shadow-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HowWorks;

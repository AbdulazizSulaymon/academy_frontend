import { Quote, Star, MessageSquare } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';
import { Container } from '@components/container';

const testimonials = [
  {
    quote:
      "HBS Academy hayotimni butunlay o'zgartirdi. 3 oy davomida trading asoslarini o'rgandim va hozir barqaror daromad qilyapman. Mentorlar juda professional va har doim yordam berishga tayyor!",
    author: 'Aziz Olimov',
    company: 'Professional Treyder',
    initials: 'AO',
    rating: 5,
  },
  {
    quote:
      "Ilgari trading haqida hech narsa bilmasdim. HBS Academy menga 0 dan boshlab hamma narsani o'rgatdi. Endi men o'zimga ishonaman va moliyaviy erkinlikka erishyapman. Rahmat!",
    author: 'Malika Karimova',
    company: 'Forex Treyder',
    initials: 'MK',
    rating: 5,
  },
  {
    quote:
      "HBS Academy eng yaxshi investitsiyam bo'ldi. Kurs davomida o'rgangan bilimlarim bilan demo hisobda 80% daromad qildim. Endi real hisobga o'tdim va natijalar ajoyib!",
    author: 'Sardor Rahimov',
    company: 'Crypto Treyder',
    initials: 'SR',
    rating: 5,
  },
];

function Feedbacks() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-dark-100 dark:to-dark">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />

      <Container className="relative">
        <div className="text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>Talabalar fikri</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Talabalarimiz{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                nima deydi?
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
              HBS Academy bitiruvchilarining haqiqiy fikrlari
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Fade key={index} triggerOnce delay={index * 150}>
              <div className="relative p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 pt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-dark-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary-600/20 flex items-center justify-center">
                    <span className="text-primary font-bold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-0">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-0">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Feedbacks;

import Image from 'next/image';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { ExternalLink, Store, Users } from 'lucide-react';

import { Container } from '@components/container';
import { PrimaryButton } from '@/components/ui/button';

const clients = [
  {
    name: 'Azamat Tursunov',
    description: "3 oyda professional treyder bo'ldi. Hozir Crypto va xalqaro bozorlarida muvaffaqiyatli ishlayapti.",
    image: 'https://kzmkr68ngf4z99wjl2kj.lite.vusercontent.net/placeholder.svg?height=200&width=400',
    link: '#',
    category: 'Crypto Trading',
  },
  {
    name: 'Dilnoza Rahimova',
    description: 'HBS Academy bitiruvchisi. Hozir o\'z trading guruhini boshqaradi va boshqalarga o\'rgatadi.',
    image: 'https://kzmkr68ngf4z99wjl2kj.lite.vusercontent.net/placeholder.svg?height=200&width=400',
    link: '#',
    category: 'Crypto Trading',
  },
  {
    name: 'Jasur Karimov',
    description: "Ishidan chiqib, to'liq vaqtli professional treyder bo'ldi. Barqaror oylik daromad qilyapti.",
    image: 'https://kzmkr68ngf4z99wjl2kj.lite.vusercontent.net/placeholder.svg?height=200&width=400',
    link: '#',
    category: 'Professional Treyder',
  },
];

function OurClients() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />

      <Container className="relative">
        <div className="text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>Muvaffaqiyat hikoyalari</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Muvaffaqiyatli{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                talabalar
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
              HBS Academy bilan professional treyder bo'lgan talabalar
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <Fade key={index} triggerOnce delay={index * 150}>
              <article className="group relative rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={client.image}
                    alt={`${client.name} - HBS Academy talabasi`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-dark-100/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300">
                      {client.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary-600/20 flex items-center justify-center">
                      <Store className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{client.name}</h3>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">
                    {client.description}
                  </p>

                  <Link href={client.link}>
                    <PrimaryButton className="!h-10 !rounded-xl !font-medium !w-full flex items-center justify-center gap-2">
                      Hikoyani o'qish
                      <ExternalLink className="w-4 h-4" />
                    </PrimaryButton>
                  </Link>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default OurClients;

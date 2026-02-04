import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@components/container';

const HeroSection = ({
  backgroundImage,
  backgroundVideo,
  title,
  description,
}: {
  backgroundImage?: string | StaticImport;
  backgroundVideo?: string;
  title?: string;
  description?: string;
}) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <Image src={backgroundImage} alt="Banner" fill className="object-cover" priority />
        ) : null}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <Container className={'relative z-10 order-1 h-full w-full p-3 pb-10 md:pb-4 lg:pb-0'}>
        <div className="flex w-full max-w-5xl min-h-[300px] flex-col justify-center space-y-6 py-20 md:py-0 lg:min-h-[620px]">
          <h1 className="text-4xl leading-tight font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-4xl text-lg text-white drop-shadow-lg sm:text-xl">{description}</p>
          {/*{hasGetQuoteBtn && (*/}
          {/*  <Link href="/" className="mb-8">*/}
          {/*    <button className="rounded-md bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white hover:bg-blue-700">*/}
          {/*      Get an instant quote*/}
          {/*    </button>*/}
          {/*  </Link>*/}
          {/*)}*/}
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

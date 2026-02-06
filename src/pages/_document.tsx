import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { email, phoneNumber, projectName, SITE_URL } from '@data/const';

export default function Document() {
  return (
    <Html lang="uz">
      <Head>
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="HBS Academy - Online trading akademiyasi. Kripto valyuta, birja va investitsiya bo'yicha professional kurslar. Amaliyot asosida o'rganing, treyder bo'ling."
        />
        <meta
          name="keywords"
          content="trading kurslari, kripto valyuta, birja, investitsiya, forex, online education, treyder kurslari, moliyaviy savodxonlik, O'zbekistonda trading"
        />
        <meta name="author" content={projectName} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Canonical URL */}
        <link rel="canonical" href={SITE_URL} />

        {/* Geo Tags */}
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Toshkent, O'zbekiston" />
        <meta name="geo.position" content="41.2995;69.2401" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={`${projectName} - Online Trading Akademiyasi`} />
        <meta
          property="og:description"
          content="Professional treyder bo'lishni xohlaysizmi? HBS Academy sizga kripto, birja va investitsiya bo'yicha eng yaxshi kurslarni taklif etadi."
        />
        <meta property="og:image" content={`${SITE_URL}/logo/light/logo.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={projectName} />
        <meta property="og:locale" content="uz_UZ" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${projectName} - Online Trading Akademiyasi`} />
        <meta
          name="twitter:description"
          content="Professional treyder bo'ling. Kripto, birja va investitsiya bo'yicha online kurslar."
        />
        <meta name="twitter:image" content={`${SITE_URL}/logo/light/logo.svg`} />
        <meta name="twitter:creator" content="@hbsacademy" />

        {/* Mobile */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={projectName} />
        <meta name="format-detection" content="telephone=yes" />

        {/* Icons */}
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Language Alternatives */}
        <link rel="alternate" hrefLang="uz" href={SITE_URL} />
        <link rel="alternate" hrefLang="ru" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        {/* Security */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Scripts */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-5J07E91W2M" strategy="afterInteractive" />
        <Script src="/js/google-analytics.js" strategy="afterInteractive" />
        <Script src="/js/telegram-web-app.js" strategy="beforeInteractive" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: projectName,
              url: SITE_URL,
              logo: `${SITE_URL}/logo/light/logo.svg`,
              description: "Online trading akademiyasi. Kripto valyuta, birja va investitsiya bo'yicha professional kurslar.",
              telephone: phoneNumber,
              email: email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Toshkent',
                addressCountry: 'UZ',
              },
              sameAs: ['https://t.me/hbsacademy'],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: phoneNumber,
                contactType: 'customer service',
                email: email,
                areaServed: 'UZ',
                availableLanguage: ['uz', 'ru', 'en'],
              },
            }),
          }}
        />

        {/* Structured Data - Course */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: 'Professional Trading Kurslari',
              description: 'Kripto valyuta, birja va investitsiya bo\'yicha professional kurslar. Amaliyot asosida o\'rganing.',
              provider: {
                '@type': 'Organization',
                name: projectName,
                url: SITE_URL,
              },
              educationalLevel: 'Beginner to Advanced',
              inLanguage: ['uz', 'ru', 'en'],
              offers: {
                '@type': 'Offer',
                category: 'Paid',
                priceCurrency: 'UZS',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '1500',
              },
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: projectName,
              url: SITE_URL,
              description: "Online trading akademiyasi. Professional treyderlar tayorlash markazi.",
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${SITE_URL}/courses?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>
      <body className="overflow-x-hidden scroll-smooth antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

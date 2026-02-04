import Head from 'next/head';
import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { SITE_URL, projectName, email, phoneNumber } from '@/data/const';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceOffer {
  name: string;
  description: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string | StaticImageData;
  type?: 'website' | 'article';
  noIndex?: boolean;
  // Schema options
  breadcrumbs?: Array<{ name: string; url?: string }>;
  faqs?: FAQ[];
  serviceType?: string;
  serviceOffers?: ServiceOffer[];
  aggregateRating?: { value: string; count: string };
}

export default function SEO({
  title,
  description,
  keywords,
  image = '/images/og/default-og.jpg',
  type = 'website',
  noIndex = false,
  breadcrumbs,
  faqs,
  serviceType,
  serviceOffers,
  aggregateRating,
}: SEOProps) {
  const router = useRouter();

  const baseUrl = SITE_URL.replace(/^http:\/\//i, 'https://').replace(/\/+$/, '');
  const rawPath = (router.asPath || '/').split('?')[0].split('#')[0];
  const normalizedPath = rawPath !== '/' ? rawPath.replace(/\/+$/, '') : '/';
  const canonicalUrl = `${baseUrl}${normalizedPath === '/' ? '' : normalizedPath}`;

  const seoTitle = title ? `${title} | ${projectName}` : projectName;

  const seoDescription =
    description ||
    'Safe, reliable nationwide auto transport. Get instant car shipping quotes with trusted carriers across all 50 states.';

  const imagePath =
    typeof image === 'string'
      ? image.startsWith('http')
        ? null
        : image.startsWith('/')
          ? image
          : `/${image}`
      : image.src;

  const seoImage = imagePath ? `${baseUrl}${imagePath}` : (image as string);

  // Social scrapers (Telegram, etc.) can fail on very large source images.
  // Using Next's image optimizer yields a smaller, cacheable preview.
  const socialPreviewImage = imagePath
    ? `${baseUrl}/_next/image?url=${encodeURIComponent(imagePath)}&w=1200&q=75`
    : seoImage;

  const toAbsoluteUrl = (url?: string) => {
    if (!url) return canonicalUrl;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    return `${baseUrl}/${url}`;
  };

  // Generate Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          ...breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.name,
            item: toAbsoluteUrl(crumb.url),
          })),
        ],
      }
    : null;

  // Generate FAQ Schema
  const faqSchema = faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  // Generate Service Schema
  const serviceSchema =
    serviceType || serviceOffers
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: serviceType || 'Auto Transport Service',
          name: title || projectName,
          url: canonicalUrl,
          description: seoDescription,
          provider: {
            '@type': 'Organization',
            name: projectName,
            url: SITE_URL,
            telephone: phoneNumber,
            email: email,
            ...(aggregateRating && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: aggregateRating.value,
                reviewCount: aggregateRating.count,
                bestRating: '5',
                worstRating: '1',
              },
            }),
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
          ...(serviceOffers && {
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${title || projectName} Services`,
              itemListElement: serviceOffers.map((offer) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: offer.name,
                  description: offer.description,
                },
              })),
            },
          }),
        }
      : null;

  return (
    <Head>
      {/* Basic SEO */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={projectName} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang for international SEO */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={socialPreviewImage} />
      <meta property="og:image:secure_url" content={socialPreviewImage} />
      <meta property="og:image:url" content={socialPreviewImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:site_name" content={projectName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={socialPreviewImage} />
      <meta name="twitter:image:alt" content={seoTitle} />

      {/* Structured Data - Breadcrumb */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Structured Data - FAQ */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Structured Data - Service */}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
    </Head>
  );
}

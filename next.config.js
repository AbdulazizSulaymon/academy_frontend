/** @type {import('next').NextConfig} */
// const remarkGfm = require('remark-gfm');
import remarkGfm from 'remark-gfm';
import mdx from '@next/mdx';
import pwa from 'next-pwa';
import { withGlobalCss } from 'next-global-css';

const withGlobalCssConfig = withGlobalCss();

const withPWA = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  reactStrictMode: true,
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  compiler: {
    emotion: true,
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'osonsotuv.uz',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.osonsotuv.uz',
        pathname: '/uploads/**',
      },
    ],
  },

  async redirects() {
    return [
      // www'dan non-www'ga redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.osonsotuv.uz',
          },
        ],
        destination: 'https://osonsotuv.uz/:path*',
        permanent: true, // 301 redirect
      },

      // Yoki aksincha - non-www'dan www'ga
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'yorkaautotransports.com',
      //     },
      //   ],
      //   destination: 'https://www.yorkaautotransports.com/:path*',
      //   permanent: true,
      // },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api',
  //       destination: 'https://meowfacts.herokuapp.com',
  //     },
  //   ];
  // }
  // modularizeImports: {
  //   '@ant-design/icons': {
  //     transform: '@ant-design/icons/lib/icons/{{member}}',
  //     skipMember: /^[a-z]/,
  //   },
  // },
};

// module.exports = nextConfig;

// Merge MDX config with Next.js config
export default withMDX(withPWA(withGlobalCssConfig(nextConfig)));
// export default withMDX(withGlobalCssConfig(nextConfig));
// export default nextConfig;

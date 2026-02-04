module.exports = {
  siteUrl: 'https://osonsotuv.uz',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/shop', '/shop/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/shop', '/shop/*'],
      },
    ],
  },
};

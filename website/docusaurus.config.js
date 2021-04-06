/** @type {import('@docusaurus/types').DocusaurusConfig} */
const organizationName = 'wswebcreation' // Usually your GitHub org/user name.
const projectName = 'wdio-ocr-service' // Usually your repo name.
const pagesUrl = `https://${organizationName}.github.io/`
const repoUrl = `https://github.com/${organizationName}/${projectName}/`

module.exports = {
  title: 'wdio-ocr-service',
  tagline: 'A WebdriverIO service that is using Tesseract OCR for Appium Native App tests.',
  url: pagesUrl,
  baseUrl: `/${projectName}/`,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wswebcreation', // Usually your GitHub org/user name.
  projectName: 'wdio-ocr-service', // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: 'supportus',
      content:
        `⭐️  &nbsp; If you like the <strong>wdio-ocr-service</strong>, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/${organizationName}/${projectName}">GitHub</a>! ⭐️`,
    },
    navbar: {
      title: projectName,
      logo: {
        alt: projectName,
        src: 'img/logo.png',
      },
      items: [
        {
          href: repoUrl,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Support Chat',
              href: 'https://gitter.im/wswebcreation/wdio-ocr-service',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/wswebcreation',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub page',
              href: 'https://github.com/wswebcreation/wdio-ocr-service',
            },
            {
              label: 'Donate to WebdriverIO',
              href: 'https://opencollective.com/webdriverio',
            },
            {
              label: 'WebdriverIO Swag Store',
              href: 'http://shop.webdriver.io',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

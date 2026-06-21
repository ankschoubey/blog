import { getPermalink, getBlogPermalink, getAsset, CATEGORY_BASE } from './utils/permalinks';

import ankushLinks from './content/ankushLinks'
export const headerData = {
  links: [
    {
      text: 'Services',
      href: '/services',
    },
    {
      text: 'Process',
      href: '/#process',
    },
    {
      text: 'Work',
      href: '/#work',
    },
    {
      text: 'Blog',
      href: getPermalink('technical', 'tag'),
    },
  ],
  actions: [
    {
      text: 'Search',
      icon: 'tabler:search',
      variant: 'primary',
      href: '/search',
    },
    {
      variant: 'primary',
      target: '_blank',
      text: 'Let\'s Talk',
      icon: 'tabler:brand-whatsapp',
      href: ankushLinks.socialMedia.whatsapp,
    },
  ],
  isSticky: true,
  showToggleTheme: true,
};

export const footerData = {
  links: [
    // {
    //   title: 'Product',
    //   links: [
    //     { text: 'Features', href: '#' },
    //     { text: 'Security', href: '#' },
    //     { text: 'Team', href: '#' },
    //     { text: 'Enterprise', href: '#' },
    //     { text: 'Customer stories', href: '#' },
    //     { text: 'Pricing', href: '#' },
    //     { text: 'Resources', href: '#' },
    //   ],
    // },
    // {
    //   title: 'Platform',
    //   links: [
    //     { text: 'Developer API', href: '#' },
    //     { text: 'Partners', href: '#' },
    //     { text: 'Atom', href: '#' },
    //     { text: 'Electron', href: '#' },
    //     { text: 'AstroWind Desktop', href: '#' },
    //   ],
    // },
    // {
    //   title: 'Support',
    //   links: [
    //     { text: 'Docs', href: '#' },
    //     { text: 'Community Forum', href: '#' },
    //     { text: 'Professional Services', href: '#' },
    //     { text: 'Skills', href: '#' },
    //     { text: 'Status', href: '#' },
    //   ],
    // },
    // {
    //   title: 'Company',
    //   links: [
    //     { text: 'About', href: '#' },
    //     { text: 'Blog', href: '#' },
    //     { text: 'Careers', href: '#' },
    //     { text: 'Press', href: '#' },
    //     { text: 'Inclusion', href: '#' },
    //     { text: 'Social Impact', href: '#' },
    //     { text: 'Shop', href: '#' },
    //   ],
    // },
  ],
  secondaryLinks: [
    // { text: 'Terms', href: getPermalink('/terms') },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/ankushchoubey/' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/ankschoubey' },
  ],
  footNote: ``,
  //     <span class="text-blue-600 dark:text-gray-200">Made using AstroWinds theme for the special people that support me.</span>
};

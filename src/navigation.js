import { getPermalink, getBlogPermalink, getAsset, CATEGORY_BASE } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: "Blogs",
      href: getPermalink(),
      links: [
        { text: 'Tech', href: getPermalink('technical', 'tag') },
        { text: 'Life', href: getPermalink('non-technical', 'tag') }
      ]
    },
    { text: 'TDD & Beyond', href: "/tdd" },
    { text: 'Clean Code', href: "/clean-code" },

    // {
    //   text: "Tech Series",
    //   // href: getPermalink(),
    //   links: [
    //     // { text: 'Clean Code', href: getPermalink('clean-code', 'tag') },
    //     { text: 'TDD', href: "/tdd" },
    //     // { text: 'Continuous Delivery', href: getPermalink('non-technical', 'tag') },
    //   ]
    // },
    // {
    //   text: "Life Series",
    //   href: getPermalink(),
    //   links: [
    //     { text: 'Developing Core Values', href: getPermalink('non-technical', 'tag') },
    //     { text: 'Clarity in Thoughts', href: getPermalink('non-technical', 'tag') },
    //     { text: 'Responsibility in Actions', href: getPermalink('non-technical', 'tag') },
    //     { text: 'Optimism in Approach', href: getPermalink('non-technical', 'tag') },
    //     { text: 'Harmony in Interactions', href: getPermalink('non-technical', 'tag') },
    //   ]
    // }
  ],
  actions: [
    {
      text: 'Resume',
      target:"_blank",
      variant: "secondary", 
      href: 'https://docs.google.com/viewer?url=https://docs.google.com/document/d/1SjN-Sij2NKrA8C9irLCz0qDAQ50B7sp6iGN8hD8uRE0/export?format=pdf',
    },
    {
      text: 'Hire me',
      variant: "primary", 
      target:"_blank",
      href: 'https://www.linkedin.com/in/ankushchoubey/',
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
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <span class="text-blue-600 dark:text-gray-200">Made using AstroWinds theme for the special people that support me.</span>
  `,
};

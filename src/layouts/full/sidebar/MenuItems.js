import {
  IconCopy, IconLayoutDashboard, IconLogin, IconTypography, IconUserPlus, IconChecks, IconBrandGithub
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Community Vote',
    icon: IconChecks,
    href: 'https://alfa2267.github.io/community-vote/',
    external: true,
  },
  {
    navlabel: true,
    subheader: 'GitHub Projects',
  },
  {
    id: uniqueId(),
    title: 'alfa2267.github.io',
    icon: IconBrandGithub,
    href: 'https://github.com/alfa2267/alfa2267.github.io',
    external: true,
  },
  {
    id: uniqueId(),
    title: 'community-vote',
    icon: IconBrandGithub,
    href: 'https://github.com/alfa2267/community-vote',
    external: true,
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
];

export default Menuitems;

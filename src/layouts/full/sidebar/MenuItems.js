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
    href: '/community-vote',
  },
  
];

export default Menuitems;

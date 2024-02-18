import React from 'react';
import { ReactComponent as StoreIcon } from 'assets/Home.svg';
import { ReactComponent as CategoryIcon } from 'assets/Graph.svg';
import { ReactComponent as UsersIcon } from 'assets/Users.svg';

interface Menu {
  title: string;
  href: string;
  roles?: string[];
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const navigation_config: Menu[] = [
  {
    title: 'navigation_config_users',
    href: '/',
    icon: UsersIcon,
  },
  {
    title: 'navigation_config_bed',
    href: '/beds',
    icon: StoreIcon,
  },
  {
    title: 'navigation_config_equipments',
    href: '/equipments',
    icon: CategoryIcon,
  },
];

export default navigation_config;

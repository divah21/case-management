import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: '/dashboard',
    icon: 'mingcute:home-1-fill',
    active: true,
  },
  {
    id: 'features',
    subheader: 'Report A case',
    path: 'case',
    icon: 'mingcute:star-fill',
    active: true,
  },
  {
    id: 'documents',
    subheader: 'Statistics',
    path: '/dashboard/statistics',
    icon: 'mingcute:plugin-2-fill',
    active: true,
  },
  {
    id: 'users',
    subheader: 'Users',
    path: '/',
    icon: 'mingcute:user-2-fill',
  },

  
  {
    id: 'authentication',
    subheader: 'Create Users',
    icon: 'mingcute:safe-lock-fill',
    items: [ 
      {
        name: 'Signup',
        pathName: 'signup',
        path: paths.signup,
      },
    ],
  },
  {
    id: 'settings',
    subheader: 'Settings',
    path: '/',
    icon: 'material-symbols:settings-rounded',
    active: true,
  },
  {
    id: 'template-pages',
    subheader: 'Reports',
    path: '/',
    icon: 'mingcute:document-2-fill',
  },
  {
    id: 'account-settings',
    subheader: 'Sauce  Vee',
    path: '/',
  },
];

export default sitemap;

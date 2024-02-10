interface IDashboardMenus {
  title: string
  icon: string
  path: string
  description?: string
  hidden?: boolean
}

export const APP_MENU: Record<string, { name: string, routes: IDashboardMenus[] }> = {
  main: {
    name: 'Modules',
    routes: [
      {
        title: 'Dashboard',
        icon: 'layout',
        path: 'home',
      },
      {
        title: 'Article',
        icon: 'file-text',
        path: 'article',
        description: 'Manage Articles'
      },
    ],
  },
  settings: {
    name: 'General',
    routes: [
      {
        title: 'User',
        icon: 'users',
        path: 'user',
        description: 'Manage User'
      },
      {
        title: 'Settings',
        icon: 'settings',
        path: 'settings',
        description: 'Settings'
      },
    ],
  },
};

export const globalSearch = {

};

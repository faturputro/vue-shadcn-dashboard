interface IDashboardMenus {
  title: string
  icon: string
  path: string
  description?: string
  hidden?: boolean
}

export const APP_MENU: Record<string, { name: string, routes: IDashboardMenus[] }> = {
  main: {
    name: 'Main',
    routes: [
      {
        title: 'Home',
        icon: 'home',
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
    name: 'Settings',
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

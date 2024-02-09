interface IDashboardMenus {
  title: string
  icon: string
  path: string
}

export const APP_MENU: Record<string, {name: string, routes: IDashboardMenus[]}> = {
  main: {
    name: 'Main',
    routes: [
      {
        title: 'Home',
        icon: 'home',
        path: 'home'
      },
      {
        title: 'Article',
        icon: 'file-text',
        path: 'article'
      },
    ],
  },
  settings: {
    name: 'Settings',
    routes: [
      {
        title: 'User',
        icon: 'users',
        path: 'user'
      },
      {
        title: 'Settings',
        icon: 'settings',
        path: 'settings'
      },
    ],
  },
};

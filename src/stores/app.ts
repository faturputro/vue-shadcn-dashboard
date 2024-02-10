import { defineStore } from 'pinia';

const LIGHT = 'light';
const DARK = 'dark';
const THEME_KEY = 'themeMode';

export const useAppStore = defineStore('app', {
  state: () => ({
    themeMode: LIGHT,
    sidebarExpand: true,
  }),
  getters: {
    theme: (state) => state.themeMode,
    isDark: (state) => state.themeMode === DARK,
    sidebarExpanded: (state) => state.sidebarExpand,
  },
  actions: {
    toggleSidebar() {
      this.sidebarExpand = !this.sidebarExpand;
    },
    initTheme() {
      const cache = localStorage.getItem(THEME_KEY);
      if (cache) {
        this.themeMode = cache as 'light' | 'dark';
      }
      this.applyTheme();
    },
    toggleTheme() {
      this.themeMode = this.themeMode === LIGHT ? DARK : LIGHT;
      this.applyTheme();
      localStorage.setItem(THEME_KEY, this.themeMode);
    },
    applyTheme() {
      document.documentElement.classList.remove(LIGHT, DARK);
      document.body.classList.remove(LIGHT, DARK);
      document.documentElement.classList.add(this.themeMode);
      document.body.classList.add(this.themeMode);
    },
  },
});

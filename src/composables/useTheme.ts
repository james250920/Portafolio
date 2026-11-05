import { ref, watchEffect } from 'vue';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

const currentTheme = ref<Theme>(localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark');

export function useTheme() {
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, currentTheme.value);
  };

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.value);
  });

  return { currentTheme, toggleTheme };
}

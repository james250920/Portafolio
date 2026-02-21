import { ref, watchEffect } from 'vue';

export type Theme = 'dark' | 'light';

const currentTheme = ref<Theme>('dark');

export function useTheme() {
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  };

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.value);
  });

  return { currentTheme, toggleTheme };
}

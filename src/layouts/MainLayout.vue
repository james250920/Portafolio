<template>
  <q-layout view="lHh Lpr lFf" class="hack-layout">
    <q-header class="hack-header">
      <q-toolbar class="hack-toolbar">
        <!-- Logo/Brand -->
        <button
          type="button"
          class="hack-brand"
          :aria-label="`DevMenfroyt@james, ${t('nav.home')}`"
          @click="goToSection('home')"
        >
          <img :src="logoURL" alt="" class="brand-logo" width="32" height="32" />
          <span class="brand-text">DevMenfroyt@james:~$</span>
        </button>

        <!-- Spacer -->
        <q-space />

        <!-- Navigation -->
        <nav class="hack-nav" :aria-label="t('nav.label')">
          <q-btn
            v-for="item in navItems"
            :key="item.id"
            flat
            class="nav-btn"
            :class="{ active: activeSection === item.id }"
            :aria-label="t(`nav.${item.id}`)"
            :aria-current="activeSection === item.id ? 'location' : undefined"
            @click="goToSection(item.id)"
          >
            <q-icon :name="item.icon" class="q-mr-xs" />
            <span class="nav-text">{{ t(`nav.${item.id}`) }}</span>
          </q-btn>
        </nav>

        <!-- Language and theme: in the toolbar on desktop, floating below it on phones -->
        <div class="floating-toggles" :class="{ 'is-hidden': togglesHidden }">
          <button
            type="button"
            class="toggle-btn lang-toggle"
            :aria-label="langLabel"
            :title="t('toggle.lang')"
            @click="toggleLang"
          >
            <span class="toggle-label">{{ nextLang }}</span>
          </button>
          <button
            type="button"
            class="toggle-btn theme-toggle"
            :aria-label="themeLabel"
            :title="themeLabel"
            @click="toggleTheme"
          >
            <q-icon :name="currentTheme === 'dark' ? 'light_mode' : 'dark_mode'" size="18px" />
          </button>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="hack-page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLanguage } from 'src/composables/useLanguage';
import { useTheme } from 'src/composables/useTheme';
import { scrollToSection } from 'src/composables/useSectionScroll';

const { currentLang, t, toggleLang } = useLanguage();
const { currentTheme, toggleTheme } = useTheme();

const themeLabel = computed(() =>
  t(currentTheme.value === 'dark' ? 'toggle.themeLight' : 'toggle.themeDark'),
);

const nextLang = computed(() => (currentLang.value === 'es' ? 'EN' : 'ES'));
// Starts with the visible text so voice control can target it
const langLabel = computed(() => `${nextLang.value}: ${t('toggle.lang')}`);

const navItems = [
  { id: 'home', icon: 'home' },
  { id: 'about', icon: 'person' },
  { id: 'projects', icon: 'code' },
  { id: 'education', icon: 'school' },
  { id: 'contact', icon: 'mail' },
];

const router = useRouter();
const route = useRoute();

const logoURL = `https://${import.meta.env.VITE_IMG_URL}/imagenes/img/logo.png`;
const activeSection = ref('home');

const SECTION_TO_PATH: Record<string, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  education: '/education',
  contact: '/contact',
};

const PATH_TO_SECTION: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/projects': 'projects',
  '/education': 'education',
  '/contact': 'contact',
};

const goToSection = (sectionId: string) => {
  // Actualizar la URL para reflejar la sección actual
  const path = SECTION_TO_PATH[sectionId] ?? '/';
  if (route.path !== path) {
    void router.replace(path);
  }

  scrollToSection(sectionId);
};

// Mobile: hide the floating toggles while scrolling down so they don't cover content
const togglesHidden = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
  const currentY = window.scrollY;
  togglesHidden.value = currentY > 120 && currentY > lastScrollY;
  lastScrollY = currentY;

  const sections = ['home', 'about', 'education', 'projects', 'contact'];
  const scrollPosition = window.scrollY + 60;

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        if (activeSection.value !== sectionId) {
          activeSection.value = sectionId;
          // Actualizar la URL al hacer scroll sin forzar navegación del router
          const newPath = SECTION_TO_PATH[sectionId] ?? '/';
          if (route.path !== newPath) {
            void router.replace(newPath);
          }
        }
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Al cargar directamente una URL de sección (ej: /#/contact), hacer scroll a esa sección
  const initialSection = PATH_TO_SECTION[route.path];
  if (initialSection && initialSection !== 'home') {
    activeSection.value = initialSection;
    setTimeout(() => scrollToSection(initialSection, { moveFocus: false }), 400);
  } else {
    handleScroll();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.hack-layout {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

.hack-header {
  background: rgba(13, 17, 23, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #30363d;
}

.hack-toolbar {
  padding: 0 1.5rem;
  min-height: 56px;
}

.hack-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #04f91e;
    transform: scale(1.05);
  }

  .brand-logo {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #04f91e;
    box-shadow: 0 0 10px rgba(4, 249, 30, 0.4);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 0 15px rgba(4, 249, 30, 0.6);
    }
  }

  .brand-icon {
    font-size: 1.5rem;
    color: #04f91e;
  }

  .brand-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
  }
}

.hack-nav {
  display: flex;
  gap: 0.5rem;

  .nav-btn {
    min-height: 44px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 400;
    color: #8b949e;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    text-transform: lowercase;

    &:hover {
      color: #04f91e;
      background: rgba(4, 249, 30, 0.1);
    }

    &.active {
      color: #04f91e;
      background: rgba(4, 249, 30, 0.15);
      box-shadow: 0 0 10px rgba(4, 249, 30, 0.3);
    }

    .q-icon {
      font-size: 0.9rem;
    }
  }
}

.hack-page-container {
  background: transparent;
}

// Language and theme toggles
.floating-toggles {
  display: flex;
  gap: 0.5rem;
  margin-left: 0.75rem;

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid #30363d;
    background: rgba(13, 17, 23, 0.9);
    backdrop-filter: blur(12px);
    color: #8b949e;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    font-weight: 700;

    &:hover {
      border-color: #04f91e;
      color: #04f91e;
      background: rgba(4, 249, 30, 0.08);
      box-shadow: 0 0 14px rgba(4, 249, 30, 0.2);
      transform: translateY(-2px);
    }

    .toggle-label {
      letter-spacing: 0.05em;
    }
  }

  .theme-toggle {
    .q-icon {
      transition: transform 0.4s ease;
    }

    &:hover .q-icon {
      transform: rotate(30deg);
    }
  }
}

// Responsive
// The full prompt doesn't fit next to the nav and toggles on tablets
@media (max-width: 1024px) {
  .hack-brand .brand-text {
    display: none;
  }
}

@media (max-width: 768px) {
  .hack-toolbar {
    padding: 0 0.5rem;
  }

  .hack-nav {
    gap: 0.15rem;

    .nav-btn {
      padding: 0;
      min-width: 44px;

      .q-icon {
        margin: 0 !important;
        font-size: 1.5rem;
      }

      .nav-text {
        display: none;
      }
    }
  }

  .floating-toggles {
    position: absolute;
    top: calc(100% + 6px);
    right: 0.5rem;
    margin-left: 0;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;

    // Stays reachable if it holds keyboard focus
    &.is-hidden:not(:focus-within) {
      opacity: 0;
      transform: translateY(-12px);
      pointer-events: none;
    }

    .toggle-btn .q-icon {
      font-size: 20px;
    }
  }
}
</style>

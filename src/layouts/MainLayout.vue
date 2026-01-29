<template>
  <q-layout view="lHh Rpr LFf" class="hack-layout">
    <q-header class="hack-header">
      <q-toolbar class="hack-toolbar">
        <!-- Logo/Brand -->
        <div class="hack-brand" @click="scrollToSection('home')">
          <img :src="logoURL" alt="DevMenfroyt" class="brand-logo" />
          <span class="brand-text">DevMenfroyt@james:~$</span>
        </div>

        <!-- Spacer -->
        <q-space />

        <!-- Navigation -->
        <div class="hack-nav">
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: activeSection === 'home' }"
            @click="scrollToSection('home')"
          >
            <q-icon name="home" class="q-mr-xs" />
            home
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: activeSection === 'about' }"
            @click="scrollToSection('about')"
          >
            <q-icon name="person" class="q-mr-xs" />
            Sobre mí
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: activeSection === 'projects' }"
            @click="scrollToSection('projects')"
          >
            <q-icon name="code" class="q-mr-xs" />
            proyectos
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: activeSection === 'education' }"
            @click="scrollToSection('education')"
          >
            <q-icon name="school" class="q-mr-xs" />
            educación
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: activeSection === 'contact' }"
            @click="scrollToSection('contact')"
          >
            <q-icon name="mail" class="q-mr-xs" />
            contacto
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="hack-page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const logoURL = `https://${import.meta.env.VITE_IMG_URL}/imagenes/img/logo.jpg`;
const activeSection = ref('home');

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 70;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

const handleScroll = () => {
  const sections = ['home', 'about', 'projects', 'education', 'contact'];
  const scrollPosition = window.scrollY + 100;

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
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
  padding: 0 2rem;
  min-height: 70px;
}

.hack-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #00ff88;
    transform: scale(1.05);
  }

  .brand-logo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.6);
    }
  }

  .brand-icon {
    font-size: 1.5rem;
    color: #00ff88;
  }

  .brand-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.1rem;
    font-weight: 500;
    color: #ffffff;
  }
}

.hack-nav {
  display: flex;
  gap: 0.5rem;

  .nav-btn {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    font-weight: 400;
    color: #8b949e;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    text-transform: lowercase;

    &:hover {
      color: #00ff88;
      background: rgba(0, 255, 136, 0.1);
    }

    &.active {
      color: #00ff88;
      background: rgba(0, 255, 136, 0.15);
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }

    .q-icon {
      font-size: 1rem;
    }
  }
}

.hack-page-container {
  background: transparent;
}

// Responsive
@media (max-width: 768px) {
  .hack-toolbar {
    padding: 0 1rem;
  }

  .hack-nav {
    gap: 0.25rem;

    .nav-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }
  }

  .brand-text {
    display: none;
  }
}
</style>

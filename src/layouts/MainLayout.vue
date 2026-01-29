<template>
  <q-layout view="lHh Rpr LFf" class="hack-layout">
    <q-header class="hack-header">
      <q-toolbar class="hack-toolbar">
        <!-- Logo/Brand -->
        <div class="hack-brand" @click="$router.push('/')">
          <q-icon name="terminal" class="brand-icon" />
          <span class="brand-text">menfroyt-dev@james:~$</span>
        </div>

        <!-- Spacer -->
        <q-space />

        <!-- Navigation -->
        <div class="hack-nav">
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: $route.path === '/' }"
            @click="$router.push('/')"
          >
            <q-icon name="home" class="q-mr-xs" />
            home
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: $route.path === '/about' }"
            @click="$router.push('/about')"
          >
            <q-icon name="person" class="q-mr-xs" />
            Sobre mí
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: $route.path === '/projects' }"
            @click="$router.push('/projects')"
          >
            <q-icon name="code" class="q-mr-xs" />
            proyectos
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: $route.path === '/education' }"
            @click="$router.push('/education')"
          >
            <q-icon name="school" class="q-mr-xs" />
            educación
          </q-btn>
          <q-btn
            flat
            class="nav-btn"
            :class="{ active: $route.path === '/contact' }"
            @click="$router.push('/contact')"
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
// No need for additional logic
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

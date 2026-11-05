<template>
  <main class="not-found">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="not-found__title">{{ t('notFound.title') }}</h1>
    <p class="not-found__text">{{ t('notFound.text') }}</p>
    <router-link to="/" class="hack-button primary not-found__cta">
      <q-icon name="home" /> {{ t('notFound.cta') }}
    </router-link>
  </main>
</template>

<script setup lang="ts">
import { useLanguage } from 'src/composables/useLanguage';

const { t } = useLanguage();
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 2rem 1.5rem;
  text-align: center;
  background: #0d1117;
}

.not-found__code {
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(5rem, 22vw, 11rem);
  font-weight: 900;
  line-height: 1;
  color: $hack-green;
  text-shadow: 0 0 28px rgba(4, 249, 30, 0.45);
}

.not-found__title {
  margin: 1rem 0 0.5rem;
  font-size: clamp(1.4rem, 3.4vw, 2rem);
  color: #fff;
}

.not-found__text {
  max-width: 28rem;
  margin: 0 0 2rem;
}

.not-found__cta {
  text-decoration: none;
}
</style>

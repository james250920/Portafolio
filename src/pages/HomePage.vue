<template>
  <q-page class="home-page">
    <!-- Matrix Background Effect -->
    <MatrixBackground />
    <Transition v-if="crowTreeMounted" name="crow-scene" appear @after-leave="finishCrowTreeExit">
      <CrowTree v-show="showCrowTree" floating />
    </Transition>

    <!-- Floating Back to Top Button -->
    <Transition name="back-top">
      <button v-if="showBackToTop" class="floating-back-top" @click="scrollToTop">
        <q-icon name="keyboard_arrow_up" size="22px" />
        <span class="back-top-label">{{ t('hero.top') }}</span>
      </button>
    </Transition>

    <!-- Home Section -->
    <section id="home" class="hero-section">
      <img :src="bannerURL" alt="" class="hero-banner" />

      <div class="hero-overlay">
        <div class="hero-main">
          <h1 class="hero-name">
            <span class="hero-first">Menfroyt</span>
            <span class="hero-last">James Mendoza</span>
          </h1>
          <p class="hero-role">
            <span class="sr-only">{{ roles.join(' / ') }}</span>
            <span aria-hidden="true"
              ><span v-for="(c, i) in roleChars" :key="i" :class="{ scrambled: c.scrambled }">{{
                c.char
              }}</span></span
            >
          </p>
          <p class="hero-tagline">
            {{ t('hero.tagline1') }} <span>·</span> {{ t('hero.tagline2') }} <span>·</span>
            {{ t('hero.tagline3') }}
          </p>

          <div class="hero-cta">
            <button class="hack-button primary" @click="scrollToSection('projects')">
              <q-icon name="folder_open" />
              {{ t('hero.cta.projects') }}
            </button>
            <button class="hack-button secondary" @click="scrollToSection('contact')">
              <q-icon name="mail" />
              {{ t('hero.cta.contact') }}
            </button>
          </div>

          <div class="hero-tech">
            <ul class="tech-track">
              <!-- Rendered twice so the loop is seamless; the copy is hidden from screen readers -->
              <li
                v-for="(tech, i) in [...heroTech, ...heroTech]"
                :key="i"
                class="tech-item"
                :aria-hidden="i >= heroTech.length"
              >
                <img :src="tech.icon" :alt="tech.name" class="tech-icon" />
                <span class="tech-name">{{ tech.name }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="hero-terminal" aria-hidden="true">
          <div class="hero-terminal-header">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="hero-terminal-body">
            <div class="cmd">whoami</div>
            <div class="out">James Mendoza</div>
            <div class="cmd">cat status</div>
            <div class="out"><span class="online">●</span> {{ t('hero.term.status') }}</div>
            <div class="cmd">cat location</div>
            <div class="out">{{ t('hero.term.location') }}</div>
            <div class="cmd">ls stack/</div>
            <div class="out">{{ heroTech.length }} tools</div>
            <div class="prompt">menfroyt:~$ <span class="cursor-blink">▍</span></div>
          </div>
        </div>

        <ul class="hero-areas">
          <li v-for="area in heroAreas" :key="area.key" class="area-item">
            <q-icon :name="area.icon" class="area-icon" />
            <span>{{ t(area.key) }}</span>
          </li>
        </ul>
      </div>

      <button class="hero-scroll" :aria-label="t('hero.scroll')" @click="scrollToSection('about')">
        <q-icon name="keyboard_arrow_down" />
      </button>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
      <AboutPage />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <ProjectsPage />
    </section>

    <div ref="crowSceneRegion">
      <!-- Education Section -->
      <section id="education" class="education-section">
        <EducationPage />
      </section>

      <!-- Contact Section -->
      <section id="contact" class="contact-section">
        <ContactPage />
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMeta } from 'quasar';
import MatrixBackground from '../components/MatrixBackground.vue';
import CrowTree from '../components/CrowTree.vue';
import { useLanguage } from 'src/composables/useLanguage';
import { useTextScramble } from 'src/composables/useTextScramble';
import AboutPage from './AboutPage.vue';
import ProjectsPage from './ProjectsPage.vue';
import EducationPage from './EducationPage.vue';
import ContactPage from './ContactPage.vue';

const crowSceneRegion = ref<HTMLElement>();
const showCrowTree = ref(false);
const crowTreeMounted = ref(false);
let crowSceneObserver: IntersectionObserver | undefined;

const finishCrowTreeExit = () => {
  if (!showCrowTree.value) crowTreeMounted.value = false;
};

onMounted(() => {
  crowSceneObserver = new IntersectionObserver(([entry]) => {
    showCrowTree.value = entry?.isIntersecting ?? false;
    if (showCrowTree.value) crowTreeMounted.value = true;
  });
  if (crowSceneRegion.value) crowSceneObserver.observe(crowSceneRegion.value);
});
onUnmounted(() => crowSceneObserver?.disconnect());

const { t } = useLanguage();

const roles = computed(() => [t('hero.role'), t('hero.role2')]);
const { chars: roleChars } = useTextScramble(roles);

// SEO: Meta tags dinámicos para la página principal
useMeta({
  title: 'James Frank Mendoza Rios | Desarrollador Full Stack | Menfroyt',
  meta: {
    description: {
      name: 'description',
      content:
        'James Frank Mendoza Rios - Desarrollador Full Stack especializado en Angular, .NET y FastAPI. Aplicaciones web y móviles, cloud en AWS y Azure, y testing automatizado.',
    },
    ogTitle: {
      property: 'og:title',
      content: 'James Frank Mendoza Rios | Desarrollador Full Stack',
    },
    ogDescription: {
      property: 'og:description',
      content:
        'Desarrollador Full Stack especializado en Angular, .NET y FastAPI. Web, móvil, cloud y QA.',
    },
    ogUrl: {
      property: 'og:url',
      content: 'https://portafolio.menfroyt-dev.com/',
    },
  },
  link: {
    canonical: {
      rel: 'canonical',
      href: 'https://portafolio.menfroyt-dev.com/',
    },
  },
});

const bannerURL = `https://${import.meta.env.VITE_IMG_URL}/imagenes/img/banner-1920x1080.webp`;

const heroTech = [
  { name: 'LINUX', label: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
  { name: '.NET', label: '.NET', icon: 'https://cdn.simpleicons.org/dotnet/8C6CFF' },
  { name: 'PYTHON', label: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'UBUNTU', label: 'Ubuntu', icon: 'https://cdn.simpleicons.org/ubuntu/E95420' },
  { name: 'FEDORA', label: 'Fedora', icon: 'https://cdn.simpleicons.org/fedora/51A2DA' },
  { name: 'DOCKER', label: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'SPARK', label: 'Spark', icon: 'https://cdn.simpleicons.org/apachespark/E25A1C' },
  { name: 'HADOOP', label: 'Hadoop', icon: 'https://cdn.simpleicons.org/apachehadoop/66CCFF' },
];

const heroAreas = [
  { key: 'hero.area.backend', icon: 'dns' },
  { key: 'hero.area.automation', icon: 'settings' },
  { key: 'hero.area.security', icon: 'shield' },
  { key: 'hero.area.data', icon: 'storage' },
];

// Back to top
const showBackToTop = ref(false);

const handleScrollTop = () => {
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.documentElement.scrollHeight;
  showBackToTop.value = scrolled >= total - 300;
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const headerOffset = 56;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => window.addEventListener('scroll', handleScrollTop));
onUnmounted(() => window.removeEventListener('scroll', handleScrollTop));
</script>

<style lang="scss" scoped>
.crow-scene-enter-active {
  transition: opacity 1.8s ease-in-out;
}

.crow-scene-leave-active {
  transition: opacity 1.2s ease-in-out;
}

.crow-scene-enter-from,
.crow-scene-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .crow-scene-enter-active,
  .crow-scene-leave-active {
    transition: none;
  }
}

.home-page {
  min-height: 90vh;
  background: #0d1117;
  position: relative;
  overflow-x: hidden;
}

// All sections need higher z-index than background
section {
  position: relative;
  z-index: 1;
}

// Home Section
.hero-section {
  height: calc(100vh - 56px);
  height: calc(100svh - 56px);
  overflow: hidden;
  background: #0d1117;

  .hero-banner {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    // Keep the penguin in frame when narrower screens crop the sides
    object-position: 30% 50%;
  }
}

// Content laid over the banner, right of the penguin
.hero-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 29% 1fr auto;
  grid-template-areas: '. main terminal';
  align-items: center;
  gap: 2rem;
  padding: 2rem clamp(1rem, 3vw, 3rem) 1.5rem;
}

.hero-main {
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 0;
}

.hero-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  line-height: 1;
}

.hero-first {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 4.2vw, 5rem);
  font-weight: 900;
  white-space: nowrap;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.02em;
  text-shadow:
    0 4px 18px rgba(0, 0, 0, 0.85),
    0 0 28px rgba(255, 255, 255, 0.15);
  // Opens space above the second line without shifting the rest of the layout
  transform: translateY(-0.75rem);
}

.hero-last {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.4rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(1.3rem, 2.6vw, 2.9rem);
  font-weight: 400;
  text-transform: uppercase;
  color: $hack-green;
  letter-spacing: 0.02em;
  text-shadow: 0 0 22px rgba(4, 249, 30, 0.55);

  &::before,
  &::after {
    content: '';
    width: clamp(1.5rem, 4vw, 4rem);
    height: 4px;
    border-radius: 2px;
    background: $hack-green;
    box-shadow: 0 0 12px rgba(4, 249, 30, 0.7);
  }
}

.hero-role {
  margin: 0.75rem 0 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.9rem, 1.4vw, 1.3rem);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: clamp(5px, 0.45vw, 8px);
  white-space: pre;
  color: #e6edf3;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);

  // Glyphs shown mid-decode
  .scrambled {
    color: $hack-green;
    font-weight: 500;
    text-shadow: 0 0 10px rgba(4, 249, 30, 0.8);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.hero-tagline {
  margin: 0.75rem 0 0;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(4, 249, 30, 0.5);
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  font-style: italic;
  color: $hack-green;
  letter-spacing: 0.08em;

  span {
    margin: 0 0.5rem;
    color: #e6edf3;
  }
}

.hero-tech {
  width: min(100%, 34rem);
  margin-top: clamp(1.75rem, 5vh, 4rem);
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);

  .tech-track {
    display: flex;
    width: max-content;
    margin: 0;
    padding: 0;
    list-style: none;
    animation: tech-scroll 28s linear infinite;
  }

  &:hover .tech-track {
    animation-play-state: paused;
  }

  .tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    min-width: 4.5rem;
    padding: 0 clamp(0.6rem, 1vw, 1.2rem);
    // Every item carries its own divider so both halves are the same width
    border-right: 1px solid rgba(4, 249, 30, 0.35);
  }

  .tech-icon {
    width: clamp(1.6rem, 2.4vw, 2.8rem);
    height: clamp(1.6rem, 2.4vw, 2.8rem);
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7));
  }

  .tech-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: #e6edf3;
  }
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-top: 1.5rem;
}

.hero-scroll {
  position: absolute;
  bottom: 0.75rem;
  left: 0;
  right: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-inline: auto;
  padding: 0;
  border: none;
  background: none;
  color: $hack-green;
  font-size: 1.8rem;
  cursor: pointer;
  animation: scroll-bob 2s ease-in-out infinite;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
    border-radius: 50%;
  }
}

@keyframes scroll-bob {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}

@keyframes tech-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-tech {
    mask-image: none;

    .tech-track {
      flex-wrap: wrap;
      justify-content: center;
      width: auto;
      animation: none;
    }

    .tech-item[aria-hidden='true'] {
      display: none;
    }
  }

  .hero-scroll {
    animation: none;
  }
}

.hero-terminal {
  grid-area: terminal;
  width: clamp(10rem, 13vw, 14rem);
  background: rgba(13, 17, 23, 0.82);
  border: 1px solid rgba(4, 249, 30, 0.55);
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(4, 249, 30, 0.25);
  backdrop-filter: blur(4px);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: #e6edf3;

  .hero-terminal-header {
    display: flex;
    gap: 0.35rem;
    padding: 0.5rem 0.7rem;
    border-bottom: 1px solid rgba(4, 249, 30, 0.3);

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: $hack-green;
    }
  }

  .hero-terminal-body {
    padding: 0.6rem 0.8rem 0.8rem;
    line-height: 1.6;

    .cmd::before {
      content: '$ ';
      color: $hack-green;
    }

    .out {
      margin-bottom: 0.35rem;
      padding-left: 1rem;
      color: $hack-green;
    }

    .online {
      text-shadow: 0 0 8px $hack-green;
    }

    .prompt {
      margin-top: 0.5rem;
      color: #8b949e;
    }
  }
}

// Pinned to the bottom, outside the grid, so it doesn't push the centered content up
.hero-areas {
  position: absolute;
  bottom: clamp(3.5rem, 8vh, 5.5rem);
  left: 0;
  right: 0;
  width: fit-content;
  max-width: calc(100% - 2rem);
  margin-inline: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 0.65rem 1rem;
  list-style: none;
  background: rgba(13, 17, 23, 0.7);
  border: 1px solid rgba(4, 249, 30, 0.35);
  border-radius: 8px;
  backdrop-filter: blur(4px);

  .area-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.2rem clamp(0.8rem, 2vw, 2rem);
    font-size: 0.88rem;
    white-space: nowrap;
    color: #e6edf3;

    & + .area-item {
      border-left: 1px solid rgba(4, 249, 30, 0.45);
    }
  }

  .area-icon {
    font-size: 1.3rem;
    color: $hack-green;
  }
}

@media (max-width: 1024px) {
  .hero-overlay {
    grid-template-columns: 26% 1fr;
    grid-template-areas: '. main';
  }

  .hero-terminal {
    display: none;
  }
}

@media (max-width: 768px) {
  // Content sits over the penguin here, so darken the banner for legibility
  .hero-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(13, 17, 23, 0.55);
  }

  .hero-overlay {
    z-index: 1;
    grid-template-columns: 1fr;
    grid-template-areas: 'main';
    padding: 1.5rem 1rem 1rem;
  }

  .hero-role {
    letter-spacing: 5px;
  }

  .hero-scroll {
    display: none;
  }

  .hero-tech {
    margin-top: 2rem;
  }

  .hero-areas {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0.5rem;
    bottom: 2.5rem;
    width: auto;
    margin-inline: 1rem;
    max-width: none;

    .area-item {
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;

      & + .area-item {
        border-left: none;
      }
    }
  }
}

// Section Containers - Remove padding from child pages
.about-section,
.projects-section,
.education-section,
.contact-section {
  :deep(.q-page) {
    background: transparent;
  }
}

// Floating Back to Top Button
.floating-back-top {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: rgba(13, 17, 23, 0.92);
  border: 2px solid $hack-green;
  color: $hack-green;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 0 16px rgba(4, 249, 30, 0.25);

  &:hover {
    background: $hack-green;
    color: #000;
    box-shadow: 0 0 28px rgba(4, 249, 30, 0.55);
    transform: translateY(-3px);

    .q-icon {
      color: #000;
    }
  }

  .back-top-label {
    line-height: 1;
  }
}

// Transition
.back-top-enter-active,
.back-top-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

// Responsive - Back to top
@media (max-width: 768px) {
  .floating-back-top {
    bottom: 16px;
    left: 16px;
    padding: 6px 10px;
    font-size: 0.6rem;
  }
}
</style>

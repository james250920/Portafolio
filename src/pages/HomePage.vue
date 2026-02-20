<template>
  <q-page class="home-page">
    <!-- Matrix Background Effect -->
    <MatrixBackground />

    <!-- Floating Button to Services -->
    <router-link to="/services" class="floating-services-btn">
      <div class="btn-content">
        <q-icon name="code" size="22px" />
      </div>
      <div class="btn-ring"></div>
      <div class="btn-ring delay"></div>
      <span class="btn-tooltip">Mis Servicios</span>
    </router-link>

    <!-- Floating Back to Top Button -->
    <Transition name="back-top">
      <button v-if="showBackToTop" class="floating-back-top" @click="scrollToTop">
        <q-icon name="keyboard_arrow_up" size="22px" />
        <span class="back-top-label">Inicio</span>
      </button>
    </Transition>

    <!-- Home Section -->
    <section id="home" class="hero-section">
      <div class="container">
        <div class="hack-grid cols-2">
          <!-- Terminal interactivo -->
          <div class="terminal">
            <div class="terminal-header">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
              <span class="terminal-title">~/portfalio/james</span>
            </div>
            <div class="terminal-content">
              <div class="terminal-line">whoami</div>
              <div class="output">James Mendoza</div>
              <div class="terminal-line">cat skills.txt</div>
              <div class="output">
                <div class="skill-line">> Frontend: Quasar, Jetpack Compose, Angular</div>
                <div class="skill-line">> Backend: .Net, FastApi, Express</div>
                <div class="skill-line">> Mobile: Kotlin, Flutter</div>
                <div class="skill-line">> QA: K6, Nunit, Appium, Cypress, Selenium</div>
                <div class="skill-line">> Database: MongoDB, PostgreSQL, MySQL, SQLServer</div>
              </div>
              <div class="terminal-line">status</div>
              <div class="output">
                <span class="text-hack-green">● Online</span> -
                <span class="text-hack-blue">Listo para nuevos desafíos</span>
              </div>
              <div class="terminal-line prompt">
                <span>DevMenfroyt@james:~$ </span>
                <span class="cursor-blink">|</span>
              </div>
            </div>
          </div>

          <!-- Profile Image -->
          <div class="profile-section">
            <div class="profile-image-container">
              <img :src="ImgURL" alt="James Mendoza" class="profile-image" />
              <div class="status-indicator">
                <div class="status-dot"></div>
                <span class="status-text">ONLINE</span>
              </div>
              <div class="image-overlay">
                <h1 class="name">{{ name }}</h1>
                <h2 class="title">{{ title }}</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="hero-cta">
          <button class="contact-cta-btn" @click="scrollToContact">
            <q-icon name="mail" />
            <span class="btn-text">Contactar</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
      <AboutPage />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <ProjectsPage />
    </section>

    <!-- Education Section -->
    <section id="education" class="education-section">
      <EducationPage />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <ContactPage />
    </section>

    <!-- Skills Preview -->
    <section class="skills-preview">
      <div class="container">
        <h4 class="section-title text-center">Stack Portafolio</h4>
        <div class="tech-stack">
          <div v-for="tech in techStack" :key="tech.name" class="tech-item">
            <img :src="tech.icon" :alt="tech.name" class="tech-icon" />
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import MatrixBackground from '../components/MatrixBackground.vue';
import AboutPage from './AboutPage.vue';
import ProjectsPage from './ProjectsPage.vue';
import EducationPage from './EducationPage.vue';
import ContactPage from './ContactPage.vue';

const ImgURL = `https://${import.meta.env.VITE_IMG_URL}/imagenes/img/matrix.jpeg`;
const name = ref('James Mendoza');
const title = ref('Desarrollador Full Stack');

// Back to top
const showBackToTop = ref(false);

const handleScrollTop = () => {
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.documentElement.scrollHeight;
  showBackToTop.value = scrolled >= total - 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => window.addEventListener('scroll', handleScrollTop));
onUnmounted(() => window.removeEventListener('scroll', handleScrollTop));

const scrollToContact = () => {
  const element = document.getElementById('contact');
  if (element) {
    const headerOffset = 56;
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

const techStack = ref([
  { name: 'Quasar', icon: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', icon: 'https://www.cesaralexander.dev/github-mark-white.svg' },
]);
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 3rem 0;
}

.hero-cta {
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .contact-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 2px solid $hack-green;
    color: $hack-green;
    padding: 0.65rem 1.8rem;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: $hack-green;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
      z-index: 0;
    }

    &:hover::before {
      transform: scaleX(1);
    }

    &:hover {
      color: #000;
      box-shadow: 0 0 24px rgba(0, 255, 136, 0.45);

      .q-icon {
        color: #000;
      }

      .btn-arrow {
        transform: translateX(4px);
      }
    }

    .q-icon,
    .btn-text,
    .btn-arrow {
      position: relative;
      z-index: 1;
    }

    .btn-arrow {
      transition: transform 0.3s ease;
      font-style: normal;
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.terminal {
  height: fit-content;

  .terminal-title {
    color: $hack-gray;
    font-size: 0.8rem;
    margin-left: 1rem;
  }

  .terminal-content {
    .terminal-line {
      margin: 0.5rem 0;
      color: $hack-green;
      font-weight: 500;
    }

    .output {
      color: $hack-white;
      margin: 0.25rem 0 1rem 2rem;

      .skill-line {
        margin: 0.2rem 0;
        color: $hack-gray;
      }
    }

    .prompt {
      margin-top: 2rem;
      display: flex;
      align-items: center;
    }
  }
}

.profile-section {
  display: flex;
  align-items: center;

  .profile-image-container {
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid rgba(0, 255, 136, 0.272);
    box-shadow:
      0 0 30px rgba(0, 255, 136, 0.1),
      0 8px 24px rgba(0, 0, 0, 0.4);
    transition: all 0.4s ease;
    background: linear-gradient(135deg, rgba(13, 17, 23, 0.8), rgba(22, 27, 34, 0.6));

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(
        45deg,
        rgba(0, 255, 136, 0.1),
        rgba(0, 200, 255, 0.1),
        rgba(0, 255, 136, 0.1)
      );
      border-radius: 12px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    &:hover {
      border-color: rgba(0, 255, 136, 0.6);
      box-shadow:
        0 0 40px rgba(0, 255, 136, 0.3),
        0 12px 32px rgba(0, 0, 0, 0.5);
      transform: translateY(-4px);

      &::before {
        opacity: 1;
      }

      .profile-image {
        transform: scale(1.02);
        filter: brightness(1.1);
        animation: glitch 0.5s ease-in-out;
      }

      .image-overlay {
        opacity: 1;
        background: linear-gradient(
          to top,
          rgba(13, 17, 23, 0.98),
          rgba(13, 17, 23, 0.7) 50%,
          transparent
        );
      }
    }

    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      min-height: 350px;
      transition: all 0.3s ease;
      filter: brightness(0.9) contrast(1.06);
      position: relative;
      animation: glitch 1.5s infinite;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        opacity: 0;
      }
    }

    &:hover {
      .profile-image {
        animation: glitch 0.4s ease-in-out;
      }
    }

    .status-indicator {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(13, 17, 23, 0.9);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      border: 1px solid rgba(0, 255, 136, 0.3);
      backdrop-filter: blur(10px);
      z-index: 10;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

      .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $hack-green;
        animation: pulse 2s ease-in-out infinite;
        box-shadow: 0 0 19px $hack-green;
      }

      .status-text {
        color: $hack-green;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        to top,
        rgba(13, 17, 23, 0.95),
        rgba(13, 17, 23, 0.5) 40%,
        transparent
      );
      padding: 1.8rem 1.5rem;
      opacity: 0.95;
      transition: all 0.4s ease;
      backdrop-filter: blur(2px);

      .name {
        color: $hack-white;
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        text-shadow:
          0 2px 12px rgba(0, 0, 0, 0.9),
          0 0 20px rgba(0, 255, 136, 0.3);
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: -0.5px;
      }

      .title {
        color: $hack-green;
        font-size: 1.05rem;
        font-weight: 500;
        text-shadow:
          0 2px 12px rgba(0, 0, 0, 0.9),
          0 0 15px rgba(0, 255, 136, 0.5);
        font-family: 'JetBrains Mono', monospace;
      }
    }
  }
}

.avatar-container {
  margin-bottom: 2rem;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid $hack-green;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem auto;
    background: rgba(0, 255, 136, 0.1);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: $hack-green;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $hack-green;
      animation: glow 2s ease-in-out infinite alternate;
    }
  }
}

.name {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: $hack-white;
}

.title {
  color: $hack-blue;
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.bio {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: $hack-gray;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  .stat-item {
    text-align: center;

    .stat-number {
      font-size: 1.6rem;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      display: block;
    }

    .stat-label {
      font-size: 0.8rem;
      color: $hack-gray;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}

// Skills Preview Section
.skills-preview {
  padding: 1.5rem 0;
  background: rgba(22, 27, 34, 0.5);

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    font-family: 'Space Grotesk', sans-serif;
    color: $hack-white;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;

    .tech-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: rgba(13, 17, 23, 0.5);
      border: 1px solid $hack-border;
      min-width: 85px;

      &:hover {
        background: rgba(0, 255, 136, 0.1);
        transform: translateY(-4px);
        border-color: $hack-green;
      }

      .tech-icon {
        width: 2.2rem;
        height: 2.2rem;
        object-fit: contain;
      }

      span {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        color: $hack-white;
      }
    }
  }
}

.text-center {
  text-align: center;
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

// Responsive
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
    min-height: auto;

    .hack-grid {
      grid-template-columns: 1fr !important;
      gap: 2rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .terminal {
    .terminal-title {
      font-size: 0.7rem;
    }

    .terminal-content {
      .terminal-line {
        font-size: 0.9rem;
      }

      .output {
        font-size: 0.85rem;
        margin-left: 1rem;

        .skill-line {
          font-size: 0.8rem;
          margin: 0.3rem 0;
        }
      }

      .prompt {
        font-size: 0.85rem;
        margin-top: 1.5rem;
      }
    }
  }

  .profile-section {
    .profile-image-container {
      .profile-image {
        min-height: 260px !important;
      }

      .status-indicator {
        bottom: 12px;
        right: 12px;
        padding: 0.3rem 0.6rem;

        .status-dot {
          width: 7px;
          height: 7px;
        }

        .status-text {
          font-size: 0.68rem;
        }
      }

      .image-overlay {
        padding: 1.2rem 1rem !important;

        .name {
          font-size: 1.4rem !important;
          margin-bottom: 0.2rem;
        }

        .title {
          font-size: 0.88rem !important;
        }
      }
    }
  }

  .skills-preview {
    padding: 2rem 0;

    .section-title {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
    }

    .tech-stack {
      gap: 0.75rem;

      .tech-item {
        padding: 0.75rem;
        min-width: 70px;

        .tech-icon {
          width: 1.8rem;
          height: 1.8rem;
        }

        span {
          font-size: 0.68rem;
        }
      }
    }
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.8rem;

    .stat-item {
      .stat-number {
        font-size: 1.5rem;
      }

      .stat-label {
        font-size: 0.75rem;
      }
    }
  }
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px $hack-green;
  }
  to {
    box-shadow: 0 0 15px $hack-green;
  }
}

@keyframes glitch {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 1;
  }
  91% {
    transform: translate(-2px, 2px);
    opacity: 0.8;
  }
  92% {
    transform: translate(2px, -2px);
    opacity: 0.9;
  }
  93% {
    transform: translate(-1px, 1px);
    opacity: 0.85;
  }
  94% {
    transform: translate(1px, -1px);
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 19px $hack-green;
  }
  50% {
    opacity: 0.9;
    box-shadow: 0 0 29px $hack-green;
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
  box-shadow: 0 0 16px rgba(0, 255, 136, 0.25);

  &:hover {
    background: $hack-green;
    color: #000;
    box-shadow: 0 0 28px rgba(0, 255, 136, 0.55);
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

// Floating Services Button
.floating-services-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff88, #00cc6a);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow:
    0 0 20px rgba(0, 255, 136, 0.5),
    0 0 40px rgba(0, 255, 136, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow:
      0 0 30px rgba(0, 255, 136, 0.7),
      0 0 60px rgba(0, 255, 136, 0.5),
      0 6px 20px rgba(0, 0, 0, 0.4);

    .btn-tooltip {
      opacity: 1;
      transform: translateX(-10px);
    }
  }

  .btn-content {
    position: relative;
    z-index: 2;
    color: #0d1117;
  }

  .btn-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(0, 255, 136, 0.6);
    animation: ring-pulse 2s infinite;

    &.delay {
      animation-delay: 1s;
    }
  }

  .btn-tooltip {
    position: absolute;
    right: 70px;
    background: rgba(13, 17, 23, 0.95);
    color: #00ff88;
    padding: 8px 16px;
    border-radius: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 255, 136, 0.4);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.2);
  }
}

@keyframes ring-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

// Responsive - Floating Button
@media (max-width: 768px) {
  .floating-back-top {
    bottom: 16px;
    left: 16px;
    padding: 6px 10px;
    font-size: 0.6rem;
  }

  .floating-services-btn {
    bottom: 16px;
    right: 16px;
    width: 42px;
    height: 42px;

    .btn-content {
      .q-icon {
        font-size: 22px !important;
      }
    }

    .btn-tooltip {
      display: none;
    }
  }
}

@media (max-width: 480px) {
  .floating-services-btn {
    bottom: 12px;
    right: 12px;
    width: 38px;
    height: 38px;
    box-shadow:
      0 0 15px rgba(0, 255, 136, 0.4),
      0 0 25px rgba(0, 255, 136, 0.2),
      0 3px 10px rgba(0, 0, 0, 0.3);

    .btn-content {
      .q-icon {
        font-size: 18px !important;
      }
    }

    .btn-ring {
      border-width: 1px;
    }
  }
}
</style>

<template>
  <q-page class="home-page">
    <!-- Matrix Background Effect -->
    <MatrixBackground />

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
                <span>menfroyt-dev@james:~$ </span>
                <span class="cursor-blink">|</span>
              </div>
            </div>
          </div>

          <!-- Profile Card -->
          <div class="profile-section">
            <div class="hack-card profile-card">
              <div class="avatar-container">
                <div class="avatar">
                  <q-icon name="person" size="4rem" class="text-hack-green" />
                </div>
                <div class="status-indicator">
                  <div class="status-dot"></div>
                  <span>Disponible</span>
                </div>
              </div>

              <h1 class="name">James Mendoza</h1>
              <h2 class="title">Junior Full Stack Developer</h2>

              <p class="bio">
                Estudiante de Ingeniería en TI enfocado en el desarrollo de software, con una
                mentalidad orientada a la calidad de software (QA) y la seguridad para crear
                soluciones robustas y eficientes.
              </p>

              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number text-hack-green">1+</div>
                  <div class="stat-label">Años</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number text-hack-blue">5+</div>
                  <div class="stat-label">Proyectos</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number text-hack-yellow">15+</div>
                  <div class="stat-label">Tecnologías</div>
                </div>
              </div>
            </div>
          </div>
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
        <h2 class="section-title text-center">Stack Tecnológico</h2>
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
import { ref } from 'vue';
import MatrixBackground from '../components/MatrixBackground.vue';
import AboutPage from './AboutPage.vue';
import ProjectsPage from './ProjectsPage.vue';
import EducationPage from './EducationPage.vue';
import ContactPage from './ContactPage.vue';

const techStack = ref([
  { name: 'Quasar', icon: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
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
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

  .profile-card {
    text-align: center;
    width: 100%;
  }
}

.avatar-container {
  margin-bottom: 2rem;

  .avatar {
    width: 120px;
    height: 120px;
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
  font-size: 2.5rem;
  color: $hack-white;
}

.title {
  color: $hack-blue;
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
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
      font-size: 2rem;
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
  padding: 4rem 0;
  background: rgba(22, 27, 34, 0.5);

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    font-family: 'Space Grotesk', sans-serif;
    color: $hack-white;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    .tech-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: rgba(13, 17, 23, 0.5);
      border: 1px solid $hack-border;
      min-width: 100px;

      &:hover {
        background: rgba(0, 255, 136, 0.1);
        transform: translateY(-4px);
        border-color: $hack-green;
      }

      .tech-icon {
        width: 3rem;
        height: 3rem;
        object-fit: contain;
      }

      span {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
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
      gap: 3rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .tech-stack {
    gap: 1rem;

    .tech-item {
      flex: 1 1 calc(50% - 0.5rem);
      min-width: 80px;
      padding: 1rem;

      .tech-icon {
        width: 2rem;
        height: 2rem;
      }

      span {
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
</style>

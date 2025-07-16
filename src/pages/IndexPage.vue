<template>
  <q-page class="index-page">
    <!-- Hero Section con Terminal -->
    <section class="hero-section">
      <div class="container">
        <div class="hack-grid cols-2">
          <!-- Terminal interactivo -->
          <div class="terminal">
            <div class="terminal-header">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
              <span class="terminal-title">~/portfolio/james</span>
            </div>
            <div class="terminal-content">
              <div class="terminal-line">whoami</div>
              <div class="output">{{ name }}</div>
              <div class="terminal-line">cat skills.txt</div>
              <div class="output">
                <div v-for="skill in skills" :key="skill" class="skill-line">> {{ skill }}</div>
              </div>
              <div class="terminal-line">status</div>
              <div class="output">
                <span class="text-hack-green">● Online</span> -
                <span class="text-hack-blue">Ready for new challenges</span>
              </div>
              <div class="terminal-line prompt">
                <span>james@dev:~$ </span>
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
                  <span>Available for work</span>
                </div>
              </div>

              <h1 class="name">{{ name }}</h1>
              <h2 class="title">{{ title }}</h2>

              <p class="bio">{{ bio }}</p>

              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number text-hack-green">{{ experience }}+</div>
                  <div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number text-hack-blue">{{ projects }}+</div>
                  <div class="stat-label">Projects</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number text-hack-yellow">{{ technologies }}+</div>
                  <div class="stat-label">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Access Section -->
    <section class="quick-access">
      <div class="container">
        <h2 class="section-title text-center">Quick Access</h2>
        <div class="hack-grid cols-3">
          <div class="hack-card access-card" @click="navigateTo('/about')">
            <q-icon name="person_outline" size="2rem" class="card-icon text-hack-blue" />
            <h3>About Me</h3>
            <p>Learn more about my background, skills, and experience in development.</p>
            <div class="card-arrow">
              <q-icon name="arrow_forward" />
            </div>
          </div>

          <div class="hack-card access-card" @click="navigateTo('/projects')">
            <q-icon name="code" size="2rem" class="card-icon text-hack-green" />
            <h3>Projects</h3>
            <p>Explore my latest projects and technical implementations.</p>
            <div class="card-arrow">
              <q-icon name="arrow_forward" />
            </div>
          </div>

          <div class="hack-card access-card" @click="navigateTo('/contact')">
            <q-icon name="mail_outline" size="2rem" class="card-icon text-hack-yellow" />
            <h3>Contact</h3>
            <p>Get in touch for collaboration opportunities and projects.</p>
            <div class="card-arrow">
              <q-icon name="arrow_forward" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Preview -->
    <section class="skills-preview">
      <div class="container">
        <h2 class="section-title text-center">Technology Stack</h2>
        <div class="tech-stack">
          <div v-for="tech in techStack" :key="tech.name" class="tech-item">
            <q-icon :name="tech.icon" size="2rem" :class="tech.color" />
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Data
const name = ref('James Rodriguez');
const title = ref('Junior Full Stack Developer');
const bio = ref(
  'Passionate about creating innovative solutions with clean, efficient code. Always learning new technologies and best practices.',
);
const experience = ref('2');
const projects = ref('15');
const technologies = ref('20');

const skills = ref([
  'Frontend: Vue.js, React, TypeScript',
  'Backend: Node.js, Python, Express',
  'Database: MongoDB, PostgreSQL',
  'Tools: Git, Docker, VS Code',
]);

const techStack = ref([
  { name: 'Vue.js', icon: 'code', color: 'text-hack-green' },
  { name: 'TypeScript', icon: 'integration_instructions', color: 'text-hack-blue' },
  { name: 'Node.js', icon: 'dns', color: 'text-hack-yellow' },
  { name: 'Python', icon: 'psychology', color: 'text-hack-green' },
  { name: 'Git', icon: 'source', color: 'text-hack-red' },
  { name: 'Docker', icon: 'container', color: 'text-hack-blue' },
]);

// Methods
const navigateTo = async (path: string) => {
  try {
    await router.push(path);
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

onMounted(() => {
  // Agregar animaciones de entrada
  const cards = document.querySelectorAll('.hack-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-slide-up');
    }, index * 100);
  });
});
</script>

<style lang="scss" scoped>
.index-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%);
}

.hero-section {
  padding: 4rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
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

.quick-access {
  padding: 4rem 0;

  .section-title {
    margin-bottom: 3rem;
    color: $hack-white;
  }

  .access-card {
    cursor: pointer;
    text-align: center;
    position: relative;
    overflow: hidden;

    .card-icon {
      margin-bottom: 1rem;
    }

    h3 {
      margin-bottom: 1rem;
      color: $hack-white;
    }

    p {
      margin-bottom: 1.5rem;
      color: $hack-gray;
    }

    .card-arrow {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      color: $hack-green;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }

    &:hover .card-arrow {
      transform: translateX(0);
    }
  }
}

.skills-preview {
  padding: 4rem 0;
  background: rgba(22, 27, 34, 0.5);

  .section-title {
    margin-bottom: 3rem;
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
      padding: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(0, 255, 136, 0.1);
        transform: translateY(-4px);
      }

      span {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        color: $hack-white;
      }
    }
  }
}

.text-center {
  text-align: center;
}

// Responsive
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;

    .hack-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tech-stack {
    gap: 1rem;

    .tech-item {
      flex: 1 1 calc(50% - 0.5rem);
      min-width: 120px;
    }
  }
}
</style>

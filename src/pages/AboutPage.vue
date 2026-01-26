<template>
  <q-page class="about-page">
    <!-- Header Section -->
    <section class="about-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title animate-slide-up">
            <q-icon name="person" class="text-hack-blue" /> About.me
          </h1>
          <p class="page-subtitle animate-fade-in">
            Estudiante de Ingeniería en TI enfocado en el desarrollo Web y Mobile, con una
            mentalidad orientada a la calidad de software (QA) y la seguridad para crear soluciones
            robustas y eficientes.
          </p>
        </div>
      </div>
    </section>

    <!-- Profile Section -->
    <section class="profile-section">
      <div class="container">
        <div class="hack-grid cols-2">
          <!-- Profile Info -->
          <div class="profile-info">
            <div class="hack-card profile-card">
              <div class="profile-avatar">
                <div class="avatar-container">
                  <q-icon name="account_circle" size="8rem" class="text-hack-green" />
                  <div class="status-ring">
                    <div class="status-dot active"></div>
                  </div>
                </div>
              </div>

              <div class="profile-details">
                <h2 class="profile-name">James Developer</h2>
                <h3 class="profile-title">Junior Full Stack Developer</h3>
                <p class="profile-bio">
                  Desarrollador en formación con {{ experience }}+ años de experiencia en el
                  desarrollo de aplicaciones web y móviles. Apasionado por crear soluciones
                  eficientes y seguras que impulsen el éxito de los proyectos.
                </p>

                <div class="profile-stats">
                  <div class="stat-item">
                    <span class="stat-number text-hack-green">{{ experience }}+</span>
                    <span class="stat-label">Años</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number text-hack-blue">{{ projects }}+</span>
                    <span class="stat-label">Proyectos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Terminal Journey -->
          <div class="terminal-journey">
            <div class="terminal">
              <div class="terminal-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
                <span class="terminal-title">~/about/journey.log</span>
              </div>
              <div class="terminal-content">
                <div class="terminal-line">cat career-timeline.txt</div>
                <div class="output">
                  <div
                    v-for="milestone in careerTimeline"
                    :key="milestone.year"
                    class="timeline-item"
                  >
                    <span class="timeline-year text-hack-green">[{{ milestone.year }}]</span>
                    <span class="timeline-event">{{ milestone.event }}</span>
                  </div>
                </div>
                <div class="terminal-line">whoami --current-focus</div>
                <div class="output">
                  <span class="text-hack-blue">● Desarrollo de aplicaciones web y móviles</span
                  ><br />
                  <span class="text-hack-yellow">● Aprendiendo tecnologías de vanguardia</span
                  ><br />
                  <span class="text-hack-purple">● Mejorando habilidades en QA y seguridad</span>
                </div>
                <div class="terminal-line prompt">
                  <span>menfroyt-dev@about:~$ </span>
                  <span class="cursor-blink">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
      <div class="container">
        <h2 class="section-title text-center">Skills</h2>

        <!-- Frontend Skills -->
        <div class="skill-category">
          <h3 class="category-title"><q-icon name="web" class="text-hack-blue" /> Frontend</h3>
          <div class="skills-grid">
            <div v-for="skill in frontendSkills" :key="skill.name" class="skill-card">
              <div class="hack-card skill-block">
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend Skills -->
        <div class="skill-category">
          <h3 class="category-title"><q-icon name="storage" class="text-hack-green" /> Backend</h3>
          <div class="skills-grid">
            <div v-for="skill in backendSkills" :key="skill.name" class="skill-card">
              <div class="hack-card skill-block">
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- QA Skills -->
        <div class="skill-category">
          <h3 class="category-title">
            <q-icon name="check_circle" class="text-hack-purple" /> QA & Testing
          </h3>
          <div class="skills-grid">
            <div v-for="skill in QAskills" :key="skill.name" class="skill-card">
              <div class="hack-card skill-block">
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Database Skills -->
        <div class="skill-category">
          <h3 class="category-title"><q-icon name="dns" class="text-hack-orange" /> Databases</h3>
          <div class="skills-grid">
            <div v-for="skill in DBskills" :key="skill.name" class="skill-card">
              <div class="hack-card skill-block">
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Skills -->
        <div class="skill-category">
          <h3 class="category-title">
            <q-icon name="smartphone" class="text-hack-teal" /> Mobile Development
          </h3>
          <div class="skills-grid">
            <div v-for="skill in MobileSkills" :key="skill.name" class="skill-card">
              <div class="hack-card skill-block">
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>



        <!-- Tools & DevOps -->
        <div class="skill-category">
          <h3 class="category-title">
            <q-icon name="build" class="text-hack-yellow" /> Tools & DevOps
          </h3>
          <div class="skills-grid">
            <div v-for="skill in toolsSkills" :key="skill.name" class="skill-card">
              <div class="hack-card skill-block">
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <div class="container">
        <h2 class="section-title text-center">Experiencia Profesional</h2>
        <div class="experience-timeline">
          <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
            <div class="experience-marker">
              <div class="marker-dot"></div>
              <div class="marker-line" v-if="index < experiences.length - 1"></div>
            </div>
            <div class="hack-card experience-card">
              <div class="experience-header">
                <h3 class="experience-title">{{ exp.title }}</h3>
                <div class="experience-company">{{ exp.company }}</div>
                <div class="experience-period">{{ exp.period }}</div>
              </div>
              <p class="experience-description">{{ exp.description }}</p>
              <div class="experience-tech">
                <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interests Section -->
    <section class="interests-section">
      <div class="container">
        <h2 class="section-title text-center">Más allá del código</h2>
        <div class="hack-grid cols-4">
          <div v-for="interest in interests" :key="interest.name" class="interest-item">
            <div class="hack-card interest-card">
              <q-icon :name="interest.icon" size="3rem" :class="interest.color" />
              <h4>{{ interest.name }}</h4>
              <p>{{ interest.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="hack-card cta-card">
          <h2 class="cta-title">Construyamos Algo Increíble Juntos</h2>
          <div class="cta-actions">
            <button class="hack-button primary" @click="$router.push('/contact')">
              <q-icon name="message" /> Contáctame
            </button>
            <button class="hack-button secondary" @click="$router.push('/projects')">
              <q-icon name="work" /> Ver Proyectos
            </button>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Data
const experience = ref(1);
const projects = ref(3);

const careerTimeline = ref([
  { year: '2020', event: 'Inició mi viaje en la programación' },
  { year: '2024', event: 'Desarrollador Full-Stack en prácticas' },
  { year: '2025', event: 'Actualización de habilidades y conocimientos' },
  { year: '2026', event: 'En proceso...' },
]);

const frontendSkills = ref([
  { name: 'Vue.js / Quasar' },
  { name: 'Angular' },
  { name: 'TypeScript' },
  { name: 'HTML5 / CSS3' },
  { name: 'Flask' },
  { name: 'JetPack Compose' },
]);

const backendSkills = ref([
  { name: 'FastAPI' },
  { name: '.Net' },
  { name: 'Express' },
  { name: 'REST APIs' },
  { name: 'Azure' },
  { name: 'AWS' },
]);

const QAskills = ref([
  { name: 'K6' },
  { name: 'Appium' },
  { name: 'Nunit' },
  { name: 'Selenium' },
  { name: 'Cypress' },
  { name: 'TestRail' },
  { name: 'Xray/Jira' },
]);

const DBskills = ref([
  { name: 'MySQL' },
  { name: 'PostgreSQL' },
  { name: 'MongoDB' },
  { name: 'SQLite' },
  { name: 'Firebase' },
]);

const MobileSkills = ref([
  { name: 'Kotlin' },
  { name: 'Flutter' },
  { name: 'KMP' },
]);



const toolsSkills = ref([
  { name: 'Git / GitHub' },
  { name: 'Docker' },
  { name: 'Podman' },
  { name: 'Ubuntu' },
  { name: 'Postman' },
]);

const experiences = ref([
  {
    title: 'Desarrollador Web - Prácticas',
    company: 'Corporación Evly',
    period: '2024 - 2025 (1 año)',
    description:
      'Implementé funcionalidades backend en .NET Core y PostgreSQL para aplicaciones internas y para la Municipalidad de Comas. Desarrollé componentes frontend con Angular, integrando diseños UX/UI y consumiendo APIs REST. Gestioné control de versiones con Git.',
    technologies: [
      'Angular',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Express',
      'Git',
      '.NET Core',
      'Azure',
    ],
  },
  {
    title: 'Área de Arquitectura TI - Prácticas',
    company: 'Aenza',
    period: '2025 - 2025 (3 meses)',
    description:
      'Recopilé y documenté información de los sistemas de la organización para facilitar la gobernanza de TI. Apoyé en la implementación de la metodología TIME para estandarizar procesos y mejorar la eficiencia operativa. Realicé validación de datos y análisis para la toma de decisiones técnicas.',
    technologies: ['Metodología TIME', 'Excel', 'Sass'],
  },
  {
    title: 'Operador Informático - Voluntariado',
    company: 'Pronabec',
    period: '2024 - 2024',
    description:
      'Examen Nacional de Preselección del concurso Beca de Excelencia Académica para Hijos de Docentes, convocatoria 2024.',
    technologies: ['Microsoft Office', 'QR lector'],
  },
]);

const interests = ref([
  {
    name: 'AI & ML',
    icon: 'psychology',
    color: 'text-hack-blue',
    description: 'Explorando aplicaciones de inteligencia artificial y Deep learning',
  },
  {
    name: 'Gaming',
    icon: 'sports_esports',
    color: 'text-hack-yellow',
    description: 'Relajándome con videojuegos y juegos de estrategia',
  },
  {
    name: 'Travel',
    icon: 'flight_takeoff',
    color: 'text-hack-green',
    description: 'Descubriendo nuevos lugares',
  },
]);
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Header Section
.about-header {
  padding: 4rem 0 2rem;
  text-align: center;

  .page-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: 'Space Grotesk', sans-serif;

    .q-icon {
      margin-right: 1rem;
    }
  }

  .page-subtitle {
    font-size: 1.2rem;
    color: #c9d1d9;
    max-width: 600px;
    margin: 0 auto;
  }
}

// Profile Section
.profile-section {
  padding: 3rem 0;

  .profile-card {
    text-align: center;

    .profile-avatar {
      margin-bottom: 2rem;

      .avatar-container {
        position: relative;
        display: inline-block;

        .status-ring {
          position: absolute;
          bottom: 1rem;
          right: 1rem;

          .status-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid #161b22;

            &.active {
              background: $hack-green;
              box-shadow: 0 0 15px rgba(0, 255, 136, 0.6);
            }
          }
        }
      }
    }

    .profile-name {
      color: $hack-white;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .profile-title {
      color: $hack-blue;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .profile-bio {
      color: #c9d1d9;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .profile-stats {
      display: flex;
      justify-content: space-around;
      gap: 2rem;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-label {
          color: #c9d1d9;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
      }
    }
  }

  .terminal-journey {
    .terminal {
      height: fit-content;

      .timeline-item {
        display: flex;
        gap: 0.5rem;
        margin: 0.5rem 0;

        .timeline-year {
          font-weight: 600;
          min-width: 60px;
        }

        .timeline-event {
          color: #c9d1d9;
        }
      }
    }
  }
}

// Skills Section
.skills-section {
  padding: 4rem 0;

  .section-title {
    color: $hack-blue;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .skill-category {
    margin-bottom: 3rem;

    .category-title {
      color: $hack-white;
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;

      .skill-card {
        .skill-block {
          padding: 1.2rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: default;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 255, 136, 0.2);
            border-color: $hack-green;
          }

          .skill-name {
            color: $hack-white;
            font-weight: 500;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

// Experience Section
.experience-section {
  padding: 4rem 0;

  .section-title {
    color: $hack-blue;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .experience-timeline {
    max-width: 800px;
    margin: 0 auto;

    .experience-item {
      display: flex;
      gap: 2rem;
      margin-bottom: 3rem;

      .experience-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1rem;

        .marker-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $hack-green;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
          z-index: 2;
        }

        .marker-line {
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, $hack-green, transparent);
          margin-top: 0.5rem;
        }
      }

      .experience-card {
        flex: 1;

        .experience-header {
          margin-bottom: 1rem;

          .experience-title {
            color: $hack-white;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .experience-company {
            color: $hack-blue;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .experience-period {
            color: $hack-green;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            margin-top: 0.5rem;
          }
        }

        .experience-description {
          color: #c9d1d9;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .experience-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .tech-tag {
            background: rgba(0, 255, 136, 0.1);
            color: $hack-green;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid rgba(0, 255, 136, 0.3);
          }
        }
      }
    }
  }
}

// Interests Section
.interests-section {
  padding: 4rem 0;

  .section-title {
    color: $hack-blue;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .interest-card {
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      border-color: $hack-green;
      box-shadow: 0 12px 40px rgba(0, 255, 136, 0.15);
    }

    .q-icon {
      margin-bottom: 1rem;
    }

    h4 {
      color: $hack-white;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      color: #c9d1d9;
      font-size: 0.9rem;
    }
  }
}

// CTA Section
.cta-section {
  padding: 4rem 0;

  .cta-card {
    text-align: center;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
    border: 1px solid $hack-green;

    .cta-title {
      color: $hack-white;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-description {
      color: #c9d1d9;
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;

      .hack-button {
        &.primary {
          border-color: $hack-green;
          color: $hack-green;

          &:hover {
            background: $hack-green;
            color: #000;
          }
        }

        &.secondary {
          border-color: $hack-blue;
          color: $hack-blue;

          &:hover {
            background: $hack-blue;
            color: #000;
          }
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .about-header {
    padding: 2rem 0 1rem;

    .page-title {
      font-size: 2.5rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .profile-stats {
    flex-direction: column;
    gap: 1rem !important;
  }

  .experience-item {
    flex-direction: column;
    gap: 1rem !important;

    .experience-marker {
      flex-direction: row;
      margin-top: 0 !important;

      .marker-line {
        width: 50px !important;
        height: 2px !important;
        margin-top: 0 !important;
        margin-left: 0.5rem;
      }
    }
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;

    .hack-button {
      width: 100%;
      max-width: 300px;
    }
  }
}
</style>

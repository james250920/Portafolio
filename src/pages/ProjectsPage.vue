<template>
  <q-page class="projects-page">
    <!-- Header Section -->
    <section class="projects-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title animate-slide-up">
            <q-icon name="code" class="text-hack-green" /> Proyectos.portafolio
          </h1>
          <p class="page-subtitle animate-fade-in">
            Una muestra de mis trabajos.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-controls">
          <div class="terminal-filter">
            <div class="terminal">
              <div class="terminal-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
                <span class="terminal-title">~/projects/filter</span>
              </div>
              <div class="terminal-content">
                <div class="terminal-line">ls --categories</div>
                <div class="output">
                  <div class="filter-options">
                    <button
                      v-for="category in categories"
                      :key="category"
                      @click="selectedCategory = category"
                      :class="['filter-btn', { active: selectedCategory === category }]"
                    >
                      {{ category }}
                    </button>
                  </div>
                </div>
                <div class="terminal-line">grep --tech="{{ selectedTech }}"</div>
                <div class="output">
                  <div class="tech-filter">
                    <q-select
                      v-model="selectedTech"
                      :options="techOptions"
                      outlined
                      dark
                      dense
                      class="tech-select"
                      placeholder="Filtrar por tecnología"
                      clearable
                    />
                  </div>
                </div>
                <div class="terminal-line prompt">
                  <span>menfroyt-dev@projects:~$ </span>
                  <span class="cursor-blink">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-grid-section">
      <div class="container">
        <div class="projects-grid">
          <div v-for="project in filteredProjects" :key="project.id" class="project-card-container">
            <div class="hack-card project-card" @click="openProjectModal(project)">
              <!-- Project Image -->
              <div class="project-image">
                <img :src="project.image" :alt="project.title" />
                <div class="project-overlay">
                  <div class="overlay-content">
                    <q-icon name="visibility" size="2rem" class="text-hack-white" />
                    <span>Ver Detalles</span>
                  </div>
                </div>
              </div>

              <!-- Project Info -->
              <div class="project-info">
                <div class="project-header">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <div class="project-status" :class="project.status">
                    <span class="status-dot"></span>
                    {{ project.status }}
                  </div>
                </div>

                <p class="project-description">{{ project.description }}</p>

                <div class="project-tech">
                  <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>

                <div class="project-actions">
                  <button
                    class="action-btn live"
                    @click.stop="openProject(project.liveUrl)"
                    v-if="project.liveUrl"
                  >
                    <q-icon name="launch" /> Demo en Vivo
                  </button>
                  <button
                    class="action-btn code"
                    @click.stop="openProject(project.githubUrl)"
                    v-if="project.githubUrl"
                  >
                    <q-icon name="code" /> Código Fuente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="load-more-section" v-if="hasMoreProjects">
          <button class="hack-button primary" @click="loadMoreProjects">
            <q-icon name="refresh" /> Cargar Más Proyectos
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Project Section -->
    <section class="featured-project" v-if="featuredProject">
      <div class="container">
        <h2 class="section-title text-center">Proyecto Destacado</h2>
        <div class="hack-card featured-card">
          <div class="hack-grid cols-2">
            <div class="featured-content">
              <h3 class="featured-title">{{ featuredProject.title }}</h3>
              <p class="featured-description">{{ featuredProject.fullDescription }}</p>

              <div class="featured-highlights">
                <h4>Características Clave:</h4>
                <ul>
                  <li v-for="feature in featuredProject.features" :key="feature">
                    <q-icon name="check_circle" class="text-hack-green" />
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <div class="featured-tech">
                <h4>Tecnologías Utilizadas:</h4>
                <div class="tech-grid">
                  <span
                    v-for="tech in featuredProject.technologies"
                    :key="tech"
                    class="tech-tag featured"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="featured-actions">
                <button class="hack-button primary" @click="openProject(featuredProject.liveUrl || '')">
                  <q-icon name="launch" /> Ver Proyecto en Vivo
                </button>
                <button
                  class="hack-button secondary"
                  @click="openProject(featuredProject.githubUrl || '')"
                >
                  <q-icon name="code" /> Ver Código Fuente
                </button>
              </div>
            </div>

            <div class="featured-media">
              <div class="featured-image">
                <img :src="featuredProject.image" :alt="featuredProject.title" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="hack-grid cols-4">
          <div class="stat-card">
            <div class="hack-card">
              <q-icon name="code" size="3rem" class="text-hack-green" />
              <h3>{{ totalProjects }}</h3>
              <p>Proyectos Totales</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="hack-card">
              <q-icon name="language" size="3rem" class="text-hack-blue" />
              <h3>{{ totalTechnologies }}</h3>
              <p>Tecnologías Utilizadas</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="hack-card">
              <q-icon name="timeline" size="3rem" class="text-hack-yellow" />
              <h3>{{ completedProjects }}</h3>
              <p>Completados</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="hack-card">
              <q-icon name="trending_up" size="3rem" class="text-hack-purple" />
              <h3>{{ activeProjects }}</h3>
              <p>En Progreso</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <q-dialog v-model="showProjectModal" class="project-modal">
      <q-card class="modal-card" v-if="selectedProject">
        <q-card-section class="modal-header">
          <div class="modal-title">
            <h2>{{ selectedProject.title }}</h2>
            <q-btn icon="close" flat round dense @click="showProjectModal = false" />
          </div>
        </q-card-section>

        <q-card-section class="modal-content">
          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>

          <div class="modal-details">
            <p class="modal-description">
              {{ selectedProject.fullDescription || selectedProject.description }}
            </p>

            <div class="modal-tech">
              <h4>Tecnologías:</h4>
              <div class="tech-tags">
                <span v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="modal-actions">
              <button
                class="hack-button primary"
                @click="openProject(selectedProject.liveUrl)"
                v-if="selectedProject.liveUrl"
              >
                <q-icon name="launch" /> Demo en Vivo
              </button>
              <button
                class="hack-button secondary"
                @click="openProject(selectedProject.githubUrl)"
                v-if="selectedProject.githubUrl"
              >
                <q-icon name="code" /> Código Fuente
              </button>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  technologies: string[];
  image: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
}

// Data
const selectedCategory = ref('Todos');
const selectedTech = ref('');
const showProjectModal = ref(false);
const selectedProject = ref<Project | null>(null);
const displayedProjects = ref(6);

const categories = ref(['Todos', 'Web', 'Móvil', 'APIs', 'Herramientas']);

const techOptions = ref([
  'Vue.js',
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'SQLite',
  'AWS',
  'Kotlin',
  'Flutter',
  'JetPack Compose',
  'Firebase',
  '.Net'
]);

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Plataforma E-Commerce',
    description: 'Solución de comercio electrónico full-stack con características avanzadas e interfaz moderna.',
    fullDescription:
      'Una plataforma de comercio electrónico integral construida con tecnologías modernas. Las características incluyen autenticación de usuarios, catálogo de productos, carrito de compras, integración de pagos, gestión de pedidos y panel de administración.',
    category: 'Web',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
    image: '/src/assets/otro.png',
    status: 'completed',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/james250920/ecommerce-platform',
    features: [
      'Autenticación y autorización de usuarios',
      'Catálogo de productos con búsqueda y filtros',
      'Carrito de compras y proceso de pago',
      'Integración de pagos con Stripe',
      'Sistema de gestión de pedidos',
      'Panel de administración para gestión de inventario',
    ],
  },
  {
    id: 2,
    title: 'StudyOso',
    description: 'Herramienta de gestión de tareas colaborativa con actualizaciones en tiempo real.',
    fullDescription:
      'Una aplicación moderna de gestión de tareas diseñada para equipos. Construida con Vue.js y con colaboración en tiempo real, organización de proyectos y seguimiento de productividad.',
    category: 'Móvil',
    technologies: ['JetPack Compose', 'Kotlin', 'SQLite', 'Firebase'],
    image: '/src/assets/pngwing 2.png',
    status: 'completed',
    liveUrl: 'https://example-tasks.com',
    githubUrl: 'https://github.com/james250920/task-manager',
    features: [
      'Edición colaborativa en tiempo real',
      'Organización de proyectos y tareas',
      'Gestión de miembros del equipo',
      'Seguimiento de progreso y analíticas',
      'Diseño responsivo para móviles',
    ],
  },
  {
    id: 3,
    title: 'Impulso',
    description: 'Servicio de API RESTful que proporciona datos meteorológicos con caché y limitación de velocidad.',
    category: 'Móvil',
    technologies: ['JetPack Compose', 'Kotlin', 'SQLite', 'Firebase'],
    image: '/src/assets/otro.png',
    status: 'completed',
    githubUrl: 'https://github.com/james250920/weather-api',
  },
  {
    id: 4,
    title: 'Zentry Tracker',
    description: 'Aplicación React Native para gestión de finanzas personales.',
    category: 'Móvil',
    technologies: ['Flutter', 'Firebase', 'PostgreSQL'],
    image: '/src/assets/pngwing 2.png',
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'AprendePe',
    description: 'Portafolio personal que muestra proyectos y habilidades.',
    category: 'Web',
    technologies: ['React', 'PostgreSQL', 'TypeScript', 'SCSS',".Net"],
    image: '/src/assets/otro.png',
    status: 'completed',
    liveUrl: 'https://james-portfolio.dev',
    githubUrl: 'https://github.com/james250920/portfolio',
  }
]);

// Computed properties
const filteredProjects = computed(() => {
  let filtered = projects.value;

  if (selectedCategory.value !== 'Todos') {
    filtered = filtered.filter((project) => project.category === selectedCategory.value);
  }

  if (selectedTech.value) {
    filtered = filtered.filter((project) => project.technologies.includes(selectedTech.value));
  }

  return filtered.slice(0, displayedProjects.value);
});

const hasMoreProjects = computed(() => {
  return displayedProjects.value < projects.value.length;
});

const featuredProject = computed(() => {
  return projects.value.find((project) => project.id === 1);
});

const totalProjects = computed(() => projects.value.length);
const totalTechnologies = computed(() => {
  const allTech = projects.value.flatMap((project) => project.technologies);
  return [...new Set(allTech)].length;
});
const completedProjects = computed(
  () => projects.value.filter((project) => project.status === 'completed').length,
);
const activeProjects = computed(
  () => projects.value.filter((project) => project.status === 'in-progress').length,
);

// Methods
const openProjectModal = (project: Project) => {
  selectedProject.value = project;
  showProjectModal.value = true;
};

const openProject = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};

const loadMoreProjects = () => {
  displayedProjects.value += 3;
};

onMounted(() => {
  // Animation on mount
});
</script>

<style lang="scss" scoped>
.projects-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Header Section
.projects-header {
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
    max-width: 700px;
    margin: 0 auto;
  }
}

// Filter Section
.filter-section {
  padding: 2rem 0;

  .terminal-filter {
    max-width: 800px;
    margin: 0 auto;

    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;

      .filter-btn {
        background: transparent;
        border: 1px solid $hack-border;
        color: #c9d1d9;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'JetBrains Mono', monospace;

        &:hover {
          border-color: $hack-green;
          color: $hack-green;
        }

        &.active {
          background: $hack-green;
          color: #000;
          border-color: $hack-green;
        }
      }
    }

    .tech-filter {
      margin: 1rem 0;
      max-width: 300px;
    }
  }
}

// Projects Grid
.projects-grid-section {
  padding: 3rem 0;

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .project-card {
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px);
      border-color: $hack-green;
      box-shadow: 0 16px 50px rgba(0, 255, 136, 0.2);

      .project-overlay {
        opacity: 1;
      }
    }

    .project-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      border-radius: 8px 8px 0 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;

        .overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: $hack-white;
        }
      }
    }

    .project-info {
      padding: 1.5rem;

      .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;

        .project-title {
          color: $hack-white;
          font-size: 1.5rem;
          margin: 0;
          flex: 1;
        }

        .project-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          font-weight: 600;

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }

          &.completed {
            color: $hack-green;
            .status-dot {
              background: $hack-green;
            }
          }

          &.in-progress {
            color: $hack-yellow;
            .status-dot {
              background: $hack-yellow;
            }
          }
        }
      }

      .project-description {
        color: #c9d1d9;
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }

      .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;

        .tech-tag {
          background: rgba(0, 255, 136, 0.1);
          color: $hack-green;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }
      }

      .project-actions {
        display: flex;
        gap: 0.5rem;

        .action-btn {
          background: transparent;
          border: 1px solid;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          &.live {
            border-color: $hack-blue;
            color: $hack-blue;

            &:hover {
              background: $hack-blue;
              color: #000;
            }
          }

          &.code {
            border-color: $hack-green;
            color: $hack-green;

            &:hover {
              background: $hack-green;
              color: #000;
            }
          }
        }
      }
    }
  }

  .load-more-section {
    text-align: center;
  }
}

// Featured Project
.featured-project {
  padding: 4rem 0;

  .section-title {
    color: $hack-blue;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .featured-card {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 204, 255, 0.05));
    border: 1px solid $hack-green;

    .featured-content {
      .featured-title {
        color: $hack-white;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
      }

      .featured-description {
        color: #c9d1d9;
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .featured-highlights {
        margin-bottom: 2rem;

        h4 {
          color: $hack-blue;
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            color: #c9d1d9;
          }
        }
      }

      .featured-tech {
        margin-bottom: 2rem;

        h4 {
          color: $hack-blue;
          margin-bottom: 1rem;
        }

        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .tech-tag.featured {
            background: rgba(0, 255, 136, 0.15);
            color: $hack-green;
            padding: 0.5rem 1rem;
            border-radius: 15px;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid rgba(0, 255, 136, 0.4);
          }
        }
      }

      .featured-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
    }

    .featured-media {
      .featured-image {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}

// Stats Section
.stats-section {
  padding: 4rem 0;

  .stat-card {
    .hack-card {
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        border-color: $hack-green;
      }

      .q-icon {
        margin-bottom: 1rem;
      }

      h3 {
        color: $hack-white;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        font-family: 'JetBrains Mono', monospace;
      }

      p {
        color: #c9d1d9;
        margin: 0;
        font-weight: 500;
      }
    }
  }
}

// Project Modal
:deep(.project-modal) {
  .modal-card {
    background: #161b22;
    color: $hack-white;
    max-width: 800px;
    width: 90vw;

    .modal-header {
      border-bottom: 1px solid $hack-border;

      .modal-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          color: $hack-white;
          margin: 0;
        }
      }
    }

    .modal-content {
      .modal-image {
        margin-bottom: 2rem;
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
        }
      }

      .modal-description {
        color: #c9d1d9;
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .modal-tech {
        margin-bottom: 2rem;

        h4 {
          color: $hack-blue;
          margin-bottom: 1rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
      }

      .modal-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
    }
  }
}

// Custom select styles
:deep(.tech-select) {
  .q-field__control {
    background: rgba(13, 17, 23, 0.8);
    border-color: $hack-border;
  }

  .q-field__native {
    color: $hack-white;
    font-family: 'JetBrains Mono', monospace;
  }

  &.q-field--focused {
    .q-field__control {
      border-color: $hack-green;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .projects-header {
    padding: 2rem 0 1rem;

    .page-title {
      font-size: 2.5rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr !important;
  }

  .featured-content {
    .featured-actions {
      flex-direction: column;

      .hack-button {
        width: 100%;
      }
    }
  }

  .filter-options {
    justify-content: center;
  }

  .project-actions {
    flex-direction: column;

    .action-btn {
      justify-content: center;
    }
  }
}
</style>

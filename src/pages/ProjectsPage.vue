<template>
  <q-page class="projects-page">
    <!-- Header Section -->
    <section class="projects-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title animate-slide-up">
            <q-icon name="code" class="text-hack-green" /> {{ t('projects.title') }}
          </h1>
          <p class="page-subtitle animate-fade-in">{{ t('projects.subtitle') }}</p>
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
                  <span>DevMenfroyt@projects:~$ </span>
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
                    <q-icon name="visibility" size="1.5rem" class="text-hack-white" />
                    <span>{{ t('projects.viewDetails') }}</span>
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
                    <q-icon name="launch" /> {{ t('projects.liveDemo') }}
                  </button>
                  <button
                    class="action-btn code"
                    @click.stop="openProject(project.githubUrl)"
                    v-if="project.githubUrl"
                  >
                    <q-icon name="code" /> {{ t('projects.sourceCode') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="load-more-section" v-if="hasMoreProjects">
          <button class="hack-button primary" @click="loadMoreProjects">
            <q-icon name="refresh" /> {{ t('projects.loadMore') }}
          </button>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useLanguage } from 'src/composables/useLanguage';

const { t } = useLanguage();

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  category: string[];
  technologies: string[];
  image: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
}

// Data
const selectedCategory = ref('Todos');
const selectedTech = ref<string | null>('');
const displayedProjects = ref(6);

const categories = computed(() => [
  t('projects.cat.all'),
  'Web',
  t('projects.cat.mobile'),
  'APIs',
  t('projects.cat.tools'),
]);

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
  '.Net',
]);

const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

const projects = computed<Project[]>(() => [
  {
    id: 1,
    title: t('projects.p1.title'),
    description: t('projects.p1.desc'),
    fullDescription: t('projects.p1.fullDesc'),
    category: ['Web', t('projects.cat.mobile')],
    technologies: [
      'Angular',
      'Node.js',
      'PostgreSQL',
      'TypeScript',
      'Docker',
      'Flutter',
      'Firebase',
    ],
    image: `https://${IMG_BASE_URL}/imagenes/img/logo.jpg`,
    status: 'in-progress',
    liveUrl: '',
    githubUrl: '',
    features: [
      t('projects.p1.f1'),
      t('projects.p1.f2'),
      t('projects.p1.f3'),
      t('projects.p1.f4'),
      t('projects.p1.f5'),
      t('projects.p1.f6'),
    ],
  },
  {
    id: 2,
    title: 'StudyOso',
    description: t('projects.p2.desc'),
    fullDescription: '',
    category: [t('projects.cat.mobile')],
    technologies: ['JetPack Compose', 'Kotlin', 'SQLite', 'Firebase'],
    image: `https://${IMG_BASE_URL}/imagenes/img/studyoso.png`,
    status: 'completed',
    liveUrl: '',
    githubUrl: '',
    features: [],
  },
  {
    id: 3,
    title: 'Impulso',
    description: t('projects.p3.desc'),
    category: [t('projects.cat.mobile')],
    technologies: ['JetPack Compose', 'Kotlin', 'SQLite', 'Firebase'],
    image: `https://${IMG_BASE_URL}/imagenes/img/Impluso.png`,
    status: 'completed',
    githubUrl: '',
  },
  {
    id: 4,
    title: 'Zentry Tracker',
    description: t('projects.p4.desc'),
    category: [t('projects.cat.mobile')],
    technologies: ['Flutter', 'Firebase', 'PostgreSQL'],
    image: `https://${IMG_BASE_URL}/imagenes/img/logo.jpg`,
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'AprendePe',
    description: t('projects.p5.desc'),
    category: ['Web'],
    technologies: ['React', 'PostgreSQL', 'TypeScript', 'SCSS', '.Net'],
    image: `https://${IMG_BASE_URL}/imagenes/img/aprendePE.png`,
    status: 'completed',
    liveUrl: 'https://james250920.github.io/EnsenaPe/',
    githubUrl: 'https://github.com/james250920/EnsenaPe',
  },
]);

// Computed properties
const allFilteredProjects = computed(() => {
  let filtered = projects.value;

  if (
    selectedCategory.value !== t('projects.cat.all') &&
    selectedCategory.value !== 'Todos' &&
    selectedCategory.value !== 'All'
  ) {
    filtered = filtered.filter((project) => project.category.includes(selectedCategory.value));
  }

  const tech = selectedTech.value;
  if (tech != null && tech !== '') {
    filtered = filtered.filter((project) => project.technologies.includes(tech));
  }

  return filtered;
});

const filteredProjects = computed(() => {
  return allFilteredProjects.value.slice(0, displayedProjects.value);
});

const hasMoreProjects = computed(() => {
  return displayedProjects.value < allFilteredProjects.value.length;
});

// Methods
const openProjectModal = (project: Project) => {
  openProject(project.liveUrl || project.githubUrl || '');
};

const openProject = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};

const loadMoreProjects = () => {
  displayedProjects.value += 3;
};

// Reset pagination when filters change
watch(selectedCategory, () => {
  displayedProjects.value = 6;
});

watch(selectedTech, () => {
  displayedProjects.value = 6;
});

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
  padding: 0 1.5rem;
}

// Header Section
.projects-header {
  padding: 3rem 0 1.5rem;
  text-align: center;

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    font-family: 'Space Grotesk', sans-serif;

    .q-icon {
      margin-right: 0.75rem;
    }
  }

  .page-subtitle {
    font-size: 1rem;
    color: #c9d1d9;
    max-width: 700px;
    margin: 0 auto;
  }
}

// Filter Section
.filter-section {
  padding: 1.5rem 0;

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
  padding: 2rem 0;

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .project-card-container {
    display: flex;
  }

  .project-card {
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;

    &:hover {
      transform: translateY(-8px);
      border-color: $hack-green;
      box-shadow: 0 16px 50px rgba(0, 255, 136, 0.2);

      .project-overlay {
        opacity: 1;
      }

      .project-image img {
        transform: scale(1.05);
      }
    }

    .project-image {
      position: relative;
      width: 100%;
      height: 170px;
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
      padding: 1.2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;

        .project-title {
          color: $hack-white;
          font-size: 1.15rem;
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
        margin-bottom: 1rem;
        line-height: 1.5;
        font-size: 0.88rem;
      }

      .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 1rem;

        .tech-tag {
          background: rgba(0, 255, 136, 0.1);
          color: $hack-green;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-size: 0.72rem;
          font-family: 'JetBrains Mono', monospace;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }
      }

      .project-actions {
        display: flex;
        gap: 0.4rem;

        .action-btn {
          background: transparent;
          border: 1px solid;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;

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
  padding: 3rem 0;

  .section-title {
    color: $hack-blue;
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .featured-card {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 204, 255, 0.05));
    border: 1px solid $hack-green;

    .featured-content {
      .featured-title {
        color: $hack-white;
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }

      .featured-description {
        color: #c9d1d9;
        font-size: 0.95rem;
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
  padding: 3rem 0;

  .stat-card {
    .hack-card {
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        border-color: $hack-green;
      }

      .q-icon {
        margin-bottom: 0.75rem;
      }

      h3 {
        color: $hack-white;
        font-size: 1.8rem;
        margin-bottom: 0.4rem;
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
@media (max-width: 480px) {
  .projects-grid-section {
    .projects-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}

@media (max-width: 768px) {
  .projects-header {
    padding: 1.5rem 0 1rem;

    .page-title {
      font-size: 1.6rem;
      .q-icon {
        font-size: 1.4rem;
      }
    }

    .page-subtitle {
      font-size: 0.9rem;
      padding: 0 0.5rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .filter-section {
    padding: 1rem 0;

    .terminal-filter {
      .terminal-title {
        font-size: 0.7rem;
      }

      .filter-options {
        justify-content: center;
        gap: 0.35rem;
        flex-wrap: wrap;

        .filter-btn {
          padding: 0.35rem 0.7rem;
          font-size: 0.78rem;
        }
      }

      .tech-filter .tech-select {
        font-size: 0.85rem;
      }
    }
  }

  .projects-grid-section {
    padding: 1.5rem 0;

    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .project-card {
      .project-image {
        height: 130px;
      }

      .project-info {
        padding: 0.85rem;

        .project-header {
          flex-direction: column;
          gap: 0.3rem;
          align-items: flex-start;

          .project-title {
            font-size: 0.9rem;
          }
          .project-status {
            font-size: 0.65rem;
          }
        }

        .project-description {
          font-size: 0.75rem;
        }

        .project-tech {
          gap: 0.3rem;
          .tech-tag {
            font-size: 0.62rem;
            padding: 0.15rem 0.4rem;
          }
        }

        .project-actions {
          flex-direction: column;
          gap: 0.5rem;

          .action-btn {
            width: 100%;
            justify-content: center;
            font-size: 0.72rem;
            padding: 0.4rem 0.6rem;
          }
        }
      }
    }
  }
}
</style>

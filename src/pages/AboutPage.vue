<template>
  <q-page class="about-page">
    <!-- Header Section -->
    <section class="about-header">
      <div class="container">
        <div class="header-content">
          <h2 class="page-title animate-slide-up">
            <q-icon name="person" class="text-hack-green" /> {{ t('about.title') }}
          </h2>
          <p class="page-subtitle animate-fade-in">
            {{ t('about.subtitle') }}
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
            <div
              class="profile-photo"
              :class="{ 'is-disintegrating': disintegrationActive }"
              @pointerenter="enterDisintegration"
              @pointerleave="leaveDisintegration"
              @pointercancel="leaveDisintegration"
            >
              <div ref="profileContainer" class="profile-image-container">
                <img ref="profileImage" :src="ImgURL" alt="James Mendoza" class="profile-image" />
                <div class="status-indicator">
                  <div class="status-dot"></div>
                  <span class="status-text">ONLINE</span>
                </div>
                <div class="image-overlay">
                  <h2 class="name">James Mendoza</h2>
                  <h3 class="title">{{ t('hero.title') }}</h3>
                </div>
              </div>
              <canvas ref="profileCanvas" class="disintegration-canvas" aria-hidden="true" />
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
                  <span class="text-hack-green">● {{ t('about.currentFocus1') }}</span
                  ><br />
                  <span class="text-hack-green">● {{ t('about.currentFocus2') }}</span
                  ><br />
                  <span class="text-hack-green">● {{ t('about.currentFocus3') }}</span>
                </div>
                <div class="terminal-line prompt">
                  <span>DevMenfroyt@about:~$ </span>
                  <span class="cursor-blink">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('about.expTitle') }}</h2>
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

    <!-- Skills Section -->
    <section class="skills-section">
      <div class="container">
        <h2 class="section-title text-center">Skills</h2>

        <div class="categories-grid">
          <div
            v-for="category in skillCategories"
            :key="category.name"
            class="hack-card skill-category-card"
          >
            <h3 class="category-header">
              <q-icon :name="category.icon" :class="category.color" />
              {{ category.name }}
            </h3>
            <div class="skills-inner-grid">
              <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                <div class="skill-icon-wrap">
                  <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
                </div>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="hack-card cta-card">
          <h2 class="cta-title">{{ t('about.ctaTitle') }}</h2>
          <div class="cta-actions">
            <button class="hack-button primary" @click="scrollToSection('contact')">
              <q-icon name="message" /> {{ t('about.ctaContact') }}
            </button>
            <button class="hack-button secondary" @click="scrollToSection('projects')">
              <q-icon name="work" /> {{ t('about.ctaProjects') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguage } from 'src/composables/useLanguage';
import { useImageDisintegration } from 'src/composables/useImageDisintegration';

const { t } = useLanguage();

const {
  image: profileImage,
  canvas: profileCanvas,
  container: profileContainer,
  active: disintegrationActive,
  enter: enterDisintegration,
  leave: leaveDisintegration,
} = useImageDisintegration();

const ImgURL = `https://${import.meta.env.VITE_IMG_URL}/imagenes/img/Matrix.png`;

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 56;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

const careerTimeline = computed(() => [
  { year: '2018', event: t('about.timeline.2018') },
  { year: '2019', event: t('about.timeline.2019') },
  { year: '2021', event: t('about.timeline.2021') },
  { year: '2022', event: t('about.timeline.2022') },
  { year: '2023', event: t('about.timeline.2023') },
  { year: '2024', event: t('about.timeline.2024') },
  { year: '2025', event: t('about.timeline.2025') },
  { year: '2026', event: t('about.timeline.2026') },
]);

const skillCategories = ref([
  {
    name: 'Frontend',
    icon: 'web',
    color: 'text-hack-green',
    skills: [
      { name: 'React', icon: 'https://www.pngmart.com/files/23/React-Logo-PNG-200x200.png' },
      { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
      { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      {
        name: 'CSS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg',
      },
      {
        name: 'Tailwind',
        icon: '/icons/tailwindcss.svg',
      },
    ],
  },
  {
    name: 'Backend',
    icon: 'storage',
    color: 'text-hack-green',
    skills: [
      {
        name: '.Net',
        icon: 'https://cdn.simpleicons.org/dotnet/8C6CFF',
      },
      { name: 'Express', icon: 'https://cdn.simpleicons.org/express/FFFFFF' },
      {
        name: 'C#',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/csharp/csharp-original.svg',
      },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
    ],
  },
  {
    name: 'QA & Testing',
    icon: 'check_circle',
    color: 'text-hack-green',
    skills: [
      { name: 'K6', icon: 'https://cdn.simpleicons.org/k6/7D64FF' },
      { name: 'Appium', icon: 'https://cdn.simpleicons.org/appium/662D91' },
      {
        name: 'NUnit',
        icon: '/icons/nunit.svg',
      },
      { name: 'Selenium', icon: 'https://cdn.simpleicons.org/selenium/43B02A' },
      { name: 'Cypress', icon: 'https://cdn.worldvectorlogo.com/logos/cypress-1.svg' },
      { name: 'TestRail', icon: 'https://cdn.simpleicons.org/testrail/65C179' },
      {
        name: 'Xray/Jira',
        icon: 'https://cdn.prod.website-files.com/659bd602c8644fb17135bbe7/659bd602c8644fb17135bf7d_1535446267509.jpeg',
      },
    ],
  },
  {
    name: 'Databases',
    icon: 'dns',
    color: 'text-hack-green',
    skills: [
      { name: 'SQLServer', icon: 'https://logodix.com/logo/1095307.png' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
    ],
  },
  {
    name: 'Mobile',
    icon: 'smartphone',
    color: 'text-hack-green',
    skills: [
      { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF' },
      { name: 'JetPack Compose', icon: 'https://cdn.simpleicons.org/jetpackcompose/4285F4' },
    ],
  },
  {
    name: 'Tools & DevOps',
    icon: 'build',
    color: 'text-hack-green',
    skills: [
      { name: 'Git / GitHub', icon: 'https://cdn.simpleicons.org/github/FFFFFF' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Ubuntu', icon: 'https://cdn.simpleicons.org/ubuntu/E95420' },
      { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
      { name: 'Azure', icon: 'https://swimburger.net/media/fbqnp2ie/azure.svg' },
      { name: 'AWS', icon: 'https://www.pngall.com/wp-content/uploads/13/AWS-Logo-PNG-File.png' },
      {
        name: 'n8n',
        icon: 'https://cdn.simpleicons.org/n8n/EA4B71',
      },
      {
        name: 'Python',
        icon: 'https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/community/logos/python-logo-only.png',
      },
      { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/0F80CC' },
    ],
  },
]);

const experiences = computed(() => [
  {
    title: t('about.exp1.title'),
    company: t('about.exp1.company'),
    period: t('about.exp1.period'),
    description: t('about.exp1.desc'),
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
    title: t('about.exp2.title'),
    company: t('about.exp2.company'),
    period: t('about.exp2.period'),
    description: t('about.exp2.desc'),
    technologies: ['Metodología TIME', 'Excel', 'Sass'],
  },
  {
    title: t('about.exp3.title'),
    company: t('about.exp3.company'),
    period: t('about.exp3.period'),
    description: t('about.exp3.desc'),
    technologies: ['Microsoft Office', 'QR lector'],
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
  padding: 0 1.5rem;
}

// Header Section
.about-header {
  padding: 3rem 0 1.5rem;
  text-align: center;
}

// Profile Section
.profile-section {
  padding: 2rem 0;

  .profile-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-photo {
    display: flex;
    align-items: stretch;
    position: relative;
    width: 100%;
    max-width: 400px;

    .disintegration-canvas {
      position: absolute;
      top: -200px;
      left: -200px;
      width: calc(100% + 400px);
      height: calc(100% + 400px);
      pointer-events: none;
      opacity: 0;
      z-index: 11;
    }

    &.is-disintegrating {
      .profile-image-container {
        opacity: 0;
      }

      .disintegration-canvas {
        opacity: 1;
      }
    }
  }

  .profile-image-container {
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid rgba(4, 249, 30, 0.272);
    box-shadow:
      0 0 30px rgba(4, 249, 30, 0.1),
      0 8px 24px rgba(0, 0, 0, 0.4);
    transition:
      border-color 0.4s ease,
      box-shadow 0.4s ease;
    background: linear-gradient(135deg, rgba(13, 17, 23, 0.8), rgba(22, 27, 34, 0.6));

    &:hover {
      border-color: rgba(4, 249, 30, 0.6);
      box-shadow:
        0 0 40px rgba(4, 249, 30, 0.3),
        0 12px 32px rgba(0, 0, 0, 0.5);

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
      height: 440px;
      object-fit: cover;
      display: block;
      filter: brightness(1.5) contrast(1.1);
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
      border: 1px solid rgba(4, 249, 30, 0.3);
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
        margin: 0 0 0.5rem;
        line-height: 1.2;
        text-shadow:
          0 2px 12px rgba(0, 0, 0, 0.9),
          0 0 20px rgba(4, 249, 30, 0.3);
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: -0.5px;
      }

      .title {
        color: $hack-green;
        font-size: 1.05rem;
        font-weight: 500;
        margin: 0;
        line-height: 1.4;
        text-shadow:
          0 2px 12px rgba(0, 0, 0, 0.9),
          0 0 15px rgba(4, 249, 30, 0.5);
        font-family: 'JetBrains Mono', monospace;
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

// Skills Section — grid of grids
.skills-section {
  padding: 3rem 0;

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    align-items: start;
  }

  .skill-category-card {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .category-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $hack-white;
      font-size: 1.1rem;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
      margin: 0;

      .q-icon {
        font-size: 1.2rem;
      }
    }

    .skills-inner-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .skill-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 0.4rem;
      background: rgba(22, 27, 34, 0.8);
      border: 1px solid $hack-border;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: default;

      &:hover {
        transform: translateY(-4px);
        border-color: $hack-green;
        box-shadow: 0 6px 18px rgba(4, 249, 30, 0.15);

        .skill-icon {
          transform: scale(1.12);
        }
      }

      .skill-icon-wrap {
        width: 2.2rem;
        height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .skill-icon {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
        transition: transform 0.3s ease;
      }

      .skill-name {
        color: $hack-white;
        font-size: 0.72rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.2;
      }
    }
  }
}

// Experience Section
.experience-section {
  padding: 3rem 0;

  .experience-timeline {
    max-width: 800px;
    margin: 0 auto;

    .experience-item {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;

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
          box-shadow: 0 0 10px rgba(4, 249, 30, 0.5);
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
            font-size: 1.2rem;
            margin-bottom: 0.4rem;
          }

          .experience-company {
            color: $hack-green;
            font-weight: 600;
            font-size: 0.95rem;
          }

          .experience-period {
            color: $hack-green;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.82rem;
            margin-top: 0.4rem;
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
            background: rgba(4, 249, 30, 0.1);
            color: $hack-green;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid rgba(4, 249, 30, 0.3);
          }
        }
      }
    }
  }
}

// Interests Section
.interests-section {
  padding: 3rem 0;

  .interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.25rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .interest-item {
    .interest-card {
      text-align: center;
      transition: all 0.3s ease;
      padding: 1.5rem 1rem;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:hover {
        transform: translateY(-8px);
        border-color: $hack-green;
        box-shadow: 0 12px 40px rgba(4, 249, 30, 0.15);

        .q-icon {
          transform: scale(1.1);
        }
      }

      .q-icon {
        margin-bottom: 1rem;
        transition: transform 0.3s ease;
      }

      h4 {
        color: $hack-white;
        margin-bottom: 0.4rem;
        font-size: 1rem;
      }

      p {
        color: #c9d1d9;
        font-size: 0.82rem;
        line-height: 1.5;
      }
    }
  }
}

// CTA Section
.cta-section {
  padding: 3rem 0;

  .cta-card {
    text-align: center;
    background: linear-gradient(135deg, rgba(4, 249, 30, 0.1), rgba(4, 249, 30, 0.1));
    border: 1px solid $hack-green;

    .cta-title {
      color: $hack-white;
      font-size: 1.8rem;
      margin-bottom: 0.75rem;
    }

    .cta-description {
      color: #c9d1d9;
      font-size: 1rem;
      margin-bottom: 1.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .about-header {
    padding: 1.5rem 0 1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .profile-section {
    .profile-photo {
      max-width: 320px;
    }

    .profile-image-container {
      .profile-image {
        height: 340px;
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
        padding: 1.2rem 1rem;

        .name {
          font-size: 1.4rem;
          margin-bottom: 0.2rem;
        }

        .title {
          font-size: 0.88rem;
        }
      }
    }
  }

  .skills-section {
    .categories-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .skill-category-card {
      padding: 0.85rem;

      .category-header {
        font-size: 0.95rem;
      }

      .skills-inner-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }

      .skill-item {
        padding: 0.5rem 0.3rem;

        .skill-icon-wrap {
          width: 1.6rem;
          height: 1.6rem;
        }
        .skill-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .skill-name {
          font-size: 0.62rem;
        }
      }
    }
  }

  .experience-section {
    .experience-timeline {
      .experience-item {
        flex-direction: column;
        gap: 0.6rem !important;

        .experience-marker {
          flex-direction: row;
          margin-top: 0 !important;

          .marker-line {
            width: 30px !important;
            height: 2px !important;
            margin-top: 0 !important;
          }
        }

        .experience-card {
          padding: 0.85rem;

          .experience-header {
            .experience-title {
              font-size: 1rem;
            }
            .experience-company {
              font-size: 0.82rem;
            }
            .experience-period {
              font-size: 0.72rem;
            }
          }

          .experience-description {
            font-size: 0.78rem;
          }

          .experience-tech .tech-tag {
            font-size: 0.65rem;
            padding: 0.15rem 0.45rem;
          }
        }
      }
    }
  }

  .interests-section {
    .interests-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.6rem;
    }

    .interest-item .interest-card {
      padding: 1rem 0.7rem;
      min-height: 110px;

      .q-icon {
        font-size: 1.6rem;
      }
      h4 {
        font-size: 0.85rem;
      }
      p {
        font-size: 0.72rem;
      }
    }
  }

  .cta-section {
    .cta-card {
      .cta-title {
        font-size: 1.2rem;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;

        .hack-button {
          width: 100%;
          max-width: 280px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .skills-section {
    .categories-grid {
      grid-template-columns: 1fr;
    }
  }

  .interests-section {
    .interests-grid {
      grid-template-columns: 1fr;
    }
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
</style>

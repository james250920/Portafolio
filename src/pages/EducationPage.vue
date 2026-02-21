<template>
  <q-page class="education-page">
    <!-- Header Section -->
    <section class="education-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title animate-slide-up">
            <q-icon name="school" class="text-hack-green" /> {{ t('education.title') }}
          </h1>
          <p class="page-subtitle animate-fade-in">
            {{ t('education.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Education Timeline Section -->
    <section class="timeline-section">
      <div class="container">
        <div class="terminal-wrapper">
          <div class="terminal">
            <div class="terminal-header">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
              <span class="terminal-title">~/education/timeline.log</span>
            </div>
            <div class="terminal-content">
              <div class="terminal-line">cat academic-history.txt --verbose</div>
              <div class="output">
                <div class="education-timeline">
                  <div v-for="(edu, index) in educationTimeline" :key="index" class="timeline-item">
                    <div class="timeline-marker">
                      <div class="timeline-dot"></div>
                      <div class="timeline-line" v-if="index < educationTimeline.length - 1"></div>
                    </div>
                    <div class="timeline-content">
                      <div class="hack-card education-card">
                        <div class="education-header">
                          <div class="education-icon">
                            <q-icon :name="edu.icon" size="2rem" :class="edu.iconClass" />
                          </div>
                          <div class="education-info">
                            <h3 class="education-degree">{{ edu.degree }}</h3>
                            <h4 class="education-institution">{{ edu.institution }}</h4>
                            <div class="education-period">
                              <q-icon name="event" size="1rem" class="text-hack-blue" />
                              {{ edu.period }}
                              <span v-if="edu.status" class="status-badge" :class="edu.status">
                                {{ edu.status }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p class="education-description">{{ edu.description }}</p>
                        <div v-if="edu.achievements" class="education-achievements">
                          <h5 class="achievements-title">{{ t('education.achievements') }}</h5>
                          <ul class="achievements-list">
                            <li v-for="(achievement, i) in edu.achievements" :key="i">
                              <q-icon name="check_circle" size="1rem" class="text-hack-green" />
                              {{ achievement }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="terminal-line prompt">
                <span>DevMenfroyt@education:~$ </span>
                <span class="cursor-blink">|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications Section -->
    <section class="certifications-section">
      <div class="container">
        <h2 class="section-title">
          <q-icon name="workspace_premium" class="text-hack-yellow" />
          {{ t('education.certifications') }}
        </h2>
        <div class="certifications-grid">
          <div v-for="cert in certifications" :key="cert.id" class="certification-card-container">
            <div class="hack-card certification-card">
              <div class="cert-header">
                <div class="cert-icon">
                  <q-icon :name="cert.icon" size="1.5rem" class="text-hack-yellow" />
                </div>
                <div class="cert-badge" v-if="cert.badge">
                  <img :src="cert.badge" :alt="cert.name" />
                </div>
              </div>
              <div class="cert-info">
                <h3 class="cert-name">{{ cert.name }}</h3>
                <h4 class="cert-issuer">{{ cert.issuer }}</h4>
                <div class="cert-date">
                  <q-icon name="event" size="1rem" />
                  {{ cert.date }}
                </div>
                <div v-if="cert.credentialId" class="cert-credential">
                  <span class="credential-label">ID:</span>
                  <code class="credential-id">{{ cert.credentialId }}</code>
                </div>
              </div>
              <div class="cert-actions" v-if="cert.verifyUrl">
                <button class="action-btn verify" @click="openUrl(cert.verifyUrl)">
                  <q-icon name="verified" /> {{ t('education.verifyCert') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section class="courses-section">
      <div class="container">
        <h2 class="section-title">
          <q-icon name="menu_book" class="text-hack-blue" /> {{ t('education.coursesTitle') }}
        </h2>
        <div class="terminal-wrapper">
          <div class="terminal">
            <div class="terminal-header">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
              <span class="terminal-title">~/education/courses.list</span>
            </div>
            <div class="terminal-content">
              <div class="terminal-line">ls -la courses/ --group-by-category</div>
              <div class="output">
                <div
                  v-for="category in courseCategories"
                  :key="category.name"
                  class="course-category"
                >
                  <div class="category-header">
                    <q-icon :name="category.icon" class="text-hack-green" />
                    <span class="category-name">{{ category.name }}</span>
                    <span class="category-count"
                      >({{ category.courses.length }} {{ t('education.courses') }})</span
                    >
                  </div>
                  <div class="courses-list">
                    <div v-for="course in category.courses" :key="course.name" class="course-item">
                      <div class="course-bullet">▸</div>
                      <div class="course-info">
                        <span class="course-name">{{ course.name }}</span>
                        <span class="course-platform">- {{ course.platform }}</span>
                        <span v-if="course.duration" class="course-duration"
                          >({{ course.duration }})</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="terminal-line prompt">
                <span>DevMenfroyt@courses:~$ </span>
                <span class="cursor-blink">|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLanguage } from 'src/composables/useLanguage';

const { t } = useLanguage();

// Types
interface Education {
  degree: string;
  institution: string;
  period: string;
  status?: string;
  description: string;
  achievements?: string[];
  icon: string;
  iconClass: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  icon: string;
  badge?: string;
}

interface Course {
  name: string;
  platform: string;
  duration?: string;
}

interface CourseCategory {
  name: string;
  icon: string;
  courses: Course[];
}

// Data
const educationTimeline = computed<Education[]>(() => [
  {
    degree: t('education.edu1.degree'),
    institution: t('education.edu1.institution'),
    period: t('education.edu1.period'),
    status: t('education.edu1.status'),
    description: t('education.edu1.desc'),
    achievements: [t('education.edu1.a1'), t('education.edu1.a2'), t('education.edu1.a3')],
    icon: 'school',
    iconClass: 'text-hack-green',
  },
  {
    degree: t('education.edu2.degree'),
    institution: t('education.edu2.institution'),
    period: t('education.edu2.period'),
    description: t('education.edu2.desc'),
    achievements: [
      t('education.edu2.a1'),
      t('education.edu2.a2'),
      t('education.edu2.a3'),
      t('education.edu2.a4'),
    ],
    icon: 'cloud',
    iconClass: 'text-hack-blue',
  },
]);

const certifications = computed<Certification[]>(() => [
  {
    id: 1,
    name: 'AWS Academy Cloud Developing',
    issuer: 'AWS Training',
    date: 'Nov 2025',
    icon: 'cloud',
  },
  {
    id: 2,
    name: 'AWS Certified Developer Associate',
    issuer: 'Amazon Web Services',
    date: t('education.cert.awsDev'),
    icon: 'cloud_queue',
  },
  {
    id: 3,
    name: 'Scrum Fundamentals Certified (SFC)',
    issuer: 'SCRUMstudy',
    date: '2025',
    icon: 'groups',
  },
  {
    id: 4,
    name: 'Cloud Computing (AWS, Azure, GCP)',
    issuer: 'CTIC UNI',
    date: '2025',
    icon: 'cloud_done',
  },
  {
    id: 5,
    name: 'Store Listing Certificate',
    issuer: 'Google Play Academy',
    date: '2025',
    icon: 'android',
  },
  {
    id: 6,
    name: t('education.cert.dataAnalysis'),
    issuer: 'CTIC UNI',
    date: '2025',
    icon: 'analytics',
  },
  {
    id: 7,
    name: t('education.cert.sqlServer'),
    issuer: 'Microsoft',
    date: '2025',
    icon: 'storage',
  },
]);

const courseCategories = computed<CourseCategory[]>(() => [
  {
    name: t('education.courseCat.webDev'),
    icon: 'language',
    courses: [{ name: '.NET', platform: 'Microsoft Learn', duration: '40h' }],
  },
]);

// Methods
const openUrl = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};
</script>

<style lang="scss" scoped>
.education-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

// Header Section
.education-header {
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

// Section Title
.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
  color: #c9d1d9;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &.text-center {
    justify-content: center;
  }
}

// Timeline Section
.timeline-section {
  padding: 2rem 0;

  .terminal-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .education-timeline {
    padding: 1rem 0;

    .timeline-item {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }

      .timeline-marker {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.5rem;

        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: $hack-green;
          border: 3px solid #161b22;
          z-index: 2;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .timeline-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(180deg, $hack-green 0%, transparent 100%);
          margin-top: 0.5rem;
        }
      }

      .timeline-content {
        flex: 1;

        .education-card {
          padding: 1.2rem;
          margin-bottom: 0;

          .education-header {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.75rem;

            .education-icon {
              flex-shrink: 0;
            }

            .education-info {
              flex: 1;

              .education-degree {
                color: $hack-white;
                font-size: 1.2rem;
                font-weight: 600;
                margin: 0 0 0.4rem;
              }

              .education-institution {
                color: $hack-blue;
                font-size: 0.95rem;
                font-weight: 500;
                margin: 0 0 0.4rem;
              }

              .education-period {
                color: #c9d1d9;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.82rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;

                .status-badge {
                  padding: 0.25rem 0.75rem;
                  border-radius: 12px;
                  font-size: 0.75rem;
                  font-weight: 600;
                  text-transform: uppercase;
                  margin-left: 0.5rem;

                  &.en-curso {
                    background: rgba(0, 255, 136, 0.1);
                    color: $hack-green;
                    border: 1px solid rgba(0, 255, 136, 0.3);
                  }
                }
              }
            }
          }

          .education-description {
            color: #c9d1d9;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .education-achievements {
            margin-top: 1rem;

            .achievements-title {
              color: $hack-yellow;
              font-size: 0.88rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            }

            .achievements-list {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                color: #c9d1d9;
                padding: 0.5rem 0;
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;

                .q-icon {
                  margin-top: 0.25rem;
                  flex-shrink: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}

// Certifications Section
.certifications-section {
  padding: 2rem 0;

  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .certification-card-container {
    display: flex;
  }

  .certification-card {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      border-color: $hack-yellow;
      box-shadow: 0 12px 40px rgba(255, 193, 7, 0.15);
    }

    .cert-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;

      .cert-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 193, 7, 0.1);
        border-radius: 50%;
        border: 2px solid rgba(255, 193, 7, 0.3);
      }

      .cert-badge img {
        width: 36px;
        height: 36px;
        object-fit: contain;
      }
    }

    .cert-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;

      .cert-name {
        color: $hack-white;
        font-size: 0.88rem;
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
      }

      .cert-issuer {
        color: $hack-blue;
        font-size: 0.82rem;
        font-weight: 500;
        margin: 0;
      }

      .cert-date {
        color: #8b949e;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
      }

      .cert-credential {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        flex-wrap: wrap;

        .credential-label {
          color: #8b949e;
          font-size: 0.72rem;
        }

        .credential-id {
          background: rgba(0, 255, 136, 0.1);
          color: $hack-green;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }
      }
    }

    .cert-actions {
      margin-top: auto;
      width: 100%;

      .action-btn {
        width: 100%;
        background: transparent;
        border: 1px solid $hack-yellow;
        color: $hack-yellow;
        padding: 0.45rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        &:hover {
          background: $hack-yellow;
          color: #000;
        }
      }
    }
  }
}

// Courses Section
.courses-section {
  padding: 2rem 0 4rem;

  .terminal-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .course-category {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.75rem;
      color: $hack-green;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      font-size: 0.95rem;

      .category-count {
        color: #8b949e;
        font-size: 0.82rem;
        font-weight: 400;
      }
    }

    .courses-list {
      padding-left: 1.5rem;

      .course-item {
        display: flex;
        gap: 0.6rem;
        padding: 0.4rem 0;
        color: #c9d1d9;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.82rem;

        .course-bullet {
          color: $hack-blue;
          flex-shrink: 0;
        }

        .course-info {
          flex: 1;

          .course-name {
            color: $hack-white;
            font-weight: 500;
          }

          .course-platform {
            color: $hack-blue;
          }

          .course-duration {
            color: #8b949e;
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .certifications-section {
    .certifications-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 480px) {
  .certifications-section {
    .certifications-grid {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
  .education-header {
    padding: 1.5rem 0 1rem;

    .page-title {
      font-size: 1.5rem;
      .q-icon {
        font-size: 1.3rem;
      }
    }

    .page-subtitle {
      font-size: 0.82rem;
      padding: 0 0.5rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    text-align: center;
  }

  .education-timeline {
    .timeline-item {
      gap: 0.75rem !important;
      flex-direction: column;

      .timeline-marker {
        flex-direction: row;
        margin-top: 0 !important;

        .marker-line {
          width: 40px !important;
          height: 2px !important;
          margin-top: 0 !important;
        }
      }

      .education-card {
        padding: 0.85rem;

        .education-header {
          flex-direction: column;
          gap: 0.6rem;
          text-align: center;

          .education-icon {
            margin: 0 auto;
            .q-icon {
              font-size: 1.7rem;
            }
          }

          .education-info {
            .education-degree {
              font-size: 1rem;
            }
            .education-institution {
              font-size: 0.85rem;
            }
            .education-period {
              font-size: 0.75rem;
              justify-content: center;
            }
          }
        }

        .education-description {
          font-size: 0.8rem;
        }

        .education-achievements {
          .achievements-title {
            font-size: 0.8rem;
          }
          .achievements-list li {
            font-size: 0.78rem;
          }
        }
      }
    }
  }

  .certifications-section {
    padding: 1.25rem 0;

    .certifications-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.6rem;
    }
  }

  .courses-section {
    .course-category {
      margin-bottom: 1.25rem;

      .category-header {
        font-size: 0.82rem;
      }

      .courses-list {
        padding-left: 0.75rem;

        .course-item .course-name {
          font-size: 0.78rem;
        }
        .course-platform,
        .course-duration {
          font-size: 0.72rem;
        }
      }
    }
  }

  .stats-section {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.6rem;
    }

    .stat-card {
      padding: 0.85rem;

      .stat-icon .q-icon {
        font-size: 1.5rem;
      }
      .stat-number {
        font-size: 1.3rem;
      }
      .stat-label {
        font-size: 0.72rem;
      }
    }
  }
}

// Animations
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>

<template>
  <q-page class="contact-page">
    <!-- Header Section -->
    <section class="contact-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title animate-slide-up">
            <q-icon name="terminal" class="text-hack-green" /> Contact.exe
          </h1>
          <p class="page-subtitle animate-fade-in">
            ¿Listo para colaborar? Construyamos algo increíble juntos.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Methods Section -->
    <section class="contact-methods">
      <div class="container">
        <div class="hack-grid cols-3">
          <!-- Email Contact -->
          <div class="hack-card contact-method" @click="openEmail">
            <div class="method-icon">
              <q-icon name="mail" size="3rem" class="text-hack-green" />
            </div>
            <h3>Email</h3>
            <p class="method-info">jamesfrankmendozarios@gmail.com</p>
            <p class="method-description">Envíame un email para consultas profesionales</p>
            <div class="method-status">
              <span class="status-dot online"></span>
              Respuesta en 24h
            </div>
          </div>

          <!-- LinkedIn Contact -->
          <div class="hack-card contact-method" @click="openLinkedIn">
            <div class="method-icon">
              <q-icon name="work" size="3rem" class="text-hack-blue" />
            </div>
            <h3>LinkedIn</h3>
            <p class="method-info">@menfroyt-dev</p>
            <p class="method-description">Networking profesional y oportunidades</p>
            <div class="method-status">
              <span class="status-dot online"></span>
              Activo diariamente
            </div>
          </div>

          <!-- GitHub Contact -->
          <div class="hack-card contact-method" @click="openGitHub">
            <div class="method-icon">
              <q-icon name="code" size="3rem" class="text-hack-yellow" />
            </div>
            <h3>GitHub</h3>
            <p class="method-info">@james250920</p>
            <p class="method-description">Revisa mi código y contribuciones</p>
            <div class="method-status">
              <span class="status-dot online"></span>
              Actualizado frecuentemente
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form-section">
      <div class="container">
        <div class="hack-grid cols-2">
          <!-- Terminal Info -->
          <div class="terminal-info">
            <div class="terminal">
              <div class="terminal-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
                <span class="terminal-title">~/contact/info</span>
              </div>
              <div class="terminal-content">
                <div class="terminal-line">cat contact-info.txt</div>
                <div class="output">
                  <div class="info-line">
                    <span class="text-hack-green">Name:</span> James Mendoza
                  </div>
                  <div class="info-line">
                    <span class="text-hack-blue">Location:</span> Disponible en Todo el Mundo
                  </div>
                  <div class="info-line">
                    <span class="text-hack-yellow">Timezone:</span> UTC-5 (EST)
                  </div>
                  <div class="info-line">
                    <span class="text-hack-purple">Availability:</span> Abierto a Oportunidades
                  </div>
                  <div class="info-line">
                    <span class="text-hack-cyan">Specialties:</span> Desarrollo Full-Stack
                  </div>
                </div>
                <div class="terminal-line">status --availability</div>
                <div class="output">
                  <span class="text-hack-green">● DISPONIBLE</span> - Listo para nuevos proyectos
                </div>
                <div class="terminal-line prompt">
                  <span>james@contact:~$ </span>
                  <span class="cursor-blink">|</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-container">
            <div class="hack-card">
              <h2 class="form-title">Enviar Mensaje</h2>
              <form @submit.prevent="sendMessage" class="contact-form">
                <div class="form-group">
                  <label for="name" class="form-label">Nombre</label>
                  <q-input
                    v-model="form.name"
                    id="name"
                    outlined
                    dark
                    class="hack-input"
                    placeholder="Tu nombre"
                    :rules="[(val) => !!val || 'El nombre es requerido']"
                  />
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <q-input
                    v-model="form.email"
                    id="email"
                    type="email"
                    outlined
                    dark
                    class="hack-input"
                    placeholder="tu.email@ejemplo.com"
                    :rules="[
                      (val) => !!val || 'El email es requerido',
                      (val) => /.+@.+\..+/.test(val) || 'El email debe ser válido',
                    ]"
                  />
                </div>

                <div class="form-group">
                  <label for="subject" class="form-label">Asunto</label>
                  <q-select
                    v-model="form.subject"
                    :options="subjectOptions"
                    outlined
                    dark
                    class="hack-input"
                    placeholder="Selecciona un asunto"
                  />
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">Mensaje</label>
                  <q-input
                    v-model="form.message"
                    id="message"
                    type="textarea"
                    outlined
                    dark
                    class="hack-input"
                    placeholder="Cuéntame sobre tu proyecto..."
                    :rules="[(val) => !!val || 'El mensaje es requerido']"
                    rows="5"
                  />
                </div>

                <div class="form-actions">
                  <button type="submit" class="hack-button primary" :disabled="!isFormValid">
                    <q-icon name="send" /> Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Contact Section -->
    <section class="quick-contact">
      <div class="container">
        <h2 class="section-title text-center">Contacto Rápido</h2>
        <div class="quick-contact-grid">
          <div class="quick-contact-item" @click="copyToClipboard('james@dev.com')">
            <q-icon name="content_copy" class="copy-icon" />
            <span>Copiar Email</span>
          </div>
          <div class="quick-contact-item" @click="openCalendar">
            <q-icon name="event" class="copy-icon" />
            <span>Agendar Reunión</span>
          </div>
          <div class="quick-contact-item" @click="downloadCV">
            <q-icon name="download" class="copy-icon" />
            <span>Descargar CV</span>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const subjectOptions = [
  'Colaboración en Proyecto',
  'Oportunidad Laboral',
  'Trabajo Freelance',
  'Consultoría Técnica',
  'Consulta General',
  'Otro',
];

// Computed properties
const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    /.+@.+\..+/.test(form.value.email) &&
    form.value.subject &&
    form.value.message
  );
});

// Methods
const sendMessage = () => {
  if (isFormValid.value) {
    // Simulate sending message
    $q.notify({
      type: 'positive',
      message: '¡Mensaje enviado exitosamente!',
      caption: 'Te responderé pronto.',
      icon: 'send',
    });

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
};

const openEmail = () => {
  window.open('mailto:jamesfrankmendozarios@gmail.com', '_blank');
};

const openLinkedIn = () => {
  window.open('https://www.linkedin.com/in/menfroyt-dev', '_blank');
};

const openGitHub = () => {
  window.open('https://github.com/james250920', '_blank');
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      $q.notify({
        type: 'positive',
        message: '¡Copiado al portapapeles!',
        icon: 'content_copy',
      });
    },
    () => {
      $q.notify({
        type: 'negative',
        message: 'Error al copiar al portapapeles.',
        icon: 'error',
      });
    },
  );
};

const openCalendar = () => {
  $q.notify({
    type: 'info',
    message: '¡Integración de calendario próximamente!',
    icon: 'event',
  });
};

const downloadCV = () => {
  $q.notify({
    type: 'info',
    message: '¡Descarga de CV estará disponible pronto!',
    icon: 'download',
  });
};
</script>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Header Section
.contact-header {
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

// Contact Methods
.contact-methods {
  padding: 3rem 0;

  .contact-method {
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: $hack-green;
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 255, 136, 0.15);
    }

    .method-icon {
      margin-bottom: 1.5rem;
    }

    h3 {
      color: $hack-white;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }

    .method-info {
      color: $hack-green;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .method-description {
      color: #c9d1d9;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .method-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: $hack-gray;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;

        &.online {
          background: $hack-green;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }
      }
    }
  }
}

// Contact Form Section
.contact-form-section {
  padding: 3rem 0;

  .terminal-info {
    .terminal {
      height: fit-content;

      .info-line {
        margin: 0.5rem 0;
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .contact-form-container {
    .form-title {
      color: $hack-blue;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .contact-form {
      .form-group {
        margin-bottom: 1.5rem;

        .form-label {
          display: block;
          color: $hack-white;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
        }
      }

      .form-actions {
        margin-top: 2rem;

        .hack-button {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;

          &.primary {
            border-color: $hack-green;
            color: $hack-green;

            &:hover {
              background: $hack-green;
              color: #000;
            }

            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;

              &:hover {
                background: transparent;
                color: $hack-green;
                transform: none;
              }
            }
          }
        }
      }
    }
  }
}

// Quick Contact
.quick-contact {
  padding: 3rem 0;

  .section-title {
    color: $hack-blue;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .quick-contact-grid {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;

    .quick-contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: rgba(22, 27, 34, 0.8);
      border: 1px solid $hack-border;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'JetBrains Mono', monospace;
      color: $hack-white;

      &:hover {
        border-color: $hack-blue;
        background: rgba(0, 204, 255, 0.1);
        transform: translateY(-2px);
      }

      .copy-icon {
        color: $hack-blue;
      }
    }
  }
}

// Custom input styles
:deep(.hack-input) {
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
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .contact-header {
    padding: 2rem 0 1rem;

    .page-title {
      font-size: 2.5rem;
    }
  }

  .container {
    padding: 0 1rem;
  }

  .quick-contact-grid {
    flex-direction: column;
    align-items: center;

    .quick-contact-item {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
}
</style>

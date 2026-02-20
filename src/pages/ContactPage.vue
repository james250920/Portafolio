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
                    <span class="text-hack-blue">Location:</span> Disponible
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
                  <span>DevMenfroyt@contact:~$ </span>
                  <span class="cursor-blink">|</span>
                </div>
              </div>
            </div>
          </div>

          <!-- LinkedIn Contact -->
          <div class="hack-card contact-method" @click="openLinkedIn">
            <div class="method-icon">
              <q-icon name="work" size="2.2rem" class="text-hack-blue" />
            </div>
            <h3>LinkedIn</h3>
            <p class="method-info">@menfroyt-dev</p>
            <p class="method-description">Networking profesional y oportunidades</p>
            <div class="method-status">
              <span class="status-dot online"></span>
              Activo
            </div>
          </div>

          <!-- GitHub Contact -->
          <div class="hack-card contact-method" @click="openGitHub">
            <div class="method-icon">
              <q-icon name="code" size="2.2rem" class="text-hack-yellow" />
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
          <!-- Contact Form -->
          <div class="contact-form-container">
            <div class="hack-card">
              <h2 class="form-title">Enviar Mensaje</h2>
              <q-form @submit="sendMessage" class="contact-form" ref="contactForm">
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
                    :rules="[(val) => !!val || 'Debes seleccionar un asunto']"
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
                    :rules="[
                      (val) => !!val || 'El mensaje es requerido',
                      (val) => validateForbiddenWords(val),
                    ]"
                    rows="5"
                  />
                </div>

                <div class="form-actions">
                  <button type="submit" class="hack-button primary">
                    <q-icon name="send" /> Enviar Mensaje
                  </button>
                </div>
              </q-form>
            </div>
          </div>
          <!-- Quick Contact Section -->
          <section class="quick-contact">
            <div class="container">
              <h2 class="section-title text-center">Contacto Rápido</h2>
              <div class="quick-contact-grid">
                <div
                  class="quick-contact-item"
                  @click="copyToClipboard('jamesfrankmendozarios@gmail.com')"
                >
                  <q-icon name="content_copy" class="copy-icon" />
                  <span>Copiar Email</span>
                </div>

                <div class="quick-contact-item" @click="downloadCV">
                  <q-icon name="download" class="copy-icon" />
                  <span>Descargar CV</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { sendEmail } from 'src/service/email.service';

type ContactFormRef = {
  validate: () => Promise<boolean>;
  resetValidation: () => void;
};

const $q = useQuasar();
const contactForm = ref<ContactFormRef | null>(null);

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const subjectOptions = ['Colaboración en Proyecto', 'Oportunidad Laboral', 'Trabajo Freelance'];

// Lista de palabras prohibidas
const forbiddenWords = [
  'idiota',
  'imbecil',
  'estupido',
  'tonto',
  'pendejo',
  'mierda',
  'puto',
  'puta',
  'carajo',
  'joder',
  'maldito',
  'bastardo',
  'cabron',
  'hijo de puta',
  'hdp',
  'gilipollas',
  'boludo',
  'pelotudo',
  'estúpido',
  'imbécil',
  'cabrón',
  'hijo de perra',
];

// Función para validar palabras prohibidas
const validateForbiddenWords = (text: string): boolean | string => {
  if (!text) return true;

  const normalizedText = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Elimina acentos

  for (const word of forbiddenWords) {
    const normalizedWord = word
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (normalizedText.includes(normalizedWord)) {
      return 'Por favor, mantén un lenguaje respetuoso y profesional';
    }
  }

  return true;
};

// Methods
const sendMessage = async () => {
  // Validar formulario antes de enviar
  const valid = await contactForm.value?.validate();
  if (!valid) return;

  // Guardar posición de scroll para restaurarla después del envío
  const savedScrollY = window.scrollY;

  try {
    $q.loading.show({
      message: 'Enviando mensaje...',
    });

    await sendEmail({
      sender: {
        email: 'jamesfrankmendozarios@gmail.com',
        name: 'Portafolio',
      },
      to: [
        {
          email: 'jamesfrankmendozarios@gmail.com',
          name: form.value.name,
        },
      ],
      subject: form.value.subject,
      htmlContent: `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color: #2c3e50; border-bottom: 2px solid #eaeaea; padding-bottom: 8px;">
    📩 Nuevo mensaje de contacto
  </h2>

  <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-top: 10px;">
    <tr>
      <td style="font-weight: bold; width: 90px;">De:</td>
      <td>${form.value.name}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Email:</td>
      <td>
        <a href="mailto:${form.value.email}" style="color: #1a73e8; text-decoration: none;">
          ${form.value.email}
        </a>
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Asunto:</td>
      <td>${form.value.subject}</td>
    </tr>
  </table>

  <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">

  <h3 style="margin-bottom: 8px; color: #2c3e50;">Mensaje</h3>

  <div style="background-color: #f9f9f9; padding: 12px; border-radius: 6px;">
    ${form.value.message.replace(/\n/g, '<br>')}
  </div>

  <p style="margin-top: 20px; font-size: 12px; color: #777;">
    Este mensaje fue enviado desde el formulario de contacto del sitio web.
  </p>
</div>

        `,
      textContent: form.value.message,
    });

    $q.notify({
      type: 'positive',
      message: '¡Mensaje enviado exitosamente!',
      caption: 'Te responderé pronto.',
      icon: 'mail',
      color: 'green',
    });

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
    // Esperar el siguiente tick para limpiar la validación sin mostrar errores rojos
    await nextTick();
    contactForm.value?.resetValidation();
  } catch (error) {
    console.error('Error sending contact message:', error);

    $q.notify({
      type: 'negative',
      message: 'Error al enviar el mensaje',
      caption: 'Por favor, intenta de nuevo más tarde.',
      icon: 'error',
    });
  } finally {
    $q.loading.hide();
    // Restaurar posición de scroll para que no suba al inicio de la página
    await nextTick();
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  }
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
  padding: 0 1.5rem;
}

// Header Section
.contact-header {
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
    max-width: 600px;
    margin: 0 auto;
  }
}

// Contact Methods
.contact-methods {
  padding: 2rem 0;

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
      margin-bottom: 1rem;
    }

    h3 {
      color: $hack-white;
      margin-bottom: 0.4rem;
      font-size: 1.2rem;
    }

    .method-info {
      color: $hack-green;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    .method-description {
      color: #c9d1d9;
      font-size: 0.82rem;
      margin-bottom: 0.75rem;
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
  padding: 2rem 0;

  .terminal-info {
    .terminal {
      height: fit-content;

      .info-line {
        margin: 0.4rem 0;
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .contact-form-container {
    .form-title {
      color: $hack-blue;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .contact-form {
      .form-group {
        margin-bottom: 1.2rem;

        .form-label {
          display: block;
          color: $hack-white;
          font-weight: 600;
          margin-bottom: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
        }
      }

      .form-actions {
        margin-top: 1.5rem;

        .hack-button {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.88rem;

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
  padding: 2rem 0;

  .section-title {
    color: $hack-blue;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  .quick-contact-grid {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;

    .quick-contact-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.75rem 1.5rem;
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

  .contact-methods {
    padding: 1.25rem 0;

    .hack-grid {
      grid-template-columns: 1fr !important;
      gap: 0.75rem;
    }

    .terminal-info {
      order: -1;
    }

    .contact-method {
      padding: 1rem;

      .method-icon .q-icon {
        font-size: 1.7rem;
      }
      h3 {
        font-size: 1rem;
      }
      .method-info {
        font-size: 0.78rem;
      }
      .method-description {
        font-size: 0.75rem;
      }
    }
  }

  .contact-form-section {
    padding: 1.25rem 0;

    .hack-grid {
      grid-template-columns: 1fr !important;
    }

    .form-title {
      font-size: 1.2rem;
    }
    .form-label {
      font-size: 0.8rem;
    }

    .form-actions .hack-button {
      width: 100%;
      font-size: 0.82rem;
      padding: 0.6rem 1rem;
    }
  }

  .quick-contact {
    .section-title {
      font-size: 1.25rem;
    }

    .quick-contact-grid {
      flex-direction: column;
      gap: 0.6rem;
      align-items: stretch;

      .quick-contact-item {
        width: 100%;
        justify-content: center;
        padding: 0.75rem;
        font-size: 0.82rem;

        .copy-icon {
          font-size: 1.1rem;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .contact-header {
    .page-title {
      font-size: 1.3rem;
    }
  }
}
</style>

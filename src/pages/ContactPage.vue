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
            {{ t('contact.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="contact-main-section">
      <div class="container">
        <div class="contact-layout">
          <!-- LEFT: Contact Form -->
          <div class="contact-form-container">
            <div class="hack-card form-card">
              <h2 class="form-title">{{ t('contact.send') }}</h2>
              <q-form @submit="sendMessage" class="contact-form" ref="contactForm">
                <div class="form-group">
                  <label for="name" class="form-label">{{ t('contact.name') }}</label>
                  <q-input
                    v-model="form.name"
                    id="name"
                    outlined
                    dark
                    class="hack-input"
                    :placeholder="t('contact.namePlaceholder')"
                    :rules="[(val) => !!val || t('contact.nameRequired')]"
                  />
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">{{ t('contact.email') }}</label>
                  <q-input
                    v-model="form.email"
                    id="email"
                    type="email"
                    outlined
                    dark
                    class="hack-input"
                    :placeholder="t('contact.emailPlaceholder')"
                    :rules="[
                      (val) => !!val || t('contact.emailRequired'),
                      (val) => /.+@.+\..+/.test(val) || t('contact.emailInvalid'),
                    ]"
                  />
                </div>

                <div class="form-group">
                  <label for="subject" class="form-label">{{ t('contact.subject') }}</label>
                  <q-select
                    v-model="form.subject"
                    :options="subjectOptions"
                    outlined
                    dark
                    class="hack-input"
                    :rules="[(val) => !!val || t('contact.subjectRequired')]"
                  >
                    <template #selected>
                      <span v-if="form.subject">{{ form.subject }}</span>
                      <span v-else class="select-placeholder">{{
                        t('contact.subjectPlaceholder')
                      }}</span>
                    </template>
                  </q-select>
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">{{ t('contact.message') }}</label>
                  <q-input
                    v-model="form.message"
                    id="message"
                    type="textarea"
                    outlined
                    dark
                    class="hack-input"
                    :placeholder="t('contact.messagePlaceholder')"
                    :rules="[
                      (val) => !!val || t('contact.messageRequired'),
                      (val) => validateForbiddenWords(val),
                    ]"
                    rows="5"
                  />
                </div>

                <div class="form-actions">
                  <button type="submit" class="hack-button primary">
                    <q-icon name="send" /> {{ t('contact.send') }}
                  </button>
                </div>
              </q-form>
            </div>
          </div>

          <!-- RIGHT: Terminal -->
          <div class="contact-sidebar">
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
                      <span class="text-hack-blue">Location:</span> {{ t('contact.location') }}
                    </div>
                    <div class="info-line">
                      <span class="text-hack-yellow">Timezone:</span> UTC-5 (PET)
                    </div>
                    <div class="info-line">
                      <span class="text-hack-purple">Availability:</span>
                      {{ t('contact.openOpportunities') }}
                    </div>
                    <div class="info-line">
                      <span class="text-hack-cyan">Specialties:</span> Full-Stack Dev
                    </div>
                  </div>
                  <div class="terminal-line">status --availability</div>
                  <div class="output">
                    <span class="text-hack-green">● {{ t('contact.available') }}</span> -
                    {{ t('contact.readyProjects') }}
                  </div>
                  <div class="terminal-line prompt">
                    <span>DevMenfroyt@contact:~$ </span>
                    <span class="cursor-blink">|</span>
                  </div>
                </div>
              </div>
            </div>

            <img
              src="/images/duo-hacker.webp"
              :alt="t('contact.mascotAlt')"
              class="contact-mascot"
              width="600"
              height="800"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { sendEmail } from 'src/service/email.service';
import { useLanguage } from 'src/composables/useLanguage';

const { t } = useLanguage();

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

const subjectOptions = computed(() => [
  t('contact.opt.collaboration'),
  t('contact.opt.job'),
  t('contact.opt.freelance'),
]);

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
      return t('contact.respectful');
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
      message: t('contact.sending'),
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
      message: t('contact.success'),
      caption: t('contact.successCaption'),
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
      message: t('contact.error'),
      caption: t('contact.errorCaption'),
      icon: 'error',
    });
  } finally {
    $q.loading.hide();
    // Restaurar posición de scroll para que no suba al inicio de la página
    await nextTick();
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  }
};
</script>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  background: transparent;

  .hack-card.form-card,
  .terminal,
  .terminal .terminal-header {
    background: var(--scene-panel-background, transparent) !important;
    backdrop-filter: var(--scene-panel-filter, none);
  }
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

// Main Contact Section
.contact-main-section {
  padding: 2rem 0;

  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: stretch;
  }

  // LEFT: Form
  .contact-form-container {
    display: flex;
    flex-direction: column;

    .form-card {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .form-title {
      color: $hack-blue;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .contact-form {
      flex: 1;
      display: flex;
      flex-direction: column;

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
        margin-top: auto;
        padding-top: 1.5rem;

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

  // RIGHT: Sidebar
  .contact-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .terminal-info {
      .terminal {
        .info-line {
          margin: 0.4rem 0;
          display: flex;
          gap: 0.5rem;
          font-size: 0.82rem;
        }
      }
    }

    .contact-mascot {
      align-self: center;
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 340px;
      filter: drop-shadow(0 0 18px rgba(0, 255, 136, 0.3));
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
  .select-placeholder {
    color: #8b949e;
  }

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

  .contact-main-section {
    padding: 1.25rem 0;

    .contact-layout {
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

    .contact-sidebar {
      flex-direction: column;

      .contact-mascot {
        max-height: 260px;
      }
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

// On narrow screens the crow tree sits right behind the form, so give it a solid panel
@media (max-width: 768px) {
  :global(html:not([data-theme='light'])) .contact-page .hack-card.form-card {
    background: rgba(13, 17, 23, 0.88) !important;
    backdrop-filter: blur(6px);
  }
}
</style>

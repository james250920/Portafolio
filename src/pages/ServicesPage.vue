<template>
  <div class="services-page">
    <!-- Cyberpunk Background Effect -->
    <CyberpunkBackground />

    <!-- Back Button -->
    <router-link to="/" class="back-btn">
      <q-icon name="arrow_back" size="24px" />
      <span>Volver</span>
    </router-link>

    <!-- Header -->
    <header class="services-header">
      <div class="container">
        <h1 class="glitch-title" data-text="SERVICIOS">SERVICIOS</h1>
        <p class="subtitle">Soluciones digitales a tu medida</p>
        <div class="header-decoration">
          <span class="line"></span>
          <span class="icon">
            <q-icon name="terminal" />
          </span>
          <span class="line"></span>
        </div>
      </div>
    </header>

    <!-- Services Grid -->
    <section class="services-section">
      <div class="container">
        <div class="services-grid">
          <div
            v-for="(service, index) in services"
            :key="service.id"
            class="service-card"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="card-glow"></div>
            <div class="card-content">
              <div class="service-icon">
                <q-icon :name="service.icon" size="48px" />
              </div>
              <h3 class="service-title">{{ service.name }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <q-icon name="check_circle" size="16px" />
                  {{ feature }}
                </li>
              </ul>
              <a :href="service.link" target="_blank" rel="noopener noreferrer" class="service-cta">
                <span>Solicitar</span>
                <q-icon name="arrow_forward" />
              </a>
            </div>
            <div class="card-border"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>Transformemos tu idea en realidad con tecnología de vanguardia</p>
            <div class="cta-buttons">
              <a
                :href="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-btn primary"
              >
                <q-icon name="chat" />
                Hablemos por WhatsApp
              </a>
              <button @click="showEmailModal = true" class="cta-btn secondary">
                <q-icon name="mail" />
                Enviar Email
              </button>
            </div>
          </div>
          <div class="cta-decoration">
            <div class="code-block">
              <pre><code>const proyecto = {
  cliente: "Tú",
  desarrollador: "James",
  estado: "Listo para iniciar",
  tecnologías: ["Vue", "Node", "Kotlin"]
};

iniciarProyecto(proyecto);</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Matrix Animation Section -->
    <section class="matrix-section">
      <div class="container">
        <div class="matrix-header">
          <span class="matrix-prompt">$ ./loading_stats.sh</span>
          <span class="matrix-status">// Recopilando datos...</span>
        </div>
        <div class="matrix-grid">
          <div class="matrix-box" v-for="box in matrixBoxes" :key="box.id">
            <div class="matrix-rain">
              <span
                v-for="(char, idx) in box.chars"
                :key="idx"
                class="matrix-char"
                :style="{ animationDelay: `${idx * 0.1}s`, left: `${idx * 20}%` }"
              >
                {{ char }}
              </span>
            </div>
            <div class="matrix-content">
              <q-icon :name="box.icon" size="32px" />
              <span class="matrix-label">{{ box.label }}</span>
              <span class="matrix-loading">
                <span class="loading-bar"></span>
              </span>
            </div>
          </div>
        </div>
        <div class="matrix-footer">
          <span class="blink-cursor">_</span>
          <span class="footer-text">Construyendo experiencia...</span>
        </div>
      </div>
    </section>
  </div>

  <!-- Email Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showEmailModal" class="modal-overlay" @click.self="showEmailModal = false">
        <div class="modal-container">
          <button class="modal-close" @click="showEmailModal = false">
            <q-icon name="close" size="24px" />
          </button>

          <div class="modal-header">
            <div class="terminal-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <h2 class="modal-title"><q-icon name="mail" /> Enviar Mensaje</h2>
            <p class="modal-subtitle">// Cuéntame sobre tu proyecto</p>
          </div>

          <q-form @submit="sendMessage" class="modal-form" ref="contactForm">
            <div class="form-group">
              <label class="form-label">> Nombre</label>
              <q-input
                v-model="form.name"
                outlined
                dark
                dense
                class="matrix-input"
                placeholder="Tu nombre"
                :rules="[(val) => !!val || 'El nombre es requerido']"
              />
            </div>

            <div class="form-group">
              <label class="form-label">> Email</label>
              <q-input
                v-model="form.email"
                type="email"
                outlined
                dark
                dense
                class="matrix-input"
                placeholder="tu.email@ejemplo.com"
                :rules="[
                  (val) => !!val || 'El email es requerido',
                  (val) => /.+@.+\..+/.test(val) || 'Email inválido',
                ]"
              />
            </div>

            <div class="form-group">
              <label class="form-label">> Servicio</label>
              <q-select
                v-model="form.subject"
                :options="subjectOptions"
                outlined
                dark
                dense
                emit-value
                map-options
                class="matrix-input"
                popup-content-class="matrix-select-popup"
                label="Selecciona un servicio"
                :rules="[(val) => !!val || 'Selecciona un servicio']"
              />
            </div>

            <div class="form-group">
              <label class="form-label">> Mensaje</label>
              <q-input
                v-model="form.message"
                type="textarea"
                outlined
                dark
                dense
                class="matrix-input"
                placeholder="Cuéntame sobre tu proyecto..."
                :rules="[(val) => !!val || 'El mensaje es requerido']"
                rows="4"
              />
            </div>

            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="showEmailModal = false">
                Cancelar
              </button>
              <button type="submit" class="submit-btn">
                <q-icon name="send" />
                Enviar
              </button>
            </div>
          </q-form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import CyberpunkBackground from '../components/CyberpunkBackground.vue';
import { sendEmail } from 'src/service/email.service';

const $q = useQuasar();

type ContactFormRef = {
  validate: () => Promise<boolean>;
  resetValidation: () => void;
};

const contactForm = ref<ContactFormRef | null>(null);
const showEmailModal = ref(false);

const whatsappNumber = '51993375345';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesa%20contratar%20tus%20servicios`;

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const subjectOptions = [
  'Desarrollo Web',
  'Desarrollo Móvil',
  'Backend & APIs',
  'QA & Testing',
  'Soluciones Digitales',
];

// Send message
const sendMessage = async () => {
  const valid = await contactForm.value?.validate();
  if (!valid) return;

  try {
    $q.loading.show({
      message: 'Enviando mensaje...',
    });

    await sendEmail({
      sender: {
        email: 'jamesfrankmendozarios@gmail.com',
        name: 'Portafolio - Servicios',
      },
      to: [
        {
          email: 'jamesfrankmendozarios@gmail.com',
          name: form.value.name,
        },
      ],
      subject: `[Servicios] ${form.value.subject}`,
      htmlContent: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 8px;">
          <div style="border-left: 3px solid #00ff88; padding-left: 15px; margin-bottom: 20px;">
            <h2 style="color: #00ff88; margin: 0;">📩 Nueva solicitud de servicio</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #00ff88; width: 100px;">Nombre:</td>
              <td style="padding: 10px 0;">${form.value.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #00ff88;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${form.value.email}" style="color: #58a6ff;">${form.value.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #00ff88;">Servicio:</td>
              <td style="padding: 10px 0;">${form.value.subject}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #161b22; border-radius: 6px; border: 1px solid #30363d;">
            <p style="color: #00ff88; margin: 0 0 10px 0;">// Mensaje:</p>
            <p style="margin: 0; line-height: 1.6;">${form.value.message.replace(/\n/g, '<br>')}</p>
          </div>

          <p style="margin-top: 20px; color: #8b949e; font-size: 12px;">
            Enviado desde la página de Servicios del Portafolio
          </p>
        </div>
      `,
    });

    $q.loading.hide();
    showEmailModal.value = false;

    $q.notify({
      type: 'positive',
      message: '¡Mensaje enviado exitosamente!',
      caption: 'Te responderé lo antes posible',
      icon: 'check_circle',
      position: 'top',
      timeout: 3000,
    });

    // Reset form
    form.value = { name: '', email: '', subject: '', message: '' };
    contactForm.value?.resetValidation();
  } catch {
    $q.loading.hide();
    $q.notify({
      type: 'negative',
      message: 'Error al enviar el mensaje',
      caption: 'Por favor, intenta de nuevo',
      icon: 'error',
      position: 'top',
    });
  }
};

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
}

const services = ref<Service[]>([
  {
    id: 1,
    name: 'Desarrollo Web',
    description:
      'Aplicaciones web modernas, rápidas y escalables con las mejores tecnologías del mercado.',
    icon: 'language',
    features: [
      'Vue.js / Angular / Flask',
      'Diseño Responsivo',
      'SEO Optimizado',
      'Alto Rendimiento',
    ],
    link: `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesa%20un%20proyecto%20de%20desarrollo%20web`,
  },
  {
    id: 2,
    name: 'Desarrollo Móvil',
    description:
      'Aplicaciones nativas y multiplataforma para Android e iOS con experiencia de usuario excepcional.',
    icon: 'smartphone',
    features: [
      'Kotlin / Jetpack Compose',
      'Flutter Multiplataforma',
      'UI/UX Moderno',
      'Publicación en Stores',
    ],
    link: `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesa%20un%20proyecto%20de%20desarrollo%20móvil`,
  },
  {
    id: 3,
    name: 'Backend & APIs',
    description: 'Arquitecturas robustas y APIs escalables para potenciar tus aplicaciones.',
    icon: 'dns',
    features: [
      '.NET / FastAPI / Express',
      'Bases de Datos SQL/NoSQL',
      'APIs RESTful & GraphQL',
      'Microservicios',
    ],
    link: `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesa%20un%20proyecto%20de%20backend`,
  },
  {
    id: 4,
    name: 'QA & Testing',
    description: 'Asegura la calidad de tu software con pruebas automatizadas y manuales.',
    icon: 'bug_report',
    features: [
      'Cypress / Selenium / Appium',
      'Pruebas E2E y Unitarias',
      'Performance con K6',
      'CI/CD Integration',
    ],
    link: `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesa%20servicios%20de%20QA`,
  },
  // Servicio temporalmente oculto
  // {
  //   id: 5,
  //   name: 'Consultoría Tech',
  //   description: 'Asesoría técnica para tomar las mejores decisiones tecnológicas en tu proyecto.',
  //   icon: 'psychology',
  //   features: ['Arquitectura de Software', 'Code Review', 'Optimización', 'Mentoría Técnica'],
  //   link: `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesa%20una%20consultoría%20técnica`,
  // },
  {
    id: 6,
    name: 'Soluciones Digitales',
    description: 'Transformación digital completa para llevar tu negocio al siguiente nivel.',
    icon: 'rocket_launch',
    features: [
      'Automatización de Procesos',
      'Integración de Sistemas',
      'Dashboards & Analytics',
      'Soluciones Cloud',
    ],
    link: `https://wa.me/${whatsappNumber}?text=Hola%20James,%20me%20interesan%20soluciones%20digitales%20para%20mi%20negocio`,
  },
]);

// Matrix animation data
const matrixChars = '01アイウエオカキクケコサシスセソタチツテト';
const generateChars = () => {
  return Array.from(
    { length: 5 },
    () => matrixChars[Math.floor(Math.random() * matrixChars.length)],
  );
};

const matrixBoxes = ref([
  { id: 1, icon: 'code', label: 'Proyectos', chars: generateChars() },
  { id: 2, icon: 'people', label: 'Clientes', chars: generateChars() },
  { id: 3, icon: 'memory', label: 'Tecnologías', chars: generateChars() },
  { id: 4, icon: 'schedule', label: 'Experiencia', chars: generateChars() },
]);

// Regenerate matrix chars periodically
onMounted(() => {
  setInterval(() => {
    matrixBoxes.value.forEach((box) => {
      box.chars = generateChars();
    });
  }, 3000);
});
</script>

<style lang="scss" scoped>
.services-page {
  min-height: 100vh;
  background: #0a0a12;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 4rem;
}

// Back Button
.back-btn {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(13, 17, 23, 0.95);
  border: 1px solid rgba(0, 255, 136, 0.4);
  border-radius: 8px;
  color: #00ff88;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.1);

  &::before {
    content: '>';
    color: #00ff88;
    margin-right: 4px;
  }

  &:hover {
    background: rgba(0, 255, 136, 0.1);
    box-shadow: 0 0 25px rgba(0, 255, 136, 0.3);
    border-color: rgba(0, 255, 136, 0.7);
    transform: translateX(-5px);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

// Header
.services-header {
  padding: 8rem 0 4rem;
  text-align: center;

  .glitch-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 700;
    color: #00ff88;
    text-shadow:
      0 0 10px rgba(0, 255, 136, 0.8),
      0 0 20px rgba(0, 255, 136, 0.5),
      0 0 40px rgba(0, 255, 136, 0.3);
    letter-spacing: 4px;
    margin-bottom: 1rem;
    position: relative;

    &::before {
      content: '$ ./servicios.sh';
      display: block;
      font-size: 0.9rem;
      color: rgba(0, 255, 136, 0.5);
      letter-spacing: 0;
      margin-bottom: 0.5rem;
    }
  }

  .subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.1rem;
    color: rgba(0, 255, 136, 0.7);
    margin-bottom: 2rem;

    &::before {
      content: '// ';
      color: rgba(0, 255, 136, 0.4);
    }
  }

  .header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .line {
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #00ff88, transparent);
    }

    .icon {
      color: #00ff88;
      font-size: 1.5rem;
      text-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
    }
  }
}

@keyframes title-glow {
  from {
    text-shadow:
      0 0 10px rgba(0, 255, 136, 0.8),
      0 0 20px rgba(0, 255, 136, 0.5),
      0 0 40px rgba(0, 255, 136, 0.3);
  }
  to {
    text-shadow:
      0 0 15px rgba(0, 255, 136, 1),
      0 0 30px rgba(0, 255, 136, 0.7),
      0 0 50px rgba(0, 255, 136, 0.5);
  }
}
@keyframes glitch-effect {
  from {
    text-shadow:
      0 0 10px #ff00ff,
      0 0 20px #ff00ff,
      0 0 30px #ff00ff;
  }
}

// Services Grid
.services-section {
  padding: 2rem 0 4rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
}

.service-card {
  position: relative;
  background: rgba(13, 17, 23, 0.9);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.2);
  overflow: hidden;
  animation: card-appear 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    opacity: 0.5;
  }

  &:hover {
    border-color: rgba(0, 255, 136, 0.6);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.15);

    .card-glow {
      opacity: 1;
    }

    .service-icon {
      transform: scale(1.1);
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    }

    .card-border {
      opacity: 1;
    }
  }

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.5), rgba(0, 200, 100, 0.3));
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card-content {
    position: relative;
    padding: 2rem;
    z-index: 1;
  }

  .service-icon {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: #00ff88;
    transition: all 0.3s ease;
  }

  .service-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.3rem;
    font-weight: 600;
    color: #00ff88;
    margin-bottom: 1rem;

    &::before {
      content: '> ';
      color: rgba(0, 255, 136, 0.5);
    }
  }

  .service-description {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .service-features {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    border-left: 2px solid rgba(0, 255, 136, 0.3);
    padding-left: 1rem;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.7);
      font-family: 'JetBrains Mono', monospace;

      .q-icon {
        color: #00ff88;
      }
    }
  }

  .service-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: transparent;
    border: 1px solid #00ff88;
    border-radius: 4px;
    color: #00ff88;
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &::before {
      content: '$';
      color: rgba(0, 255, 136, 0.5);
    }

    &:hover {
      background: rgba(0, 255, 136, 0.15);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
      transform: translateX(5px);
    }
  }
}

@keyframes card-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// CTA Section
.cta-section {
  padding: 4rem 0;
}

.cta-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: rgba(13, 17, 23, 0.95);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.cta-content {
  h2 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.8rem;
    color: #00ff88;
    margin-bottom: 1rem;

    &::before {
      content: '> ';
      color: rgba(0, 255, 136, 0.5);
    }
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 2rem;
    font-size: 1rem;
    font-family: 'JetBrains Mono', monospace;
  }
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 4px;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  transition: all 0.3s ease;

  &.primary {
    background: rgba(0, 255, 136, 0.15);
    border: 1px solid #00ff88;
    color: #00ff88;

    &:hover {
      background: rgba(0, 255, 136, 0.25);
      box-shadow: 0 0 25px rgba(0, 255, 136, 0.3);
      transform: translateY(-3px);
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid rgba(0, 255, 136, 0.5);
    color: rgba(0, 255, 136, 0.8);

    &:hover {
      border-color: #00ff88;
      color: #00ff88;
      background: rgba(0, 255, 136, 0.1);
      transform: translateY(-3px);
    }
  }
}

.cta-decoration {
  display: flex;
  align-items: center;
  justify-content: center;

  .code-block {
    background: #0d1117;
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 12px;
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);

    pre {
      margin: 0;
    }
  }
}

// Matrix Animation Section
.matrix-section {
  padding: 4rem 0;
}

.matrix-header {
  text-align: center;
  margin-bottom: 2rem;

  .matrix-prompt {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    color: #00ff88;
    margin-bottom: 0.5rem;
  }

  .matrix-status {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: rgba(0, 255, 136, 0.5);
  }
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    gap: 1rem;
  }
}

.matrix-box {
  position: relative;
  background: rgba(13, 17, 23, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  padding: 2rem 1rem;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    animation: scan-line 2s linear infinite;
  }

  &:hover {
    border-color: rgba(0, 255, 136, 0.6);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
    transform: translateY(-5px);

    .matrix-rain .matrix-char {
      opacity: 1;
    }
  }
}

@keyframes scan-line {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

.matrix-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;

  .matrix-char {
    position: absolute;
    top: -20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: #00ff88;
    opacity: 0.3;
    animation: matrix-fall 3s linear infinite;
    text-shadow: 0 0 10px #00ff88;
  }
}

@keyframes matrix-fall {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(150px);
    opacity: 0;
  }
}

.matrix-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .q-icon {
    color: #00ff88;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
  }

  .matrix-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .matrix-loading {
    width: 80%;
    height: 4px;
    background: rgba(0, 255, 136, 0.1);
    border-radius: 2px;
    overflow: hidden;

    .loading-bar {
      display: block;
      width: 30%;
      height: 100%;
      background: linear-gradient(90deg, transparent, #00ff88, transparent);
      animation: loading-move 1.5s ease-in-out infinite;
    }
  }
}

@keyframes loading-move {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.matrix-footer {
  text-align: center;
  margin-top: 2rem;
  font-family: 'JetBrains Mono', monospace;

  .blink-cursor {
    color: #00ff88;
    animation: blink 1s step-end infinite;
    margin-right: 5px;
  }

  .footer-text {
    color: rgba(0, 255, 136, 0.6);
    font-size: 0.9rem;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

// Modal Styles
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  background: #0d1117;
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  box-shadow:
    0 0 40px rgba(0, 255, 136, 0.15),
    0 25px 50px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 6px;
  color: rgba(0, 255, 136, 0.7);
  padding: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 255, 136, 0.1);
    border-color: #00ff88;
    color: #00ff88;
  }
}

.modal-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.terminal-dots {
  display: flex;
  gap: 6px;
  margin-bottom: 1rem;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &.red {
      background: #ff5f56;
    }
    &.yellow {
      background: #ffbd2e;
    }
    &.green {
      background: #27c93f;
    }
  }
}

.modal-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.4rem;
  color: #00ff88;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: rgba(0, 255, 136, 0.5);
  margin: 0;
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #00ff88;
  margin-bottom: 0.5rem;
}

.matrix-input {
  :deep(.q-field__control) {
    background: rgba(0, 255, 136, 0.03);
    border-radius: 6px;

    &::before {
      border-color: rgba(0, 255, 136, 0.2);
    }

    &:hover::before {
      border-color: rgba(0, 255, 136, 0.4);
    }
  }

  :deep(.q-field__control-container) {
    font-family: 'JetBrains Mono', monospace;
  }

  :deep(.q-field--focused .q-field__control::after) {
    border-color: #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
  }

  :deep(input),
  :deep(textarea),
  :deep(.q-field__native) {
    color: #fff;
    font-family: 'JetBrains Mono', monospace;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 255, 136, 0.1);
}

.cancel-btn {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid #00ff88;
  border-radius: 6px;
  color: #00ff88;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.25);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
    transform: translateY(-2px);
  }
}

// Responsive - Tablets (768px - 1024px)
@media (max-width: 1024px) {
  .container {
    padding: 0 1.5rem;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .cta-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .cta-content {
    h2 {
      font-size: 1.5rem;
    }
  }

  .cta-buttons {
    justify-content: center;
  }

  .cta-decoration {
    display: none;
  }
}

// Responsive - Mobile Large (600px - 768px)
@media (max-width: 768px) {
  .back-btn {
    top: 20px;
    left: 15px;
    padding: 10px 16px;
    font-size: 12px;

    span {
      display: none;
    }
  }

  .services-header {
    padding: 6rem 0 2rem;

    .glitch-title {
      font-size: 2rem;
      letter-spacing: 2px;

      &::before {
        font-size: 0.75rem;
      }
    }

    .subtitle {
      font-size: 0.9rem;
    }

    .header-decoration .line {
      width: 60px;
    }
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .service-card {
    .card-content {
      padding: 1.5rem;
    }

    .service-icon {
      width: 60px;
      height: 60px;

      .q-icon {
        font-size: 36px !important;
      }
    }

    .service-title {
      font-size: 1.1rem;
    }

    .service-description {
      font-size: 0.85rem;
    }

    .service-features li {
      font-size: 0.8rem;
    }

    .service-cta {
      padding: 10px 20px;
      font-size: 0.85rem;
      width: 100%;
      justify-content: center;
    }
  }

  .cta-section {
    padding: 2rem 0;
  }

  .cta-card {
    padding: 1.5rem;
  }

  .cta-content {
    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
  }

  .cta-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .matrix-section {
    padding: 2rem 0;
  }

  .matrix-header {
    .matrix-prompt {
      font-size: 0.85rem;
    }
    .matrix-status {
      font-size: 0.75rem;
    }
  }

  .matrix-box {
    padding: 1.5rem 0.75rem;

    .matrix-content {
      .q-icon {
        font-size: 24px !important;
      }

      .matrix-label {
        font-size: 0.7rem;
      }
    }
  }

  .matrix-footer {
    .footer-text {
      font-size: 0.8rem;
    }
  }
}

// Responsive - Mobile Small (menos de 400px)
@media (max-width: 400px) {
  .container {
    padding: 0 1rem;
  }

  .back-btn {
    top: 15px;
    left: 10px;
    padding: 8px 12px;

    .q-icon {
      font-size: 20px !important;
    }

    &::before {
      display: none;
    }
  }

  .services-header {
    padding: 5rem 0 1.5rem;

    .glitch-title {
      font-size: 1.6rem;
      letter-spacing: 1px;

      &::before {
        font-size: 0.65rem;
        margin-bottom: 0.3rem;
      }
    }

    .subtitle {
      font-size: 0.8rem;
    }

    .header-decoration {
      .line {
        width: 40px;
      }
      .icon {
        font-size: 1.2rem;
      }
    }
  }

  .service-card {
    .card-content {
      padding: 1.25rem;
    }

    .service-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 1rem;

      .q-icon {
        font-size: 28px !important;
      }
    }

    .service-title {
      font-size: 1rem;
    }

    .service-features {
      padding-left: 0.75rem;

      li {
        font-size: 0.75rem;
        padding: 4px 0;
      }
    }
  }

  .cta-card {
    padding: 1.25rem;
  }

  .cta-content {
    h2 {
      font-size: 1.1rem;

      &::before {
        content: '';
      }
    }

    p {
      font-size: 0.8rem;
    }
  }

  .cta-btn {
    padding: 10px 16px;
    font-size: 0.8rem;
    gap: 6px;
  }

  .matrix-grid {
    gap: 0.75rem;
  }

  .matrix-box {
    padding: 1.25rem 0.5rem;

    .matrix-content {
      .q-icon {
        font-size: 20px !important;
      }

      .matrix-label {
        font-size: 0.6rem;
        letter-spacing: 0;
      }
    }
  }

  .matrix-header {
    margin-bottom: 1rem;

    .matrix-prompt {
      font-size: 0.75rem;
    }
  }

  .matrix-footer {
    margin-top: 1rem;
  }
}

// Responsive - Modal
@media (max-width: 600px) {
  .modal-overlay {
    padding: 0.5rem;
    align-items: flex-end;
  }

  .modal-container {
    max-height: 85vh;
    border-radius: 16px 16px 0 0;
    max-width: 100%;
  }

  .modal-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }

  .modal-title {
    font-size: 1.2rem;
  }

  .modal-form {
    padding: 1rem 1.25rem 1.25rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-label {
    font-size: 0.8rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}

// Landscape mode on mobile
@media (max-height: 500px) and (orientation: landscape) {
  .services-header {
    padding: 4rem 0 1rem;

    .glitch-title {
      font-size: 1.8rem;

      &::before {
        display: none;
      }
    }
  }

  .modal-overlay {
    align-items: center;
  }

  .modal-container {
    max-height: 95vh;
    border-radius: 12px;
  }
}

// Modal transition
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-container {
    transform: scale(0.9) translateY(20px);
  }
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}
</style>

<style lang="scss">
// Global styles for q-select popup (not scoped)
.matrix-select-popup {
  background: #0d1117 !important;
  border: 1px solid rgba(0, 255, 136, 0.3) !important;
  border-radius: 8px !important;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.15) !important;
  z-index: 10000 !important;

  .q-virtual-scroll__content,
  .q-select__options {
    background: #0d1117 !important;
  }

  .q-item {
    color: #fff !important;
    font-family: 'JetBrains Mono', monospace !important;
    min-height: 44px;
    padding: 8px 16px;
    transition: all 0.2s ease;

    &::before {
      content: '>';
      color: rgba(0, 255, 136, 0.5);
      margin-right: 8px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover {
      background: rgba(0, 255, 136, 0.1) !important;

      &::before {
        opacity: 1;
      }
    }

    &.q-item--active,
    &.q-manual-focusable--focused {
      background: rgba(0, 255, 136, 0.15) !important;
      color: #00ff88 !important;

      &::before {
        opacity: 1;
        color: #00ff88;
      }
    }
  }

  .q-item__label {
    color: inherit !important;
  }
}
</style>

<template>
  <q-page class="portfolio-page">
    <!-- Layout principal de dos columnas -->
    <div class="row full-height no-wrap">
      <!-- ===== SECCIÓN IZQUIERDA: CONTENIDO PRINCIPAL ===== -->
      <div
        class="col-7 flex column justify-center items-start q-pa-xl content-section animate-fade-in"
      >
        <!-- Encabezado principal -->
        <header class="q-mb-xl text-white">
          <h1 class="text-h2 text-weight-bold q-mb-md animate-slide-up">
            ¡Bienvenido a mi rincón digital!
          </h1>
          <div class="intro-text text-h5 text-weight-light q-mb-sm animate-slide-up-delay">
            Soy <span class="text-weight-bold highlight-name">James F. Mendoza Rios</span>, un
            apasionado<br />
            <span class="text-accent text-weight-medium">desarrollador Junior</span>
          </div>
          <q-badge color="positive" text-color="white" class="q-mt-sm animate-bounce-in" outline>
            🚀 Disponible para nuevos proyectos
          </q-badge>
        </header>

        <!-- Imagen del programador -->
        <div class="programmer-image-wrapper q-my-md animate-fade-in-up">
          <q-img
            src="/src/assets/pngwing 2.png"
            class="programmer-image animate-float"
            contain
            alt="James F. Mendoza Rios - Desarrollador"
          />
        </div>

        <!-- Descripción y llamadas a la acción -->
        <section class="q-mt-lg text-white animate-fade-in-up">
          <p class="description-text text-body1 text-weight-light q-mb-md">
            en búsqueda constante de <span class="text-primary">desafíos emocionantes</span><br />
            y oportunidades para <span class="text-secondary">crecer</span><br />
            en el fascinante mundo del <span class="text-accent">desarrollo de software</span>.
          </p>

          <!-- Botones de acción -->
          <div class="action-buttons q-mt-lg q-gutter-md animate-bounce-in-delay">
            <q-btn
              color="primary"
              label="Ver CV"
              icon="description"
              no-caps
              rounded
              class="action-btn"
              aria-label="Descargar curriculum vitae"
            />
            <q-btn
              color="secondary"
              label="Contactar"
              icon="mail"
              outline
              no-caps
              rounded
              class="action-btn"
              aria-label="Enviar mensaje de contacto"
            />
          </div>
        </section>
      </div>

      <!-- ===== SECCIÓN DERECHA: NAVEGACIÓN CON DIAMANTES ===== -->
      <div class="col-5 flex flex-center diamonds-section">
        <div class="diamonds-container">
          <div class="diamond-blue"></div>

          <!-- Rombo superior - Proyectos -->
          <div class="diamond diamond-top" @click="navigateTo('web')">
            <div class="diamond-content">
              <q-icon :name="'folder'" :size="$q.screen.xs ? '1.2rem' : '1.8rem'" color="white" />
              <div class="diamond-text small-text">Proyectos</div>
            </div>
          </div>

          <!-- Rombo izquierdo - Web -->
          <div class="diamond diamond-left" @click="navigateTo('desktop')">
            <div class="diamond-content">
              <q-icon :name="'web'" :size="$q.screen.xs ? '1.8rem' : '2.5rem'" />
              <div class="diamond-text">Web</div>
            </div>
          </div>

          <!-- Rombo derecho - App -->
          <div class="diamond diamond-right" @click="navigateTo('mobile')">
            <div class="diamond-content">
              <q-icon :name="'android'" :size="$q.screen.xs ? '1.8rem' : '2.5rem'" />
              <div class="diamond-text">App</div>
            </div>
          </div>

          <!-- Rombo inferior - IoT -->
          <div class="diamond diamond-bottom" @click="navigateTo('app')">
            <div class="diamond-content">
              <q-icon :name="'developer_board'" :size="$q.screen.xs ? '1.8rem' : '2.5rem'" />
              <div class="diamond-text">APIs & Backend</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== ELEMENTOS DECORATIVOS DE FONDO ===== -->
    <div class="background-decorations absolute-full" aria-hidden="true">
      <div class="diamond-blue absolute"></div>
      <div class="geometric-shapes absolute-full">
        <div class="shape shape-1 absolute"></div>
        <div class="shape shape-2 absolute"></div>
        <div class="shape shape-3 absolute"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
/**
 * IndexPage - Página principal del portafolio
 * Componente principal que muestra la página de inicio con información personal
 * y navegación interactiva mediante diamantes
 */

// Función de navegación para manejar clicks en los diamantes
const navigateTo = (section: string) => {
  console.log(`Navegando a: ${section}`);
  // TODO: Implementar navegación con vue-router
  // router.push(`/${section}`)
};
</script>
<style scoped>
/* ===== LAYOUT PRINCIPAL ===== */
.portfolio-page {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.content-section {
  z-index: 2;
  position: relative;
}

.diamonds-section {
  z-index: 3;
  position: relative;
}

/* ===== TIPOGRAFÍA Y TEXTO ===== */
.intro-text {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
}

.highlight-name {
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description-text {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

/* ===== IMAGEN DEL PROGRAMADOR ===== */
.programmer-image-wrapper {
  width: 350px;
  height: 350px;
  position: relative;
}

.programmer-image {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.programmer-image:hover {
  transform: scale(1.05);
}

/* ===== BOTONES DE ACCIÓN ===== */
.action-btn {
  transition: all 0.3s ease;
  font-weight: 500;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* ===== NAVEGACIÓN CON DIAMANTES ===== */
.diamonds-container {
  width: 400px;
  height: 400px;
  position: relative;
}

.diamond {
  position: absolute;
  transform: rotate(45deg);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  width: 200px;
  height: 200px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.diamond-content {
  transform: rotate(-45deg);
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.diamond-text {
  font-weight: bold;
  color: #333;
  margin-top: 8px;
  font-size: 0.9rem;
}

.small-text {
  font-size: 0.8rem;
}

/* Estados interactivos de diamantes */
.diamond:focus {
  outline: 3px solid rgba(255, 255, 255, 0.6);
  outline-offset: 4px;
}

.diamond:hover {
  transform: rotate(45deg) scale(1.1);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.diamond:active {
  transform: rotate(45deg) scale(0.95);
  transition: all 0.1s ease;
}

/* Efecto de brillo en hover */
.diamond::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(-45deg) translateX(-100%);
  transition: transform 0.6s ease;
}

.diamond:hover::before {
  transform: rotate(-45deg) translateX(100%);
}

/* ===== POSICIONAMIENTO ESPECÍFICO DE DIAMANTES ===== */
.diamond-top {
  top:20%;
  left: 43%;
  transform: translateX(-50%) rotate(45deg);
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

.diamond-left {
  left: -10px;
  top: 55%;
  transform: translateY(-50%) rotate(45deg);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #3498db;
}

.diamond-right {
  right: 50px;
  top: 55%;
  transform: translateY(-50%) rotate(45deg);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #e67e22;
}

.diamond-bottom {
  bottom: 0;
  left: 43%;
  transform: translateX(-50%) rotate(45deg);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #9b59b6;
}

/* Hover específicos */
.diamond-top:hover {
  transform: translateX(-50%) rotate(45deg) scale(1.15);
}

.diamond-left:hover {
  transform: translateY(-50%) rotate(45deg) scale(1.1);
}

.diamond-right:hover {
  transform: translateY(-50%) rotate(45deg) scale(1.1);
}

.diamond-bottom:hover {
  transform: translateX(-50%) rotate(45deg) scale(1.1);
}

/* ===== ELEMENTOS DECORATIVOS ===== */
.background-decorations {
  pointer-events: none;
  z-index: 1;
}

.diamond-blue {
  background: linear-gradient(135deg, rgba(31, 31, 31, 0.8), rgba(15, 52, 96, 0.6));
  width: 1200px;
  height: 1200px;
  bottom: -300px;
  right: -200px;
  transform: rotate(45deg);
  border-radius: 50px;
  filter: blur(1px);
}

.shape {
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 5%;
  transform: rotate(15deg);
  border-color: rgba(52, 152, 219, 0.4);
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 70%;
  left: 10%;
  transform: rotate(-20deg);
  border-color: rgba(46, 204, 113, 0.4);
  animation: float 8s ease-in-out infinite 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  top: 40%;
  left: 15%;
  transform: rotate(45deg);
  border-color: rgba(155, 89, 182, 0.4);
  animation: float 8s ease-in-out infinite 4s;
}

/* ===== ANIMACIONES ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(20px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(-5px);
  }
  70% {
    transform: scale(0.95) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Clases de animación */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.animate-slide-up-delay {
  animation: slideUp 0.8s ease-out 0.2s both;
}

.animate-fade-in-up {
  animation: slideUp 1s ease-out 0.4s both;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-bounce-in {
  animation: bounceIn 0.8s ease-out 0.6s both;
}

.animate-bounce-in-delay {
  animation: bounceIn 0.8s ease-out 0.8s both;
}

/* ===== RESPONSIVE DESIGN ===== */
/* Móviles */
@media (max-width: 768px) {
  .programmer-image-wrapper {
    width: 250px;
    height: 250px;
  }

  .diamonds-container {
    width: 280px;
    height: 280px;
  }

  .diamond {
    width: 100px;
    height: 100px;
  }

  .diamond-top {
    width: 50px;
    height: 50px;
    top: 0;
  }

  .diamond-left {
    left: 40px;
  }
  .diamond-right {
    right: 40px;
  }
  .diamond-bottom {
    bottom: 0;
  }

  .diamond-blue {
    width: 800px;
    height: 800px;
    bottom: -200px;
    right: -100px;
  }

  .diamond-text {
    font-size: 0.7rem;
  }

  .small-text {
    font-size: 0.6rem;
  }
}

/* Tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  .programmer-image-wrapper {
    width: 280px;
    height: 280px;
  }

  .diamonds-container {
    width: 320px;
    height: 320px;
  }

  .diamond {
    width: 100px;
    height: 100px;
  }

  .diamond-top {
    width: 70px;
    height: 70px;
    top: 0;
  }

  .diamond-left {
    left: 50px;
  }
  .diamond-right {
    right: 50px;
  }
  .diamond-bottom {
    bottom: 0;
  }

  .diamond-text {
    font-size: 0.8rem;
  }

  .small-text {
    font-size: 0.7rem;
  }
}

/* Pantallas grandes */
@media (min-width: 1441px) {
  .programmer-image-wrapper {
    width: 400px;
    height: 400px;
  }

  .diamonds-container {
    width: 450px;
    height: 450px;
  }

  .diamond {
    width: 200px;
    height: 200px;
  }

  .diamond-top {
    width: 100px;
    height: 100px;
  }

  .diamond-text {
    font-size: 1rem;
  }

  .small-text {
    font-size: 0.9rem;
  }
  .diamond-top {
  top:20%;
  left: 43%;
  transform: translateX(-50%) rotate(45deg);
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

.diamond-left {
  left: -55px;
  top: 55%;
  transform: translateY(-50%) rotate(45deg);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #3498db;
}

.diamond-right {
  right: 10px;
  top: 55%;
  transform: translateY(-50%) rotate(45deg);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #e67e22;
}

.diamond-bottom {
  bottom: -10%;
  left: 43%;
  transform: translateX(-50%) rotate(45deg);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #9b59b6;
}
}

/* ===== ACCESIBILIDAD ===== */
@media (prefers-reduced-motion: reduce) {
  .diamond,
  .programmer-image,
  .animate-fade-in,
  .animate-slide-up,
  .animate-slide-up-delay,
  .animate-fade-in-up,
  .animate-float,
  .animate-bounce-in,
  .animate-bounce-in-delay {
    animation: none;
    transition: none;
  }
}

@media (prefers-color-scheme: dark) {
  .diamond {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  }
}
</style>

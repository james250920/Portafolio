<template>
  <q-page
    class="pixel-portfolio-page full-height flex justify-center items-center matrix-bg scanlines"
  >
    <!-- Layout principal pixel art -->
    <div class="row full-height no-wrap">
      <!-- ===== SECCIÓN IZQUIERDA: CONTENIDO PRINCIPAL PIXEL ===== -->
      <div class="flex column justify-center items-start pixel-content-section animate-fade-in">
        <!-- Encabezado principal pixel art -->
        <header class="pixel-header">
          <h1 class="pixel-hero-title animate-slide-up">> BIENVENIDO_</h1>
          <div class="tech-text animate-slide-up-delay">
            INICIALIZANDO: <span class="text-pixel-green blink">█</span><br />
            USUARIO: <span class="text-pixel-yellow glow">JAMES F. MENDOZA RIOS</span><br />
            CLASE: <span class="text-pixel-cyan">DESARROLLADOR_JUNIOR.EXE</span>
          </div>
          <div class="pixel-badge q-mt-sm animate-bounce-in">
            <span class="text-pixel-green">STATUS: </span>
            <span class="text-pixel-white blink">DISPONIBLE_PARA_MISIONES</span>
          </div>
        </header>

        <!-- Imagen del programador pixel -->
        <div class="pixel-image-wrapper q-my-md animate-fade-in-up">
          <div class="pixel-avatar">
            <div class="pixel-frame pixel-border">
              <q-img
                src="/src/assets/pngwing 2.png"
                class="programmer-image-pixel pixel-float"
                contain
                alt="James F. Mendoza Rios - Desarrollador"
              />
            </div>
          </div>
        </div>

        <!-- Descripción pixel art -->
        <section class="q-mt-lg pixel-description animate-fade-in-up">
          <div class="pixel-text q-mb-md">
            > BUSCANDO: <span class="text-pixel-red">DESAFIOS_EXTREMOS</span><br />
            > OBJETIVO: <span class="text-pixel-green">EVOLUCIONAR_SKILLS</span><br />
            > DOMINIO: <span class="text-pixel-cyan">SOFTWARE_DEVELOPMENT.WORLD</span>
          </div>

          <!-- Botones pixel art -->
          <div class="pixel-buttons q-mt-lg q-gutter-md animate-bounce-in-delay">
            <button class="pixel-button">
              <q-icon name="description" class="q-mr-sm" />
              [VER_CV.PDF]
            </button>
            <button class="pixel-button">
              <q-icon name="mail" class="q-mr-sm" />
              [CONTACT.EXE]
            </button>
          </div>
        </section>
      </div>

      <!-- ===== SECCIÓN DERECHA: NAVEGACIÓN PIXEL DIAMONDS ===== -->
      <div class="col flex flex-center pixel-nav-section animate-fade-in">
        <div class="pixel-diamonds-container">
          <!-- Efecto de fondo digital -->
          <div class="digital-bg"></div>

          <!-- Rombo superior - Proyectos -->
          <div
            class="pixel-diamond pixel-diamond-top pixel-border-green"
            @click="navigateTo('/projects')"
          >
            <div class="pixel-diamond-content">
              <q-icon name="folder" size="2rem" class="text-pixel-green glow" />
              <div class="pixel-diamond-text text-pixel-green">.DIR</div>
            </div>
          </div>

          <!-- Rombo izquierdo - Web -->
          <div
            class="pixel-diamond pixel-diamond-left pixel-border-blue"
            @click="navigateTo('desktop')"
          >
            <div class="pixel-diamond-content">
              <q-icon name="web" size="2.5rem" class="text-pixel-blue glow" />
              <div class="pixel-diamond-text text-pixel-blue">WEB.HTML</div>
            </div>
          </div>

          <!-- Rombo derecho - App -->
          <div
            class="pixel-diamond pixel-diamond-right pixel-border-red"
            @click="navigateTo('mobile')"
          >
            <div class="pixel-diamond-content">
              <q-icon name="android" size="2.5rem" class="text-pixel-red glow" />
              <div class="pixel-diamond-text text-pixel-red">APPS.APK</div>
            </div>
          </div>

          <!-- Rombo inferior - APIs -->
          <div
            class="pixel-diamond pixel-diamond-bottom pixel-border-purple"
            @click="navigateTo('app')"
          >
            <div class="pixel-diamond-content">
              <q-icon name="developer_board" size="2.5rem" class="text-pixel-purple glow" />
              <div class="pixel-diamond-text text-pixel-purple">API.JSON</div>
            </div>
          </div>
        </div>

        <!-- Líneas de conexión digitales -->
        <div class="digital-connections">
          <div class="connection-line connection-vertical"></div>
          <div class="connection-line connection-horizontal"></div>
        </div>
      </div>
    </div>

    <!-- Efectos de fondo pixel art -->
    <div class="pixel-background-effects" aria-hidden="true">
      <div class="digital-particles"></div>
      <div class="grid-overlay"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
/**
 * IndexPage - Página principal del portafolio PIXEL ART
 * Componente principal estilo retro gaming con navegación interactiva
 */

// Función de navegación para manejar clicks en los diamantes
const navigateTo = (section: string) => {

  console.log(`> ACCESSING: ${section.toUpperCase()}.DIR`);
  // TODO: Implementar navegación con vue-router
  // router.push(`/${section}`)
};
</script>

<style scoped>
/* =============================================
   PIXEL ART PORTFOLIO STYLES
   ============================================= */

/* ===== LAYOUT PRINCIPAL PIXEL ===== */
.pixel-portfolio-page {
  background:
    linear-gradient(90deg, transparent 50%, rgba(0, 255, 65, 0.03) 50%),
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), #000000;
  background-size:
    2px 2px,
    100% 100%,
    100% 100%;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.pixel-content-section {
  z-index: 2;
  position: relative;
  padding: 2rem;
}

.pixel-nav-section {
  z-index: 3;
  position: relative;
}

/* ===== HEADER PIXEL ART ===== */
.pixel-header {
  margin-bottom: 2rem;
}

.pixel-badge {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ff41;
  padding: 8px 16px;
  font-family: 'VT323', monospace;
  font-size: 16px;
  box-shadow: 0 0 10px #00ff41;
}

/* ===== IMAGEN PIXEL ART ===== */
.pixel-image-wrapper {
  width: 300px;
  height: 300px;
  position: relative;
}

.pixel-avatar {
  width: 100%;
  height: 100%;
  position: relative;
}

.pixel-frame {
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00ff41, #ff073a, #0066ff, #00ff41);
    z-index: -1;
    animation: borderRotate 3s linear infinite;
  }
}

@keyframes borderRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.programmer-image-pixel {
  width: 100%;
  height: 100%;
  filter: contrast(1.2) saturate(1.3) drop-shadow(0 0 20px #00ff41);
}

/* ===== DESCRIPCIÓN PIXEL ===== */
.pixel-description {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00ff41;
  padding: 1.5rem;
  box-shadow:
    0 0 20px rgba(0, 255, 65, 0.3),
    inset 0 0 20px rgba(0, 255, 65, 0.1);
}

/* ===== BOTONES PIXEL ART ===== */
.pixel-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ===== NAVEGACIÓN DIAMANTES PIXEL ===== */
.pixel-diamonds-container {
  width: 400px;
  height: 400px;
  position: relative;
  left: 80px;
}

.digital-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.05) 2px,
    rgba(0, 255, 65, 0.05) 4px
  );
  animation: digitalScroll 5s linear infinite;
}

@keyframes digitalScroll {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(4px) translateY(4px);
  }
}

.pixel-diamond {
  position: absolute;
  transform: rotate(45deg);
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 140px;
  height: 140px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);

  &:hover {
    transform: rotate(45deg) scale(1.1);
    box-shadow: 0 0 30px currentColor;
  }

  &:active {
    transform: rotate(45deg) scale(0.95);
  }
}

.pixel-diamond-content {
  transform: rotate(-45deg);
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.pixel-diamond-text {
  font-family: 'Press Start 2P', monospace !important;
  font-size: 10px !important;
  margin-top: 8px;
  text-shadow:
    0 0 5px currentColor,
    1px 1px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000;
  color: inherit !important;
  font-weight: normal !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.2;
  display: block;
  white-space: nowrap;
}

/* ===== DIAMANTES HOVER ESPECÍFICOS ===== */
.pixel-diamond-top:hover .pixel-diamond-text {
  color: #00ff41 !important;
  text-shadow:
    0 0 10px #00ff41,
    1px 1px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000;
}

.pixel-diamond-left:hover .pixel-diamond-text {
  color: #0066ff !important;
  text-shadow:
    0 0 10px #0066ff,
    1px 1px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000;
}

.pixel-diamond-right:hover .pixel-diamond-text {
  color: #ff073a !important;
  text-shadow:
    0 0 10px #ff073a,
    1px 1px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000;
}

.pixel-diamond-bottom:hover .pixel-diamond-text {
  color: #cc00ff !important;
  text-shadow:
    0 0 10px #cc00ff,
    1px 1px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000;
}

/* ===== ICONOS DIAMANTES ===== */
.pixel-diamond .q-icon {
  filter: drop-shadow(0 0 5px currentColor);
  transition: all 0.3s ease;
}

.pixel-diamond:hover .q-icon {
  filter: drop-shadow(0 0 15px currentColor);
  transform: scale(1.1);
}

/* ===== POSICIONAMIENTO DIAMANTES PIXEL ===== */
.pixel-diamond-top {
  top: 22%;
  left: 43%;
  transform: translateX(-50%) rotate(45deg);
  width: 100px;
  height: 100px;

  &:hover {
    transform: translateX(-50%) rotate(45deg) scale(1.15);
  }
}

.pixel-diamond-left {
  left: -10px;
  top: 55%;
  transform: translateY(-50%) rotate(45deg);

  &:hover {
    transform: translateY(-50%) rotate(45deg) scale(1.1);
  }
}

.pixel-diamond-right {
  right: 50px;
  top: 55%;
  transform: translateY(-50%) rotate(45deg);

  &:hover {
    transform: translateY(-50%) rotate(45deg) scale(1.1);
  }
}

.pixel-diamond-bottom {
  bottom: 0%;
  left: 43%;
  transform: translateX(-50%) rotate(45deg);

  &:hover {
    transform: translateX(-50%) rotate(45deg) scale(1.1);
  }
}

/* ===== BORDES DE COLORES PARA DIAMANTES ===== */
.pixel-border-green {
  border: 2px solid #00ff41;
  box-shadow:
    0 0 10px #00ff41,
    inset 0 0 10px rgba(0, 255, 65, 0.1);
}

.pixel-border-blue {
  border: 2px solid #0066ff;
  box-shadow:
    0 0 10px #0066ff,
    inset 0 0 10px rgba(0, 102, 255, 0.1);
}

.pixel-border-red {
  border: 2px solid #ff073a;
  box-shadow:
    0 0 10px #ff073a,
    inset 0 0 10px rgba(255, 7, 58, 0.1);
}

.pixel-border-purple {
  border: 2px solid #cc00ff;
  box-shadow:
    0 0 10px #cc00ff,
    inset 0 0 10px rgba(204, 0, 255, 0.1);
}

/* ===== CONEXIONES DIGITALES ===== */
.digital-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #00ff41, transparent);
  animation: dataFlow 2s ease-in-out infinite;
}

.connection-vertical {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.connection-horizontal {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

@keyframes dataFlow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 10px #00ff41;
  }
}

/* ===== EFECTOS DE FONDO PIXEL ===== */
.pixel-background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.digital-particles::before {
  content: '▓▒░ LOADING ░▒▓';
  position: absolute;
  top: 10px;
  right: 20px;
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: #00ff41;
  animation: blink 1s infinite;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: gridMove 10s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 20px);
  }
}

/* ===== ANIMACIONES PIXEL ===== */
.animate-fade-in {
  animation: pixelFadeIn 1s ease-out;
}

.animate-slide-up {
  animation: pixelSlideUp 0.8s ease-out;
}

.animate-slide-up-delay {
  animation: pixelSlideUp 0.8s ease-out 0.3s both;
}

.animate-fade-in-up {
  animation: pixelFadeInUp 1s ease-out 0.6s both;
}

.animate-bounce-in {
  animation: pixelBounceIn 1s ease-out 0.9s both;
}

.animate-bounce-in-delay {
  animation: pixelBounceIn 1s ease-out 1.2s both;
}

@keyframes pixelFadeIn {
  from {
    opacity: 0;
    filter: brightness(0);
  }
  to {
    opacity: 1;
    filter: brightness(1);
  }
}

@keyframes pixelSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes pixelFadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pixelBounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) rotate(5deg);
  }
  70% {
    transform: scale(0.9) rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* ===== RESPONSIVE PIXEL ART ===== */
@media (max-width: 768px) {
  .pixel-diamonds-container {
    width: 300px;
    height: 300px;
    left: 20px;
  }

  .pixel-diamond {
    width: 100px;
    height: 100px;
  }

  .pixel-diamond-top {
    width: 80px;
    height: 80px;
  }

  .pixel-diamond-text {
    font-size: 7px !important;
    margin-top: 6px;
  }

  .pixel-hero-title {
    font-size: 24px;
  }

  .pixel-content-section {
    padding: 1rem;
  }
}
</style>

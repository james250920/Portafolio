<template>
  <q-page class="pixel-portfolio-page full-height flex flex-center matrix-bg scanlines q-pa-md">
    <div class="about-container animate-fade-in">
      <!-- Foto en forma de diamante -->
      <div class="photo-section animate-fade-in-up">
        <div class="diamond-photo">
          <div class="diamond-inner">
            <img src="src/assets/otro.png" alt="James E. Mendoza Ríos" />
          </div>
        </div>
      </div>

      <!-- Información personal -->
      <div class="info-section animate-slide-in-right">
        <h1 class="name-title text-gradient animate-slide-up">James F. Mendoza Ríos</h1>

        <div class="description-text animate-slide-up-delay">
          <p class="text-primary">
            Mi viaje académico no solo me ha proporcionado
            <br />una <span class="highlight">comprensión integral</span>
          </p>
          <p class="text-emphasis">
            <strong>de los principios fundamentales de la ingeniería de software</strong>
          </p>
          <p class="text-emphasis">
            <strong>y sistemas,</strong> sino que también ha impulsado <br />mi interés en aplicar
            estos conocimientos <br />en <span class="highlight">proyectos del mundo real.</span>
          </p>
        </div>

        <!-- Redes sociales -->
        <div class="social-links animate-bounce-in">
          <q-btn
            round
            flat
            size="lg"
            class="social-btn github-btn"
            @click="openLink('https://github.com')"
          >
            <q-icon name="fab fa-github" size="28px" />
            <q-tooltip>GitHub</q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
            size="lg"
            class="social-btn gmail-btn"
            @click="openLink('mailto:tu-email@gmail.com')"
          >
            <q-icon name="fas fa-envelope" size="28px" />
            <q-tooltip>Gmail</q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
            size="lg"
            class="social-btn linkedin-btn"
            @click="openLink('https://linkedin.com')"
          >
            <q-icon name="fab fa-linkedin" size="28px" />
            <q-tooltip>LinkedIn</q-tooltip>
          </q-btn>
        </div>

        <!-- Botón CV -->
        <div class="cv-section animate-bounce-in-delay">
          <q-btn label="DESCARGAR CV" size="lg" rounded class="cv-button" @click="downloadCV">
            <q-icon name="fas fa-download" size="18px" class="q-ml-sm" />
            <q-tooltip>Descargar mi currículum</q-tooltip>
          </q-btn>
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
const openLink = (url: string) => {
  window.open(url, '_blank');
};

const downloadCV = () => {
  // Aquí puedes agregar la lógica para descargar el CV
  console.log('Descargando CV...');
  // window.open('/path-to-your-cv.pdf', '_blank')
};
</script>

<style lang="sass" scoped>
/* =============================================
   PIXEL ART ABOUT PAGE STYLES
   ============================================= */

/* ===== LAYOUT PRINCIPAL PIXEL ===== */
.pixel-portfolio-page
  background: linear-gradient(90deg, transparent 50%, rgba(0, 255, 65, 0.03) 50%), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), #000000
  background-size: 2px 2px, 100% 100%, 100% 100%
  position: relative
  overflow: hidden
  min-height: 100vh

.about-container
  display: flex
  align-items: center
  gap: 80px
  max-width: 1400px
  width: 100%
  position: relative
  z-index: 2

.photo-section
  flex-shrink: 0

.info-section
  flex: 1
  text-align: left

/* ===== EFECTOS DE FONDO PIXEL ===== */
.pixel-background-effects
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  pointer-events: none
  z-index: 1

.digital-particles::before
  content: '▓▒░ LOADING PROFILE ░▒▓'
  position: absolute
  top: 10px
  right: 20px
  font-family: 'VT323', monospace
  font-size: 14px
  color: #00ff41
  animation: blink 1s infinite

.grid-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-image: linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
  background-size: 20px 20px
  animation: gridMove 10s linear infinite

@keyframes gridMove
  0%
    transform: translate(0, 0)
  100%
    transform: translate(20px, 20px)

@keyframes blink
  0%, 50%
    opacity: 1
  51%, 100%
    opacity: 0

/* ===== FOTO PIXEL DIAMOND ===== */
.diamond-photo
  width: 320px
  height: 320px
  position: relative
  transform: rotate(45deg)
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #1a237e 100%)
  border-radius: 25px
  overflow: hidden
  box-shadow: 0 25px 50px rgba(26, 35, 126, 0.4), 0 15px 30px rgba(0, 0, 0, 0.2)
  transition: all 0.3s ease
  cursor: pointer

  &:hover
    transform: rotate(45deg) scale(1.05)
    box-shadow: 0 30px 60px rgba(26, 35, 126, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px #00ff41

  .diamond-inner
    width: 100%
    height: 100%
    position: relative

    img
      width: 290px
      height: 290px
      object-fit: cover
      position: absolute
      top: 15px
      left: 15px
      transform: rotate(-45deg)
      border-radius: 50%
      transition: all 0.3s ease
      border: 3px solid #00ff41
      box-shadow: inset 0 0 20px rgba(0, 255, 65, 0.3), 0 0 15px rgba(0, 255, 65, 0.6), 0 0 30px rgba(0, 255, 65, 0.4), 0 0 45px rgba(0, 255, 65, 0.2)

  &:hover .diamond-inner img
    box-shadow: inset 0 0 30px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.8), 0 0 40px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.3)

/* ===== TIPOGRAFÍA PIXEL ===== */
.name-title
  font-size: 4rem
  font-weight: 800
  margin: 0 0 40px 0
  line-height: 1.1
  letter-spacing: -1px
  font-family: 'Press Start 2P', monospace
  text-shadow: 2px 2px 0px #000, 0 0 20px currentColor

.text-gradient
  background: linear-gradient(135deg, #00ff41 0%, #ff073a 50%, #0066ff 100%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text
  animation: gradientShift 3s ease-in-out infinite alternate

@keyframes gradientShift
  0%
    background: linear-gradient(135deg, #00ff41 0%, #ff073a 50%, #0066ff 100%)
  100%
    background: linear-gradient(135deg, #0066ff 0%, #00ff41 50%, #ff073a 100%)

.description-text
  font-size: 1.4rem
  line-height: 1.7
  margin-bottom: 50px
  background: rgba(0, 0, 0, 0.7)
  border: 1px solid #00ff41
  padding: 1.5rem
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 20px rgba(0, 255, 65, 0.1)
  font-family: 'VT323', monospace

  p
    margin: 0 0 20px 0
    color: #00ff41
    text-shadow: 0 0 5px #00ff41

.text-primary
  color: #00ff41
  font-weight: 500

.text-emphasis
  color: #ffffff

  strong
    font-weight: 700
    color: #ff073a
    text-shadow: 0 0 5px #ff073a

.highlight
  background: rgba(0, 255, 65, 0.2)
  padding: 2px 8px
  border-radius: 4px
  font-weight: 600
  color: #00ff41
  text-shadow: 0 0 10px #00ff41
  border: 1px solid #00ff41

/* ===== REDES SOCIALES PIXEL ===== */
.social-links
  display: flex
  gap: 25px
  margin-bottom: 50px

  .social-btn
    width: 70px
    height: 70px
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    position: relative
    overflow: hidden
    border: 2px solid transparent
    font-family: 'Press Start 2P', monospace

    &::before
      content: ''
      position: absolute
      top: 0
      left: -100%
      width: 100%
      height: 100%
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)
      transition: left 0.5s

    &:hover
      transform: translateY(-8px) scale(1.1)
      border: 2px solid currentColor
      box-shadow: 0 0 20px currentColor

      &::before
        left: 100%

.github-btn
  background: linear-gradient(135deg, #24292e 0%, #000000 100%)
  color: #ffffff
  border-color: #24292e

  &:hover
    background: linear-gradient(135deg, #333 0%, #24292e 100%)
    box-shadow: 0 15px 30px rgba(36, 41, 46, 0.5), 0 0 30px #24292e

.gmail-btn
  background: linear-gradient(135deg, #ea4335 0%, #fbbc04 50%, #34a853 100%)
  color: white
  border-color: #ea4335

  &:hover
    box-shadow: 0 15px 30px rgba(234, 67, 53, 0.5), 0 0 30px #ea4335

.linkedin-btn
  background: linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)
  color: white
  border-color: #0077b5

  &:hover
    box-shadow: 0 15px 30px rgba(0, 119, 181, 0.5), 0 0 30px #0077b5

/* ===== BOTÓN CV PIXEL ===== */
.cv-section
  .cv-button
    background: linear-gradient(135deg, #ff073a 0%, #cc00ff 50%, #ff073a 100%) !important
    color: white !important
    padding: 18px 45px
    font-size: 1.4rem
    font-weight: 700
    min-width: 200px
    text-transform: uppercase
    letter-spacing: 1px
    position: relative
    overflow: hidden
    transition: all 0.3s ease
    font-family: 'Press Start 2P', monospace
    border: 2px solid #ff073a
    text-shadow: 2px 2px 0px #000

    &::before
      content: ''
      position: absolute
      top: 0
      left: -100%
      width: 100%
      height: 100%
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)
      transition: left 0.6s

    &:hover
      transform: translateY(-3px)
      box-shadow: 0 15px 35px rgba(255, 7, 58, 0.4), 0 0 30px #ff073a

      &::before
        left: 100%

/* ===== ANIMACIONES PIXEL ===== */
.animate-fade-in
  animation: pixelFadeIn 1s ease-out

.animate-slide-up
  animation: pixelSlideUp 0.8s ease-out

.animate-slide-up-delay
  animation: pixelSlideUp 0.8s ease-out 0.3s both

.animate-fade-in-up
  animation: pixelFadeInUp 1s ease-out 0.6s both

.animate-slide-in-right
  animation: slideInRight 1s ease-out 0.3s both

.animate-bounce-in
  animation: pixelBounceIn 1s ease-out 0.9s both

.animate-bounce-in-delay
  animation: pixelBounceIn 1s ease-out 1.2s both

@keyframes pixelFadeIn
  from
    opacity: 0
    filter: brightness(0)
  to
    opacity: 1
    filter: brightness(1)

@keyframes pixelSlideUp
  from
    opacity: 0
    transform: translateY(30px)
    filter: blur(2px)
  to
    opacity: 1
    transform: translateY(0)
    filter: blur(0)

@keyframes pixelFadeInUp
  from
    opacity: 0
    transform: translateY(20px) scale(0.95)
  to
    opacity: 1
    transform: translateY(0) scale(1)

@keyframes slideInRight
  from
    opacity: 0
    transform: translateX(50px)
  to
    opacity: 1
    transform: translateX(0)

@keyframes pixelBounceIn
  0%
    opacity: 0
    transform: scale(0.3) rotate(0deg)
  50%
    opacity: 1
    transform: scale(1.05) rotate(5deg)
  70%
    transform: scale(0.9) rotate(-2deg)
  100%
    opacity: 1
    transform: scale(1) rotate(0deg)

/* ===== RESPONSIVE PIXEL ART ===== */
@media (max-width: 1024px)
  .about-container
    gap: 50px

  .name-title
    font-size: 3.2rem

@media (max-width: 768px)
  .about-container
    flex-direction: column
    text-align: center
    gap: 50px

  .diamond-photo
    width: 250px
    height: 250px

    .diamond-inner img
      width: 220px
      height: 220px
      top: 15px
      left: 15px

  .name-title
    font-size: 2.8rem

  .info-section
    text-align: center

  .description-text
    font-size: 1.2rem

  .social-links
    justify-content: center

@media (max-width: 480px)
  .name-title
    font-size: 2.2rem

  .diamond-photo
    width: 200px
    height: 200px

    .diamond-inner img
      width: 170px
      height: 170px

  .cv-button
    font-size: 1.2rem !important
    padding: 15px 35px !important
</style>

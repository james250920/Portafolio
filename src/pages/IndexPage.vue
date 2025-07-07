<template>
  <q-page class="flex flex-center full-height bg-black page-overflow">
    <div>
      <q-img
        src="/src/assets/pngwing 2.png"
        class="absolute-top-right"
        style=" width: 15%; height: 40%; left: 0"
        contain
      />
    </div>

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

      <!-- Rombo inferior - Mobile -->
      <div class="diamond diamond-bottom" @click="navigateTo('app')">
        <div class="diamond-content">
          <q-icon :name="'developer_board'" :size="$q.screen.xs ? '1.8rem' : '2.5rem'" />
          <div class="diamond-text">IoT</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const navigateTo = (section: string) => {
  // Aquí puedes agregar lógica de navegación
  console.log(`Navegando a: ${section}`);
  // Ejemplo: router.push(`/${section}`)
};
</script>
<style scoped>
.page-overflow {
  overflow: hidden;
}

.full-height {
  min-height: 100vh;
}

.diamonds-container {
  position: relative;
  width: 610px;
  height: 610px;
  left: 450px; /* Mantener posición original */
}

.diamond {
  position: absolute;
  background: #ffffff;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  /* Tamaños responsivos usando Quasar breakpoints */
  width: 200px;
  height: 200px;
}

.diamond:hover {
  transform: rotate(45deg) scale(1.1);
}

.diamond-content {
  transform: rotate(-45deg);
  text-align: center;
  color: #333333;
  font-weight: 600;
}

.diamond-text {
  margin-top: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333333;
}

.small-text {
  font-size: 0.9rem !important;
}

.diamond-blue {
  background-color: #1f1f1f;
  position: fixed;
  z-index: -1;
  width: 1950px;
  height: 1950px;
  bottom: -420px;
  left: 80%;
  transform: translateX(-30%) rotate(45deg);
}

/* Posicionamiento responsive - manteniendo diseño original */
.diamond-top {
  top: 166px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  background-color: #7b0606;
  width: 100px;
  height: 100px;
}

.diamond-left {
  left: 40px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.diamond-right {
  right: 40px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.diamond-bottom {
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

/* Hover específicos */
.diamond-top:hover {
  transform: translateX(-50%) rotate(45deg) scale(1.1);
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

.diamond-top .diamond-content {
  color: white;
}

.diamond-top .diamond-text {
  color: white !important;
}

/* Responsive breakpoints usando Quasar - manteniendo proporciones originales */
/* Mobile - xs (hasta 599px) */
@media (max-width: 599px) {
  .diamonds-container {
    width: 320px;
    height: 320px;
    left: 20px; /* Centrado en móviles */
  }

  .diamond {
    width: 100px;
    height: 100px;
  }

  .diamond-top {
    width: 60px;
    height: 60px;
    top: 80px;
  }

  .diamond-left {
    left: 20px;
  }

  .diamond-right {
    right: 20px;
  }

  .diamond-bottom {
    bottom: 20px;
  }

  .diamond-text {
    font-size: 0.7rem;
  }

  .small-text {
    font-size: 0.6rem !important;
  }

  .diamond-blue {
    width: 1000px;
    height: 1000px;
    bottom: -200px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
}

/* Small tablets - sm (600px - 1023px) */
@media (min-width: 600px) and (max-width: 1023px) {
  .diamonds-container {
    width: 400px;
    height: 400px;
    left: 130px;
  }

  .diamond {
    width: 120px;
    height: 120px;
  }

  .diamond-top {
    width: 80px;
    height: 80px;
    top: 120px;
  }

  .diamond-left {
    left: 30px;
  }

  .diamond-right {
    right: 30px;
  }

  .diamond-bottom {
    bottom: 30px;
  }

  .diamond-text {
    font-size: 0.9rem;
  }

  .small-text {
    font-size: 0.8rem !important;
  }

  .diamond-blue {
    width: 1300px;
    height: 1300px;
    bottom: -300px;
    left: 60%;
  }
}

/* Medium tablets - md (1024px - 1439px) */
@media (min-width: 1024px) and (max-width: 1439px) {
  .diamonds-container {
    width: 500px;
    height: 500px;
    left: 280px;
  }

  .diamond {
    width: 160px;
    height: 160px;
  }

  .diamond-top {
    width: 90px;
    height: 90px;
    top: 140px;
  }

  .diamond-blue {
    width: 1600px;
    height: 1600px;
    bottom: -350px;
    left: 70%;
  }
}

/* Large screens - lg (1440px - 1919px) - mantener original */
@media (min-width: 1440px) and (max-width: 1919px) {
  .diamonds-container {
    width: 610px;
    height: 610px;
    left: 460px;
  }
}

/* Extra large screens - xl (1920px+) */
@media (min-width: 1920px) {
  .diamonds-container {
    width: 750px;
    height: 750px;
    left: 450px;
  }

  .diamond {
    width: 250px;
    height: 250px;
  }

  .diamond-top {
    width: 120px;
    height: 120px;
    top: 200px;
  }

  .diamond-left {
    left: 50px;
  }

  .diamond-right {
    right: 50px;
  }

  .diamond-bottom {
    bottom: 50px;
  }

  .diamond-text {
    font-size: 1.3rem;
  }

  .diamond-blue {
    width: 2200px;
    height: 2200px;
    bottom: -500px;
    left: 85%;
  }
}
</style>

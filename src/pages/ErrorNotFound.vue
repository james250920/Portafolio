<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div class="error-content">
      <div class="error-code">404</div>

      <div class="error-message">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl go-home-btn"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.error-content {
  .error-code {
    font-size: 30vh;
  }

  .error-message {
    font-size: 2rem;
    opacity: 0.4;
  }

  .go-home-btn {
    min-width: 120px;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .error-content {
    .error-code {
      font-size: 20vh;
    }

    .error-message {
      font-size: 1.5rem;
    }

    .go-home-btn {
      width: 100%;
      max-width: 250px;
    }
  }
}
</style>

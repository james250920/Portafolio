<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
    <cuadrado> </cuadrado>
  </q-page>
</template>

<script setup lang="ts">
import { QCard, QCardSection } from 'quasar';
import { ref } from 'vue';
const lorem = ref('Cuadro 1.');
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>

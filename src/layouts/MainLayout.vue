<template>
  <q-layout view="lHh Rpr LFf" class="text-black">
    <q-header class="bg-black  text-white q-px-sm q-py-sm">
      <q-toolbar class="q-gutter-sm">

        <q-icon
          name="apps"
          class="q-mr-md"
          style="color: white; font-size: 45px; cursor: pointer; transform: rotate(45deg)"
          @click="$router.push('/')"
        />
        <q-btn flat label="Home" to="/" color="white" />
        <q-btn flat label="About" to="/about" color="white" />
        <q-btn flat label="Projects" to="/projects" color="white" />
        <q-btn flat label="Contact" to="/contact" color="white" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
<style scoped>

</style>

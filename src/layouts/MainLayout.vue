<template>
  <q-layout view="lHh Rpr LFf" class="text-black">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="q-pl-md">
        <q-icon
          name="home"
          class="q-mr-md"
          style="color: #1976d2; font-size: 32px; cursor: pointer"
          @click="$router.push('/')"
        />
        <q-btn flat label="Home" to="/" />
        <q-btn flat label="About" to="/about" />
        <q-btn flat label="Projects" to="/projects" />
        <q-btn flat label="Contact" to="/contact" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-indigo-10 text-black">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
<style scoped></style>

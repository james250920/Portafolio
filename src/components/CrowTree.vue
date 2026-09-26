<template>
  <div
    class="crow-tree"
    :class="{ 'crow-tree--floating': floating, 'crow-tree--ready': sceneReady }"
  >
    <div v-if="floating" ref="treeAnchor" class="crow-tree__anchor" aria-hidden="true"></div>
    <canvas v-show="!floating" ref="rain" class="crow-tree__rain" aria-hidden="true" />
    <canvas
      ref="scene"
      class="crow-tree__scene"
      role="img"
      aria-label="Árbol de neón con cuervos que levantan vuelo al acercar el cursor"
    />
    <div v-show="!floating" class="crow-tree__controls">
      <span>Cuervos posados: <span ref="counter">0</span></span>
      <button ref="callButton" type="button" :disabled="!!error">Llamar a los cuervos</button>
    </div>
    <p v-if="error" class="crow-tree__error" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { createCrowScene } from './files/cuervos';

const props = defineProps<{ floating?: boolean }>();
const scene = ref<HTMLCanvasElement>();
const treeAnchor = ref<HTMLElement>();
const rain = ref<HTMLCanvasElement>();
const counter = ref<HTMLElement>();
const callButton = ref<HTMLButtonElement>();
const error = ref('');
const sceneReady = ref(false);
let dispose: (() => void) | undefined;

onMounted(() => {
  if (!scene.value || !rain.value || !counter.value || !callButton.value) return;
  dispose = createCrowScene({
    canvas: scene.value,
    rainCanvas: rain.value,
    counterEl: counter.value,
    callBtn: callButton.value,
    rainEnabled: !props.floating,
    interactionTarget: props.floating ? document.documentElement : scene.value,
    ...(treeAnchor.value ? { treeAnchor: treeAnchor.value } : {}),
    onReady: () => {
      sceneReady.value = true;
    },
    onError: () => {
      error.value = 'No se pudo cargar el árbol de cuervos.';
    },
  });
});

onUnmounted(() => dispose?.());
</script>

<style scoped>
.crow-tree {
  position: relative;
  width: 100%;
  height: clamp(360px, 75vh, 900px);
  overflow: hidden;
  background: #000;
  color: #b8ffc8;
}

.crow-tree__rain,
.crow-tree__scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.crow-tree--ready .crow-tree__rain,
.crow-tree--ready .crow-tree__scene {
  opacity: 1;
  animation: reveal-crow-scene 1.8s ease-in-out both;
}

@keyframes reveal-crow-scene {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .crow-tree--ready .crow-tree__rain,
  .crow-tree--ready .crow-tree__scene {
    animation: none;
  }
}

.crow-tree--floating {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
}

.crow-tree__anchor {
  position: absolute;
  right: max(8px, env(safe-area-inset-right));
  bottom: 0;
  width: clamp(360px, 40vw, 560px);
  height: clamp(390px, 56vh, 620px);
}

@media (max-width: 768px) {
  .crow-tree__anchor {
    width: min(280px, 70vw);
    height: min(320px, 55dvh);
  }
}

.crow-tree__rain {
  pointer-events: none;
}

.crow-tree__controls {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: monospace;
}

.crow-tree__controls button {
  padding: 0.6rem 0.9rem;
  border: 1px solid #00ff41;
  border-radius: 6px;
  background: #0d1117;
  color: inherit;
  cursor: pointer;
}

.crow-tree__controls button:focus-visible {
  outline: 2px solid #b8ffc8;
  outline-offset: 3px;
}

.crow-tree__error {
  position: absolute;
  top: 50%;
  width: 100%;
  padding: 1rem;
  text-align: center;
}
</style>

<template>
  <canvas ref="canvas" class="matrix-background"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  const fontSize = 13
  ;
  const speed = 0.99; // Velocidad del efecto (0.5 = mitad de velocidad, 1 = velocidad normal)

  let drops = new Float32Array(Math.floor(canvas.value.width / fontSize));
  for (let i = 0; i < drops.length; i++) {
    drops[i] = Math.random() * -100;
  }

  const characters =
    '010011011001010110110010101101100101011011001010110110010101101100101011011001010110110010101101100101011011001010110110Menfroyt';

  const draw = () => {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = i * fontSize;
      const y = drops[i]! * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.value!.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]! += speed;
    }

    animationFrameId = requestAnimationFrame(draw);
  };

  draw();

  const handleResize = () => {
    if (!canvas.value) return;

    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;

    drops = new Float32Array(Math.floor(canvas.value.width / fontSize));
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style scoped>
.matrix-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
}
</style>

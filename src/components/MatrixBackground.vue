<template>
  <canvas ref="canvas" class="matrix-background"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  chars: string[];
  length: number;
}

interface FloatingSymbol {
  x: number;
  y: number;
  char: string;
  size: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface GridLine {
  start: { x: number; y: number };
  end: { x: number; y: number };
  opacity: number;
  pulsePhase: number;
}

interface GeometricShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'hexagon' | 'triangle' | 'diamond' | 'circle';
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  driftX: number;
  driftY: number;
}

interface CircuitNode {
  x: number;
  y: number;
  connections: number[];
  pulsePhase: number;
  size: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  // ==========================================
  // 🎮 CONFIGURACIÓN DE VELOCIDADES
  // Ajusta estos valores para cambiar la velocidad
  // Valores más altos = más rápido
  // ==========================================

  const SPEED_CONFIG = {
    // Velocidad de caída de la lluvia Matrix (0.1 = muy lento, 0.5 = lento, 1 = normal, 2 = rápido)
    matrixRainSpeed: 0.2,

    // Velocidad de rotación de las formas geométricas (0.005 = lento, 0.01 = normal, 0.02 = rápido)
    shapeRotationSpeed: 0.01,

    // Velocidad de movimiento/deriva de las formas (0.1 = lento, 0.3 = normal, 0.5 = rápido)
    shapeDriftSpeed: 0.5,

    // Velocidad del efecto de pulso/respiración (0.3 = lento, 0.5 = normal, 1 = rápido)
    pulseSpeed: 0.5,

    // Velocidad del pulso de la cuadrícula (0.3 = lento, 0.5 = normal, 1 = rápido)
    gridPulseSpeed: 0.5,
  };

  // ==========================================

  const fontSize = 30;
  const matrixChars = '010001011101110111001010110100011110001011101110111001010110100011110';
  const codeChars = '{}[]()<>=/+*-_;:.,|&^%$#@!~`';
  const brandText = 'MENFROYT';

  // Matrix rain drops with trailing effect
  const columnCount = Math.floor(canvas.value.width / fontSize);
  const drops: MatrixDrop[] = [];

  for (let i = 0; i < columnCount; i++) {
    const length = 5 + Math.floor(Math.random() * 20);
    const chars: string[] = [];
    for (let j = 0; j < length; j++) {
      chars.push(matrixChars.charAt(Math.floor(Math.random() * matrixChars.length)));
    }
    drops.push({
      x: i * fontSize,
      y: Math.random() * -500,
      speed: (0.5 + Math.random() * 1.5) * SPEED_CONFIG.matrixRainSpeed,
      opacity: 0.3 + Math.random() * 0.7,
      chars,
      length,
    });
  }

  // Floating code symbols
  const floatingSymbols: FloatingSymbol[] = [];
  for (let i = 0; i < 20; i++) {
    floatingSymbols.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      char: codeChars.charAt(Math.floor(Math.random() * codeChars.length)),
      size: 20 + Math.random() * 40,
      opacity: 0.02 + Math.random() * 0.05,
      pulseSpeed: (0.5 + Math.random() * 1.5) * SPEED_CONFIG.pulseSpeed,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  }

  // Background grid
  const gridLines: GridLine[] = [];
  const gridSpacing = 80;

  // Horizontal lines
  for (let y = 0; y < canvas.value.height; y += gridSpacing) {
    gridLines.push({
      start: { x: 0, y },
      end: { x: canvas.value.width, y },
      opacity: 0.03,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  }

  // Vertical lines
  for (let x = 0; x < canvas.value.width; x += gridSpacing) {
    gridLines.push({
      start: { x, y: 0 },
      end: { x, y: canvas.value.height },
      opacity: 0.03,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  }

  // Geometric shapes
  const shapes: GeometricShape[] = [];
  const shapeTypes: GeometricShape['type'][] = ['hexagon', 'triangle', 'diamond', 'circle'];
  for (let i = 0; i < 12; i++) {
    shapes.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      size: 30 + Math.random() * 80,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * SPEED_CONFIG.shapeRotationSpeed * 2,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)] ?? 'hexagon',
      opacity: 0.03 + Math.random() * 0.04,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: (0.3 + Math.random() * 0.7) * SPEED_CONFIG.pulseSpeed,
      driftX: (Math.random() - 0.5) * SPEED_CONFIG.shapeDriftSpeed * 2,
      driftY: (Math.random() - 0.5) * SPEED_CONFIG.shapeDriftSpeed * 2,
    });
  }

  // Circuit nodes
  const circuitNodes: CircuitNode[] = [];
  for (let i = 0; i < 8; i++) {
    const connections: number[] = [];
    const numConnections = 1 + Math.floor(Math.random() * 2);
    for (let j = 0; j < numConnections; j++) {
      const target = Math.floor(Math.random() * 8);
      if (target !== i && !connections.includes(target)) {
        connections.push(target);
      }
    }
    circuitNodes.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      connections,
      pulsePhase: Math.random() * Math.PI * 2,
      size: 3 + Math.random() * 4,
    });
  }

  // Helper function to draw shapes
  const drawHexagon = (cx: number, cy: number, size: number, rotation: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = rotation + (Math.PI / 3) * i;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  const drawTriangle = (cx: number, cy: number, size: number, rotation: number) => {
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const angle = rotation + ((Math.PI * 2) / 3) * i - Math.PI / 2;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  const drawDiamond = (cx: number, cy: number, size: number, rotation: number) => {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = rotation + (Math.PI / 2) * i;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  let time = 0;

  const draw = () => {
    time += 0.016;

    // Clear with fade effect
    ctx.fillStyle = 'rgba(13, 17, 23, 0.08)';
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height);

    // Draw grid
    ctx.lineWidth = 1;
    for (const line of gridLines) {
      const pulse = Math.sin(time * SPEED_CONFIG.gridPulseSpeed + line.pulsePhase) * 0.5 + 0.5;
      ctx.strokeStyle = `rgba(0, 255, 136, ${line.opacity * (0.5 + pulse * 0.5)})`;
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    }

    // Draw floating symbols
    for (const symbol of floatingSymbols) {
      const pulse = Math.sin(time * symbol.pulseSpeed + symbol.pulsePhase) * 0.5 + 0.5;
      ctx.font = `${symbol.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(0, 255, 136, ${symbol.opacity * (0.3 + pulse * 0.7)})`;
      ctx.fillText(symbol.char, symbol.x, symbol.y);
    }

    // Draw geometric shapes
    for (const shape of shapes) {
      const pulse = Math.sin(time * shape.pulseSpeed + shape.pulsePhase) * 0.5 + 0.5;
      const alpha = shape.opacity * (0.5 + pulse * 0.5);

      ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 5 * pulse;

      if (shape.type === 'hexagon') {
        drawHexagon(shape.x, shape.y, shape.size, shape.rotation);
      } else if (shape.type === 'triangle') {
        drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
      } else if (shape.type === 'diamond') {
        drawDiamond(shape.x, shape.y, shape.size, shape.rotation);
      } else {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
      }
      ctx.stroke();

      // Inner shape with less opacity
      ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.3})`;
      if (shape.type === 'hexagon') {
        drawHexagon(shape.x, shape.y, shape.size * 0.6, shape.rotation);
      } else if (shape.type === 'triangle') {
        drawTriangle(shape.x, shape.y, shape.size * 0.6, shape.rotation);
      } else if (shape.type === 'diamond') {
        drawDiamond(shape.x, shape.y, shape.size * 0.6, shape.rotation);
      } else {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size * 0.6, 0, Math.PI * 2);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Update shape
      shape.rotation += shape.rotationSpeed;
      shape.x += shape.driftX;
      shape.y += shape.driftY;

      // Wrap around screen
      if (shape.x < -shape.size) shape.x = canvas.value!.width + shape.size;
      if (shape.x > canvas.value!.width + shape.size) shape.x = -shape.size;
      if (shape.y < -shape.size) shape.y = canvas.value!.height + shape.size;
      if (shape.y > canvas.value!.height + shape.size) shape.y = -shape.size;
    }

    // Draw circuit connections
    ctx.lineWidth = 1;
    for (let i = 0; i < circuitNodes.length; i++) {
      const node = circuitNodes[i];
      if (!node) continue;
      const pulse = Math.sin(time * 0.8 + node.pulsePhase) * 0.5 + 0.5;

      // Draw connections
      for (const targetIdx of node.connections) {
        const target = circuitNodes[targetIdx];
        if (!target) continue;

        ctx.strokeStyle = `rgba(0, 255, 136, ${0.02 + pulse * 0.02})`;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);

        // Create angular path
        const midX = (node.x + target.x) / 2;
        ctx.lineTo(midX, node.y);
        ctx.lineTo(midX, target.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }

      // Draw node
      ctx.fillStyle = `rgba(0, 255, 136, ${0.05 + pulse * 0.05})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer ring
      ctx.strokeStyle = `rgba(0, 255, 136, ${0.03 + pulse * 0.03})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw matrix rain with trailing effect
    for (const drop of drops) {
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      // Draw trailing characters
      for (let j = 0; j < drop.length; j++) {
        const charY = drop.y - j * fontSize;
        if (charY < 0 || charY > canvas.value!.height) continue;

        const fadeRatio = 1 - j / drop.length;
        const alpha = drop.opacity * fadeRatio * 0.8;

        if (j === 0) {
          // Head character - brightest
          ctx.fillStyle = `rgba(180, 255, 200, ${Math.min(1, alpha + 0.3)})`;
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 10;
        } else if (j < 3) {
          // Near head - bright green
          ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
          ctx.shadowBlur = 5;
        } else {
          // Trail - fading green
          ctx.fillStyle = `rgba(0, 200, 100, ${alpha * 0.6})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(drop.chars[j] ?? '', drop.x, charY);
      }

      ctx.shadowBlur = 0;

      // Update position
      drop.y += drop.speed * fontSize * 0.15;

      // Randomly change characters
      if (Math.random() > 0.95) {
        const idx = Math.floor(Math.random() * drop.length);
        drop.chars[idx] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      }

      // Reset when off screen
      if (drop.y - drop.length * fontSize > canvas.value!.height) {
        drop.y = Math.random() * -300;
        drop.speed = (0.5 + Math.random() * 1.5) * SPEED_CONFIG.matrixRainSpeed;
      }
    }

    // Draw brand text watermark occasionally
    if (Math.random() > 0.998) {
      const x = Math.random() * (canvas.value!.width - 200);
      const y = Math.random() * canvas.value!.height;
      ctx.font = "bold 12px 'JetBrains Mono', monospace";
      ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
      ctx.fillText(`// ${brandText}`, x, y);
    }

    // Add scanline effect
    for (let y = 0; y < canvas.value!.height; y += 4) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, y, canvas.value!.width, 1);
    }

    animationFrameId = requestAnimationFrame(draw);
  };

  draw();

  const handleResize = () => {
    if (!canvas.value) return;

    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;

    // Recalculate grid
    gridLines.length = 0;
    for (let y = 0; y < canvas.value.height; y += gridSpacing) {
      gridLines.push({
        start: { x: 0, y },
        end: { x: canvas.value.width, y },
        opacity: 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    for (let x = 0; x < canvas.value.width; x += gridSpacing) {
      gridLines.push({
        start: { x, y: 0 },
        end: { x, y: canvas.value.height },
        opacity: 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
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
  opacity: 0.2;
}
</style>

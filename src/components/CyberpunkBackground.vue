<template>
  <canvas ref="canvas" class="cyberpunk-background"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
  highlight: boolean;
}

interface HexagonNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  connections: number[];
}

interface DataStream {
  x: number;
  y: number;
  width: number;
  speed: number;
  segments: { opacity: number; char: string }[];
}

interface CircuitLine {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
}

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  // Matrix characters (including Japanese katakana for authentic look)
  const matrixChars =
    '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const codeKeywords = [
    'function',
    'const',
    'async',
    'await',
    'return',
    'import',
    'export',
    'class',
    'Vue',
    'React',
    'Node',
    'API',
    '=>',
    '{}',
    '[]',
  ];

  const fontSize = 14;
  const columnCount = Math.floor(canvas.value.width / fontSize);

  // Initialize matrix columns
  const matrixColumns: MatrixColumn[] = [];
  for (let i = 0; i < columnCount; i++) {
    matrixColumns.push({
      x: i * fontSize,
      y: Math.random() * canvas.value.height * -1,
      speed: 2 + Math.random() * 4,
      chars: Array.from({ length: 20 + Math.floor(Math.random() * 15) }, () =>
        matrixChars.charAt(Math.floor(Math.random() * matrixChars.length)),
      ),
      opacity: 0.3 + Math.random() * 0.7,
      highlight: Math.random() > 0.85,
    });
  }

  // Initialize hexagon network nodes
  const hexNodes: HexagonNode[] = [];
  const nodeCount = 15;
  for (let i = 0; i < nodeCount; i++) {
    hexNodes.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      radius: 20 + Math.random() * 30,
      pulsePhase: Math.random() * Math.PI * 2,
      connections: [],
    });
  }
  // Create connections between nearby nodes
  hexNodes.forEach((node, i) => {
    hexNodes.forEach((other, j) => {
      if (i !== j) {
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist < 300 && node.connections.length < 3) {
          node.connections.push(j);
        }
      }
    });
  });

  // Initialize horizontal data streams
  const dataStreams: DataStream[] = [];
  for (let i = 0; i < 8; i++) {
    const segmentCount = 10 + Math.floor(Math.random() * 20);
    dataStreams.push({
      x: Math.random() * canvas.value.width * -1,
      y: 100 + Math.random() * (canvas.value.height - 200),
      width: 150 + Math.random() * 200,
      speed: 1 + Math.random() * 3,
      segments: Array.from({ length: segmentCount }, () => ({
        opacity: Math.random(),
        char: codeKeywords[Math.floor(Math.random() * codeKeywords.length)] ?? 'code',
      })),
    });
  }

  // Initialize circuit lines
  const circuitLines: CircuitLine[] = [];
  for (let i = 0; i < 6; i++) {
    const points: { x: number; y: number }[] = [];
    let x = Math.random() * canvas.value.width;
    let y = Math.random() * canvas.value.height;

    for (let j = 0; j < 5 + Math.floor(Math.random() * 5); j++) {
      points.push({ x, y });
      // Move in grid pattern
      if (Math.random() > 0.5) {
        x += (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100);
      } else {
        y += (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100);
      }
      x = Math.max(0, Math.min(canvas.value.width, x));
      y = Math.max(0, Math.min(canvas.value.height, y));
    }

    circuitLines.push({
      points,
      progress: 0,
      speed: 0.005 + Math.random() * 0.01,
      color: Math.random() > 0.5 ? '#00ff88' : '#00cc6a',
    });
  }

  let time = 0;

  const drawHexagon = (cx: number, cy: number, radius: number, opacity: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const draw = () => {
    time += 0.016;

    // Clear with fade effect for trails
    ctx.fillStyle = 'rgba(13, 17, 23, 0.15)';
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height);

    // Draw subtle grid
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < canvas.value!.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.value!.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.value!.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.value!.width, y);
      ctx.stroke();
    }

    // Draw hexagon network connections
    ctx.lineWidth = 1;
    hexNodes.forEach((node) => {
      node.connections.forEach((connIdx) => {
        const other = hexNodes[connIdx];
        if (!other) return;
        const pulse = Math.sin(time + node.pulsePhase) * 0.5 + 0.5;

        const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
        gradient.addColorStop(0, `rgba(0, 255, 136, ${0.1 * pulse})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 136, ${0.3 * pulse})`);
        gradient.addColorStop(1, `rgba(0, 255, 136, ${0.1 * pulse})`);

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      });
    });

    // Draw hexagon nodes
    hexNodes.forEach((node) => {
      const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
      drawHexagon(node.x, node.y, node.radius, 0.2 * pulse);
      drawHexagon(node.x, node.y, node.radius * 0.6, 0.4 * pulse);

      // Center glow
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        node.radius * 0.3,
      );
      gradient.addColorStop(0, `rgba(0, 255, 136, ${0.3 * pulse})`);
      gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw circuit lines with animation
    circuitLines.forEach((circuit) => {
      circuit.progress += circuit.speed;
      if (circuit.progress > 1) circuit.progress = 0;

      ctx.strokeStyle = circuit.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = circuit.color;
      ctx.shadowBlur = 10;

      const totalPoints = circuit.points.length - 1;
      const currentSegment = Math.floor(circuit.progress * totalPoints);
      const segmentProgress = (circuit.progress * totalPoints) % 1;

      // Draw completed segments
      for (let i = 0; i < currentSegment && i < circuit.points.length - 1; i++) {
        const pointA = circuit.points[i];
        const pointB = circuit.points[i + 1];
        if (!pointA || !pointB) continue;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.stroke();
      }

      // Draw current animated segment
      if (currentSegment < circuit.points.length - 1) {
        const start = circuit.points[currentSegment];
        const end = circuit.points[currentSegment + 1];
        if (start && end) {
          const currentX = start.x + (end.x - start.x) * segmentProgress;
          const currentY = start.y + (end.y - start.y) * segmentProgress;

          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();

          // Draw pulse dot at current position
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    });

    // Draw Matrix rain columns
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    matrixColumns.forEach((column) => {
      column.chars.forEach((char, i) => {
        const y = column.y + i * fontSize;

        if (y > 0 && y < canvas.value!.height) {
          // First character is brightest (white/bright green)
          if (i === 0) {
            ctx.fillStyle = column.highlight ? '#ffffff' : '#88ffbb';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 15;
          } else {
            // Fade out as we go up
            const fadeOpacity = Math.max(0, 1 - i / column.chars.length) * column.opacity;
            ctx.fillStyle = `rgba(0, 255, 136, ${fadeOpacity})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, column.x, y);
          ctx.shadowBlur = 0;
        }
      });

      // Update position
      column.y += column.speed;

      // Reset when off screen
      if (column.y - column.chars.length * fontSize > canvas.value!.height) {
        column.y = Math.random() * -500 - 100;
        column.speed = 2 + Math.random() * 4;
        column.highlight = Math.random() > 0.85;
        // Randomize some characters
        column.chars = column.chars.map(() =>
          Math.random() > 0.7
            ? matrixChars.charAt(Math.floor(Math.random() * matrixChars.length))
            : (column.chars[0] ?? '0'),
        );
      }

      // Randomly change characters for animation effect
      if (Math.random() > 0.98) {
        const idx = Math.floor(Math.random() * column.chars.length);
        column.chars[idx] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      }
    });

    // Draw horizontal data streams
    ctx.font = '11px "Share Tech Mono", monospace';
    dataStreams.forEach((stream) => {
      const segmentWidth = stream.width / stream.segments.length;

      stream.segments.forEach((segment, i) => {
        const x = stream.x + i * segmentWidth;
        if (x > -50 && x < canvas.value!.width + 50) {
          ctx.globalAlpha = segment.opacity * 0.6;
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 5;
          ctx.fillText(segment.char, x, stream.y);
        }
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Update position
      stream.x += stream.speed;
      if (stream.x > canvas.value!.width + stream.width) {
        stream.x = -stream.width - Math.random() * 500;
        stream.y = 100 + Math.random() * (canvas.value!.height - 200);
      }
    });

    // Draw scan line effect
    const scanY = ((time * 50) % (canvas.value!.height + 100)) - 50;
    const scanGradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    scanGradient.addColorStop(0, 'rgba(0, 255, 136, 0)');
    scanGradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.1)');
    scanGradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
    ctx.fillStyle = scanGradient;
    ctx.fillRect(0, scanY - 30, canvas.value!.width, 60);

    // Add subtle vignette effect
    const vignette = ctx.createRadialGradient(
      canvas.value!.width / 2,
      canvas.value!.height / 2,
      0,
      canvas.value!.width / 2,
      canvas.value!.height / 2,
      canvas.value!.width * 0.7,
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height);

    animationFrameId = requestAnimationFrame(draw);
  };

  draw();

  const handleResize = () => {
    if (!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style scoped>
.cyberpunk-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
}
</style>

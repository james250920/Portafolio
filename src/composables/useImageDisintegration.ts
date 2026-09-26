import { onUnmounted, ref } from 'vue';

export function useImageDisintegration() {
  const image = ref<HTMLImageElement>();
  const canvas = ref<HTMLCanvasElement>();
  const container = ref<HTMLElement>();
  const active = ref(false);
  let frame = 0;
  let progress = 0;
  let target = 0;
  let lastTime = 0;
  let width = 0;
  let height = 0;
  let context: CanvasRenderingContext2D | null = null;
  let snapshot: HTMLCanvasElement | null = null;
  let fragments: { x: number; y: number; dx: number; dy: number; delay: number }[] = [];
  const size = 10;
  const padding = 200;

  function captureCard(img: HTMLImageElement, card: HTMLElement, ratio: number) {
    const surface = document.createElement('canvas');
    surface.width = Math.round(width * ratio);
    surface.height = Math.round(height * ratio);
    const ctx = surface.getContext('2d');
    if (!ctx) return null;
    ctx.scale(ratio, ratio);
    const bounds = card.getBoundingClientRect();
    const cardStyle = getComputedStyle(card);
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, parseFloat(cardStyle.borderRadius));
    ctx.clip();
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);
    const imageBounds = img.getBoundingClientRect();
    const scale = Math.max(
      imageBounds.width / img.naturalWidth,
      imageBounds.height / img.naturalHeight,
    );
    ctx.save();
    ctx.filter = getComputedStyle(img).filter;
    ctx.drawImage(
      img,
      (img.naturalWidth - imageBounds.width / scale) / 2,
      (img.naturalHeight - imageBounds.height / scale) / 2,
      imageBounds.width / scale,
      imageBounds.height / scale,
      imageBounds.left - bounds.left,
      imageBounds.top - bounds.top,
      imageBounds.width,
      imageBounds.height,
    );
    ctx.restore();

    const overlay = card.querySelector<HTMLElement>('.image-overlay');
    if (overlay) {
      const rect = overlay.getBoundingClientRect();
      const top = rect.top - bounds.top;
      const gradient = ctx.createLinearGradient(0, height, 0, top);
      gradient.addColorStop(0, 'rgba(13, 17, 23, 0.98)');
      gradient.addColorStop(0.5, 'rgba(13, 17, 23, 0.7)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, top, width, rect.height);
    }
    const badge = card.querySelector<HTMLElement>('.status-indicator');
    if (badge) {
      const rect = badge.getBoundingClientRect();
      const style = getComputedStyle(badge);
      ctx.beginPath();
      ctx.roundRect(rect.left - bounds.left, rect.top - bounds.top, rect.width, rect.height, 20);
      ctx.fillStyle = style.backgroundColor;
      ctx.fill();
      ctx.strokeStyle = style.borderColor;
      ctx.stroke();
    }
    const dot = card.querySelector<HTMLElement>('.status-dot');
    if (dot) {
      const rect = dot.getBoundingClientRect();
      ctx.fillStyle = getComputedStyle(dot).backgroundColor;
      ctx.beginPath();
      ctx.arc(
        rect.left - bounds.left + rect.width / 2,
        rect.top - bounds.top + rect.height / 2,
        rect.width / 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    // DOM ranges preserve the actual text wrapping and responsive positions.
    for (const element of card.querySelectorAll<HTMLElement>('.name, .title, .status-text')) {
      const style = getComputedStyle(element);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = 'alphabetic';
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        for (let index = 0; index < text.length; index++) {
          range.setStart(node, index);
          range.setEnd(node, index + 1);
          const rect = range.getBoundingClientRect();
          const metrics = ctx.measureText(text[index]!);
          const ascent = metrics.fontBoundingBoxAscent ?? parseFloat(style.fontSize) * 0.8;
          const descent = metrics.fontBoundingBoxDescent ?? parseFloat(style.fontSize) * 0.2;
          ctx.fillText(
            text[index]!,
            rect.left - bounds.left,
            rect.top - bounds.top + (rect.height - ascent - descent) / 2 + ascent,
          );
        }
      }
    }
    ctx.strokeStyle = cardStyle.borderColor;
    ctx.lineWidth = parseFloat(cardStyle.borderWidth);
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, parseFloat(cardStyle.borderRadius));
    ctx.stroke();
    return surface;
  }

  function draw() {
    if (!context || !snapshot) return;
    context.clearRect(-padding, -padding, width + padding * 2, height + padding * 2);
    const scaleX = snapshot.width / width;
    const scaleY = snapshot.height / height;

    for (const fragment of fragments) {
      const amount = Math.min(1, Math.max(0, (progress - fragment.delay) / 0.55));
      const w = Math.min(size, width - fragment.x);
      const h = Math.min(size, height - fragment.y);
      context.save();
      context.globalAlpha = 1 - amount;
      context.translate(
        fragment.x + w / 2 + fragment.dx * amount,
        fragment.y + h / 2 + fragment.dy * amount,
      );
      context.rotate(amount * fragment.dy * 0.015);
      context.scale(1 - amount * 0.75, 1 - amount * 0.75);
      context.drawImage(
        snapshot,
        fragment.x * scaleX,
        fragment.y * scaleY,
        w * scaleX,
        h * scaleY,
        -w / 2,
        -h / 2,
        w,
        h,
      );
      context.restore();
    }
  }

  function animate(time: number) {
    const delta = lastTime ? Math.min(time - lastTime, 50) : 0;
    lastTime = time;
    progress = Math.max(0, Math.min(1, progress + ((target ? 1 : -1) * delta) / 1400));
    draw();
    if (progress !== target) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
      if (!target) active.value = false;
    }
  }

  function play() {
    if (frame) return;
    lastTime = 0;
    frame = requestAnimationFrame(animate);
  }

  function enter(event: PointerEvent) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const img = image.value;
    const layer = canvas.value;
    const card = container.value;
    if (!img?.complete || !img.naturalWidth || !layer || !card) return;
    if (!active.value) {
      width = card.offsetWidth;
      height = card.offsetHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      layer.width = Math.round((width + padding * 2) * ratio);
      layer.height = Math.round((height + padding * 2) * ratio);
      context = layer.getContext('2d');
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, padding * ratio, padding * ratio);
      snapshot = captureCard(img, card, ratio);
      if (!snapshot) return;
      fragments = [];
      for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          fragments.push({
            x,
            y,
            dx: 40 + Math.random() * 130,
            dy: -30 - Math.random() * 150,
            delay: (1 - x / width) * 0.3 + Math.random() * 0.15,
          });
        }
      }
      draw();
      active.value = true;
    }
    target = 1;
    play();
  }

  function leave() {
    target = 0;
    if (active.value) play();
  }

  onUnmounted(() => cancelAnimationFrame(frame));
  return { image, canvas, container, active, enter, leave };
}

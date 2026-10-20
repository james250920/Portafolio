import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

export interface ScrambleChar {
  char: string;
  scrambled: boolean;
}

// Cycles through `words`, decoding each one from random glyphs into the next
export function useTextScramble(words: Ref<string[]>, { hold = 2600, duration = 900 } = {}) {
  const chars = ref<ScrambleChar[]>([]);
  let index = 0;
  let frame = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const randomGlyph = () => GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));

  function show(text: string) {
    chars.value = [...text].map((char) => ({ char, scrambled: false }));
  }

  function scrambleTo(next: string) {
    const from = chars.value.map((c) => c.char).join('');
    const queue = Array.from({ length: Math.max(from.length, next.length) }, (_, i) => {
      const start = Math.random() * duration * 0.4;
      return {
        from: from[i] ?? '',
        to: next[i] ?? '',
        start,
        end: start + duration * (0.3 + Math.random() * 0.3),
      };
    });
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      if (elapsed >= duration) {
        show(next);
        schedule();
        return;
      }
      chars.value = queue.flatMap<ScrambleChar>(({ from, to, start, end }) => {
        if (elapsed >= end) return to ? [{ char: to, scrambled: false }] : [];
        if (elapsed < start) return from ? [{ char: from, scrambled: false }] : [];
        return [{ char: randomGlyph(), scrambled: true }];
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  function schedule() {
    timer = setTimeout(() => {
      index = (index + 1) % words.value.length;
      const next = words.value[index] ?? '';
      if (reducedMotion) {
        show(next);
        schedule();
      } else {
        scrambleTo(next);
      }
    }, hold);
  }

  function stop() {
    clearTimeout(timer);
    cancelAnimationFrame(frame);
  }

  function start() {
    stop();
    show(words.value[index] ?? '');
    if (words.value.length > 1) schedule();
  }

  onMounted(start);
  onUnmounted(stop);
  // Language switch: restart with the translated words
  watch(words, start);

  return { chars };
}

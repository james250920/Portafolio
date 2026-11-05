const HEADER_OFFSET = 57; // 56px toolbar + 1px border

/** Scrolls to a page section, honoring reduced motion, and moves keyboard focus into it. */
export function scrollToSection(id: string, { moveFocus = true } = {}) {
  const element = document.getElementById(id);
  if (!element) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: reducedMotion ? 'auto' : 'smooth',
  });

  if (moveFocus) {
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  }
}

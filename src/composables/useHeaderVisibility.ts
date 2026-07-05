import { ref, onMounted, onUnmounted } from "vue";

export function useHeaderVisibility() {
  const isVisible = ref(false);
  const hasAppeared = ref(false);
  const isPastHero = ref(false);

  let visibilityObserver: IntersectionObserver | null = null;
  let styleObserver: IntersectionObserver | null = null;
  let scrollHandler: ((...args: unknown[]) => void) | null = null;

  const show = () => {
    isVisible.value = true;
    hasAppeared.value = true;
  };

  onMounted(() => {
    const hero = document.querySelector("#hero");

    // Observer 1: controla el ESTILO del header (transparente vs blur)
    // Se activa siempre, independiente de si ya apareció
    styleObserver = new IntersectionObserver(
      (entries) => {
        isPastHero.value = !entries[0].isIntersecting;
      },
      { threshold: 0.05 },
    );
    if (hero) styleObserver.observe(hero);

    if (window.innerWidth < 768) {
      // Mobile: aparece con delay o al hacer scroll
      setTimeout(() => show(), 800);

      scrollHandler = () => {
        if (window.scrollY > 30) {
          show();
        }
        // En mobile nunca se oculta una vez que apareció
      };
      window.addEventListener("scroll", scrollHandler);
    } else {
      // Desktop: primera aparición solo con hover en hero-button
      const triggerBtn = document.querySelector(".hero-button");

      const onHoverTrigger = () => {
        if (!hasAppeared.value) {
          show();
          triggerBtn?.removeEventListener("mouseenter", onHoverTrigger);

          // Observer 2: controla VISIBILIDAD solo después de primera aparición
          // Una vez que apareció, el header NUNCA desaparece — solo cambia de estilo
          // No necesitamos observer de visibilidad adicional
        }
      };

      triggerBtn?.addEventListener("mouseenter", onHoverTrigger);

      // Si el usuario scrollea sin hacer hover, el header aparece al salir del hero
      scrollHandler = () => {
        if (!hasAppeared.value && window.scrollY > window.innerHeight * 0.5) {
          show();
        }
      };
      window.addEventListener("scroll", scrollHandler);
    }
  });

  onUnmounted(() => {
    if (visibilityObserver) {
      visibilityObserver.disconnect();
      visibilityObserver = null;
    }
    if (styleObserver) {
      styleObserver.disconnect();
      styleObserver = null;
    }
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
      scrollHandler = null;
    }
  });

  return { isVisible, hasAppeared, isPastHero };
}

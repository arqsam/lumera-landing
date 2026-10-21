import { computed, ref, onMounted, onUnmounted } from "vue";

export function useHeaderVisibility() {
  const hasBeenShown = ref(false);
  const isInFooter = ref(false);
  // El header se oculta mientras el footer ocupa la zona del header
  const isVisible = computed(() => hasBeenShown.value && !isInFooter.value);
  const hasAppeared = ref(false);
  const isPastHero = ref(false);
  const isDarkSection = ref(true); // hero es dark por defecto

  let visibilityObserver: IntersectionObserver | null = null;
  let styleObserver: IntersectionObserver | null = null;
  let themeObserver: IntersectionObserver | null = null;
  let footerObserver: IntersectionObserver | null = null;
  let scrollHandler: ((...args: unknown[]) => void) | null = null;

  const show = () => {
    hasBeenShown.value = true;
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

    // Observer 2: detecta qué sección está bajo el header
    // y lee su data-theme para adaptar el color del header.
    // Se usa una franja delgada (entre el 5% y el 10% del alto del viewport,
    // donde queda el header) en vez de un umbral de visibilidad: con
    // threshold 0.5 una sección más alta que dos pantallas (p. ej. Tienda en
    // móvil) nunca alcanzaba el 50% visible y el header conservaba el tema
    // de la sección anterior.
    const sections = document.querySelectorAll("[data-theme]");
    themeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset.theme;
            isDarkSection.value = theme === "dark";
          }
        });
      },
      { rootMargin: "-5% 0px -90% 0px", threshold: 0 },
    );
    sections.forEach((section) => themeObserver!.observe(section));

    // Observer 3: oculta el header cuando el footer llega a la zona superior
    // (el footer ya trae su propia navegación). Franja de 96 px bajo el borde
    // superior del viewport: el margen inferior deja solo esa franja.
    const footer = document.querySelector("#footer");
    if (footer) {
      const bandPx = 96;
      const bottomMargin = Math.max(window.innerHeight - bandPx, 0);
      footerObserver = new IntersectionObserver(
        (entries) => {
          isInFooter.value = entries[entries.length - 1].isIntersecting;
        },
        { rootMargin: `0px 0px -${bottomMargin}px 0px`, threshold: 0 },
      );
      footerObserver.observe(footer);
    }

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
    if (themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
    }
    if (footerObserver) {
      footerObserver.disconnect();
      footerObserver = null;
    }
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
      scrollHandler = null;
    }
  });

  return { isVisible, hasAppeared, isPastHero, isDarkSection };
}

import { ref, onMounted, onUnmounted } from "vue";

export function useHeaderVisibility() {
  const isVisible = ref(false);
  const hasAppeared = ref(false);

  let observer: IntersectionObserver | null = null;
  let scrollHandler: (() => void) | null = null;

  const show = () => {
    isVisible.value = true;
    hasAppeared.value = true;
  };

  const hide = () => {
    isVisible.value = false;
  };

  onMounted(() => {
    if (window.innerWidth < 768) {
      // Mobile: aparece con delay o al hacer scroll
      setTimeout(() => show(), 800);

      scrollHandler = () => {
        if (window.scrollY > 30) {
          show();
        } else {
          hide();
        }
      };
      window.addEventListener("scroll", scrollHandler);
    } else {
      // Desktop: primera aparición solo con hover en hero-button
      // Después se controla por IntersectionObserver del hero
      const triggerBtn = document.querySelector(".hero-button");

      const onHoverTrigger = () => {
        if (!hasAppeared.value) {
          show();

          // Una vez que apareció, controlar visibilidad por viewport
          const hero = document.querySelector("#hero");
          observer = new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (entry.isIntersecting) {
                show();
              } else {
                hide();
              }
            },
            { threshold: 0.1 },
          );

          if (hero) {
            observer.observe(hero);
          }

          // Ya no necesitamos el listener de hover
          triggerBtn?.removeEventListener("mouseenter", onHoverTrigger);
        }
      };

      triggerBtn?.addEventListener("mouseenter", onHoverTrigger);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
      scrollHandler = null;
    }
  });

  return { isVisible, hasAppeared };
}

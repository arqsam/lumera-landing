import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { useHeaderVisibility } from "../useHeaderVisibility";

interface ObserverRecord {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  targets: Element[];
}

// Registro de todos los IntersectionObserver creados durante el test
const records: ObserverRecord[] = [];

class FakeIntersectionObserver {
  record: ObserverRecord;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.record = { callback, options, targets: [] };
    records.push(this.record);
  }

  observe(target: Element) {
    this.record.targets.push(target);
  }

  unobserve() {}

  disconnect() {}
}

const originalObserver = window.IntersectionObserver;
let state: ReturnType<typeof useHeaderVisibility> | undefined;
let unmountProbe: (() => void) | undefined;

// Componente mínimo que monta el composable (necesita onMounted)
const Probe = defineComponent({
  setup() {
    state = useHeaderVisibility();
    return () => h("div");
  },
});

function getState() {
  if (!state) throw new Error("El composable no se montó");
  return state;
}

// El observador de tema es el que observa todas las secciones con data-theme
function getThemeObserver(): ObserverRecord {
  const found = records.find((record) => record.targets.length > 1);
  if (!found) throw new Error("No se creó el observador de tema");
  return found;
}

function entry(
  target: Element,
  isIntersecting: boolean,
): IntersectionObserverEntry {
  return { target, isIntersecting } as IntersectionObserverEntry;
}

function crossBand(target: Element | null, isIntersecting = true) {
  if (!target) throw new Error("Sección no encontrada en el DOM de prueba");
  getThemeObserver().callback(
    [entry(target, isIntersecting)],
    {} as IntersectionObserver,
  );
}

describe("useHeaderVisibility — tema del header", () => {
  beforeEach(() => {
    records.length = 0;
    window.IntersectionObserver =
      FakeIntersectionObserver as unknown as typeof IntersectionObserver;
    document.body.innerHTML = `
      <section id="hero" data-theme="dark"></section>
      <section id="tienda" data-theme="light"></section>
      <footer id="footer" data-theme="dark"></footer>
    `;
    const wrapper = mount(Probe);
    unmountProbe = () => wrapper.unmount();
  });

  afterEach(() => {
    unmountProbe?.();
    unmountProbe = undefined;
    state = undefined;
    window.IntersectionObserver = originalObserver;
    document.body.innerHTML = "";
  });

  it("observa todas las secciones con data-theme, incluido el footer", () => {
    const ids = getThemeObserver().targets.map((target) => target.id);
    expect(ids).toEqual(["hero", "tienda", "footer"]);
  });

  it("detecta la sección bajo el header con una franja y no con un umbral de visibilidad", () => {
    const { options } = getThemeObserver();
    // Con threshold 0.5, una sección más alta que dos pantallas nunca se detecta
    expect(options?.threshold).toBe(0);
    expect(options?.rootMargin).toMatch(/%/);
  });

  it("empieza en tema oscuro (el hero es oscuro)", () => {
    expect(getState().isDarkSection.value).toBe(true);
  });

  it("cambia a tema claro al cruzar una sección light y vuelve a oscuro con el footer", () => {
    crossBand(document.getElementById("tienda"));
    expect(getState().isDarkSection.value).toBe(false);

    crossBand(document.getElementById("footer"));
    expect(getState().isDarkSection.value).toBe(true);
  });

  it("ignora las entradas que dejan de intersectar", () => {
    crossBand(document.getElementById("tienda"), false);
    expect(getState().isDarkSection.value).toBe(true);
  });
});

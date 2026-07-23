import "@testing-library/jest-dom";
import { vi, beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/vue";

// Mock de GSAP
vi.mock("gsap", () => {
  return {
    gsap: {
      from: vi.fn(),
      fromTo: vi.fn(),
      to: vi.fn(),
      set: vi.fn(),
      registerPlugin: vi.fn(),
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => {
  return {
    ScrollTrigger: {
      getAll: vi.fn(() => []),
      kill: vi.fn(),
    },
  };
});

// Mock de IntersectionObserver (no disponible en JSDOM)
const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
window.IntersectionObserver = mockIntersectionObserver;

// Limpiar los mocks antes de cada test
beforeEach(() => {
  vi.clearAllMocks();
});

// Limpiar el DOM tras cada test
afterEach(() => {
  cleanup();
});

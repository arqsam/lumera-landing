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
    },
  };
});

// Limpiar los mocks antes de cada test
beforeEach(() => {
  vi.clearAllMocks();
});

// Limpiar el DOM tras cada test
afterEach(() => {
  cleanup();
});

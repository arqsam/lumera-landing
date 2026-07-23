import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Filosofia from "../Filosofia.vue";

describe("Filosofia.vue", () => {
  it("renderiza sin errores y muestra el eyebrow de sección", () => {
    render(Filosofia);
    expect(screen.getByText(/nuestra filosofía/i)).toBeInTheDocument();
  });

  it("el anchor #filosofia existe en el DOM", () => {
    const { container } = render(Filosofia);
    expect(container.querySelector("#filosofia")).toBeTruthy();
  });

  it("renderiza exactamente 3 cards", () => {
    const { container } = render(Filosofia);
    const cards = container.querySelectorAll(".filosofia-card");
    expect(cards.length).toBe(3);
  });

  it("muestra los títulos de los 3 pilares", () => {
    render(Filosofia);
    expect(screen.getByText(/ciencia natural/i)).toBeInTheDocument();
    expect(screen.getByText(/pureza comprobada/i)).toBeInTheDocument();
    expect(screen.getByText(/bienestar integral/i)).toBeInTheDocument();
  });

  it("renderiza exactamente 3 dots de navegación", () => {
    render(Filosofia);
    const dots = screen.getAllByRole("button", { name: /ver frase/i });
    expect(dots.length).toBe(3);
  });

  it("la frase inicial visible es la primera", () => {
    render(Filosofia);
    expect(
      screen.getByText(/ciencia que nace de la naturaleza/i),
    ).toBeInTheDocument();
  });

  it("la capa decorativa tiene aria-hidden", () => {
    const { container } = render(Filosofia);
    const deco = container.querySelector(".filosofia-deco");
    expect(deco?.getAttribute("aria-hidden")).toBe("true");
  });
});

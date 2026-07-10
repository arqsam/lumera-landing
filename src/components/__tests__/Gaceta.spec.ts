import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Gaceta from "../Gaceta.vue";

describe("Gaceta.vue", () => {
  it("renderiza sin errores y muestra el título", () => {
    render(Gaceta);
    expect(
      screen.getByRole("heading", { name: /conocimiento que/i }),
    ).toBeInTheDocument();
  });

  it("el anchor #gaceta existe en el DOM", () => {
    const { container } = render(Gaceta);
    expect(container.querySelector("#gaceta")).toBeTruthy();
  });

  it("renderiza el artículo destacado", () => {
    const { container } = render(Gaceta);
    expect(container.querySelector(".gaceta-destacado")).toBeTruthy();
  });

  it("renderiza exactamente 2 artículos secundarios", () => {
    const { container } = render(Gaceta);
    const secundarios = container.querySelectorAll(".gaceta-secundario");
    expect(secundarios.length).toBe(2);
  });

  it("muestra los títulos de los 3 artículos", () => {
    render(Gaceta);
    const headings = screen.getAllByRole("heading");
    const textos = headings.map(
      (h) => h.textContent?.toLocaleLowerCase() ?? "",
    );
    expect(textos.some((t) => t.includes("rutina de noche"))).toBe(true);
    expect(textos.some((t) => t.includes("vitamina c"))).toBe(true);
    expect(textos.some((t) => t.includes("meditación"))).toBe(true);
  });

  it("todas las imágenes tienen atributo alt", () => {
    const { container } = render(Gaceta);
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.getAttribute("alt")).toBeTruthy();
    });
  });

  it("la sección tiene data-theme light", () => {
    const { container } = render(Gaceta);
    expect(container.querySelector("#gaceta")?.getAttribute("data-theme")).toBe(
      "light",
    );
  });
});

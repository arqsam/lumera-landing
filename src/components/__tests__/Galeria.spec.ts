import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Galeria from "../Galeria.vue";

describe("Galeria.vue", () => {
  it("renderiza sin errores y muestra el título", () => {
    render(Galeria);
    expect(
      screen.getByRole("heading", { name: /lumera/i }),
    ).toBeInTheDocument();
  });

  it("el anchor #galeria existe en el DOM", () => {
    const { container } = render(Galeria);
    expect(container.querySelector("#galeria")).toBeTruthy();
  });

  it("renderiza el collage con 3 columnas", () => {
    const { container } = render(Galeria);
    expect(container.querySelector(".galeria-collage")).toBeTruthy();
    expect(container.querySelector(".galeria-col--1")).toBeTruthy();
    expect(container.querySelector(".galeria-col--2")).toBeTruthy();
    expect(container.querySelector(".galeria-col--3")).toBeTruthy();
  });

  it("renderiza el título sticky superpuesto", () => {
    const { container } = render(Galeria);
    expect(container.querySelector(".galeria-titulo-wrapper")).toBeTruthy();
  });

  it("todas las imágenes tienen atributo alt descriptivo", () => {
    const { container } = render(Galeria);
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.getAttribute("alt")).toBeTruthy();
      expect(img.getAttribute("alt")).not.toBe("");
    });
  });

  it("la sección tiene data-theme light", () => {
    const { container } = render(Galeria);
    const section = container.querySelector("#galeria");
    expect(section?.getAttribute("data-theme")).toBe("light");
  });
});

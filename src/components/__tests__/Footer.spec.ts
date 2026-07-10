import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Footer from "../Footer.vue";

describe("Footer.vue", () => {
  it("renderiza sin errores y muestra el logo", () => {
    render(Footer);
    expect(screen.getByRole("link", { name: /lumera/i })).toBeInTheDocument();
  });

  it("el anchor #footer existe en el DOM", () => {
    const { container } = render(Footer);
    expect(container.querySelector("#footer")).toBeTruthy();
  });

  it("renderiza los 4 links de navegación", () => {
    render(Footer);
    expect(screen.getByRole("link", { name: /tienda/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /filosofía/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /galería/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gaceta/i })).toBeInTheDocument();
  });

  it("renderiza los iconos de redes sociales", () => {
    render(Footer);
    expect(
      screen.getByRole("link", { name: /instagram/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tiktok/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /pinterest/i }),
    ).toBeInTheDocument();
  });

  it("renderiza el formulario de newsletter", () => {
    const { container } = render(Footer);
    expect(container.querySelector(".footer-input")).toBeTruthy();
    expect(container.querySelector(".footer-btn")).toBeTruthy();
  });

  it("muestra el copyright", () => {
    render(Footer);
    expect(screen.getByText(/2026 lumera/i)).toBeInTheDocument();
  });

  it("la sección tiene data-theme dark", () => {
    const { container } = render(Footer);
    expect(container.querySelector("#footer")?.getAttribute("data-theme")).toBe(
      "dark",
    );
  });
});

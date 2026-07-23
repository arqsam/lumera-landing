import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Tienda from "../Tienda.vue";

describe("Tienda.vue", () => {
  it("renderiza sin errores y muestra el título de sección", () => {
    render(Tienda);
    expect(
      screen.getByRole("heading", { name: /nuestra tienda/i }),
    ).toBeInTheDocument();
  });

  it("el anchor #tienda existe en el DOM", () => {
    const { container } = render(Tienda);
    const section = container.querySelector("#tienda");
    expect(section).toBeTruthy();
  });

  it("renderiza exactamente 3 producto cards", () => {
    const { container } = render(Tienda);
    const cards = container.querySelectorAll(".tienda-card");
    expect(cards.length).toBe(3);
  });

  it("cada card tiene nombre, descripción, precio y botón", () => {
    render(Tienda);

    expect(screen.getByText(/radiance elixir/i)).toBeInTheDocument();
    expect(screen.getByText(/nourishing facial oil/i)).toBeInTheDocument();
    expect(screen.getByText(/hidrating water cream/i)).toBeInTheDocument();

    const buttons = screen.getAllByRole("button", { name: /ver producto/i });
    expect(buttons.length).toBe(3);

    expect(screen.getByText("$890")).toBeInTheDocument();
    expect(screen.getByText("$1,200")).toBeInTheDocument();
    expect(screen.getByText("$750")).toBeInTheDocument();
  });

  it("todas las imágenes tienen atributo alt descriptivo", () => {
    const { container } = render(Tienda);
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.getAttribute("alt")).toBeTruthy();
      expect(img.getAttribute("alt")).not.toBe("");
    });
  });
});

import { render, screen, fireEvent } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Header from "../Header.vue";

// Helper local para este test
function renderWithTrigger() {
  return render({
    components: { Header },
    template: `
      <div>
        <button class="hero-button">Explorar productos</button>
        <Header />
      </div>
    `,
  });
}

describe("Header.vue", () => {
  it("renderiza el logo como link al hero", async () => {
    renderWithTrigger();

    // Simular hover en el trigger
    const trigger = await screen.findByRole("button", {
      name: /explorar productos/i,
    });
    await fireEvent.mouseEnter(trigger);

    const logoLink = screen.getByRole("link", { name: /lumera/i });
    expect(logoLink).toHaveAttribute("href", "#hero");
  });

  it("muestra los links de navegación", async () => {
    renderWithTrigger();
    const trigger = await screen.findByRole("button", {
      name: /explorar productos/i,
    });
    await fireEvent.mouseEnter(trigger);

    expect(screen.getByRole("link", { name: /tienda/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /filosofía/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /galería/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gaceta/i })).toBeInTheDocument();
  });

  it("renderiza el botón de carrito", async () => {
    renderWithTrigger();
    const trigger = await screen.findByRole("button", {
      name: /explorar productos/i,
    });
    await fireEvent.mouseEnter(trigger);

    expect(screen.getByRole("button", { name: /bag/i })).toBeInTheDocument();
  });
});

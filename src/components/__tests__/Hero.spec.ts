import { describe, test, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import Hero from "../Hero.vue";
import { nextTick } from "vue";
import { gsap } from "gsap";

describe("Hero.vue", () => {
  test("renderiza título, subtítulo y botón", async () => {
    render(Hero);

    // Título y subtítulo
    const title = await screen.findByRole("heading", {
      name: /Ilumina tu rutina/i,
    });
    const subtitle = await screen.findByText(
      /Tecnología para el cuidado de tu piel/i
    );
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();

    // Botón
    const button = await screen.findByRole("button", {
      name: /Explorar productos/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("incluye el video de fondo con atributos correctos", async () => {
    const { container } = render(Hero);
    const video = container.querySelector(
      "video.hero-video"
    ) as HTMLVideoElement;
    expect(video).toBeTruthy();

    //Propiedades booleanas
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);

    // playsinline
    // Intento 1: atributo presente
    const hasAttr = video.getAttribute("playsinline") !== null;
    // Intento 2: propiedad camelCase
    const hasProp = (video as any).playsInline === true;

    expect(hasAttr || hasProp).toBe(true); // tolerante a JSDOM
  });

  test("overlays y wrappers existen", async () => {
    const { container } = render(Hero);
    expect(container.querySelector(".hero-glow")).toBeTruthy();
    expect(container.querySelector(".hero-overlay")).toBeTruthy();
    expect(container.querySelector(".hero-content-wrapper")).toBeTruthy();
    expect(container.querySelector(".hero-button-wrapper")).toBeTruthy();
  });

  test("llama a GSAP para animaciones", async () => {
    render(Hero);

    // esperar al mounted + nextTick
    await nextTick();

    expect(gsap.from).toHaveBeenCalledWith(".hero-title", expect.any(Object));
    expect(gsap.from).toHaveBeenCalledWith(
      ".hero-subtitle",
      expect.any(Object)
    );
    expect(gsap.fromTo).toHaveBeenCalledWith(
      ".hero-button",
      expect.any(Object),
      expect.any(Object)
    );
  });
});

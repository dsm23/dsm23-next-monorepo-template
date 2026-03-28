import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from ".";

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(
    (query) =>
      ({
        matches: false,
        media: query as string,
        onchange: null,
        addListener: vi.fn<() => void>(), // deprecated
        removeListener: vi.fn<() => void>(), // deprecated
        addEventListener: vi.fn<() => void>(),
        removeEventListener: vi.fn<() => void>(),
        dispatchEvent: vi.fn(() => false),
      }) satisfies MediaQueryList,
  ),
});

describe("component", () => {
  describe("ThemeProvider", () => {
    it("should render correctly", () => {
      render(
        <ThemeProvider>
          <div data-testid="target">Hello, World!</div>
        </ThemeProvider>,
      );

      expect(screen.getByTestId("target")).toBeInTheDocument();
    });
  });
});

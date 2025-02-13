import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from ".";

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(
    (query) =>
      ({
        matches: false,
        media: query as string,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(() => false),
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

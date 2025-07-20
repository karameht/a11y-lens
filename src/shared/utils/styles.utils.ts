/**
 * Styles Utilities
 *
 * Helper functions for CSS injection and style management.
 * Handles SSR safety and prevents duplicate style injection.
 */

/**
 * Generic function to inject CSS styles into document head
 *
 * @param styleId - Unique identifier for the style element
 * @param css - CSS string to inject
 *
 * @example
 * ```tsx
 * injectStyles('my-component-styles', '.my-class { color: red; }');
 * ```
 */
export const injectStyles = (styleId: string, css: string): void => {
  if (typeof document === "undefined") return; // SSR safety

  if (document.getElementById(styleId)) return; // Already injected

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
};

/**
 * A11yLens component styles
 * All CSS classes use BEM naming convention with 'a11y-lens' prefix
 */
export const A11Y_LENS_STYLES = `
  .a11y-lens {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    padding: 1rem;
    max-width: 28rem;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.4;
  }
`;

/**
 * Injects A11yLens component styles into document head
 * This function is called automatically when A11yLens component mounts
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   injectA11yLensStyles();
 * }, []);
 * ```
 */
export const injectA11yLensStyles = (): void => {
  injectStyles("a11y-lens-styles", A11Y_LENS_STYLES);
};

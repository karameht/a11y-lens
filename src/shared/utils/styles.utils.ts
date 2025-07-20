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

  .a11y-lens__header {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
  }

  .a11y-lens__title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .a11y-lens__env {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }

  .a11y-lens__summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .a11y-lens__badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
  }

  .a11y-lens__badge--success {
    background-color: #dcfce7;
    color: #15803d;
  }

  .a11y-lens__badge--error {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .a11y-lens__passed {
    font-size: 12px;
    color: #6b7280;
  }

  .a11y-lens__violations {
    margin-bottom: 1rem;
  }

  .a11y-lens__violations-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  .a11y-lens__violations-list {
    max-height: 8rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .a11y-lens__violation {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 0.5rem;
  }

  .a11y-lens__violation-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.25rem;
  }

  .a11y-lens__impact {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .a11y-lens__impact--critical {
    background-color: #fecaca;
    color: #991b1b;
  }

  .a11y-lens__impact--serious {
    background-color: #fed7aa;
    color: #9a3412;
  }

  .a11y-lens__impact--moderate {
    background-color: #fef3c7;
    color: #92400e;
  }

  .a11y-lens__impact--minor {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .a11y-lens__elements {
    font-size: 12px;
    color: #6b7280;
  }

  .a11y-lens__description {
    font-size: 12px;
    color: #374151;
    font-weight: 500;
    margin: 0.25rem 0;
  }

  .a11y-lens__help {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }

  .a11y-lens__more {
    font-size: 12px;
    color: #6b7280;
    text-align: center;
    font-style: italic;
    margin-top: 0.5rem;
  }

  .a11y-lens__success {
    text-align: center;
    padding: 1rem 0;
  }

  .a11y-lens__success-emoji {
    font-size: 24px;
    margin-bottom: 0.5rem;
  }

  .a11y-lens__success-title {
    font-size: 14px;
    font-weight: 500;
    color: #15803d;
    margin: 0 0 0.25rem 0;
  }

  .a11y-lens__success-subtitle {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }

  .a11y-lens__debug {
    margin-top: 1rem;
    font-size: 12px;
    color: #6b7280;
  }

  .a11y-lens__debug summary {
    cursor: pointer;
    font-weight: 500;
  }

  .a11y-lens__debug summary:hover {
    color: #374151;
  }

  .a11y-lens__debug ul {
    margin: 0.5rem 0 0 0;
    padding-left: 1rem;
    border-left: 2px solid #d1d5db;
    list-style: none;
  }

  .a11y-lens__debug li {
    margin-top: 0.25rem;
  }

  .a11y-lens__debug strong {
    color: #1f2937;
  }

  .a11y-lens__loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .a11y-lens__spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid #2563eb;
    border-radius: 50%;
    animation: a11y-lens-spin 1s linear infinite;
  }

  @keyframes a11y-lens-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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

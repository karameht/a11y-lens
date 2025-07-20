/**
 * Header Styles
 *
 * CSS styles for the header component.
 * Displays A11yLens title with icon and environment information.
 */

export const HEADER_STYLES = `
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
`;

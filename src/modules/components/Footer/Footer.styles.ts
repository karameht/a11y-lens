/**
 * Footer Styles
 *
 * Defines CSS styles for the A11yLens footer debug section.
 */

export const FOOTER_STYLES = `
  .a11y-lens__footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .a11y-lens__debug {
    font-size: 12px;
    color: #6b7280;
  }

  .a11y-lens__debug summary {
    cursor: pointer;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
    transition: color 0.2s ease;
  }

  .a11y-lens__debug summary:hover {
    color: #111827;
  }

  .a11y-lens__debug ul {
    margin: 0;
    padding-left: 1rem;
    list-style: none;
  }

  .a11y-lens__debug li {
    margin-top: 0.25rem;
    line-height: 1.4;
  }

  .a11y-lens__debug strong {
    color: #1f2937;
  }
`;

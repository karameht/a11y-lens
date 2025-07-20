/**
 * ViolationList Styles
 *
 * CSS styles for the violation list container.
 * Handles list layout, scrolling, and "more items" indicator.
 */

export const VIOLATION_LIST_STYLES = `
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
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .a11y-lens__more {
    font-size: 12px;
    color: #6b7280;
    text-align: center;
    font-style: italic;
    margin-top: 0.5rem;
  }
`;

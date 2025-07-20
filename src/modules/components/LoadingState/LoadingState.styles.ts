/**
 * LoadingState Styles
 *
 * CSS styles for the loading state component.
 * Includes spinner animation and debug information styling.
 */

export const LOADING_STATE_STYLES = `
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

  .a11y-lens__env {
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

  @keyframes a11y-lens-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

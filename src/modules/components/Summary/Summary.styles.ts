/**
 * Summary Styles
 *
 * CSS styles for the summary component.
 * Displays violation count badge and passed checks count.
 */

export const SUMMARY_STYLES = `
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
`;

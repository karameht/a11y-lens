/**
 * ViolationItem Styles
 *
 * CSS styles for individual violation items.
 * Handles impact badges, descriptions, and element counts.
 */

export const VIOLATION_ITEM_STYLES = `
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
`;

/**
 * ViolationItem Styles
 *
 * CSS styles for individual violation items.
 * Handles impact badges, descriptions, element counts, and help links.
 */

export const VIOLATION_ITEM_STYLES = `
  .a11y-lens__violation {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 0.75rem;
    transition: border-color 0.2s ease;
  }

  .a11y-lens__violation:hover {
    border-color: #d1d5db;
  }

  .a11y-lens__violation-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
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
    font-weight: 500;
  }

  .a11y-lens__description {
    font-size: 13px;
    color: #111827;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .a11y-lens__help {
    font-size: 12px;
    color: #6b7280;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
  }

  /* Enhanced help link styling */
  .a11y-lens__help-link-container {
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .a11y-lens__help-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 12px;
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    background-color: transparent;
    border: 1px solid transparent;
  }

  .a11y-lens__help-link:hover {
    background-color: #eff6ff;
    border-color: #bfdbfe;
    color: #1d4ed8;
  }

  .a11y-lens__help-link:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  .a11y-lens__help-link-text {
    line-height: 1;
  }

  .a11y-lens__help-link-icon {
    width: 12px;
    height: 12px;
    opacity: 0.7;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .a11y-lens__help-link:hover .a11y-lens__help-link-icon {
    opacity: 1;
    transform: translateX(1px) translateY(-1px);
  }


`;

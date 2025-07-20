/**
 * ViolationItem Component
 *
 * Displays a single accessibility violation with impact badge,
 * description, help text, affected element count, and help link.
 */

import type { AxeViolation } from "../../shared/types/axe.types";
import { getImpactClass } from "../../shared/utils/impact.utils";

interface ViolationItemProps {
  /** The violation data from axe-core */
  violation: AxeViolation;
  /** Whether to show detailed information */
  showDetails?: boolean;
  /** Whether to show help link */
  showHelpLink?: boolean;
}

export default function ViolationItem({
  violation,
  showDetails = true,
  showHelpLink = true,
}: ViolationItemProps) {
  // No separate CSS injection needed - using main theme

  const elementCount = violation.nodes.length;
  const elementText = elementCount === 1 ? "element" : "elements";

  return (
    <div className="a11y-lens__violation">
      <div className="a11y-lens__violation-header">
        <span
          className={`a11y-lens__impact ${getImpactClass(violation.impact)}`}
        >
          {violation.impact || "unknown"}
        </span>
        <span className="a11y-lens__elements">
          {elementCount} {elementText}
        </span>
      </div>

      <p className="a11y-lens__description">{violation.description}</p>

      {showDetails && <p className="a11y-lens__help">{violation.help}</p>}

      {/* Enhanced help link with better UX */}
      {showHelpLink && violation.helpUrl && (
        <div className="a11y-lens__help-link-container">
          <a
            href={violation.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="a11y-lens__help-link"
            title={`Read docs: ${violation.description}`}
          >
            <span className="a11y-lens__help-link-text">Read the docs</span>
            <svg
              className="a11y-lens__help-link-icon"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

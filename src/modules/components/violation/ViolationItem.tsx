/**
 * ViolationItem Component
 *
 * Displays a single accessibility violation with impact badge,
 * description, help text, and actionable elements.
 */

import type { AxeViolation } from "../../../shared/types/axe.types";
import { getImpactClass } from "../../../shared/utils/impact.utils";
import ActionButtons from "../common/ActionButton";
import ElementLocation from "../common/ElementLocation";

interface ViolationItemProps {
  /** The violation data from axe-core */
  violation: AxeViolation;
  /** Whether to show detailed help text */
  showDetails?: boolean;
  /** Whether to show help documentation link */
  showHelpLink?: boolean;
  /** Whether to show element location and highlight button */
  showElementLocation?: boolean;
}

export default function ViolationItem({
  violation,
  showDetails = true,
  showHelpLink = true,
  showElementLocation = true,
}: ViolationItemProps) {
  const elementCount = violation.nodes.length;
  const elementText = elementCount === 1 ? "element" : "elements";
  const firstNode = violation.nodes[0];

  return (
    <div className="a11y-lens__violation">
      {/* Header with impact badge and element count */}
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

      {/* Main violation information */}
      <p className="a11y-lens__description">{violation.description}</p>

      {showDetails && <p className="a11y-lens__help">{violation.help}</p>}

      {/* Element location information */}
      <ElementLocation node={firstNode} show={showElementLocation} />

      {/* Action buttons */}
      <ActionButtons
        node={firstNode}
        helpUrl={violation.helpUrl}
        showFind={showElementLocation}
        showDocs={showHelpLink}
        description={violation.description}
      />
    </div>
  );
}

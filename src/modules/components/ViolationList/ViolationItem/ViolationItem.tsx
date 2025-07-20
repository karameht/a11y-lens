/**
 * ViolationItem Component
 *
 * Displays a single accessibility violation with impact badge,
 * description, help text, and affected element count.
 */

import { useEffect } from "react";
import type { AxeViolation } from "../../../../shared/types/axe.types";
import { getImpactClass } from "../../../../shared/utils/impact.utils";
import { injectStyles } from "../../../../shared/utils/styles.utils";
import { VIOLATION_ITEM_STYLES } from "./ViolationItem.styles";

interface ViolationItemProps {
  /** The violation data from axe-core */
  violation: AxeViolation;
  /** Whether to show detailed information */
  showDetails?: boolean;
}

export default function ViolationItem({
  violation,
  showDetails = true,
}: ViolationItemProps) {
  useEffect(() => {
    injectStyles("a11y-lens-violation-item-styles", VIOLATION_ITEM_STYLES);
  }, []);

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
    </div>
  );
}

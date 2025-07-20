/**
 * ViolationList Component
 *
 * Displays a list of accessibility violations with configurable limits.
 * Shows title, scrollable list of violations, and "more items" indicator.
 */

import type { AxeViolation } from "../../shared/types/axe.types";
import ViolationItem from "./ViolationItem";

interface ViolationListProps {
  /** Array of violations to display */
  violations: AxeViolation[];
  /** Maximum number of violations to show - set to 0 or undefined to show all */
  maxVisible?: number;
  /** Custom title for the violations section */
  title?: string;
  /** Whether to show details in violation items */
  showDetails?: boolean;
}

export default function ViolationList({
  violations,
  maxVisible = 0, // CHANGED: Default to 0 = show all
  title = "Issues Found:",
  showDetails = true,
}: ViolationListProps) {
  if (violations.length === 0) {
    return null;
  }

  // If maxVisible is 0 or undefined, show all violations
  const shouldLimit = maxVisible && maxVisible > 0;
  const visibleViolations = shouldLimit
    ? violations.slice(0, maxVisible)
    : violations;

  return (
    <div className="a11y-lens__violations">
      <h3 className="a11y-lens__violations-title">{title}</h3>

      <div className="a11y-lens__violations-list">
        {visibleViolations.map((violation) => (
          <ViolationItem
            key={violation.id}
            violation={violation}
            showDetails={showDetails}
          />
        ))}
      </div>
    </div>
  );
}

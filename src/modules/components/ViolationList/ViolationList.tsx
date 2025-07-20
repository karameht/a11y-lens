/**
 * ViolationList Component
 *
 * Displays a list of accessibility violations with configurable limits.
 * Shows title, scrollable list of violations, and "more items" indicator.
 */

import { useEffect } from "react";
import type { AxeViolation } from "../../../shared/types/axe.types";
import { injectStyles } from "../../../shared/utils/styles.utils";
import ViolationItem from "./ViolationItem/ViolationItem";
import { VIOLATION_LIST_STYLES } from "./ViolationList.styles";

interface ViolationListProps {
  /** Array of violations to display */
  violations: AxeViolation[];
  /** Maximum number of violations to show */
  maxVisible?: number;
  /** Custom title for the violations section */
  title?: string;
  /** Whether to show details in violation items */
  showDetails?: boolean;
}

export default function ViolationList({
  violations,
  maxVisible = 3,
  title = "Issues Found:",
  showDetails = true,
}: ViolationListProps) {
  useEffect(() => {
    injectStyles("a11y-lens-violation-list-styles", VIOLATION_LIST_STYLES);
  }, []);

  if (violations.length === 0) {
    return null;
  }

  const visibleViolations = violations.slice(0, maxVisible);
  const remainingCount = violations.length - maxVisible;
  const hasMoreItems = remainingCount > 0;

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

      {hasMoreItems && (
        <p className="a11y-lens__more">
          +{remainingCount} more issue{remainingCount !== 1 ? "s" : ""}...
        </p>
      )}
    </div>
  );
}

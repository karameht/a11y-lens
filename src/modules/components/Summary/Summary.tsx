/**
 * Summary Component
 *
 * Displays summary of scan results with violation count badge and passed checks.
 * Shows error/success state based on violations found.
 */

import { useEffect } from "react";
import { injectStyles } from "../../../shared/utils/styles.utils";
import { SUMMARY_STYLES } from "./Summary.styles";

interface SummaryProps {
  /** Number of violations found */
  violationCount: number;
  /** Number of checks that passed */
  passCount: number;
  /** Custom violation text (optional) */
  violationText?: string;
  /** Custom passed text (optional) */
  passedText?: string;
  /** Show passed count (optional) */
  showPassedCount?: boolean;
}

export default function Summary({
  violationCount,
  passCount,
  violationText,
  passedText,
  showPassedCount = true,
}: SummaryProps) {
  useEffect(() => {
    injectStyles("a11y-lens-summary-styles", SUMMARY_STYLES);
  }, []);

  const isSuccess = violationCount === 0;
  const badgeClass = isSuccess
    ? "a11y-lens__badge--success"
    : "a11y-lens__badge--error";

  const displayViolationText =
    violationText || `${violationCount} issues found`;
  const displayPassedText = passedText || `✅ ${passCount} passed`;

  return (
    <div className="a11y-lens__summary">
      <span className={`a11y-lens__badge ${badgeClass}`}>
        {displayViolationText}
      </span>

      {showPassedCount && (
        <span className="a11y-lens__passed">{displayPassedText}</span>
      )}
    </div>
  );
}

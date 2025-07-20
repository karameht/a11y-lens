/**
 * Summary Component
 *
 * Displays summary of scan results with violation count badge and passed checks.
 * Shows error/success state based on violations found.
 */

interface SummaryProps {
  violationCount: number;
  passCount: number;
  violationText?: string;
  passedText?: string;
  showPassedCount?: boolean;
}

export default function Summary({
  violationCount,
  passCount,
  violationText,
  passedText,
  showPassedCount = true,
}: SummaryProps) {
  const isSuccess = violationCount === 0;
  const badgeClass = isSuccess
    ? "a11y-lens__badge--success"
    : "a11y-lens__badge--error";

  const displayViolationText =
    violationText ||
    `${violationCount} ${violationCount === 1 ? "issue" : "issues"} found`;
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

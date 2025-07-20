/**
 * Summary Component
 *
 * Displays summary of scan results with violation count badge and passed checks.
 * Shows error/success state based on violations found.
 */

type TabType = "issues" | "passed";

interface SummaryProps {
  violationCount: number;
  passCount: number;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  violationText?: string;
  passedText?: string;
}

export default function Summary({
  violationCount,
  passCount,
  activeTab,
  onTabChange,
  violationText,
  passedText,
}: SummaryProps) {
  const displayViolationText =
    violationText ||
    `${violationCount} ${violationCount === 1 ? "issue" : "issues"} found`;

  const displayPassedText =
    passedText || `${passCount} ${passCount === 1 ? "check" : "checks"} passed`;

  const getIssuesTabClass = () => {
    const baseClass = "a11y-lens__tab";
    const typeClass =
      violationCount === 0
        ? "a11y-lens__tab--success"
        : "a11y-lens__tab--error";
    const activeClass = activeTab === "issues" ? "a11y-lens__tab--active" : "";
    return `${baseClass} ${typeClass} ${activeClass}`.trim();
  };

  const getPassedTabClass = () => {
    const baseClass = "a11y-lens__tab a11y-lens__tab--passed";
    const activeClass = activeTab === "passed" ? "a11y-lens__tab--active" : "";
    return `${baseClass} ${activeClass}`.trim();
  };

  return (
    <div className="a11y-lens__summary">
      <button
        className={getIssuesTabClass()}
        onClick={() => onTabChange("issues")}
        disabled={activeTab === "issues"}
      >
        {displayViolationText}
      </button>

      <button
        className={getPassedTabClass()}
        onClick={() => onTabChange("passed")}
        disabled={activeTab === "passed"}
      >
        {displayPassedText}
      </button>
    </div>
  );
}

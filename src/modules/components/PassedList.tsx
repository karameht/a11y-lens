/**
 * PassedList Component
 *
 * Displays all accessibility checks that passed.
 * Uses same style as ViolationList but with green accent and category tags.
 */

import type { AxePass } from "../../shared/types/axe.types";

interface PassedListProps {
  /** Array of passed checks to display */
  passes: AxePass[];
  /** Custom title for the passed section */
  title?: string;
}

// Extracts meaningful category from axe-core tags
const getCategory = (tags: string[]): string => {
  // Look for meaningful category tags
  const categoryMap: Record<string, string> = {
    wcag2a: "WCAG 2A",
    wcag2aa: "WCAG 2AA",
    wcag21aa: "WCAG 2.1 AA",
    wcag22aa: "WCAG 2.2 AA",
    section508: "Section 508",
    "best-practice": "Best Practice",
    experimental: "Experimental",
  };

  // Find first matching category
  for (const tag of tags) {
    if (categoryMap[tag]) {
      return categoryMap[tag];
    }
  }

  // Fallback to first meaningful tag or "PASSED"
  const meaningfulTag = tags.find(
    (tag) => !tag.startsWith("cat.") && tag !== "ACT" && tag.length > 2
  );

  return meaningfulTag ? meaningfulTag.toUpperCase() : "PASSED";
};

export default function PassedList({
  passes,
  title = "Passed Checks:",
}: PassedListProps) {
  if (passes.length === 0) {
    return (
      <div className="a11y-lens__passed-empty">
        <p className="a11y-lens__passed-empty-text">
          No passed checks to display.
        </p>
      </div>
    );
  }

  return (
    <div className="a11y-lens__violations">
      <h3 className="a11y-lens__violations-title">{title}</h3>

      <div className="a11y-lens__violations-list">
        {passes.map((pass) => (
          <div key={pass.id} className="a11y-lens__passed-item">
            <div className="a11y-lens__violation-header">
              <span className="a11y-lens__passed-badge">
                {getCategory(pass.tags)}
              </span>
              <span className="a11y-lens__elements">
                {pass.nodes.length}{" "}
                {pass.nodes.length === 1 ? "element" : "elements"}
              </span>
            </div>

            <p className="a11y-lens__description">{pass.description}</p>

            {pass.helpUrl && (
              <div className="a11y-lens__help-link-container">
                <a
                  href={pass.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a11y-lens__help-link"
                  title={`Learn more: ${pass.description}`}
                >
                  <span className="a11y-lens__help-link-text">Learn more</span>
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
        ))}
      </div>
    </div>
  );
}

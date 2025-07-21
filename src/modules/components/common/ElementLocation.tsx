/**
 * ElementLocation Component
 *
 * Displays CSS selector path and element preview for accessibility violations.
 * Shows WHERE the problem is located in the DOM.
 */

import type { ViolationNode } from "../../../shared/types/axe.types";
import {
  formatSelector,
  getElementDescription,
} from "../../../shared/utils/dom.utils";

interface ElementLocationProps {
  /** First violation node with target and HTML */
  node: ViolationNode;
  /** Whether to show this section */
  show?: boolean;
}

export default function ElementLocation({
  node,
  show = true,
}: ElementLocationProps) {
  if (!show || !node) {
    return null;
  }

  const elementDescription = getElementDescription(node.html);

  return (
    <div className="a11y-lens__element-location">
      <div className="a11y-lens__element-info">
        {/* CSS selector path */}
        <div className="a11y-lens__element-path">
          <span className="a11y-lens__element-label">Location:</span>
          <code className="a11y-lens__element-selector">
            {formatSelector(node.target)}
          </code>
        </div>

        {/* Element preview */}
        {elementDescription && (
          <div className="a11y-lens__element-preview">
            <span className="a11y-lens__element-label">Element:</span>
            <code className="a11y-lens__element-tag">{elementDescription}</code>
          </div>
        )}
      </div>
    </div>
  );
}

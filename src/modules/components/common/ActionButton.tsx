/**
 * ActionButtons Component
 *
 * Container for violation action buttons (Find element, Read docs).
 * Handles the layout and conditional rendering.
 */

import type { ViolationNode } from "../../../shared/types/axe.types";
import {
  highlightElement,
  isHighlightable,
} from "../../../shared/utils/dom.utils";
import { BlockedIcon, DocumentIcon, SearchIcon } from "./ActionIcons";
import IconButton from "./IconButton";

interface ActionButtonsProps {
  /** First violation node for element highlighting */
  node?: ViolationNode;
  /** URL to documentation */
  helpUrl?: string;
  /** Whether to show find element button */
  showFind?: boolean;
  /** Whether to show documentation link */
  showDocs?: boolean;
  /** Violation description for title */
  description?: string;
}

export default function ActionButtons({
  node,
  helpUrl,
  showFind = true,
  showDocs = true,
  description = "",
}: ActionButtonsProps) {
  // Don't render if no buttons to show
  if (!showFind && !showDocs) {
    return null;
  }

  const selector = node?.target?.join(" ") || "";
  const canHighlight = isHighlightable(selector);

  /**
   * Handles the find element button click
   */
  const handleFindElement = async () => {
    if (!canHighlight || !selector) return;

    try {
      await highlightElement(selector);
      console.log("A11yLens: Successfully highlighted element", selector);
    } catch (error) {
      console.error("A11yLens: Failed to highlight element:", error);

      // Show user-friendly error message
      const element = document.querySelector(selector);
      if (!element) {
        alert(
          "Could not find this element on the page. It may have been removed or changed."
        );
      } else {
        alert("This element cannot be highlighted visually.");
      }
    }
  };

  return (
    <div className="a11y-lens__action-buttons">
      {/* Find element button */}
      {showFind && node && (
        <IconButton
          variant="find"
          onClick={handleFindElement}
          disabled={!canHighlight}
          icon={canHighlight ? <SearchIcon /> : <BlockedIcon />}
          title={
            canHighlight
              ? "Highlight this element on the page"
              : "This element cannot be highlighted visually"
          }
        >
          Find element
        </IconButton>
      )}

      {/* Documentation link */}
      {showDocs && helpUrl && (
        <IconButton
          variant="docs"
          href={helpUrl}
          icon={<DocumentIcon />}
          title={`Read documentation: ${description}`}
        >
          Read the docs
        </IconButton>
      )}
    </div>
  );
}

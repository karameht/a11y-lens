/**
 * DOM Utilities
 *
 * Helper functions for DOM manipulation and element visibility checks.
 * Used by A11yLens to determine which elements can be highlighted.
 */

/**
 * List of HTML tags that cannot be visually highlighted.
 *
 * These elements are typically structural or in the document head,
 * making them unsuitable for scrollIntoView or visual highlighting.
 */
export const UNHIGHLIGHTABLE_TAGS = [
  "html",
  "body",
  "head",
  "meta",
  "title",
  "link",
  "script",
  "style",
  "base",
  "noscript",
] as const;

/**
 * Check if a CSS selector points to a highlightable DOM element.
 *
 * Some accessibility violations reference structural elements like <html> or <head>
 * which can't be meaningfully highlighted or scrolled to.
 *
 * @param selector - CSS selector string (from axe-core's node.target)
 * @returns True if the element can be highlighted, false otherwise
 *
 * @example
 * ```typescript
 * isHighlightable("html") // false
 * isHighlightable("button.btn-primary") // true
 * isHighlightable("div > .content") // true
 * isHighlightable("meta[name='viewport']") // false
 * ```
 */
export function isHighlightable(selector: string): boolean {
  if (!selector || typeof selector !== "string") {
    return false;
  }

  // Clean and extract the first tag from the selector
  const cleaned = selector.trim().toLowerCase();

  // Handle different selector formats:
  // "button" -> "button"
  // "div > button" -> "div"
  // "html[lang='en']" -> "html"
  const firstPart = cleaned.split(/[>\s\[\.]]/)[0];

  // Remove any CSS pseudo-selectors or attributes
  const tagName = firstPart.replace(/[:#\[\]]/g, "");

  return !UNHIGHLIGHTABLE_TAGS.includes(tagName as any);
}

/**
 * Safely highlights a DOM element with A11yLens styling.
 *
 * @param selector - CSS selector for the element to highlight
 * @param duration - How long to show the highlight (default: 4000ms)
 * @returns Promise that resolves when highlighting is complete
 *
 * @example
 * ```typescript
 * await highlightElement("button.submit");
 * await highlightElement(".error-message", 2000);
 * ```
 */
export async function highlightElement(
  selector: string,
  duration: number = 4000
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const element = document.querySelector(selector);

      if (!element || !(element instanceof HTMLElement)) {
        reject(
          new Error(`Element not found or not highlightable: ${selector}`)
        );
        return;
      }

      // Store original styles
      const originalStyles = {
        outline: element.style.outline,
        outlineOffset: element.style.outlineOffset,
        boxShadow: element.style.boxShadow,
      };

      // Scroll to element
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      // Apply highlight styles
      element.style.outline = "3px solid var(--a11y-accent, #00c7e6)";
      element.style.outlineOffset = "4px";
      element.style.boxShadow = "0 0 20px rgba(0, 199, 230, 0.4)";

      // Remove highlight after duration
      setTimeout(() => {
        element.style.outline = originalStyles.outline;
        element.style.outlineOffset = originalStyles.outlineOffset;
        element.style.boxShadow = originalStyles.boxShadow;
        resolve();
      }, duration);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Format a CSS selector array for human-readable display.
 *
 * @param target - Array of CSS selectors from axe-core
 * @returns Formatted, readable selector string
 *
 * @example
 * ```typescript
 * formatSelector(["div", ">", "button.btn"])
 * // Returns: "div → button.btn"
 * ```
 */
export function formatSelector(target: string[]): string {
  if (!target || target.length === 0) {
    return "Unknown element";
  }

  return target.join(" ").replace(/>/g, " → ").replace(/\s+/g, " ").trim();
}

/**
 * Extract user-friendly element description from HTML string.
 *
 * @param html - Raw HTML string from axe-core violation node
 * @returns Simplified element description or null
 *
 * @example
 * ```typescript
 * getElementDescription('<button class="btn primary" id="submit">Submit</button>')
 * // Returns: "<button> #submit .btn.primary"
 * ```
 */
export function getElementDescription(html: string): string | null {
  if (!html || typeof html !== "string") {
    return null;
  }

  const htmlMatch = html.match(/^<(\w+)([^>]*)>/);
  if (!htmlMatch) {
    return null;
  }

  const tagName = htmlMatch[1];
  const attributes = htmlMatch[2];

  // Extract useful attributes
  const classMatch = attributes.match(/class="([^"]+)"/);
  const idMatch = attributes.match(/id="([^"]+)"/);
  const typeMatch = attributes.match(/type="([^"]+)"/);

  let description = `<${tagName}>`;

  if (idMatch) {
    description += ` #${idMatch[1]}`;
  }

  if (classMatch) {
    const classes = classMatch[1].split(" ").slice(0, 2); // Limit to 2 classes
    description += ` .${classes.join(".")}`;
  }

  if (typeMatch) {
    description += ` [${typeMatch[1]}]`;
  }

  return description;
}

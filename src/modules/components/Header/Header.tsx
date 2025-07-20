/**
 * Header Component
 *
 * Displays the A11yLens title with icon and current environment information.
 * Clean header section for the accessibility panel.
 */

import { useEffect } from "react";
import { injectStyles } from "../../../shared/utils/styles.utils";
import { HEADER_STYLES } from "./Header.styles";

interface HeaderProps {
  /** Current environment name */
  currentEnv: string;
  /** Custom title (optional) */
  title?: string;
  /** Custom icon (optional) */
  icon?: string;
}

export default function Header({
  currentEnv,
  title = "A11yLens Results",
  icon = "🔍",
}: HeaderProps) {
  useEffect(() => {
    injectStyles("a11y-lens-header-styles", HEADER_STYLES);
  }, []);

  return (
    <div className="a11y-lens__header">
      <h2 className="a11y-lens__title">
        <span>{icon}</span>
        <span>{title}</span>
      </h2>
      <p className="a11y-lens__env">
        Environment: <strong>{currentEnv}</strong>
      </p>
    </div>
  );
}

/**
 * SuccessState Component
 *
 * Displays celebration when no accessibility issues are found.
 * Shows emoji, congratulatory message and encouragement.
 */

import { useEffect } from "react";
import { injectStyles } from "../../../shared/utils/styles.utils";
import { SUCCESS_STATE_STYLES } from "./SuccessState.styles";

interface SuccessStateProps {
  /** Custom success message (optional) */
  message?: string;
  /** Custom subtitle (optional) */
  subtitle?: string;
  /** Custom emoji (optional) */
  emoji?: string;
}

export default function SuccessState({
  message = "No accessibility issues found!",
  subtitle = "Great job on building accessible interfaces!",
  emoji = "🎉",
}: SuccessStateProps) {
  useEffect(() => {
    injectStyles("a11y-lens-success-styles", SUCCESS_STATE_STYLES);
  }, []);

  return (
    <div className="a11y-lens__success">
      <div className="a11y-lens__success-emoji">{emoji}</div>
      <p className="a11y-lens__success-title">{message}</p>
      <p className="a11y-lens__success-subtitle">{subtitle}</p>
    </div>
  );
}

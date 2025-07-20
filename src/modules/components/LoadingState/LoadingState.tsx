/**
 * LoadingState Component
 *
 * Displays loading spinner and debug information while A11yLens is scanning
 * or initializing. Shows environment info and debug details.
 */

import { useEffect } from "react";
import { isDevelopmentEnvironment } from "../../../shared/utils/env.utils";
import { injectStyles } from "../../../shared/utils/styles.utils";
import { LOADING_STATE_STYLES } from "./LoadingState.styles";

interface LoadingStateProps {
  /** Whether scan is actively running */
  isScanning: boolean;
  /** Current environment name */
  currentEnv: string;
  /** Component enabled state */
  enabled: boolean;
  /** Force show enabled */
  forceShow: boolean;
  /** Environment prop passed to component */
  environment?: string;
  /** Whether component should show */
  shouldShow: boolean;
}

export default function LoadingState({
  isScanning,
  currentEnv,
  enabled,
  forceShow,
  environment,
  shouldShow,
}: LoadingStateProps) {
  useEffect(() => {
    injectStyles("a11y-lens-loading-styles", LOADING_STATE_STYLES);
  }, []);

  return (
    <div className="a11y-lens">
      <div className="a11y-lens__loading">
        <div className="a11y-lens__spinner"></div>
        <span>
          {isScanning ? "A11yLens is scanning..." : "A11yLens loading..."}
        </span>
      </div>

      <p className="a11y-lens__env">
        Environment: <strong>{currentEnv}</strong>
      </p>

      <details className="a11y-lens__debug">
        <summary>A11yLens Debug Info</summary>
        <ul>
          <li>
            Environment: <strong>{currentEnv}</strong>
          </li>
          <li>Enabled: {enabled.toString()}</li>
          <li>Force Show: {forceShow.toString()}</li>
          <li>Environment Prop: {environment || "not provided"}</li>
          <li>
            Is Development-like:{" "}
            {isDevelopmentEnvironment(currentEnv).toString()}
          </li>
          <li>Should Show: {shouldShow.toString()}</li>
        </ul>
      </details>
    </div>
  );
}

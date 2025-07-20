/**
 * Footer Component
 *
 * Displays debug information for the A11yLens accessibility panel.
 * Only shown when debug prop is enabled.
 */

import { useEffect } from "react";
import { isDevelopmentEnvironment } from "../../../shared/utils/env.utils";
import { injectStyles } from "../../../shared/utils/styles.utils";
import { FOOTER_STYLES } from "./Footer.styles";

interface FooterProps {
  currentEnv: string;
  enabled: boolean;
  forceShow: boolean;
  environment?: string;
  shouldShow: boolean;
}

export default function Footer({
  currentEnv,
  enabled,
  forceShow,
  environment,
  shouldShow,
}: FooterProps) {
  useEffect(() => {
    injectStyles("a11y-lens-footer-styles", FOOTER_STYLES);
  }, []);

  return (
    <footer className="a11y-lens__footer">
      <details className="a11y-lens__debug">
        <summary>Debug Info</summary>
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
    </footer>
  );
}

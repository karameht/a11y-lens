/**
 * Footer Component
 *
 * Debug panel with environment info and framework detection.
 * Collapsible section for troubleshooting A11yLens setup.
 */

import { useState } from "react";
import {
  detectFramework,
  getEnvironmentDebugInfo,
  isDevelopmentEnvironment,
} from "../../shared/utils/env.utils";

interface FooterProps {
  currentEnv: string;
  enabled: boolean;
  forceShow: boolean;
  environment?: string;
  shouldShow: boolean;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`a11y-lens__debug-arrow ${
      isOpen ? "a11y-lens__debug-arrow--open" : ""
    }`}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

export default function Footer({
  currentEnv,
  enabled,
  forceShow,
  environment,
  shouldShow,
}: FooterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const debugInfo = getEnvironmentDebugInfo();
  const framework = detectFramework();

  // Framework-specific tips
  const getFrameworkTip = (fw: string) => {
    switch (fw) {
      case "vite":
        return "Set VITE_A11Y_LENS_ENV=development in .env";
      case "nextjs":
        return "Set NEXT_PUBLIC_A11Y_LENS_ENV=development in .env.local";
      case "remix":
        return "A11yLens uses NODE_ENV for environment detection";
      case "astro":
        return "Set ASTRO_ENV=development or use Vite env vars";
      default:
        return "Unknown framework - using fallback detection";
    }
  };

  const toggleDebug = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer className="a11y-lens__footer">
      <div className="a11y-lens__debug">
        <div className="a11y-lens__debug-trigger" onClick={toggleDebug}>
          <span className="a11y-lens__debug-title">A11yLens Debug Info</span>
          <ChevronIcon isOpen={isOpen} />
        </div>

        {isOpen && (
          <div className="a11y-lens__debug-content">
            <div className="a11y-lens__debug-section">
              <h4 className="a11y-lens__debug-section-title">ENVIRONMENT</h4>
              <div className="a11y-lens__debug-table">
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">Current:</span>
                  <span className="a11y-lens__debug-value">{currentEnv}</span>
                </div>
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">Framework:</span>
                  <span className="a11y-lens__debug-value">
                    {framework !== "unknown" ? `${framework}` : "unknown"}
                  </span>
                </div>
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">
                    Is Development:
                  </span>
                  <span className="a11y-lens__debug-value">
                    {isDevelopmentEnvironment(currentEnv).toString()}
                  </span>
                </div>
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">Tip:</span>
                  <span className="a11y-lens__debug-value">
                    {getFrameworkTip(framework)}
                  </span>
                </div>
              </div>
            </div>

            <div className="a11y-lens__debug-section">
              <h4 className="a11y-lens__debug-section-title">
                COMPONENT STATE
              </h4>
              <div className="a11y-lens__debug-table">
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">Enabled:</span>
                  <span className="a11y-lens__debug-value">
                    {enabled.toString()}
                  </span>
                </div>
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">Force Show:</span>
                  <span className="a11y-lens__debug-value">
                    {forceShow.toString()}
                  </span>
                </div>
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">Should Show:</span>
                  <span className="a11y-lens__debug-value">
                    {shouldShow.toString()}
                  </span>
                </div>
                <div className="a11y-lens__debug-row">
                  <span className="a11y-lens__debug-label">
                    Environment Prop:
                  </span>
                  <span className="a11y-lens__debug-value">
                    {environment || "not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

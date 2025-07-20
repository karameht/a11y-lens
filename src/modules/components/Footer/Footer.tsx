/**
 * Enhanced Footer Component with Modern Framework Debug
 */

import {
  detectFramework,
  getEnvironmentDebugInfo,
  isDevelopmentEnvironment,
} from "../../../shared/utils/env.utils";

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

  return (
    <footer className="a11y-lens__footer">
      <details className="a11y-lens__debug">
        <summary>A11yLens Debug Info</summary>
        <ul>
          <li>
            <strong>Environment:</strong> {currentEnv}
          </li>
          <li>
            <strong>Framework:</strong> {framework}{" "}
            {framework !== "unknown" && "✅"}
          </li>
          <li>
            <strong>Tip:</strong> {getFrameworkTip(framework)}
          </li>
          <li>
            <strong>Enabled:</strong> {enabled.toString()}
          </li>
          <li>
            <strong>Force Show:</strong> {forceShow.toString()}
          </li>
          <li>
            <strong>Environment Prop:</strong> {environment || "not provided"}
          </li>
          <li>
            <strong>Is Development-like:</strong>{" "}
            {isDevelopmentEnvironment(currentEnv).toString()}
          </li>
          <li>
            <strong>Should Show:</strong> {shouldShow.toString()}
          </li>
          <li>
            <strong>Available Env Vars:</strong>{" "}
            {debugInfo.availableVars.join(", ") || "none"}
          </li>
        </ul>

        <details className="a11y-lens__debug-raw">
          <summary>Raw Environment Data</summary>
          <pre className="a11y-lens__debug-pre">
            {JSON.stringify(debugInfo.rawEnv, null, 2)}
          </pre>
        </details>
      </details>
    </footer>
  );
}

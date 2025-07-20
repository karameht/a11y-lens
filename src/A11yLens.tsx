import { useEffect } from "react";
import { useA11yScan } from "./shared/hooks/useA11yScan";
import type { AxeViolation } from "./shared/types/axe.types";
import type { A11yLensProps } from "./shared/types/component.types";
import {
  getEnvironment,
  isDevelopmentEnvironment,
  shouldShowInEnvironment,
} from "./shared/utils/env.utils";
import { getImpactClass } from "./shared/utils/impact.utils";
import { injectA11yLensStyles } from "./shared/utils/styles.utils";

export default function A11yLens({
  enabled = true,
  forceShow = false,
  environment,
}: A11yLensProps = {}) {
  const { results, isScanning } = useA11yScan();

  useEffect(() => {
    injectA11yLensStyles();
  }, []);

  const currentEnv = getEnvironment(environment);
  const shouldShow = shouldShowInEnvironment(enabled, currentEnv, forceShow);

  if (!shouldShow) {
    console.log(
      `A11yLens: Disabled in ${currentEnv} mode. Use forceShow=true to override or set environment to development/staging.`
    );
    return null;
  }

  if (!results || isScanning) {
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

  return (
    <div className="a11y-lens">
      <div className="a11y-lens__header">
        <h2 className="a11y-lens__title">
          <span>🔍</span>
          <span>A11yLens Results</span>
        </h2>
        <p className="a11y-lens__env">
          Environment: <strong>{currentEnv}</strong>
        </p>
      </div>

      <div className="a11y-lens__summary">
        <span
          className={`a11y-lens__badge ${
            results.violations.length > 0
              ? "a11y-lens__badge--error"
              : "a11y-lens__badge--success"
          }`}
        >
          {results.violations.length} issues found
        </span>
        <span className="a11y-lens__passed">
          ✅ {results.passes.length} passed
        </span>
      </div>

      {results.violations.length > 0 && (
        <div className="a11y-lens__violations">
          <h3 className="a11y-lens__violations-title">Issues Found:</h3>
          <div className="a11y-lens__violations-list">
            {results.violations.slice(0, 3).map((violation: AxeViolation) => (
              <div key={violation.id} className="a11y-lens__violation">
                <div className="a11y-lens__violation-header">
                  <span
                    className={`a11y-lens__impact ${getImpactClass(
                      violation.impact
                    )}`}
                  >
                    {violation.impact || "unknown"}
                  </span>
                  <span className="a11y-lens__elements">
                    {violation.nodes.length} element
                    {violation.nodes.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="a11y-lens__description">
                  {violation.description}
                </p>
                <p className="a11y-lens__help">{violation.help}</p>
              </div>
            ))}
            {results.violations.length > 3 && (
              <p className="a11y-lens__more">
                +{results.violations.length - 3} more issues...
              </p>
            )}
          </div>
        </div>
      )}

      {results.violations.length === 0 && (
        <div className="a11y-lens__success">
          <div className="a11y-lens__success-emoji">🎉</div>
          <p className="a11y-lens__success-title">
            No accessibility issues found!
          </p>
          <p className="a11y-lens__success-subtitle">
            Great job on building accessible interfaces!
          </p>
        </div>
      )}

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

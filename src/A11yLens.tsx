import { useEffect } from "react";
import Header from "./modules/components/Header/Header";
import LoadingState from "./modules/components/LoadingState/LoadingState";
import SuccessState from "./modules/components/SuccessState/SuccessState";
import Summary from "./modules/components/Summary/Summary";
import ViolationList from "./modules/components/ViolationList/ViolationList";
import { useA11yScan } from "./shared/hooks/useA11yScan";
import type { A11yLensProps } from "./shared/types/component.types";
import {
  getEnvironment,
  isDevelopmentEnvironment,
  shouldShowInEnvironment,
} from "./shared/utils/env.utils";
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
      <LoadingState
        isScanning={isScanning}
        currentEnv={currentEnv}
        enabled={enabled}
        forceShow={forceShow}
        environment={environment}
        shouldShow={shouldShow}
      />
    );
  }

  return (
    <div className="a11y-lens">
      <Header currentEnv={currentEnv} />

      <Summary
        violationCount={results.violations.length}
        passCount={results.passes.length}
      />

      <ViolationList violations={results.violations} />

      {results.violations.length === 0 && <SuccessState />}

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

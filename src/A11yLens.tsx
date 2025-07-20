import Footer from "./modules/components/Footer/Footer";
import Header from "./modules/components/Header/Header";
import LoadingState from "./modules/components/LoadingState/LoadingState";
import SuccessState from "./modules/components/SuccessState/SuccessState";
import Summary from "./modules/components/Summary/Summary";
import ViolationList from "./modules/components/ViolationList/ViolationList";
import { useA11yScan } from "./shared/hooks/useA11yScan";
import type { A11yLensProps } from "./shared/types/component.types";
import {
  detectFramework,
  getEnvironment,
  getEnvironmentDebugInfo,
  shouldShowInEnvironment,
} from "./shared/utils/env.utils";
import "./styles.css";

export default function A11yLens({
  enabled = true,
  forceShow = false,
  environment,
  debug = false,
}: A11yLensProps = {}) {
  const { results, isScanning } = useA11yScan();

  // No useEffect needed anymore - CSS is auto-loaded via index.ts

  const currentEnv = getEnvironment(environment);
  const shouldShow = shouldShowInEnvironment(enabled, currentEnv, forceShow);
  const framework = detectFramework();

  // Enhanced logging with modern framework detection
  if (!shouldShow) {
    const debugInfo = getEnvironmentDebugInfo();
    const frameworkEmoji =
      {
        vite: "⚡",
        nextjs: "▲",
        remix: "💿",
        astro: "🚀",
        nodejs: "📦",
        unknown: "❓",
      }[framework] || "❓";

    console.log(
      `A11yLens: Disabled in ${currentEnv} mode (${frameworkEmoji} ${framework}). Use forceShow=true to override or set environment to development/staging.`,
      debug ? debugInfo : ""
    );
    return null;
  }

  if (!results || isScanning) {
    return (
      <div className="a11y-lens">
        <LoadingState
          isScanning={isScanning}
          currentEnv={currentEnv}
          enabled={enabled}
          forceShow={forceShow}
          environment={environment}
          shouldShow={shouldShow}
        />
      </div>
    );
  }

  return (
    <div className="a11y-lens">
      <Header currentEnv={currentEnv} />

      <div className="a11y-lens__content">
        <Summary
          violationCount={results.violations.length}
          passCount={results.passes.length}
        />

        <ViolationList violations={results.violations} />

        {results.violations.length === 0 && <SuccessState />}
      </div>
      {debug && (
        <Footer
          currentEnv={currentEnv}
          enabled={enabled}
          forceShow={forceShow}
          environment={environment}
          shouldShow={shouldShow}
        />
      )}
    </div>
  );
}

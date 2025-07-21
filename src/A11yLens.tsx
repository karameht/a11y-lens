import { useState } from "react";
import Footer from "./modules/components/layout/Footer";
import Header from "./modules/components/layout/Header";
import Summary from "./modules/components/layout/Summary";
import PassedList from "./modules/components/passed/PassedList";
import LoadingState from "./modules/components/states/LoadingState";
import SuccessState from "./modules/components/states/SuccessState";
import ViolationList from "./modules/components/violation/ViolationList";
import { useA11yScan } from "./shared/hooks/useA11yScan";
import type { A11yLensProps } from "./shared/types/component.types";
import {
  getEnvironment,
  shouldShowInEnvironment,
} from "./shared/utils/env.utils";
import "./styles.css";

type TabType = "issues" | "passed";

export default function A11yLens({
  enabled = true,
  forceShow = false,
  environment,
  debug = false,
}: A11yLensProps = {}) {
  const { results, isScanning, runScan } = useA11yScan();
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("issues");

  const currentEnv = getEnvironment(environment);
  const shouldShow = shouldShowInEnvironment(enabled, currentEnv, forceShow);

  if (!shouldShow) {
    return null;
  }

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const violationCount = results?.violations?.length || 0;
  const passCount = results?.passes?.length || 0;

  return (
    <div className={`a11y-lens ${isMinimized ? "a11y-lens--minimized" : ""}`}>
      <Header
        violationCount={violationCount}
        isScanning={isScanning}
        isMinimized={isMinimized}
        onScan={runScan}
        onToggleMinimize={handleToggleMinimize}
      />

      {!isMinimized && (
        <div className="a11y-lens__content">
          {!results || isScanning ? (
            <LoadingState isScanning={isScanning} currentEnv={currentEnv} />
          ) : (
            <>
              <Summary
                violationCount={violationCount}
                passCount={passCount}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {activeTab === "issues" && (
                <>
                  <ViolationList violations={results.violations} />
                  {violationCount === 0 && <SuccessState />}
                </>
              )}

              {activeTab === "passed" && <PassedList passes={results.passes} />}
            </>
          )}
        </div>
      )}

      {debug && !isMinimized && (
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

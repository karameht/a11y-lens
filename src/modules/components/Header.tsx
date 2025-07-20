/**
 * Header Component
 *
 * Displays the A11yLens title with icon and current environment information.
 * Clean header section for the accessibility panel.
 */

import { useEffect, useState } from "react";

interface HeaderProps {
  violationCount?: number;
  isScanning: boolean;
  isMinimized: boolean;
  onScan: () => void;
  onToggleMinimize: () => void;
  title?: string;
}

const AlertTriangleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Header({
  violationCount = 0,
  isScanning,
  isMinimized,
  onScan,
  onToggleMinimize,
  title = "A11yLens",
}: HeaderProps) {
  const [justClicked, setJustClicked] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [wasScanning, setWasScanning] = useState(false);

  // Track when scanning state changes
  useEffect(() => {
    if (isScanning && !wasScanning) {
      // Scan just started
      setWasScanning(true);
      setShowFinished(false);
    } else if (!isScanning && wasScanning) {
      // Scan just finished
      setWasScanning(false);
      setShowFinished(true);

      // Show "Scan finished" for 1.2 seconds, then back to "Scan"
      setTimeout(() => {
        setShowFinished(false);
      }, 1200);
    }
  }, [isScanning, wasScanning]);

  const handleScanClick = () => {
    // Show immediate feedback
    setJustClicked(true);
    setShowFinished(false);

    // AUTO-EXPAND: Open panel when user clicks scan
    if (isMinimized) {
      onToggleMinimize();
    }

    // Trigger actual scan
    onScan();

    // Reset immediate feedback after short time
    setTimeout(() => setJustClicked(false), 500);
  };

  const handleToggleClick = () => {
    onToggleMinimize();
  };

  const scanButtonText = () => {
    if (isScanning) return "Scanning...";
    if (justClicked) return "Starting...";
    if (showFinished) return "Scan finished";
    return "Scan";
  };

  const scanButtonClass = () => {
    let baseClass = "a11y-lens__scan-button";
    if (isScanning || justClicked) {
      baseClass += " a11y-lens__scan-button--active";
    } else if (showFinished) {
      baseClass += " a11y-lens__scan-button--finished";
    }
    return baseClass;
  };

  return (
    <div className="a11y-lens__header">
      <div className="a11y-lens__header-left">
        <div className="a11y-lens__title">
          <span className="a11y-lens__title-icon">
            <AlertTriangleIcon />
          </span>
          <span>{title}</span>
          {violationCount > 0 && (
            <span className="a11y-lens__violation-count">
              ({violationCount} issues)
            </span>
          )}
        </div>
      </div>

      <div className="a11y-lens__header-controls">
        <button
          onClick={handleScanClick}
          disabled={isScanning}
          className={scanButtonClass()}
          title="Run accessibility scan"
        >
          {scanButtonText()}
        </button>

        <button
          onClick={handleToggleClick}
          className="a11y-lens__toggle-button"
          title={isMinimized ? "Expand panel" : "Minimize panel"}
        >
          {isMinimized ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
    </div>
  );
}

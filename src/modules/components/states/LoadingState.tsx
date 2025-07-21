/**
 * LoadingState Component
 *
 * Displays loading spinner and debug information while A11yLens is scanning
 * or initializing. Shows environment info and debug details.
 */

interface LoadingStateProps {
  isScanning: boolean;
  currentEnv: string;
}

export default function LoadingState({
  isScanning,
  currentEnv,
}: LoadingStateProps) {
  return (
    <div className="a11y-lens__header">
      <div className="a11y-lens__loading">
        <div className="a11y-lens__spinner"></div>
        <span>
          {isScanning
            ? "Scanning for accessibility issues..."
            : "A11yLens initializing..."}
        </span>
      </div>
      <p className="a11y-lens__env">
        Environment: <strong>{currentEnv}</strong>
      </p>
    </div>
  );
}

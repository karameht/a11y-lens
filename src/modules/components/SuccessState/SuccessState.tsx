/**
 * SuccessState Component
 *
 * Displays celebration when no accessibility issues are found.
 * Shows emoji, congratulatory message and encouragement.
 */

interface SuccessStateProps {
  message?: string;
  subtitle?: string;
  emoji?: string;
}

export default function SuccessState({
  message = "No accessibility issues found!",
  subtitle = "Great job on building accessible interfaces! 🎉",
  emoji = "🎉",
}: SuccessStateProps) {
  return (
    <div className="a11y-lens__success">
      <div className="a11y-lens__success-emoji">{emoji}</div>
      <p className="a11y-lens__success-title">{message}</p>
      <p className="a11y-lens__success-subtitle">{subtitle}</p>
    </div>
  );
}

/**
 * Header Component
 *
 * Displays the A11yLens title with icon and current environment information.
 * Clean header section for the accessibility panel.
 */

interface HeaderProps {
  currentEnv: string;
  title?: string;
  icon?: string;
}

export default function Header({
  currentEnv,
  title = "A11yLens",
  icon = "🔍",
}: HeaderProps) {
  return (
    <div className="a11y-lens__header">
      <h2 className="a11y-lens__title">
        <span className="a11y-lens__title-icon">{icon}</span>
        <span>{title}</span>
      </h2>
      <p className="a11y-lens__env">
        Environment: <strong>{currentEnv}</strong>
      </p>
    </div>
  );
}

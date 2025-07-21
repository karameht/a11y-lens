/**
 * IconButton Component
 *
 * Reusable button with icon for A11yLens actions.
 * Handles both button and link variants.
 */

import { ReactNode } from "react";

type IconButtonVariant = "find" | "docs";

interface BaseIconButtonProps {
  /** Button text */
  children: ReactNode;
  /** Icon element */
  icon: ReactNode;
  /** Button variant for styling */
  variant: IconButtonVariant;
  /** Tooltip text */
  title: string;
  /** Additional CSS classes */
  className?: string;
}

interface ButtonProps extends BaseIconButtonProps {
  /** Button click handler */
  onClick: () => void;
  /** Whether button is disabled */
  disabled?: boolean;
}

interface LinkProps extends BaseIconButtonProps {
  /** Link URL */
  href: string;
  /** Link target */
  target?: string;
  /** Link rel attribute */
  rel?: string;
}

type IconButtonProps = ButtonProps | LinkProps;

/**
 * Check if props are for a link component
 */
function isLinkProps(props: IconButtonProps): props is LinkProps {
  return "href" in props;
}

export default function IconButton(props: IconButtonProps) {
  const { children, icon, variant, title, className = "" } = props;

  const baseClasses =
    `a11y-lens__action-button a11y-lens__action-button--${variant} ${className}`.trim();

  if (isLinkProps(props)) {
    const { href, target = "_blank", rel = "noopener noreferrer" } = props;

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        title={title}
      >
        <span className="a11y-lens__action-icon">{icon}</span>
        <span className="a11y-lens__action-text">{children}</span>
      </a>
    );
  }

  const { onClick, disabled = false } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      title={title}
    >
      <span className="a11y-lens__action-icon">{icon}</span>
      <span className="a11y-lens__action-text">{children}</span>
    </button>
  );
}

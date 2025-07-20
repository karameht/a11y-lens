/**
 * Component Types
 *
 * TypeScript definitions for React component props and UI-related types.
 * Covers A11yLens component props and related UI state.
 */

/**
 * Props for the main A11yLens component
 */
export interface A11yLensProps {
  /** Enable/disable the component */
  enabled?: boolean;
  /** Force show even in production */
  forceShow?: boolean;
  /** Custom environment check - if provided, overrides auto-detection */
  environment?: string;
}

/**
 * Loading states for the A11yLens component
 */
export type LoadingState = "idle" | "scanning" | "complete" | "error";

/**
 * Display modes for violations
 */
export type ViolationDisplayMode = "compact" | "detailed" | "list";

/**
 * Theme options for A11yLens
 */
export type A11yLensTheme = "light" | "dark" | "auto";

/**
 * Position options for the panel
 */
export interface PanelPosition {
  /** Horizontal position */
  horizontal: "left" | "right";
  /** Vertical position */
  vertical: "top" | "bottom";
}

/**
 * Configuration options for A11yLens display
 */
export interface A11yLensConfig {
  /** Maximum number of violations to show */
  maxViolations?: number;
  /** Whether to show passed checks count */
  showPassedCount?: boolean;
  /** Whether to show debug information */
  showDebugInfo?: boolean;
  /** Display theme */
  theme?: A11yLensTheme;
  /** Panel position */
  position?: PanelPosition;
  /** Display mode for violations */
  displayMode?: ViolationDisplayMode;
}

/**
 * Internal component state
 */
export interface A11yLensState {
  /** Current loading state */
  loadingState: LoadingState;
  /** Whether panel is minimized */
  isMinimized: boolean;
  /** Whether panel is visible */
  isVisible: boolean;
  /** Current error message if any */
  errorMessage?: string;
  /** Component configuration */
  config: A11yLensConfig;
}

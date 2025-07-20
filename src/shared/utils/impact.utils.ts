/**
 * Impact Utilities
 *
 * Helper functions for handling accessibility violation impact levels.
 * Based on axe-core's impact classification system.
 */

/**
 * Maps axe-core impact levels to corresponding CSS class names
 *
 * @param impact - The impact level from axe-core violation
 * @returns CSS class name for styling the impact badge
 *
 * @example
 * ```tsx
 * const className = getImpactClass('critical'); // 'a11y-lens__impact--critical'
 * <span className={className}>critical</span>
 * ```
 */
export const getImpactClass = (impact?: string): string => {
  switch (impact) {
    case "critical":
      return "a11y-lens__impact--critical";
    case "serious":
      return "a11y-lens__impact--serious";
    case "moderate":
      return "a11y-lens__impact--moderate";
    case "minor":
      return "a11y-lens__impact--minor";
    default:
      // Default to minor for unknown impact levels
      return "a11y-lens__impact--minor";
  }
};

/**
 * Gets the display priority for impact levels (lower number = higher priority)
 * Useful for sorting violations by importance
 *
 * @param impact - The impact level from axe-core violation
 * @returns Numeric priority (1-4, where 1 is highest priority)
 *
 * @example
 * ```tsx
 * violations.sort((a, b) => getImpactPriority(a.impact) - getImpactPriority(b.impact));
 * ```
 */
export const getImpactPriority = (impact?: string): number => {
  switch (impact) {
    case "critical":
      return 1;
    case "serious":
      return 2;
    case "moderate":
      return 3;
    case "minor":
      return 4;
    default:
      return 4; // Treat unknown as lowest priority
  }
};

/**
 * All supported impact levels in order of severity
 * Useful for validation or iteration
 */
export const IMPACT_LEVELS = [
  "critical",
  "serious",
  "moderate",
  "minor",
] as const;

/**
 * Type definition for supported impact levels
 */
export type ImpactLevel = (typeof IMPACT_LEVELS)[number];

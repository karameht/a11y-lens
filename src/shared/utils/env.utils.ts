/**
 * Environment Utilities
 *
 * Helper functions for environment detection and development mode checks.
 * Supports multiple environment variable patterns and fallbacks.
 */

/**
 * Detects the current environment with multiple fallbacks
 *
 * @param environment - Optional environment override from props
 * @returns The detected environment string
 *
 * @example
 * ```tsx
 * const env = getEnvironment(); // 'development'
 * const env = getEnvironment('staging'); // 'staging' (override)
 * ```
 */
export const getEnvironment = (environment?: string): string => {
  // 1. User provided environment prop
  if (environment) return environment;

  // 2. Check for custom env variables
  if (import.meta.env.VITE_APP_ENV) return import.meta.env.VITE_APP_ENV;
  if (import.meta.env.VITE_ENVIRONMENT) return import.meta.env.VITE_ENVIRONMENT;

  // 3. Fallback to Vite's built-in
  return import.meta.env.MODE;
};

/**
 * Checks if the environment is development-like
 *
 * @param env - Environment string to check
 * @returns True if environment is development-like
 *
 * @example
 * ```tsx
 * isDevelopmentEnvironment('development'); // true
 * isDevelopmentEnvironment('dev'); // true
 * isDevelopmentEnvironment('production'); // false
 * ```
 */
export const isDevelopmentEnvironment = (env: string): boolean => {
  return ["development", "dev", "local"].includes(env.toLowerCase());
};

/**
 * Determines if A11yLens should be shown based on environment and settings
 *
 * @param enabled - Whether the component is enabled
 * @param env - Current environment
 * @param forceShow - Force show even in production
 * @returns True if component should be rendered
 *
 * @example
 * ```tsx
 * shouldShowInEnvironment(true, 'development', false); // true
 * shouldShowInEnvironment(true, 'production', false); // false
 * shouldShowInEnvironment(true, 'production', true); // true (forced)
 * ```
 */
export const shouldShowInEnvironment = (
  enabled: boolean,
  env: string,
  forceShow: boolean
): boolean => {
  return enabled && (isDevelopmentEnvironment(env) || forceShow);
};

/**
 * All supported development-like environment names
 * Useful for validation or configuration
 */
export const DEVELOPMENT_ENVIRONMENTS = [
  "development",
  "dev",
  "local",
] as const;

/**
 * Type definition for development environment names
 */
export type DevelopmentEnvironment = (typeof DEVELOPMENT_ENVIRONMENTS)[number];

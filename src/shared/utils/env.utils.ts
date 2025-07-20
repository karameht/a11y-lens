/**
 * Environment Utilities
 *
 * Modern framework-agnostic environment detection that works with:
 * - Vite (the new standard for development)
 * - Next.js (production apps, full-stack)
 * - Remix (web standards focused)
 * - Astro (content sites with React islands)
 */

/**
 * Safely access environment variables across modern frameworks
 */
const safeGetEnv = () => {
  const env: Record<string, string | boolean | undefined> = {};

  // 1. Vite environment variables (dev standard)
  if (typeof import.meta !== "undefined" && import.meta.env) {
    try {
      Object.assign(env, {
        MODE: import.meta.env.MODE,
        DEV: import.meta.env.DEV,
        PROD: import.meta.env.PROD,
        VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
        VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
        VITE_A11Y_LENS_ENV: import.meta.env.VITE_A11Y_LENS_ENV,
      });
    } catch (e) {
      // Ignore errors in non-Vite environments
    }
  }

  // 2. Next.js environment variables (production apps)
  if (typeof process !== "undefined" && process.env) {
    Object.assign(env, {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
      NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
      NEXT_PUBLIC_A11Y_LENS_ENV: process.env.NEXT_PUBLIC_A11Y_LENS_ENV,
      // Remix environment variables
      REMIX_DEV_HTTP_ORIGIN: process.env.REMIX_DEV_HTTP_ORIGIN,
      // Astro environment variables (also uses Vite under the hood)
      ASTRO_ENV: process.env.ASTRO_ENV,
    });
  }

  // 3. Browser globals (fallback for custom setups)
  if (typeof window !== "undefined") {
    // Some frameworks inject env into window
    const windowEnv = (window as any).__ENV__ || {};
    Object.assign(env, windowEnv);
  }

  return env;
};

/**
 * Detects the current environment with maximum compatibility
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
  // 1. Explicit override from component props
  if (environment) return environment;

  const env = safeGetEnv();

  // 2. Try A11yLens-specific environment variables first
  if (env.VITE_A11Y_LENS_ENV) return String(env.VITE_A11Y_LENS_ENV);
  if (env.NEXT_PUBLIC_A11Y_LENS_ENV)
    return String(env.NEXT_PUBLIC_A11Y_LENS_ENV);

  // 3. Try framework-specific app environment variables
  if (env.VITE_APP_ENV) return String(env.VITE_APP_ENV);
  if (env.NEXT_PUBLIC_APP_ENV) return String(env.NEXT_PUBLIC_APP_ENV);
  if (env.VITE_ENVIRONMENT) return String(env.VITE_ENVIRONMENT);
  if (env.NEXT_PUBLIC_ENVIRONMENT) return String(env.NEXT_PUBLIC_ENVIRONMENT);
  if (env.ASTRO_ENV) return String(env.ASTRO_ENV);

  // 4. Framework-specific defaults
  if (env.MODE) return String(env.MODE); // Vite/Astro
  if (env.NODE_ENV) return String(env.NODE_ENV); // Next.js/Remix

  // 5. Detect framework and infer environment
  if (env.DEV === true) return "development"; // Vite/Astro dev mode
  if (env.PROD === true) return "production"; // Vite/Astro prod mode
  if (env.REMIX_DEV_HTTP_ORIGIN) return "development"; // Remix dev mode

  // 6. Ultimate fallback
  return "development";
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
 * Detects which framework/bundler is being used
 */
export const detectFramework = (): string => {
  const env = safeGetEnv();

  // Vite detection (most common for development)
  if (typeof import.meta !== "undefined" && import.meta.env) {
    // Check if it's Astro (uses Vite under the hood)
    if (
      env.ASTRO_ENV !== undefined ||
      (typeof window !== "undefined" && (window as any).astro)
    ) {
      return "astro";
    }
    return "vite";
  }

  // Next.js detection (production apps)
  if (
    env.NEXT_PUBLIC_APP_ENV !== undefined ||
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_VERCEL_URL)
  ) {
    return "nextjs";
  }

  // Remix detection (web standards focused)
  if (
    env.REMIX_DEV_HTTP_ORIGIN !== undefined ||
    (typeof process !== "undefined" && process.env.REMIX_DEV_HTTP_ORIGIN)
  ) {
    return "remix";
  }

  // Generic Node.js fallback
  if (typeof process !== "undefined" && process.env.NODE_ENV) {
    return "nodejs";
  }

  return "unknown";
};

/**
 * Debug info for troubleshooting environment detection
 */
export const getEnvironmentDebugInfo = () => {
  const env = safeGetEnv();
  const framework = detectFramework();
  const currentEnv = getEnvironment();

  return {
    framework,
    currentEnv,
    isDev: isDevelopmentEnvironment(currentEnv),
    availableVars: Object.keys(env).filter((key) => env[key] !== undefined),
    rawEnv: env,
  };
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

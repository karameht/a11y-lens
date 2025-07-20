/**
 * Environment Types
 *
 * TypeScript definitions for environment detection and configuration.
 * Supports modern React frameworks: Vite, Next.js, Remix, and Astro.
 */

/**
 * Supported environment names
 */
export type EnvironmentName =
  | "development"
  | "dev"
  | "local"
  | "staging"
  | "production"
  | "prod"
  | "test";

/**
 * Development-like environments where A11yLens should show by default
 */
export type DevelopmentEnvironment = "development" | "dev" | "local";

/**
 * Production-like environments where A11yLens should be hidden by default
 */
export type ProductionEnvironment = "production" | "prod";

/**
 * Supported modern React frameworks
 */
export type FrameworkType =
  | "vite" // The new standard for development
  | "nextjs" // Production apps, full-stack
  | "remix" // Web standards focused
  | "astro" // Content sites with React islands
  | "nodejs" // Generic Node.js
  | "unknown";

/**
 * Environment detection result
 */
export interface EnvironmentInfo {
  /** Detected environment name */
  name: EnvironmentName;
  /** Whether this is a development-like environment */
  isDevelopment: boolean;
  /** Whether this is a production-like environment */
  isProduction: boolean;
  /** Detected framework */
  framework: FrameworkType;
  /** Source of environment detection */
  source:
    | "prop"
    | "a11y_lens_specific"
    | "app_env"
    | "framework_mode"
    | "node_env"
    | "framework_flags"
    | "fallback";
  /** Raw value that was detected */
  rawValue: string;
}

/**
 * Environment configuration options
 */
export interface EnvironmentConfig {
  /** Custom development environment names */
  developmentEnvironments?: string[];
  /** Custom production environment names */
  productionEnvironments?: string[];
  /** Whether to log environment detection */
  logDetection?: boolean;
  /** Whether to warn about unknown environments */
  warnUnknown?: boolean;
}

/**
 * Universal environment variables interface
 * Covers all modern React frameworks
 */
export interface UniversalEnvVars {
  // Vite (the new development standard)
  MODE?: string;
  DEV?: boolean;
  PROD?: boolean;
  VITE_APP_ENV?: string;
  VITE_ENVIRONMENT?: string;
  VITE_A11Y_LENS_ENV?: string;

  // Next.js (production apps, full-stack)
  NODE_ENV?: string;
  NEXT_PUBLIC_APP_ENV?: string;
  NEXT_PUBLIC_ENVIRONMENT?: string;
  NEXT_PUBLIC_A11Y_LENS_ENV?: string;
  NEXT_PUBLIC_VERCEL_URL?: string;

  // Remix (web standards focused)
  REMIX_DEV_HTTP_ORIGIN?: string;

  // Astro (content sites with React islands)
  ASTRO_ENV?: string;

  // Custom/Browser
  [key: string]: string | boolean | undefined;
}

/**
 * Legacy Vite environment variables interface
 * @deprecated Use UniversalEnvVars instead
 */
export interface A11yLensViteEnv {
  /** Standard Vite mode */
  MODE: string;
  /** Standard Vite dev flag */
  DEV: boolean;
  /** Standard Vite prod flag */
  PROD: boolean;
  /** Custom app environment */
  VITE_APP_ENV?: string;
  /** Alternative environment variable */
  VITE_ENVIRONMENT?: string;
  /** A11yLens specific environment override */
  VITE_A11Y_LENS_ENV?: string;
}

/**
 * Environment Types
 *
 * TypeScript definitions for environment detection and configuration.
 * Covers development/production environments and related settings.
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
 * Environment detection result
 */
export interface EnvironmentInfo {
  /** Detected environment name */
  name: EnvironmentName;
  /** Whether this is a development-like environment */
  isDevelopment: boolean;
  /** Whether this is a production-like environment */
  isProduction: boolean;
  /** Source of environment detection */
  source:
    | "prop"
    | "vite_app_env"
    | "vite_environment"
    | "vite_mode"
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
 * Vite environment variables interface
 * Extends the ImportMetaEnv for better typing
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

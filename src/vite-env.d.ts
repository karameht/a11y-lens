/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 *
 * This file extends TypeScript's knowledge of environment variables
 * available through import.meta.env in Vite-based projects.
 *
 * These definitions enable proper TypeScript support and autocompletion
 * for environment variables used by A11yLens.
 */

interface ImportMetaEnv {
  // Standard Vite environment variables
  readonly MODE: string; // 'development', 'production', etc.
  readonly DEV: boolean; // true in development
  readonly PROD: boolean; // true in production

  // Custom environment variables for A11yLens
  readonly VITE_APP_ENV: string; // Custom environment identifier
  readonly VITE_ENVIRONMENT: string; // Alternative environment variable

  // Note: Add new environment variables here as they're introduced
  // Format: readonly VITE_YOUR_VAR: string;
}

/**
 * Extend the global ImportMeta interface to include our env definitions
 * This makes import.meta.env properly typed throughout the application
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

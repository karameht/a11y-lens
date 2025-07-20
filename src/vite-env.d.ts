/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 *
 * This file extends TypeScript's knowledge of environment variables
 * available through import.meta.env in Vite-based projects.
 */

interface ImportMetaEnv {
  // Standard Vite environment variables
  readonly MODE: string; // 'development', 'production', etc.
  readonly DEV: boolean; // true in development
  readonly PROD: boolean; // true in production

  // A11yLens specific environment variables
  readonly VITE_A11Y_LENS_ENV?: string; // A11yLens environment override
  readonly VITE_APP_ENV?: string; // Custom app environment identifier
  readonly VITE_ENVIRONMENT?: string; // Alternative environment variable

  // Astro compatibility (uses Vite under the hood)
  readonly ASTRO_ENV?: string; // Astro environment variable
}

/**
 * Extend the global ImportMeta interface to include our env definitions
 * This makes import.meta.env properly typed throughout the application
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

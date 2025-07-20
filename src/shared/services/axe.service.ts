/**
 * Axe Service
 *
 * Service layer for axe-core accessibility scanning.
 * Handles scan execution, error handling, and result processing.
 */

import type { AxeRunOptions, AxeScanResults } from "../types/axe.types";

/**
 * Runs a complete accessibility scan using axe-core
 *
 * @returns Promise with scan results or throws error
 *
 * @example
 * ```tsx
 * try {
 *   const results = await runAccessibilityScan();
 *   console.log(`Found ${results.violations.length} issues`);
 * } catch (error) {
 *   console.error('Scan failed:', error);
 * }
 * ```
 */
export const runAccessibilityScan = async (): Promise<AxeScanResults> => {
  try {
    const axe = await import("axe-core");
    return await axe.default.run();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Re-throw with more context
    throw new Error(`Accessibility scan failed: ${errorMessage}`);
  }
};

/**
 * Checks if an axe scan is already running
 *
 * @param error - Error object to check
 * @returns True if error indicates scan already running
 */
export const isScanAlreadyRunning = (error: unknown): boolean => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return errorMessage.includes("already running");
};

/**
 * Handles axe scan errors with appropriate logging and retry logic
 *
 * @param error - The error that occurred
 * @param retryFn - Function to call for retry
 * @param retryDelay - Delay in ms before retry (default: 100)
 *
 * @example
 * ```tsx
 * try {
 *   await runAccessibilityScan();
 * } catch (error) {
 *   handleScanError(error, () => runAccessibilityScan(), 100);
 * }
 * ```
 */
export const handleScanError = (
  error: unknown,
  retryFn: () => void,
  retryDelay: number = 100
): NodeJS.Timeout | null => {
  if (isScanAlreadyRunning(error)) {
    console.log("A11yLens: Axe scan skipped - already running");
    return setTimeout(retryFn, retryDelay);
  } else {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Accessibility scan failed:", errorMessage);
    return null;
  }
};

/**
 * Configuration options for axe scans
 */
export interface ScanConfig {
  /** Include only specific rules */
  rules?: string[];
  /** Exclude specific rules */
  excludeRules?: string[];
  /** Custom axe configuration */
  axeConfig?: AxeRunOptions;
  /** Retry attempts on failure */
  retryAttempts?: number;
  /** Delay between retries in ms */
  retryDelay?: number;
}

/**
 * Advanced scan with custom configuration
 *
 * @param config - Scan configuration options
 * @returns Promise with scan results
 */
export const runConfiguredScan = async (
  config: ScanConfig = {}
): Promise<AxeScanResults> => {
  const {
    rules,
    excludeRules,
    axeConfig,
    retryAttempts = 1,
    retryDelay = 100,
  } = config;

  let attempt = 0;

  while (attempt < retryAttempts) {
    try {
      const axe = await import("axe-core");

      // Build axe configuration
      const scanConfig: any = { ...axeConfig };

      if (rules || excludeRules) {
        scanConfig.rules = {};

        if (rules) {
          rules.forEach((rule) => {
            scanConfig.rules[rule] = { enabled: true };
          });
        }

        if (excludeRules) {
          excludeRules.forEach((rule) => {
            scanConfig.rules[rule] = { enabled: false };
          });
        }
      }

      return await axe.default.run(scanConfig);
    } catch (error) {
      attempt++;

      if (attempt >= retryAttempts) {
        throw error;
      }

      if (isScanAlreadyRunning(error)) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        throw error;
      }
    }
  }

  // This should never be reached, but TypeScript needs it
  throw new Error("Scan failed after all retry attempts");
};

/**
 * Quick scan helper - just runs a basic scan
 * Alias for runAccessibilityScan for convenience
 */
export const quickScan = runAccessibilityScan;

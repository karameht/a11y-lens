/**
 * useA11yScan Hook
 *
 * Custom React hook for managing accessibility scans.
 * Handles scan lifecycle, error handling, and cleanup.
 */

import { useEffect, useState } from "react";
import { handleScanError, runAccessibilityScan } from "../services/axe.service";
import type { AxeScanResults } from "../types/axe.types";

interface UseA11yScanOptions {
  /** Whether to run scan automatically on mount */
  autoScan?: boolean;
  /** Delay before starting scan in ms */
  scanDelay?: number;
  /** Custom retry delay in ms */
  retryDelay?: number;
}

interface UseA11yScanReturn {
  /** Scan results from axe-core */
  results: AxeScanResults | null;
  /** Whether a scan is currently running */
  isScanning: boolean;
  /** Error if scan failed */
  error: string | null;
  /** Function to manually trigger a scan */
  runScan: () => void;
  /** Function to clear current results */
  clearResults: () => void;
}

/**
 * Hook for managing accessibility scans with axe-core
 *
 * @param options - Configuration options for the scan
 * @returns Scan state and control functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { results, isScanning, runScan } = useA11yScan();
 *
 *   if (isScanning) return <div>Scanning...</div>;
 *
 *   return (
 *     <div>
 *       <button onClick={runScan}>Run Scan</button>
 *       {results && <div>{results.violations.length} issues found</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export const useA11yScan = (
  options: UseA11yScanOptions = {}
): UseA11yScanReturn => {
  const { autoScan = true, scanDelay = 0, retryDelay = 100 } = options;

  const [results, setResults] = useState<AxeScanResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track component mount state to prevent memory leaks
  const [isMounted, setIsMounted] = useState(true);

  const runScan = async () => {
    if (!isMounted) return;

    setIsScanning(true);
    setError(null);

    try {
      const scanResults = await runAccessibilityScan();

      if (isMounted) {
        setResults(scanResults);
      }
    } catch (scanError: unknown) {
      if (!isMounted) return;

      // Use service layer error handling
      const timeout = handleScanError(
        scanError,
        () => {
          if (isMounted) {
            runScan();
          }
        },
        retryDelay
      );

      // If no retry scheduled, set error state
      if (!timeout) {
        const errorMessage =
          scanError instanceof Error ? scanError.message : String(scanError);
        setError(errorMessage);
      }
    } finally {
      if (isMounted) {
        setIsScanning(false);
      }
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  // Auto-scan on mount if enabled
  useEffect(() => {
    if (!autoScan) return;

    let scanTimeout: NodeJS.Timeout;

    if (scanDelay > 0) {
      scanTimeout = setTimeout(() => {
        if (isMounted) {
          runScan();
        }
      }, scanDelay);
    } else {
      runScan();
    }

    return () => {
      if (scanTimeout) {
        clearTimeout(scanTimeout);
      }
    };
  }, [autoScan, scanDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return {
    results,
    isScanning,
    error,
    runScan,
    clearResults,
  };
};

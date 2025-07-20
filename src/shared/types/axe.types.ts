/**
 * Axe Core Types
 *
 * TypeScript definitions for axe-core accessibility testing results.
 * These types provide proper typing for scan results, violations, and related data.
 */

/**
 * Impact levels for accessibility violations
 * Based on axe-core's severity classification
 */
export type ImpactLevel = "minor" | "moderate" | "serious" | "critical";

/**
 * Individual DOM node that has an accessibility issue
 */
export interface ViolationNode {
  /** CSS selector path to the element */
  target: string[];
  /** HTML content of the element */
  html: string;
  /** Summary of what failed for this element */
  failureSummary?: string;
  /** Additional impact information */
  impact?: ImpactLevel;
  /** Any other data from axe-core */
  any?: any[];
  /** All data from axe-core */
  all?: any[];
  /** None data from axe-core */
  none?: any[];
}

/**
 * A single accessibility violation found by axe-core
 */
export interface AxeViolation {
  /** Unique identifier for this rule */
  id: string;
  /** Human-readable description of the violation */
  description: string;
  /** Help text explaining how to fix the issue */
  help: string;
  /** URL to more detailed help documentation */
  helpUrl: string;
  /** Severity level of this violation */
  impact?: ImpactLevel;
  /** WCAG tags this rule relates to */
  tags: string[];
  /** DOM nodes that have this violation */
  nodes: ViolationNode[];
}

/**
 * A single accessibility check that passed
 */
export interface AxePass {
  /** Unique identifier for this rule */
  id: string;
  /** Human-readable description */
  description: string;
  /** Help text */
  help: string;
  /** URL to help documentation */
  helpUrl: string;
  /** WCAG tags */
  tags: string[];
  /** DOM nodes that passed this check */
  nodes: ViolationNode[];
}

/**
 * A check that couldn't be completed automatically
 */
export interface AxeIncomplete {
  /** Unique identifier for this rule */
  id: string;
  /** Human-readable description */
  description: string;
  /** Help text */
  help: string;
  /** URL to help documentation */
  helpUrl: string;
  /** WCAG tags */
  tags: string[];
  /** DOM nodes that need manual review */
  nodes: ViolationNode[];
}

/**
 * Complete results from an axe-core accessibility scan
 */
export interface AxeScanResults {
  /** Array of accessibility violations found */
  violations: AxeViolation[];
  /** Array of checks that passed */
  passes: AxePass[];
  /** Array of checks that need manual review */
  incomplete: AxeIncomplete[];
  /** Array of rules that were not applicable */
  inapplicable: AxePass[];
  /** Timestamp when scan was completed */
  timestamp: Date;
  /** URL that was scanned */
  url: string;
  /** Test engine information */
  testEngine: {
    name: string;
    version: string;
  };
  /** Test runner information */
  testRunner: {
    name: string;
  };
  /** Environment information */
  testEnvironment: {
    userAgent: string;
    windowWidth: number;
    windowHeight: number;
    orientationAngle?: number;
    orientationType?: string;
  };
}

/**
 * Configuration options for axe-core scans
 */
export interface AxeRunOptions {
  /** Include only specific rules */
  runOnly?: {
    type: "rule" | "tag";
    values: string[];
  };
  /** Custom rule configuration */
  rules?: Record<string, { enabled: boolean }>;
  /** Elements to include in scan */
  include?: string[][];
  /** Elements to exclude from scan */
  exclude?: string[][];
  /** Custom tags to apply */
  tags?: string[];
  /** Reporter to use for results */
  reporter?: "v1" | "v2" | "raw";
  /** Result types to include */
  resultTypes?: ("violations" | "incomplete" | "passes" | "inapplicable")[];
  /** XPath support */
  xpath?: boolean;
  /** Absolute paths in selectors */
  absolutePaths?: boolean;
}

/**
 * Simplified scan results for A11yLens UI
 */
export interface SimplifiedScanResults {
  /** Number of violations found */
  violationCount: number;
  /** Number of checks that passed */
  passCount: number;
  /** Most critical violations (up to 3) */
  topViolations: AxeViolation[];
  /** Whether scan completed successfully */
  hasResults: boolean;
  /** When scan was completed */
  timestamp: Date;
}

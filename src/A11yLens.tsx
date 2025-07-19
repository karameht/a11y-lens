import { useEffect, useState } from "react";

export default function A11yLens() {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const runAxeScan = async () => {
      try {
        const axe = await import("axe-core");
        const scan = await axe.run();
        setResults(scan);
      } catch (error) {
        console.error("Accessibility scan failed:", error);
      }
    };

    runAxeScan();
  }, []);

  if (!results) {
    return <div>A11yLens is scanning...</div>;
  }

  return (
    <div>
      <h2>A11yLens Results</h2>
      <p>{results.violations.length} issues found</p>
    </div>
  );
}

import React from "react";

export default function DatabricksPipelineCaseStudy() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Databricks Pipeline Stabilization
      </h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        Restructuring SQL + PySpark transformations for predictable, traceable analytics.
      </p>

      <pre
        style={{
          background: "#f7f7f7",
          padding: "1rem",
          borderRadius: "8px",
          overflowX: "auto",
          fontSize: "0.9rem"
        }}
      >
{`Problem
- Long-running jobs with inconsistent output
- Transformations scattered across notebooks
- Difficult to trace data lineage

Constraints
- Must maintain existing dashboard contracts
- Must support large financial datasets
- Must reduce operational overhead

Approach
- Consolidated transformations into a single SQL layer
- Enforced bronze/silver/gold Delta Lake structure
- Added validation checks before enrichment joins

Outcome
- Predictable, traceable data flow
- Faster job execution
- Cleaner handoff to analytics teams`}
      </pre>
    </div>
  );
}
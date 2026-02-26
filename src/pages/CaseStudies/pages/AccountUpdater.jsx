import React from "react";

export default function AccountUpdaterCaseStudy() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Account Updater</h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        Improving recurring billing reliability by reducing declines and modernizing the
        account update flow.
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
- High decline rates due to outdated card data
- Manual update process created delays and inconsistencies
- Limited visibility into update failures

Constraints
- Must avoid storing raw card numbers
- Must integrate with multiple processors
- Must maintain backward compatibility

Approach
- Introduced tokenized update requests
- Added structured logging for update attempts
- Implemented retry-by-exception for processor outages

Outcome
- Fewer recurring billing failures
- Faster update turnaround
- Clearer operational signals for support teams`}
      </pre>
    </div>
  );
}
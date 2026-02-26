import React from "react";

export default function PayoutJobFailureCaseStudy() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Payout Job Failure Fix
      </h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        Diagnosing and resolving a recurring payout failure through scoped SQL and async
        retries.
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
- Payout job failing intermittently
- Partial writes causing inconsistent state
- No clear signal for root cause

Constraints
- Must avoid double-payouts
- Must maintain strict ordering guarantees
- Must preserve auditability

Approach
- Added scoped SQL to isolate failing rows
- Introduced async retry queue for transient failures
- Added structured logs for payout attempts

Outcome
- Stable payout execution
- No duplicate payouts
- Clear operational visibility for on-call teams`}
      </pre>
    </div>
  );
}
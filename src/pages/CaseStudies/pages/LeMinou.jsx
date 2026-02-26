import React from "react";

export default function LeMinouCaseStudy() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Le Minou Booking Flow</h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        Designing a calm, intentional booking experience for a small pet‑sitting service.
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
- Users unsure which service to choose
- Too many steps before submitting a request
- UI felt busy and unstructured

Constraints
- Must remain lightweight and mobile-friendly
- Must reflect a soft, editorial brand tone
- Must support both new and returning clients

Approach
- Added a simple service selector with clear pricing
- Reduced flow to two steps: choose → request
- Introduced soft colors, spacing, and gentle UI patterns

Outcome
- Higher completion rate for booking requests
- Clearer user decisions
- A calmer, more intentional experience`}
      </pre>
    </div>
  );
}
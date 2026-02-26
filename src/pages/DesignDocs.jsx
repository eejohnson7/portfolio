import React from "react";

export default function DesignDocs() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Design Docs</h1>

      <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
        A collection of lightweight architecture diagrams and design notes. These reflect
        how I think about systems: clear boundaries, predictable data flow, and intentional
        decision‑making. Each diagram is a simplified, portfolio‑safe representation of
        structures I’ve built in financial systems, analytics pipelines, and small product
        experiences like Le Minou.
      </p>

      {/* Financial Event Ingestion */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Financial Event Ingestion Flow
        </h2>

        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          A high‑level view of how financial events move through a streaming system. This
          mirrors the structure of the Kafka consumer in my code samples.
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
{`┌──────────────────┐
│   Kafka Topic    │
│"financial-events"│
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│ Spring Consumer  │
│ - Deserialize    │
│ - Validate       │
└─────────┬────────┘
          │ valid
          ▼
┌──────────────────┐
│ Processing Layer │
│ - Idempotency    │
│ - Enrichment     │
│ - Downstream API │
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│ Persistence DB   │
└──────────────────┘`}
        </pre>
      </section>

      {/* Databricks Pipeline */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Databricks Analytics Pipeline
        </h2>

        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          A simplified diagram of the bronze → silver → gold model used for financial
          analytics pipelines in PySpark.
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
{`┌──────────────────────┐
│ Bronze Layer (Raw)   │
│ - Raw transactions   │
│ - Ingested as-is     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Silver Layer (Clean) │
│ - Validation         │
│ - Type casting       │
│ - Metadata joins     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Gold Layer (Curated) │
│ - Aggregations       │
│ - Reporting models   │
│ - Dashboard outputs  │
└──────────────────────┘`}
        </pre>
      </section>

      {/* Le Minou Flow */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Le Minou Booking Flow
        </h2>

        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          A small product diagram showing how users move through the booking experience on
          my pet‑sitting site, Le Minou.
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
{`┌────────────────────────┐
│  Service Selector      │
│ (Drop‑In / Dog Walk)   │
└──────────┬─────────────┘
           │
           ▼
┌──────────────────────┐
│ Booking Request Form │
│ - Pet details        │
│ - Dates              │
│ - Contact info       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Confirmation Screen  │
│ - Summary            │
│ - Next steps         │
└──────────────────────┘`}
        </pre>
      </section>

      {/* Save Bank Account */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Save Bank Account Endpoint
        </h2>

        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          A diagram showing the flow of a bank‑account‑save request, matching the Spring
          Boot example in my code samples.
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
{`┌────────────────────────┐
│   Client Request       │
│ POST /bank/accounts    │
└──────────┬───────────--┘
           │
           ▼
┌──────────────────────┐
│ Controller Layer     │
│ - Parse request      │
│ - Basic validation   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Tokenization Service │
│ - Replace acct #     │
│   with token         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Persistence Layer    │
│ - Save masked data   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Masked Response      │
└──────────────────────┘`}
        </pre>
      </section>
    </div>
  );
}
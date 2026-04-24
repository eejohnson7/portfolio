export const designDocs = [
  {
    id: "financial-event-ingestion",
    title: "Financial Event Ingestion Flow",
    description: `A high‑level view of how financial events move through a streaming system. This
mirrors the structure of the Kafka consumer in my code samples.`,
    diagram: `┌──────────────────┐
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
└──────────────────┘`
  },

  {
    id: "databricks-pipeline",
    title: "Databricks Analytics Pipeline",
    description: `A simplified diagram of the bronze → silver → gold model used for financial
analytics pipelines in PySpark.`,
    diagram: `┌──────────────────────┐
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
└──────────────────────┘`
  },

  {
    id: "le-minou-booking",
    title: "Le Minou Booking Flow",
    description: `A small product diagram showing how users move through the booking experience on
my pet‑sitting site, Le Minou.`,
    diagram: `┌────────────────────────┐
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
└──────────────────────┘`
  },

  {
    id: "save-bank-account",
    title: "Save Bank Account Endpoint",
    description: `A diagram showing the flow of a bank‑account‑save request, matching the Spring
Boot example in my code samples.`,
    diagram: `┌────────────────────────┐
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
└──────────────────────┘`
  }
];
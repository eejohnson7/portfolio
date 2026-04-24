export const projects = [
  {
    id: "payout-job-revamp",
    title: "Payout Job Revamp",
    stack: ["Java", "Spring Boot", "Kafka", "SQL", "Splunk"],
    description: `A major initiative to stabilize and redesign the payout job responsible for disbursing funds to thousands of veterinary practices.`,
    bullets: [
      "Investigated intermittent payout failures using distributed logs and historical traces.",
      "Refactored SQL queries to reduce unnecessary scanning and eliminate edge‑case inconsistencies.",
      "Added asynchronous retry logic with structured logging to recover from transient DB failures.",
      "Reduced operational noise and increased payout success rates by addressing failure modes across data, query, and retry layers."
    ],
    details: {
      longDescription: `A deeper look at how I redesigned the payout pipeline to improve reliability, correctness, and operational clarity across distributed financial systems.`,
      diagrams: [],
      architectureNotes: "",
      codeSamples: []
    }
  },

  {
    id: "account-updater",
    title: "Account Updater",
    stack: ["Java", "Spring Boot", "MongoDB", "Cybersource"],
    description: `A two‑stage batch workflow that identifies expired customer cards and refreshes them through a third‑party Account Updater service.`,
    bullets: [
      "Designed a MongoDB aggregation pipeline to accurately select valid‑but‑expired cards.",
      "Built coordinated outbound and inbound batch jobs for file generation and ingestion.",
      "Implemented guardrails to prevent incorrect updates or partial state transitions.",
      "Added structured logging and monitoring to simplify debugging and improve observability.",
      "Improved recurring billing reliability by ensuring card‑on‑file data stayed up‑to‑date."
    ],
    details: {
      longDescription: `A full breakdown of how the Account Updater workflow was designed, validated, and deployed to keep customer payment data fresh and reduce billing failures.`,
      diagrams: [],
      architectureNotes: "",
      codeSamples: []
    }
  },

  {
    id: "bank-account-validation-card",
    title: "Bank Account Validation Card",
    stack: ["Java", "Spring Boot", "React", "TypeScript", "GraphQL", "SQL"],
    description: `A full‑stack feature that validates routing and account numbers, provides clear user feedback, and ensures safe onboarding of financial information.`,
    bullets: [
      "Designed the API contracts, GraphQL queries, and mutations for validating routing and account numbers.",
      "Implemented backend validation logic in a Spring Boot microservice, including error handling and safe state transitions.",
      "Built the React + TypeScript UI from Figma designs, including form handling, validation states, and user‑friendly error messaging.",
      "Created secure data flows between frontend and backend, ensuring sensitive banking information was handled safely.",
      "Improved reliability and clarity of the financial onboarding experience by tightening validation rules and simplifying the user journey."
    ],
    details: {
      longDescription: `A deeper narrative on how I built a secure, user‑friendly financial onboarding flow that validates routing and account numbers across frontend and backend layers.`,
      diagrams: [
          {
            title: "Save Bank Account Endpoint",
            description: `A diagram showing the flow of a bank‑account‑save request, matching the Spring Boot example in my code samples.`,
            diagram: `        ┌────────────────────────┐
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
      ],
      architectureNotes: "",
      codeSamples: [
        {
          title: "Save Bank Account Endpoint",
          description: `This example shows how I typically structure financial‑workflow endpoints. It includes validation, tokenization, safe persistence, and a clean response shape without exposing sensitive details.`,
          code: `@RestController
@RequestMapping("/api/bank")
public class BankAccountController {

    private final BankAccountService service;
    private final TokenizationService tokenization;
    private final RoutingNumberValidator validator;

    public BankAccountController(
            BankAccountService service,
            TokenizationService tokenization,
            RoutingNumberValidator validator
    ) {
        this.service = service;
        this.tokenization = tokenization;
        this.validator = validator;
    }

    @PostMapping("/accounts")
    public ResponseEntity<BankAccountResponse> saveAccount(
            @RequestBody BankAccountRequest request
    ) {

        if (!validator.isValid(request.routingNumber())) {
            return ResponseEntity.badRequest().body(
                new BankAccountResponse("Invalid routing number")
            );
        }

        String token = tokenization.tokenize(request.accountNumber());

        BankAccount saved = service.save(
            new BankAccount(
                request.accountHolder(),
                request.routingNumber(),
                token
            )
        );

        String masked = "****" + request.accountNumber()
                .substring(request.accountNumber().length() - 4);

        return ResponseEntity.ok(
            new BankAccountResponse(
                saved.getId(),
                saved.getAccountHolder(),
                masked
            )
        );
    }
}`
        }
      ]
    }
  },

  {
    id: "financial-analytics-pipeline",
    title: "Financial Analytics Pipeline",
    stack: ["PySpark", "Azure Databricks", "Java", "Spring Boot", "SQL", "PowerBI"],
    description: `A distributed analytics pipeline used to process high‑volume financial transactions, enrich them with metadata, and power real‑time reporting dashboards.`,
    bullets: [
      "Built PySpark pipelines in Azure Databricks to process and validate millions of financial records with SQL‑style transformations.",
      "Designed bronze → silver → gold data layers to ensure clean separation of raw, validated, and curated datasets.",
      "Implemented enrichment logic joining transactional data with account metadata to support downstream reporting models.",
      "Developed Java + Spring Boot services to expose curated analytics data to internal systems and dashboards.",
      "Delivered Power BI dashboards used by finance and operations teams for real‑time visibility into revenue, payouts, and regional performance.",
      "Improved reliability and traceability by adding structured logging, data‑quality checks, and validation rules across the pipeline."
    ],
    details: {
      longDescription: `A full case study of how I designed and delivered a distributed analytics pipeline powering financial reporting across Databricks, Spring Boot, and Power BI.`,
      diagrams: [
          {
    id: "databricks-pipeline",
    title: "Databricks Analytics Pipeline",
    description: `A simplified diagram of the bronze → silver → gold model used for financial analytics pipelines in PySpark.`,
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
  }
      ],
      architectureNotes: "",
      codeSamples: [
        {
          title: "Financial Analytics Pipeline (PySpark, Databricks)",
          description: `This example shows how I typically structured analytics pipelines in Databricks. It reads raw financial 
transactions, applies SQL‑style transformations, and writes enriched data to a curated layer used by reporting dashboards.`,
          code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp, round

spark = SparkSession.builder.getOrCreate()

raw_df = (
    spark.read.format("delta")
    .load("/mnt/bronze/transactions")
)

clean_df = (
    raw_df
    .filter(col("amount").isNotNull())
    .withColumn("amount", round(col("amount"), 2))
    .withColumn("processed_at", current_timestamp())
)

accounts_df = (
    spark.read.format("delta")
    .load("/mnt/silver/accounts")
)

enriched_df = (
    clean_df.join(accounts_df, "account_id", "left")
    .select(
        "transaction_id",
        "account_id",
        "amount",
        "currency",
        "region",
        "timestamp",
        "processed_at"
    )
)

(
    enriched_df.write.format("delta")
    .mode("overwrite")
    .save("/mnt/silver/transactions_enriched")
)`
        }
      ]
    }
  },

  {
    id: "service-selector",
    title: "Le Minou Service Selector",
    stack: ["React", "Typescript"],
    description: `A small UI pattern from Le Minou that lets users choose a care option. It focuses on simple state, soft styling, and a calm, editorial feel.`,
    bullets: [
  "Designed a clean, editorial UI component that lets users choose between pet‑care services with immediate visual feedback and minimal cognitive load.",
  "Implemented simple, predictable state management using React hooks to keep the interaction lightweight and intuitive.",
  "Built soft, brand‑aligned styling that reflects Le Minou’s calm, warm aesthetic through subtle borders, muted tones, and gentle hover/selection states.",
  "Ensured accessibility and clarity by using semantic buttons, clear labels, and high‑contrast selection indicators.",
  "Created a reusable UI pattern that can be extended to additional services, pricing tiers, or booking flows without redesigning the component.",
  "Improved the booking experience by making service selection a fast, frictionless first step that guides users into the full request form."
],
    details: {
      longDescription: `A small UI component that demonstrates clean state management, soft styling, and a calm, editorial feel for a pet‑care booking flow.`,
      diagrams: [
        {
          title: "Le Minou Booking Flow",
          description: `A small product diagram showing how users move through the booking experience on my pet‑sitting site, Le Minou.`,
          diagram: `      ┌────────────────────────┐
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
        }
      ],
      architectureNotes: "",
      codeSamples: [
        {
          title: "Service Selector (React)",
          description: `A small UI pattern from Le Minou that lets users choose a care option. It focuses on simple state, soft styling, and a calm, editorial feel.`,
          code: `import { useState } from "react";

export default function ServiceSelector() {
  const [choice, setChoice] = useState(null);

  const services = [
    { id: "dropin", label: "Drop‑In Visit", price: "$22" },
    { id: "walk", label: "Dog Walk", price: "$35" }
  ];

  return (
    <div style={{ maxWidth: 360, padding: "1.25rem", borderRadius: 12, background: "#F8F3F2", border: "1px solid #E6DAD8" }}>
      <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Choose a Service</h3>

      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => setChoice(s.id)}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            marginBottom: "0.5rem",
            borderRadius: 8,
            border: choice === s.id ? "2px solid #7A4E4A" : "1px solid #D8C8C6",
            background: choice === s.id ? "#EFE7E6" : "white",
            textAlign: "left",
            cursor: "pointer"
          }}
        >
          {s.label} <span style={{ opacity: 0.7 }}>· {s.price}</span>
        </button>
      ))}

      {choice && (
        <p style={{ marginTop: "1rem" }}>
          Selected: <strong>{services.find((s) => s.id === choice)?.label}</strong>
        </p>
      )}
    </div>
  );
}`
        }
      ]
    }
  }
];
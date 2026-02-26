export default function CodeSamples() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Code Samples</h1>

      <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
        A small collection of examples that reflect how I approach engineering. I like
        building systems that are clear, reliable, and easy for other people to work
        with. Most of my work sits in backend services, data pipelines, and small UI
        patterns that make larger products feel consistent.
      </p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Kafka Consumer for Financial Events (Java + Spring Boot)
        </h2>
        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
        </p>

        <pre
          style={{
            background: "#f7f7f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
          }}
        >
{`public class FinancialEventConsumer {

    private final ObjectMapper mapper;
    private final FinancialEventValidator validator;
    private final FinancialEventService service;

    public FinancialEventConsumer(
            ObjectMapper mapper,
            FinancialEventValidator validator,
            FinancialEventService service
    ) {
        this.mapper = mapper;
        this.validator = validator;
        this.service = service;
    }

    @KafkaListener(
        topics = "financial-events",
        groupId = "financial-events-worker",
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(String message) throws Exception {
        FinancialEvent event = mapper.readValue(message, FinancialEvent.class);

        if (!validator.isValid(event)) {
            // let Kafka commit and move on
            return;
        }

        try {
            service.process(event);
        } catch (Exception e) {
            // rethrow so Kafka retries the message
            throw e;
        }
    }
}`}
        </pre>
        <pre
          style={{
            background: "#f7f7f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
          }}
        >
{`public class FinancialEventValidator {
    public boolean isValid(FinancialEvent event) {
        return event.id() != null
            && event.accountId() != null
            && event.amount() != null
            && event.amount() > 0;
    }
}`}
        </pre>

        <p style={{ marginTop: "0.75rem", fontStyle: "italic" }}>
          Highlights: Clear separation of concerns, predictable error handling for Kafka retries, and simple validation 
          logic that keeps the consumer focused on its core responsibility.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Bank Account Endpoint (Java + Spring Boot)
        </h2>
        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          This example shows how I typically structure financial‑workflow endpoints. It includes validation, tokenization, 
          safe persistence, and a clean response shape without exposing sensitive details.
        </p>

        <pre
          style={{
            background: "#f7f7f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
          }}
        >
{`@RestController
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
}`}
        </pre>

        <p style={{ marginTop: "0.75rem", fontStyle: "italic" }}>
          Highlights: validation, tokenization, safe response shaping, and predictable API design.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Financial Analytics Pipeline (Pyspark on Databricks)
        </h2>
        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          This example shows how I typically structured analytics pipelines in Databricks. It reads raw financial 
          transactions, applies SQL‑style transformations, and writes enriched data to a curated layer used by reporting 
          dashboards.
        </p>

        <pre
          style={{
            background: "#f7f7f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
          }}
        >
{`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp, round

spark = SparkSession.builder.getOrCreate()

# Read raw transactions from the bronze layer
raw_df = (
    spark.read.format("delta")
    .load("/mnt/bronze/transactions")
)

# Basic validation and cleanup
clean_df = (
    raw_df
    .filter(col("amount").isNotNull())
    .withColumn("amount", round(col("amount"), 2))
    .withColumn("processed_at", current_timestamp())
)

# Enrich with account metadata
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

# Write to the silver layer for downstream reporting
(
    enriched_df.write.format("delta")
    .mode("overwrite")
    .save("/mnt/silver/transactions_enriched")
)`}
        </pre>

        <p style={{ marginTop: "0.75rem", fontStyle: "italic" }}>
          Highlights: distributed processing, SQL‑style transformations, data validation, and curated‑layer design for analytics.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          Le Minou Service Selector (React)
        </h2>
        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
          A small UI pattern from Le Minou that lets users choose a care option. It focuses on simple state, soft styling, and a calm, editorial feel.
        </p>

        <pre
          style={{
            background: "#f7f7f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
          }}
        >
{`import { useState } from "react";

export default function ServiceSelector() {
  const [choice, setChoice] = useState(null);

  const services = [
    { id: "dropin", label: "Drop‑In Visit", price: "$22" },
    { id: "overnight", label: "Overnight Stay", price: "$65" }
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
}`}
        </pre>

        <p style={{ marginTop: "0.75rem", fontStyle: "italic" }}>
          Highlights: Soft, editorial design; simple, predictable state management; and a focus on calm, intentional user experience.
        </p>
      </section>
    </div>
  );
}
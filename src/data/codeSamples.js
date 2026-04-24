export const codeSamples = [
  {
    id: "kafka-consumer",
    title: "Kafka Consumer for Financial Events",
    stack: "Java + Spring Boot",
    description: `A Kafka consumer built with Java and Spring Boot that processes high‑volume financial events in real time. 
It validates incoming messages, applies idempotent business logic, and updates downstream accounting systems 
with predictable, fault‑tolerant behavior. Designed for clarity, auditability, and stable performance across 
distributed workflows.`,
    code: `public class FinancialEventConsumer {
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
            return;
        }

        try {
            service.process(event);
        } catch (Exception e) {
            throw e;
        }
    }
}`,
    extraCode: `public class FinancialEventValidator {
    public boolean isValid(FinancialEvent event) {
        return event.id() != null
            && event.accountId() != null
            && event.amount() != null
            && event.amount() > 0;
    }
}`
  },

  {
    id: "bank-endpoint",
    title: "Bank Account Endpoint",
    stack: "Java + Spring Boot",
    description: `This example shows how I typically structure financial‑workflow endpoints. It includes validation, tokenization, 
safe persistence, and a clean response shape without exposing sensitive details.`,
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
  },

  {
    id: "pyspark-pipeline",
    title: "Financial Analytics Pipeline",
    stack: "PySpark on Databricks",
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
  },

  {
    id: "service-selector",
    title: "Le Minou Service Selector",
    stack: "React",
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
];
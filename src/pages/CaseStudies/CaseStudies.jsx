import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function CaseStudies() {
  const items = [
    {
      title: "Account Updater",
      path: "/case-studies/account-updater",
      description: "Improving recurring billing reliability by reducing declines and modernizing the update flow."
    },
    {
      title: "Le Minou Booking Flow",
      path: "/case-studies/le-minou",
      description: "Designing a calm, intentional booking experience for a pet‑sitting service."
    },
    {
      title: "Databricks Pipeline Stabilization",
      path: "/case-studies/databricks-pipeline",
      description: "Restructuring SQL + PySpark transformations for predictable, traceable analytics."
    },
    {
      title: "Payout Job Failure Fix",
      path: "/case-studies/payout-job-failure",
      description: "Diagnosing and resolving a recurring payout failure through scoped SQL and async retries."
    }
  ];

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <Typography
          sx={{
            color: "#980061",
            fontSize: "2.75rem",
          }}
        >
          Case Studies
        </Typography>

      <p style={{ marginBottom: "2.75rem", lineHeight: "1.6", fontSize: "1.5rem"}}>
        A set of short, structured walkthroughs of problems I’ve solved in production
        systems. Each case study is presented as a folder you can open.
      </p>

      <div
        style={{
          display: "grid",
          gap: "2.75rem",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #980061",
                borderRadius: "8px",
                background: "#FFDBE9",
                padding: "1rem",
                position: "relative",
                transition: "box-shadow 0.2s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
              }}
            >
              {/* Folder tab */}
              <div
                style={{
                  position: "absolute",
                  top: "-23px",
                  left: "12px",
                  background: "#FFDBE9",
                  padding: "4px 10px",
                  borderRadius: "4px 4px 0 0",
                  fontSize: "0.8rem",
                  border: "1px solid #980061",
                  borderBottom: "none"
                }}
              >
                {item.title}
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>
                  {item.title}
                </p>
                <p style={{ opacity: 0.7, fontSize: "1.5rem", lineHeight: "1.4" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Resume() {
  return (
    <Box
      sx={{
        padding: "4rem 2rem",
        paddingBottom: "80px",
        color: "#2A0017",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      {/* PDF LINKS */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
        <Typography
          component="a"
          href="/Erin_Johnson.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            color: "#980061",
            fontSize: "1.1rem",
            "&:hover": { opacity: 0.8 }
          }}
        >
          US PDF
        </Typography>

        <Typography
          component="a"
          href="/Erin_E_Johnson.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            color: "#980061",
            fontSize: "1.1rem",
            "&:hover": { opacity: 0.8 }
          }}
        >
          EU/UK PDF
        </Typography>
      </Box>

      {/* TWO-COLUMN GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: 6
        }}
      >
        {/* LEFT COLUMN */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Contact */}
          <Box>
            <Typography sx={{ color: "#980061", fontSize: "2.25rem" }}>
              Contact
            </Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>
              Chicago, IL, USA — Open to relocation
            </Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>
              eejohnson322@gmail.com
            </Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>
              +1‑318‑381‑0587
            </Typography>
          </Box>

          <Divider />

          {/* Languages */}
          <Box>
            <Typography sx={{ color: "#980061", fontSize: "2.25rem" }}>
              Languages
            </Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>English (native)</Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>French (basic)</Typography>
          </Box>

          <Divider />

          {/* Technical Toolbox */}
          <Box>
            <Typography sx={{ color: "#980061", fontSize: "2.25rem" }}>
              Technical Toolbox
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>
              Programming Languages
            </Typography>
            <Typography sx={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
              Python, Java, JavaScript/TypeScript, SQL
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>
              Backend & Services
            </Typography>
            <Typography sx={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
              Node, Express, Spring Boot, REST APIs, GraphQL, Microservices,
              JUnit, Gradle, Hibernate
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>Frontend & UI</Typography>
            <Typography sx={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
              React, Material UI, Bootstrap, HTML, CSS
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>
              Distributed Systems & Data Pipelines
            </Typography>
            <Typography sx={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
              Kafka, PySpark, Azure Databricks, high‑volume data processing, SQL
              optimization
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>Cloud & DevOps</Typography>
            <Typography sx={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
              AWS (EC2/S3), Docker, CI/CD (Azure Pipelines, Harness, GitHub
              Actions)
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>
              Observability & Tooling
            </Typography>
            <Typography sx={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
              Splunk, Power BI, Postman, Git/GitHub/GitLab, Jira, Confluence
            </Typography>

            <Typography sx={{ fontSize: "1.5rem" }}>Databases</Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>
              MySQL, MongoDB, DynamoDB, Firebase, Snowflake, XML (schema & data
              modeling)
            </Typography>
          </Box>

          <Divider />

          {/* Education */}
          <Box>
            <Typography sx={{ color: "#980061", fontSize: "2.25rem" }}>
              Education
            </Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>
              Louisiana State University (LSU)
            </Typography>
            <Typography sx={{ fontSize: "1.25rem" }}>
              B.S., Computer Science — Software Engineering
            </Typography>
          </Box>
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Summary */}
          <Box>
            <Typography sx={{ color: "#980061", fontSize: "2.25rem" }}>
              Professional Summary
            </Typography>

            <Box
              component="pre"
              sx={{
                background: "#FFDBE9",
                padding: "1rem",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: 1.6
              }}
            >
{`Software engineer with 3+ years of experience building and scaling high‑impact, production‑grade systems across React, Node.js, Java, and cloud platforms. Proven track record of owning features end‑to‑end, modernizing backend architectures, and delivering data‑driven solutions used across core financial workflows. Recognized for translating complex technical problems into reliable, scalable systems, improving performance, developer efficiency, and user experience across distributed teams and mission‑critical applications.`}
            </Box>
          </Box>

          <Divider />

          {/* Experience */}
          <Box>
            <Typography sx={{ color: "#980061", fontSize: "2.25rem" }}>
              Professional Experience
            </Typography>

            {/* Covetrus SE II */}
            <Box
              component="pre"
              sx={{
                background: "#FFDBE9",
                padding: "1rem",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: 1.6
              }}
            >
{`Software Engineer II — Covetrus (Remote)
Mar 2024 – Aug 2025

• Delivered full‑stack features across React, Node.js, and Spring Boot, collaborating with product, UX, and QA to ship scalable functionality that strengthened core payment and reporting workflows.
• Built real‑time analytics pipelines in PySpark on Azure Databricks, reducing reporting latency and powering new dashboards in Power BI and React.
• Executed backend refactoring that reduced code complexity by ~60% and improved reliability of high‑volume accounting pipelines.
• Maintained production Kafka workflows supporting tax, fraud, and payout systems.
• Eliminated a recurring payout job failure using SQL query refactoring and Java asynchronous retry logic with exponential backoff.
• Performed targeted QA on peer features, identifying regressions and validating edge cases.`}
            </Box>

            {/* Covetrus SE I */}
            <Box
              component="pre"
              sx={{
                background: "#FFDBE9",
                padding: "1rem",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                marginTop: "1.5rem"
              }}
            >
{`Software Engineer I — Covetrus (Remote)
Jan 2023 – Mar 2024

• Delivered end‑to‑end features using React, Node.js, Python, and Spring Boot, deploying via Azure DevOps and Harness.
• Created Splunk dashboards for payments and orders, reducing incident response time by 30%.
• Led microservice integration with Visa Account Updater.`}
            </Box>

            {/* Covetrus Intern */}
            <Box
              component="pre"
              sx={{
                background: "#FFDBE9",
                padding: "1rem",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                marginTop: "1.5rem"
              }}
            >
{`Software Engineer Intern — Covetrus (Remote)
May 2022 – Aug 2022

• Built secure TypeScript/React banking‑info forms from Figma mockups.
• Developed GraphQL queries and Spring Boot REST endpoints.
• Participated in Agile ceremonies and delivered all sprint commitments.`}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Resume;
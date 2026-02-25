import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Resume() {
  return (
    <Box
      sx={{
        padding: "4rem 2rem",
        paddingBottom: "80px", // prevents bottom nav overlap
        color: "#333",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      {/* PDF LINKS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 3,
          marginBottom: "2rem"
        }}
      >
        <Typography
          component="a"
          href="/Erin_Johnson.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            color: "#980061",
            fontWeight: 600,
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
            fontWeight: 600,
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
            <Typography
              sx={{
                color: "#980061",
                fontWeight: 600,
                fontSize: "1.25rem",
                marginBottom: "0.5rem"
              }}
            >
              Contact
            </Typography>
            <Typography>Chicago, IL, USA</Typography>
            <Typography>Open to relocation in EU/UK</Typography>
            <Typography>eejohnson322@gmail.com</Typography>
            <Typography>+1‑318‑381‑0587</Typography>
          </Box>

          <Divider />

          {/* Languages */}
          <Box>
            <Typography
              sx={{
                color: "#980061",
                fontWeight: 600,
                fontSize: "1.25rem",
                marginBottom: "0.5rem"
              }}
            >
              Languages
            </Typography>
            <Typography>English (native)</Typography>
            <Typography>French (basic)</Typography>
          </Box>

          <Divider />

          {/* Technical Toolbox */}
          <Box>
            <Typography
              sx={{
                color: "#980061",
                fontWeight: 600,
                fontSize: "1.25rem",
                marginBottom: "0.5rem"
              }}
            >
              Technical Toolbox
            </Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Programming Languages
            </Typography>
            <Typography>Python, Java, JavaScript/TypeScript, SQL</Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Backend & Services
            </Typography>
            <Typography>
              Node.js, Express, Spring Boot, REST APIs, GraphQL, Microservices, JUnit, Gradle, Hibernate
            </Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Frontend & UI
            </Typography>
            <Typography>React, Material UI, Bootstrap, HTML, CSS</Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Distributed Systems & Data Pipelines
            </Typography>
            <Typography>
              Kafka, PySpark, Azure Databricks, high‑volume data processing, SQL optimization
            </Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Cloud & DevOps
            </Typography>
            <Typography>
              AWS (EC2/S3), Docker, CI/CD (Azure Pipelines, Harness, GitHub Actions)
            </Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Observability & Tooling
            </Typography>
            <Typography>
              Splunk, Power BI, Postman, Git/GitHub/GitLab, Jira, Confluence
            </Typography>

            <Typography sx={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Databases
            </Typography>
            <Typography>MySQL, MongoDB, DynamoDB, Firebase, Snowflake, XML (schema & data modeling)</Typography>
          </Box>

          <Divider />

          {/* Education */}
          <Box>
            <Typography
              sx={{
                color: "#980061",
                fontWeight: 600,
                fontSize: "1.25rem",
                marginBottom: "0.5rem"
              }}
            >
              Education
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              Louisiana State University (LSU)
            </Typography>
            <Typography>B.S., Computer Science — Software Engineering</Typography>
          </Box>
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          
          {/* Summary */}
          <Box>
            <Typography
              sx={{
                color: "#980061",
                fontWeight: 600,
                fontSize: "1.75rem",
                marginBottom: "0.75rem"
              }}
            >
              Professional Summary
            </Typography>
            <Typography sx={{ lineHeight: 1.6 }}>
              Software engineer with 3+ years of experience building and scaling high‑impact,
              production‑grade systems across React, Node.js, Java, and cloud platforms.
              Proven track record of owning features end‑to‑end, modernizing backend
              architectures, and delivering data‑driven solutions used across core financial
              workflows. Recognized for translating complex technical problems into reliable,
              scalable systems, improving performance, developer efficiency, and user
              experience across distributed teams and mission‑critical applications.
            </Typography>
          </Box>

          <Divider />

          {/* Experience */}
          <Box>
            <Typography
              sx={{
                color: "#980061",
                fontWeight: 600,
                fontSize: "1.75rem",
                marginBottom: "0.75rem"
              }}
            >
              Professional Experience
            </Typography>

            {/* Covetrus SE II */}
            <Box sx={{ marginBottom: "1.5rem" }}>
              <Typography sx={{ fontWeight: 600 }}>
                Software Engineer II — Covetrus (Remote)
              </Typography>
              <Typography sx={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
                Mar 2024 – Aug 2025
              </Typography>

              <Box sx={{ lineHeight: 1.6 }}>
                <Typography>• Delivered full‑stack features across React, Node.js, and Spring Boot, collaborating with product, UX, and QA to ship scalable functionality that strengthened core payment and reporting workflows.</Typography>
                <Typography>• Built real‑time analytics pipelines in PySpark on Azure Databricks, reducing reporting latency and powering new dashboards in Power BI and React.</Typography>
                <Typography>• Executed backend refactoring that reduced code complexity by ~60% and improved reliability of high‑volume accounting pipelines.</Typography>
                <Typography>• Maintained production Kafka workflows supporting tax, fraud, and payout systems.</Typography>
                <Typography>• Eliminated a recurring payout job failure using SQL query refactoring and Java asynchronous retry logic with exponential backoff.</Typography>
                <Typography>• Performed targeted QA on peer features, identifying regressions and validating edge cases.</Typography>
              </Box>
            </Box>

            {/* Covetrus SE I */}
            <Box sx={{ marginBottom: "1.5rem" }}>
              <Typography sx={{ fontWeight: 600 }}>
                Software Engineer I — Covetrus (Remote)
              </Typography>
              <Typography sx={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
                Jan 2023 – Mar 2024
              </Typography>

              <Box sx={{ lineHeight: 1.6 }}>
                <Typography>• Delivered end‑to‑end features using React, Node.js, Python, and Spring Boot, deploying via Azure DevOps and Harness.</Typography>
                <Typography>• Created Splunk dashboards for payments and orders, reducing incident response time by 30%.</Typography>
                <Typography>• Led microservice integration with Visa Account Updater.</Typography>
              </Box>
            </Box>

            {/* Covetrus Intern */}
            <Box sx={{ marginBottom: "1.5rem" }}>
              <Typography sx={{ fontWeight: 600 }}>
                Software Engineer Intern — Covetrus (Remote)
              </Typography>
              <Typography sx={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
                May 2022 – Aug 2022
              </Typography>

              <Box sx={{ lineHeight: 1.6 }}>
                <Typography>• Built secure TypeScript/React banking‑info forms from Figma mockups.</Typography>
                <Typography>• Developed GraphQL queries and Spring Boot REST endpoints.</Typography>
                <Typography>• Participated in Agile ceremonies and delivered all sprint commitments.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Resume;
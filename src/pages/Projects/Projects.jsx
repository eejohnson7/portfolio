import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import CodeBox from "../../components/CodeBox";
import { projects } from "../../data/projectsData";

export default function Projects() {
  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      
      <Typography variant="h2" sx={{ mb: "1rem" }}>
        Projects
      </Typography>

      <Typography sx={{ mb: "2rem" }}>
        A selection of backend and data‑focused engineering projects that highlight how I approach 
        reliability, clarity, and system design in financial workflows.
      </Typography>

      {/* 2‑column responsive grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr"
          },
          gap: "1.5rem"
        }}
      >
        {projects.map((proj) => (
          <Link 
            key={proj.id}
            to={`/projects/${proj.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CodeBox
              sx={{
                height: "100%",
                padding: "1rem",
                fontSize: "0.85rem"
              }}
            >
              <Typography variant="h3" sx={{ mb: "0.5rem", fontSize: "1.25rem" }}>
                {proj.title}
              </Typography>

              <Typography sx={{ mb: "0.75rem", opacity: 0.8, fontSize: "0.9rem" }}>
                {proj.stack.join(" · ")}
              </Typography>

              <Typography sx={{ mb: "1rem", fontSize: "0.95rem" }}>
                {proj.description}
              </Typography>

              <Typography sx={{ mt: "1rem", fontWeight: 600 }}>
                → View Project
              </Typography>
            </CodeBox>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
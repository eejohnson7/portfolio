import { Typography } from "@mui/material";
import { designDocs } from "../data/designDocs";
import CodeBox from "../components/CodeBox";

export default function DesignDocs() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      
      <Typography variant="h2" sx={{ mb: "1rem" }}>
        Design Docs
      </Typography>

      <Typography sx={{ mb: "2rem" }}>
        A collection of lightweight architecture diagrams and design notes. These reflect
        how I think about systems: clear boundaries, predictable data flow, and intentional
        decision‑making. Each diagram is a simplified, portfolio‑safe representation of
        structures I’ve built in financial systems, analytics pipelines, and small product
        experiences like Le Minou.
      </Typography>

      {designDocs.map(doc => (
        <section key={doc.id} style={{ marginBottom: "3rem" }}>
          
          <Typography
            variant="h3"
          >
            {doc.title}
          </Typography>

          <Typography>
            {doc.description}
          </Typography>

          <CodeBox code>
            {doc.diagram}
          </CodeBox>

        </section>
      ))}
    </div>
  );
}
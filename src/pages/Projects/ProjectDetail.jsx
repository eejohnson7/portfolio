import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import CodeBox from "../../components/CodeBox";
import SoftAccordion from "../../components/SoftAccordion";
import SoftTabs from "../../components/SoftTabs";
import useProject from "../../hooks/useProject";
import { useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  const [diagramTab, setDiagramTab] = useState(0);
  const [codeTab, setCodeTab] = useState(0);

  if (loading) {
    return (
      <Box sx={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <Typography>Loading…</Typography>
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <Typography variant="h2">Project Not Found</Typography>
        <Typography sx={{ mt: "1rem" }}>
          The project you're looking for doesn't exist or has been moved.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>

      {/* Title */}
      <Typography variant="h2" sx={{ mb: "0.25rem" }}>
        {project.title}
      </Typography>

      {/* Stack */}
      <Typography sx={{ mb: "2rem", opacity: 0.7 }}>
        {project.stack.join(" · ")}
      </Typography>

      {/* Quick Summary */}
      <Typography variant="h3" sx={{ mb: "0.75rem" }}>
        Quick Summary
      </Typography>
      <Typography sx={{ mb: "2rem", lineHeight: 1.7 }}>
        {project.description}
      </Typography>

      {/* Overview */}
      <SoftAccordion title="Overview">
        <Typography sx={{ lineHeight: 1.7 }}>
          {project.long_description}
        </Typography>
      </SoftAccordion>

      {/* Key Contributions */}
      <SoftAccordion title="Key Contributions">
        {project.bullets.map((b, i) => (
          <Box key={i} sx={{ display: "flex", mb: "0.5rem" }}>
            <Typography sx={{ mr: "0.5rem", color: "#980061" }}>•</Typography>
            <Typography sx={{ lineHeight: 1.6 }}>{b}</Typography>
          </Box>
        ))}
      </SoftAccordion>

      {/* Diagrams */}
      <SoftAccordion title="Architecture Diagrams">
        <SoftTabs
          value={diagramTab}
          onChange={(e, v) => setDiagramTab(v)}
          labels={project.diagrams.map(d => d.title || "Diagram")}
        />

        {project.diagrams.map((d, i) =>
          i === diagramTab ? (
            <Box key={i} sx={{ mb: "2rem" }}>
              {d.description && (
                <Typography sx={{ mb: "0.75rem", opacity: 0.85 }}>
                  {d.description}
                </Typography>
              )}
              <CodeBox code>{d.diagram}</CodeBox>
            </Box>
          ) : null
        )}
      </SoftAccordion>

      {/* Code Samples */}
      <SoftAccordion title="Code Samples">
        <SoftTabs
          value={codeTab}
          onChange={(e, v) => setCodeTab(v)}
          labels={project.codeSamples.map(s => s.title || "Snippet")}
        />

        {project.codeSamples.map((s, i) =>
          i === codeTab ? (
            <Box key={i} sx={{ mb: "2rem" }}>
              {s.description && (
                <Typography sx={{ mb: "0.75rem", opacity: 0.85 }}>
                  {s.description}
                </Typography>
              )}
              <CodeBox code>{s.code}</CodeBox>
            </Box>
          ) : null
        )}
      </SoftAccordion>
    </Box>
  );
}

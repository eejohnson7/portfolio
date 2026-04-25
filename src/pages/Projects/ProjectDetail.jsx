import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import CodeBox from "../../components/CodeBox";
import useProject from "../../hooks/useProjects";

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  if (loading) {
    return (
      <Box sx={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <Typography>Loading project…</Typography>
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
      <Typography variant="h2" sx={{ mb: "0.5rem" }}>
        {project.title}
      </Typography>

      {/* Stack */}
      <Typography sx={{ mb: "1.5rem", opacity: 0.8 }}>
        {project.stack.join(" · ")}
      </Typography>

      {/* Long Description */}
      <CodeBox>
        <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          {project.long_description || project.description}
        </Typography>
      </CodeBox>

      {/* Key Contributions */}
      <Box sx={{ mt: "2rem" }}>
        <Typography variant="h3" sx={{ mb: "0.75rem" }}>
          Key Contributions
        </Typography>

        {project.bullets.map((b, i) => (
          <Box key={i} sx={{ display: "flex", mb: "0.5rem" }}>
            <Typography sx={{ mr: "0.5rem", color: "#980061" }}>•</Typography>
            <Typography sx={{ lineHeight: 1.6 }}>{b}</Typography>
          </Box>
        ))}
      </Box>

      {/* Diagrams */}
      {project.diagrams.length > 0 && (
        <Box sx={{ mt: "2rem" }}>
          <Typography variant="h3" sx={{ mb: "0.75rem" }}>
            Architecture Diagrams
          </Typography>

          {project.diagrams.map((d, i) => (
            <Box key={i} sx={{ mb: "2rem" }}>
              {d.title && (
                <Typography variant="h4" sx={{ mb: "0.5rem" }}>
                  {d.title}
                </Typography>
              )}

              {d.description && (
                <Typography sx={{ mb: "0.75rem", fontSize: "1rem", opacity: 0.85 }}>
                  {d.description}
                </Typography>
              )}

              <CodeBox code>{d.diagram}</CodeBox>
            </Box>
          ))}
        </Box>
      )}

      {/* Code Samples */}
      {project.codeSamples.length > 0 && (
        <Box sx={{ mt: "2rem" }}>
          <Typography variant="h3" sx={{ mb: "0.75rem" }}>
            Code Samples
          </Typography>

          {project.codeSamples.map((snippet, i) => (
            <Box key={i} sx={{ mb: "2rem" }}>
              {snippet.title && (
                <Typography variant="h4" sx={{ mb: "0.5rem" }}>
                  {snippet.title}
                </Typography>
              )}

              {snippet.description && (
                <Typography sx={{ mb: "0.75rem", fontSize: "1rem", opacity: 0.85 }}>
                  {snippet.description}
                </Typography>
              )}

              <CodeBox code>{snippet.code}</CodeBox>
            </Box>
          ))}
        </Box>
      )}

      {/* Architecture Notes */}
      {project.architecture_notes && (
        <Box sx={{ mt: "2rem" }}>
          <Typography variant="h3" sx={{ mb: "0.75rem" }}>
            Architecture Notes
          </Typography>

          <CodeBox>
            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              {project.architecture_notes}
            </Typography>
          </CodeBox>
        </Box>
      )}
    </Box>
  );
}
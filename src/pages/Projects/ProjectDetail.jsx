import { useParams } from "react-router-dom";
import { projects } from "../../data/projectsData";
import { Typography, Box } from "@mui/material";
import CodeBox from "../../components/CodeBox";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
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
          {project.details?.longDescription || project.description}
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
        {project.details?.diagrams?.length > 0 && (
        <Box sx={{ mt: "2rem" }}>
            <Typography variant="h3" sx={{ mb: "0.75rem" }}>
            Architecture Diagrams
            </Typography>

            {project.details.diagrams.map((d, i) => (
            <Box key={i} sx={{ mb: "2rem" }}>
                
                {/* Title */}
                {d.title && (
                <Typography variant="h4" sx={{ mb: "0.5rem" }}>
                    {d.title}
                </Typography>
                )}

                {/* Description */}
                {d.description && (
                <Typography sx={{ mb: "0.75rem", fontSize: "1rem", opacity: 0.85 }}>
                    {d.description}
                </Typography>
                )}

                {/* Diagram */}
                <CodeBox code>
                {d.diagram}
                </CodeBox>
            </Box>
            ))}
        </Box>
        )}

        {/* Code Samples */}
        {project.details?.codeSamples?.length > 0 && (
        <Box sx={{ mt: "2rem" }}>
            <Typography variant="h3" sx={{ mb: "0.75rem" }}>
            Code Samples
            </Typography>

            {project.details.codeSamples.map((snippet, i) => (
            <Box key={i} sx={{ mb: "2rem" }}>
                
                {/* Title */}
                {snippet.title && (
                <Typography variant="h4" sx={{ mb: "0.5rem" }}>
                    {snippet.title}
                </Typography>
                )}

                {/* Description */}
                {snippet.description && (
                <Typography sx={{ mb: "0.75rem", fontSize: "1rem", opacity: 0.85 }}>
                    {snippet.description}
                </Typography>
                )}

                {/* Code */}
                <CodeBox code>
                {snippet.code}
                </CodeBox>
            </Box>
            ))}
        </Box>
        )}

      {/* Architecture Notes */}
      {project.details?.architectureNotes && (
        <Box sx={{ mt: "2rem" }}>
          <Typography variant="h3" sx={{ mb: "0.75rem" }}>
            Architecture Notes
          </Typography>

          <CodeBox>
            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              {project.details.architectureNotes}
            </Typography>
          </CodeBox>
        </Box>
      )}
    </Box>
  );
}
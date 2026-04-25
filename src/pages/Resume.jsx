import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PDFLinks from "../components/PDFLinks";
import CodeBox from "../components/CodeBox";
import useResume from "../hooks/useResume";

function Resume() {
  const {
    profile,
    languages,
    toolbox,
    education,
    experience,
    loading,
    error
  } = useResume();

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
      <PDFLinks />

      {/* Loading */}
      {loading && (
        <Typography sx={{ mt: 4, fontSize: "1.2rem" }}>
          Loading résumé…
        </Typography>
      )}

      {/* Error */}
      {error && (
        <Typography sx={{ mt: 4, color: "red" }}>
          Error loading résumé: {error}
        </Typography>
      )}

      {/* Only render content when loaded */}
      {!loading && !error && profile && (
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
              <Typography variant="h3">Contact</Typography>
              <Typography>{profile.location}</Typography>
              <Typography>{profile.email}</Typography>
              <Typography>{profile.phone}</Typography>
            </Box>

            <Divider />

            {/* Languages */}
            <Box>
              <Typography variant="h3">Languages</Typography>
              {languages.map((lang) => (
                <Typography key={lang.id}>
                  {lang.language_name}
                  {lang.proficiency ? ` (${lang.proficiency})` : ""}
                </Typography>
              ))}
            </Box>

            <Divider />

            {/* Technical Toolbox */}
            <Box>
              <Typography variant="h3">Technical Toolbox</Typography>

              {toolbox.map((section) => (
                <Box key={section.category} sx={{ mb: "1rem" }}>
                  <Typography variant="h4">{section.category}</Typography>
                  <Typography>{section.items.join(", ")}</Typography>
                </Box>
              ))}
            </Box>

            <Divider />

            {/* Education */}
            <Box>
              <Typography variant="h3">Education</Typography>
              {education.map((edu) => (
                <Box key={edu.id}>
                  <Typography>{edu.school}</Typography>
                  <Typography>{edu.degree}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* RIGHT COLUMN */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            
            {/* Summary */}
            <Box>
              <Typography variant="h3">Professional Summary</Typography>
              <CodeBox>{profile.summary}</CodeBox>
            </Box>

            <Divider />

            {/* Experience */}
            <Box>
              <Typography variant="h3">Professional Experience</Typography>

              {experience.map((role) => (
                <Box key={role.title} sx={{ mb: "1.5rem" }}>
                  <CodeBox>
                    <Typography variant="h4" sx={{ mb: "0.25rem" }}>
                      {role.title}
                    </Typography>

                    <Typography sx={{ mb: "1rem", fontWeight: 500 }}>
                      {role.dates}
                    </Typography>

                    <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                      {role.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: "0.5rem" }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CodeBox>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Resume;
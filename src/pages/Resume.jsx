import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PDFLinks from "../components/PDFLinks";
import PinkBox from "../components/CodeBox";

import {
  contact,
  languages,
  toolbox,
  education,
  summary,
  experience
} from "../data/resumeData";

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
      <PDFLinks />

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
            <Typography variant="h3">
              Contact
            </Typography>
            <Typography>{contact.location}</Typography>
            <Typography>{contact.email}</Typography>
            <Typography>{contact.phone}</Typography>
          </Box>

          <Divider />

          {/* Languages */}
          <Box>
            <Typography variant="h3">
              Languages
            </Typography>
            {languages.map((lang) => (
              <Typography key={lang}>{lang}</Typography>
            ))}
          </Box>

          <Divider />

          {/* Technical Toolbox */}
          <Box>
            <Typography variant="h3">
              Technical Toolbox
            </Typography>

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
            <Typography variant="h3">
              Education
            </Typography>
            <Typography>{education.school}</Typography>
            <Typography>{education.degree}</Typography>
          </Box>
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          
          {/* Summary */}
          <Box>
            <Typography variant="h3">Professional Summary</Typography>
            <PinkBox>{summary}</PinkBox>
          </Box>

          <Divider />

          {/* Experience */}
          <Box>
            <Typography variant="h3">Professional Experience</Typography>

            {experience.map((role) => (
              <Box key={role.title} sx={{ mb: "1.5rem" }}>
                <PinkBox>
                  <Typography variant="h4" sx={{ mb: "0.25rem" }}>
                    {role.title}
                  </Typography>

                  <Typography sx={{ mb: "1rem", fontWeight: 500 }}>
                    {role.dates}
                  </Typography>

                  <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                    {role.bullets.map((b, i) => (
                      <li key={i} style={{ mb: "0.5rem" }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </PinkBox>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Resume;
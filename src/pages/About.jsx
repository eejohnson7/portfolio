import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function About() {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "4rem 2rem",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}
    >
      {/* Header */}
      <Box>
        <Typography
          sx={{
            color: "#980061",
            fontWeight: 600,
            fontSize: "2.5rem",
            marginBottom: "0.5rem"
          }}
        >
          About Me
        </Typography>
        <Typography sx={{ fontSize: "1.25rem", lineHeight: 1.6 }}>
          I'm Erin — a software engineer with a focus on backend systems, 
          documentation clarity, and building reliable, intentional technical experiences.
        </Typography>
      </Box>

      <Divider />

      {/* Story */}
      <Box>
        <Typography
          sx={{
            color: "#980061",
            fontWeight: 600,
            fontSize: "1.75rem",
            marginBottom: "0.75rem"
          }}
        >
          My Path
        </Typography>
        <Typography sx={{ lineHeight: 1.7 }}>
          I started my engineering career at Covetrus, where I worked across 
          React, Node.js, Java, and distributed data systems. Over three years, 
          I delivered production features end‑to‑end, modernized backend 
          architectures, and built real‑time analytics pipelines powering 
          financial workflows used across the company.
        </Typography>
        <Typography sx={{ lineHeight: 1.7, marginTop: "1rem" }}>
          I’m drawn to roles where clarity, structure, and impact matter — 
          whether that’s designing a stable backend service, improving developer 
          workflows, or creating documentation that helps teams move faster.
        </Typography>
      </Box>

      <Divider />

      {/* What I care about */}
      <Box>
        <Typography
          sx={{
            color: "#980061",
            fontWeight: 600,
            fontSize: "1.75rem",
            marginBottom: "0.75rem"
          }}
        >
          What I Care About
        </Typography>

        <Box sx={{ lineHeight: 1.7 }}>
          <Typography>• Building systems that are stable, predictable, and easy to maintain.</Typography>
          <Typography>• Writing documentation that reduces ambiguity and accelerates teams.</Typography>
          <Typography>• Designing data workflows that are transparent and reliable.</Typography>
          <Typography>• Creating user experiences that feel intentional and uncluttered.</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Outside of work */}
      <Box>
        <Typography
          sx={{
            color: "#980061",
            fontWeight: 600,
            fontSize: "1.75rem",
            marginBottom: "0.75rem"
          }}
        >
          Outside of Work
        </Typography>
        <Typography sx={{ lineHeight: 1.7 }}>
          I’m based in Chicago and open to relocating to the EU or UK. 
          I love music research, editorial design, and building small, 
          intentional digital projects. I’m also a fan of crime shows, 
          psychological thrillers, and exploring new cities.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
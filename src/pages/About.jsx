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
          I got into programming in high school through C++ and CAD, and it just made sense to me. Even when I 
          kept switching majors in college, I always ended up taking programming classes for fun. By my third year I 
          finally switched into computer science and finished the degree in two years.
        </Typography>
        <Typography sx={{ lineHeight: 1.7, marginTop: "1rem" }}>
          I started my career at Covetrus as an intern and came back after graduation as a full time engineer. I worked 
          across the stack and in the data engineering space using React, Node.js, Java, Python, and distributed data systems. 
          My work included full stack features, backend cleanup and modernization, and real time analytics pipelines.
        </Typography>
        <Typography sx={{ lineHeight: 1.7, marginTop: "1rem" }}>
          Over three years I shipped production features from start to finish, improved backend reliability, and built data 
          pipelines that supported financial workflows across the company. I like working on systems that need clarity, 
          structure, and thoughtful engineering, and I enjoy the mix of technical depth, documentation, and collaboration 
          that comes with that kind of work.
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
          I grew up in a small town in Louisiana and have been based in Chicago since March 2025. After my last role ended, 
          I spent some time in Paris before coming back to Chicago, where I now run a small pet‑sitting business called 
          Le Minou. It’s a calm, grounding project that lets me stay connected to the things I care about: routine, care, 
          and creating a sense of home for people and their pets.
        </Typography>
        <Typography sx={{ lineHeight: 1.7, marginTop: "1rem" }}>
          Outside of engineering, I love music research, editorial design, and building small, intentional digital projects. 
          I’m also a big fan of crime shows, psychological thrillers, and exploring new cities whenever I get the chance.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
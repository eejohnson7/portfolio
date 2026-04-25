import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CodeBox from "../components/CodeBox";
import useAboutPage from "../hooks/useAboutPage";

function About() {
  const { about, loading, error } = useAboutPage();

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
      {/* Loading */}
      {loading && (
        <Typography sx={{ fontSize: "1.2rem" }}>
          Loading…
        </Typography>
      )}

      {/* Error */}
      {error && (
        <Typography sx={{ color: "red" }}>
          Error loading About page: {error}
        </Typography>
      )}

      {/* Content */}
      {!loading && !error && about && (
        <>
          {/* Intro */}
          <Box>
            <Typography variant="h2">
              {about.intro_title}
            </Typography>
            <Typography>{about.intro_text}</Typography>
          </Box>

          <Divider />

          {/* My Path */}
          <Box>
            <Typography variant="h3">{about.path_title}</Typography>
            <CodeBox>
              {about.path_text}
            </CodeBox>
          </Box>

          <Divider />

          {/* What I Care About */}
          <Box>
            <Typography variant="h3">{about.values_title}</Typography>
            <CodeBox>
              {about.values_text}
            </CodeBox>
          </Box>

          <Divider />

          {/* Outside of Work */}
          <Box>
            <Typography variant="h3">{about.life_title}</Typography>
            <CodeBox>
              {about.life_text}
            </CodeBox>
          </Box>
        </>
      )}
    </Box>
  );
}

export default About;
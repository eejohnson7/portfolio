import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PinkBox from "../components/CodeBox";

import {
  aboutIntro,
  aboutPath,
  aboutValues,
  aboutLife
} from "../data/aboutData";

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
      {/* Intro */}
      <Box>
        <Typography variant="h2">
          {aboutIntro.title}
        </Typography>
        <Typography>{aboutIntro.text}</Typography>
      </Box>

      <Divider />

      {/* My Path */}
      <Box>
        <Typography variant="h3">{aboutPath.title}</Typography>
        <PinkBox>
          {aboutPath.text}
        </PinkBox>
      </Box>

      <Divider />

      {/* What I Care About */}
      <Box>
        <Typography variant="h3">{aboutValues.title}</Typography>
        <PinkBox>
          {aboutValues.text}
        </PinkBox>
      </Box>

      <Divider />

      {/* Outside of Work */}
      <Box>
        <Typography variant="h3">{aboutLife.title}</Typography>
        <PinkBox>
          {aboutLife.text}
        </PinkBox>
      </Box>
    </Box>
  );
}

export default About;
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function BottomNav() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 4,
        padding: "0.75rem 0",
        backgroundColor: "rgba(255, 236, 242, 0.8)", // soft blush with transparency
        backdropFilter: "blur(6px)",
        borderTop: "1px solid rgba(152, 0, 97, 0.2)", // subtle plum line
        zIndex: 1000
      }}
    >
      <IconButton
        href="https://github.com/eejohnson7"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "#980061" }}
      >
        <GitHubIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        href="https://www.linkedin.com/in/erinejohnson77"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "#980061" }}
      >
        <LinkedInIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        href="https://www.facebook.com/eejohnson7"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "#980061" }}
      >
        <FacebookIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        href="https://www.instagram.com/ee.johnson"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "#980061" }}
      >
        <InstagramIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}
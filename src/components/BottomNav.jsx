import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
        backgroundColor: "rgba(255, 236, 242, 0.82)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(152, 0, 97, 0.14)",
        zIndex: 1000
      }}
    >
      <IconButton
        href="https://github.com/eejohnson7"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Erin Johnson on GitHub (opens in a new tab)"
        sx={{ color: "var(--plum)" }}
      >
        <GitHubIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        href="https://www.linkedin.com/in/erinejohnson77"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Erin Johnson on LinkedIn (opens in a new tab)"
        sx={{ color: "var(--plum)" }}
      >
        <LinkedInIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}

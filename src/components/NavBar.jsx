import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 236, 242, 0.78)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(152, 0, 97, 0.08)",
        boxShadow: "none",
        color: "var(--plum)"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "min(1200px, 100%)",
          minHeight: { xs: "64px", sm: "72px" },
          margin: "0 auto",
          padding: { xs: "0.65rem 1.25rem", sm: "0.75rem 2rem" }
        }}
      >
        <Typography
          variant="h1"
          component={NavLink}
          to="/"
          end
          aria-label="Erin Johnson home"
          sx={{
            color: "var(--plum)",
            fontSize: { xs: "2rem", sm: "2.5rem" },
            textDecoration: "none",
            "&:hover": {
              opacity: 0.8
            }
          }}
        >
          EJ
        </Typography>

        <Box
          component="nav"
          aria-label="Primary navigation"
          sx={{ display: "flex", gap: { xs: 1.5, sm: 3 } }}
        >
          <Typography
            variant="h4"
            component={NavLink}
            to="/resume"
            sx={{
              color: "var(--plum)",
              fontSize: { xs: "0.95rem", sm: "1.25rem" },
              textDecoration: "none",
              "&:hover": {
                opacity: 0.8
              }
            }}
          >
            Resume
          </Typography>

          <Typography
            variant="h4"
            component={NavLink}
            to="/about"
            sx={{
              color: "var(--plum)",
              fontSize: { xs: "0.95rem", sm: "1.25rem" },
              textDecoration: "none",
              "&:hover": {
                opacity: 0.8
              }
            }}
          >
            About
          </Typography>

          <Typography
            variant="h4"
            component={NavLink}
            to="/projects"
            sx={{
              color: "var(--plum)",
              fontSize: { xs: "0.95rem", sm: "1.25rem" },
              textDecoration: "none",
              "&:hover": {
                opacity: 0.8
              }
            }}
          >
            Projects
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

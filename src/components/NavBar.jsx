import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 2rem"
        }}
      >
        {/* Name as clickable brand */}
        <Typography
          component="a"
          href="/"
          sx={{
            textDecoration: "none",
            color: "#980061",
            fontSize: "2.75rem",
            fontWeight: 500,
            fontFamily: "casual_sunday",
            "&:hover": {
              opacity: 0.8
            }
          }}
        >
          Erin Elizabeth Johnson
        </Typography>

        {/* Navigation links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            component="a"
            href="resume"
            sx={{
              textDecoration: "none",
              color: "#980061",
              fontSize: "1.25rem",
              fontWeight: 500,
              "&:hover": {
                opacity: 0.8
              }
            }}
          >
            Resume
          </Typography>
          {/* Add more buttons here */}
        <Typography
            component="a"
            href="about"
            sx={{
              textDecoration: "none",
              color: "#980061",
              fontSize: "1.25rem",
              fontWeight: 500,
              "&:hover": {
                opacity: 0.8
              }
            }}
          >
            About
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
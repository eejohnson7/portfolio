import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
          variant="h1"
          component="a"
          href="/"
          sx={{
            textDecoration: "none",
            "&:hover": {
              opacity: 0.8
            }
          }}
        >
          EEJ
        </Typography>

        {/* Navigation links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            variant="h4"
            component="a"
            href="/resume"
            sx={{
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
              component="a"
              href="/about"
              sx={{
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
              component="a"
              href="/code-samples"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8
                }
              }}
            >
              Code Samples
            </Typography>

            <Typography
              variant="h4"
              component="a"
              href="/design-docs"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8
                },
                
              }}
            >
              Design Docs
            </Typography>

            <Typography
              variant="h4"
              component="a"
              href="/case-studies"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8
                }
              }}
            >
              Case Studies
            </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
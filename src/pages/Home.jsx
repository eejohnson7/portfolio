import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ProfilePic from "../components/ProfilePic";
import useHomePage from "../hooks/useHomePage";

function Home() {
  const { home, loading, error } = useHomePage();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        textAlign: "center",
        position: "relative"
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
          Error loading Home page: {error}
        </Typography>
      )}

      {/* Content */}
      {!loading && !error && home && (
        <>
          <ProfilePic />

          <Box>
            <Typography variant="h1">
              {home.title || "Hi, I’m Erin."}
            </Typography>

            <Typography sx={{ maxWidth: "400px", mt: "0.75rem" }}>
              {home.description}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Home;

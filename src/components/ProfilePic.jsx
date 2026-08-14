import profilePic from "../images/profile_pic.jpg";
import Box from "@mui/material/Box";

export default function ProfilePic() {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        width: { xs: 235, sm: 290, md: 320 },
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        border: "3px dotted var(--plum)",
        bgcolor: "rgba(255, 255, 255, 0.44)",
        boxShadow: "0 24px 55px rgba(91, 15, 59, 0.15)",
        padding: { xs: "8px", sm: "10px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box
        component="img"
        src={profilePic}
        alt="Erin Johnson"
        decoding="async"
        fetchPriority="high"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />
    </Box>
  );
}

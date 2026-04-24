import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ProfilePic from "../components/ProfilePic";

function Home(){
    return (
        <Box
            sx={{
            minHeight: "80vh",            // not full height → lifts content upward
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            textAlign: "center",
            position: "relative",
            }}
        >
            <ProfilePic />

            <Box>
            <Typography
                variant="h1"
            >
                Hi, I’m Erin.
            </Typography>

            <Typography
                sx={{
                maxWidth: "400px"
                }}
            >
                I’m a backend‑leaning engineer focused on system design,
                documentation, and building clean, intentional technical
                experiences.
            </Typography>
            </Box>
        </Box>
    )
} 

export default Home;
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import profilePic from "/public/images/profile_pic.png";

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
            {/* Circular photo with dotted border */}
            <Box
            sx={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "4px dotted #980061",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
            <Box
                component="img"
                src={profilePic}
                alt="Erin Johnson"
                sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover"
                }}
            />
            </Box>

            {/* Text section */}
            <Box>
            <Typography
                variant="h1"
                sx={{
                fontWeight: 500,
                color: "#980061"
                }}
            >
                Hi, I’m Erin.
            </Typography>

            <p
                style={{
                color: "#980061",
                fontSize: "1.75rem",
                maxWidth: "400px",
                }}
            >
                I’m a backend‑leaning engineer focused on system design,
                documentation, and building clean, intentional technical
                experiences.
            </p>
            </Box>
        </Box>
    )
} 

export default Home;
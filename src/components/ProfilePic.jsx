import profilePic from "../images/profile_pic.png";
import Box from "@mui/material/Box";

export default function ProfilePic() {
    return (
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
    );
}
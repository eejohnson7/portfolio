import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PDFLinks() {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
            <Typography
            component="a"
            href="/Erin_Johnson.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                textDecoration: "none",
                "&:hover": { opacity: 0.8 }
            }}
            >
            US PDF
            </Typography>

            <Typography
            component="a"
            href="/Erin_E_Johnson.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                textDecoration: "none",
                "&:hover": { opacity: 0.8 }
            }}
            >
            EU/UK PDF
            </Typography>
      </Box>
    );
}
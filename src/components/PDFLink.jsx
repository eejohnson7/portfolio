import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PDFLink() {
    const resumeLink = import.meta.env.VITE_RESUME_URL;

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
            <Typography
            component="a"
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                textDecoration: "none",
                "&:hover": { opacity: 0.8 }
            }}
            >
            Download PDF Here
            </Typography>
      </Box>
    );
}
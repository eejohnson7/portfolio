import Button from "@mui/material/Button";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

export default function PDFLink() {
  const resumeLink = import.meta.env.VITE_RESUME_URL;

  return (
    <Button
      href={resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<ArrowOutwardRoundedIcon />}
      aria-label="Open résumé PDF in a new tab"
      sx={{
        alignSelf: { xs: "flex-start", sm: "auto" },
        border: "1px solid rgba(152, 0, 97, 0.28)",
        borderRadius: "999px",
        color: "var(--plum)",
        fontWeight: 800,
        px: 2.25,
        py: 1,
        textTransform: "none",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.5)",
          borderColor: "var(--plum)"
        }
      }}
    >
      Download PDF
    </Button>
  );
}

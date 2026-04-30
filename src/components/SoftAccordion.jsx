import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SoftAccordion({ title, children, defaultExpanded = false }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      defaultExpanded={defaultExpanded}
      sx={{
        background: "transparent",
        border: "none",
        "&:before": { display: "none" },
        mb: 3
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: "#980061",
              fontSize: "1.75rem",
              transition: "color 0.2s ease"
            }}
          />
        }
        sx={{
          px: 0,
          "& .MuiAccordionSummary-content": {
            margin: 0,
            padding: 0
          }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.3,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 0, pt: 1 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

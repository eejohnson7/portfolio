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
        bgcolor: "rgba(255, 255, 255, 0.58)",
        border: "1px solid rgba(152, 0, 97, 0.12)",
        borderRadius: "18px !important",
        overflow: "hidden",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: 0 },
        mb: 0
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: "var(--plum)",
              fontSize: "1.75rem",
              transition: "color 0.2s ease"
            }}
          />
        }
        sx={{
          minHeight: 68,
          px: { xs: 2.25, sm: 2.75 },
          "&.Mui-expanded": { minHeight: 68 },
          "&:focus-visible": {
            outline: "3px solid rgba(152, 0, 97, 0.3)",
            outlineOffset: "-3px"
          },
          "& .MuiAccordionSummary-content": {
            my: 1.5
          }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "var(--ink)",
            fontSize: { xs: "1.2rem", sm: "1.35rem" },
            lineHeight: 1.3,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          borderTop: "1px solid rgba(152, 0, 97, 0.1)",
          px: { xs: 2.25, sm: 2.75 },
          pt: 2.5,
          pb: { xs: 2.5, sm: 3 }
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

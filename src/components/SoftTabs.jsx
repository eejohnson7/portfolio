import { Tabs, Tab, Box } from "@mui/material";

export default function SoftTabs({ value, onChange, labels, ariaLabel = "Content views" }) {
  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 44,
          bgcolor: "rgba(255, 236, 242, 0.52)",
          border: "1px solid rgba(152, 0, 97, 0.1)",
          borderRadius: "13px",
          p: 0.5,
          "& .MuiTabs-indicator": { display: "none" },
          "& .MuiTab-root.Mui-selected": {
            bgcolor: "rgba(255, 255, 255, 0.76)",
            color: "var(--plum)",
            fontWeight: 800
          },
          "& .MuiTab-root": {
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "0.86rem",
            fontWeight: 700,
            minHeight: 36,
            minWidth: 0,
            px: 1.5,
            py: 0.7,
            color: "var(--muted-ink)",
            transition: "background-color 160ms ease, color 160ms ease",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.42)" },
            "&:focus-visible": {
              outline: "3px solid rgba(152, 0, 97, 0.3)",
              outlineOffset: "-3px"
            }
          }
        }}
      >
        {labels.map((label, i) => (
          <Tab
            key={`${label}-${i}`}
            label={label}
            disableRipple
          />
        ))}
      </Tabs>
    </Box>
  );
}

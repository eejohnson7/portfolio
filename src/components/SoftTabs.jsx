import { Tabs, Tab, Box } from "@mui/material";

export default function SoftTabs({ value, onChange, labels }) {
  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Tabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#980061",
            height: "3px",
            borderRadius: "2px"
          }
        }}
        sx={{
          minHeight: "42px",

          // Remove blue focus ring globally
          "& *:focus": { outline: "none !important" },
          "& *:focus-visible": { outline: "none !important" },

          // Override initial selected color
          "& .MuiTab-root.Mui-selected": {
            color: "#980061 !important",
            opacity: 1,
            fontWeight: 600
          },

          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            minHeight: "42px",
            padding: "0.5rem 1rem",
            color: "#444",
            opacity: 0.8,
            transition: "color 0.2s ease",

            // Kill ripple + pressed state
            "&.MuiButtonBase-root": {
              "&:hover": { backgroundColor: "transparent" }
            },

            // Remove blue focus ring
            "&:focus": { outline: "none !important" },
            "&:focus-visible": { outline: "none !important" }
          }
        }}
      >
        {labels.map((label, i) => (
          <Tab
            key={i}
            label={label}
            disableRipple
            disableFocusRipple
            disableTouchRipple
          />
        ))}
      </Tabs>
    </Box>
  );
}

import Box from "@mui/material/Box";

export default function CodeBox({ children, code = false, link = false }) {
  return (
    <Box
      sx={{
        background: "#FFDBE9",
        padding: "1rem",
        borderRadius: "8px",
        whiteSpace: code ? "pre" : "pre-wrap",
        overflowX: code ? "auto" : "visible",
        fontFamily: code ? "'Fira Code', monospace" : "'Fira Code', monospace",
        fontSize: code ? "0.9rem" : "1.1rem",
        lineHeight: code ? 1.5 : 1.7,
        marginTop: "1rem", 

        ...(link && {
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0px 6px 22px rgba(0,0,0,0.18)",
            transform: "translateY(-3px)"
          }
        })
      }}
    >
      {children}
    </Box>
  );
}
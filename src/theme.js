import { createTheme } from "@mui/material/styles";
import "@fontsource/fraunces/700.css";      // Headlines
import "@fontsource/nunito-sans/400.css";   // Body
import "@fontsource/nunito-sans/500.css";   // Medium

const theme = createTheme({
  typography: {
    fontFamily: "Nunito Sans, sans-serif",

    h1: {
      fontFamily: "Fraunces, serif",
      fontSize: "2.5rem",
      color: "#980061"
    },
    h2: {
      fontFamily: "Fraunces, serif",
      fontSize: "2.25rem",
      color: "#980061",
      marginBottom: "0.5rem"
    },
    h3: {
      fontFamily: "Fraunces, serif",
      fontSize: "1.75rem",
      color: "#980061",
      marginBottom: "0.5rem"
    },
    h4: {
      fontFamily: "Fraunces, serif",
      fontSize: "1.25rem",
      color: "#980061"
    },

    body1: {
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: 400,
      fontSize: "1.25rem",
      color: "#980061"
    },
  },
});

export default theme;
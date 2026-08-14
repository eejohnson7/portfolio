import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Resume = lazy(() => import("./pages/Resume"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const ProjectDetail = lazy(() => import("./pages/Projects/ProjectDetail"));

function RouteFallback() {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={30} sx={{ color: "var(--plum)" }} />
        <Typography sx={{ mt: 1.5, color: "var(--muted-ink)" }}>
          Loading page…
        </Typography>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <NavBar />

      <Box sx={{ paddingBottom: "80px" }}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </Box>

      <BottomNav />
    </Router>
  );
}

export default App;

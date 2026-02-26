import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import About from "./pages/About";
import Box from "@mui/material/Box";
import CodeSamples from "./pages/CodeSamples";
import DesignDocs from "./pages/DesignDocs";

function App() {
  return (
    <Router>
      <NavBar />

      <Box sx={{ paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<About />} />
          <Route path="/code-samples" element={<CodeSamples />} />
          <Route path="/design-docs" element={<DesignDocs />} />
        </Routes>
      </Box>

      <BottomNav />
    </Router>
  );
}

export default App;
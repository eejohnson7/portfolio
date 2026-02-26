import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import About from "./pages/About";
import Box from "@mui/material/Box";
import CodeSamples from "./pages/CodeSamples";
import DesignDocs from "./pages/DesignDocs";
import CaseStudies from "./pages/CaseStudies/CaseStudies";
import AccountUpdater from "./pages/CaseStudies/pages/AccountUpdater";
import LeMinou from "./pages/CaseStudies/pages/LeMinou";
import PayoutJobFailure from "./pages/CaseStudies/pages/PayoutJobFailure";
import DatabricksPipeline from "./pages/CaseStudies/pages/DatabricksPipeline";

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
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/account-updater" element={<AccountUpdater />} />
          <Route path="/case-studies/le-minou" element={<LeMinou />} />
          <Route path="/case-studies/databricks-pipeline" element={<DatabricksPipeline />} />
          <Route path="/casee-studies/payout-job-failure" element={<PayoutJobFailure />} />
        </Routes>
      </Box>

      <BottomNav />
    </Router>
  );
}

export default App;
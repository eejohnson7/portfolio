import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import MermaidDiagram from "../../components/MermaidDiagram";
import SoftAccordion from "../../components/SoftAccordion";
import SoftTabs from "../../components/SoftTabs";
import useProject from "../../hooks/useProject";
import { getProjectPresentation } from "./projectPresentation";

const surfaceStyles = {
  bgcolor: "rgba(255, 255, 255, 0.58)",
  border: "1px solid rgba(152, 0, 97, 0.12)",
  borderRadius: "20px"
};

const buttonStyles = {
  borderRadius: "999px",
  px: 2.25,
  py: 1.05,
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "none"
};

function splitParagraphs(text = "") {
  return text.split(/\n\s*\n/).filter(Boolean);
}

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <Box sx={{ maxWidth: "720px", mb: { xs: 3.25, md: 4.5 } }}>
      <Typography
        component="p"
        sx={{
          color: "var(--plum)",
          fontSize: "0.72rem",
          fontWeight: 800,
          letterSpacing: "0.13em",
          textTransform: "uppercase"
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        id={id}
        variant="h2"
        sx={{
          color: "var(--ink)",
          fontSize: { xs: "2rem", md: "2.65rem" },
          lineHeight: 1.08,
          mt: 0.65,
          mb: description ? 1.25 : 0
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography sx={{ color: "var(--muted-ink)", fontSize: "1rem", lineHeight: 1.7 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

function NavigationCard({ project, direction }) {
  const isPrevious = direction === "previous";

  if (!project) return <Box aria-hidden="true" />;

  return (
    <Box
      component={RouterLink}
      to={`/projects/${project.id}`}
      sx={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: isPrevious ? "flex-start" : "flex-end",
        bgcolor: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(152, 0, 97, 0.12)",
        borderRadius: "16px",
        color: "inherit",
        p: 2.25,
        textAlign: isPrevious ? "left" : "right",
        textDecoration: "none",
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: "rgba(152, 0, 97, 0.28)",
          transform: "translateY(-2px)"
        }
      }}
    >
      <Typography
        component="p"
        sx={{
          color: "var(--plum)",
          fontSize: "0.67rem",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase"
        }}
      >
        {isPrevious ? "← Previous case study" : "Next case study →"}
      </Typography>
      <Typography
        sx={{
          color: "var(--ink)",
          fontFamily: "Fraunces, serif",
          fontSize: { xs: "1rem", sm: "1.12rem" },
          lineHeight: 1.35,
          mt: 0.65,
          overflowWrap: "anywhere"
        }}
      >
        {project.title}
      </Typography>
    </Box>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, previousProject, nextProject, loading, error } = useProject(id);
  const [diagramSelection, setDiagramSelection] = useState({ projectId: id, index: 0 });
  const [codeSelection, setCodeSelection] = useState({ projectId: id, index: 0 });
  const diagramTab = diagramSelection.projectId === id ? diagramSelection.index : 0;
  const codeTab = codeSelection.projectId === id ? codeSelection.index : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Box component="main" sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <Box role="status" aria-live="polite" sx={{ textAlign: "center" }}>
          <CircularProgress size={30} sx={{ color: "var(--plum)" }} />
          <Typography sx={{ color: "var(--muted-ink)", mt: 1.5 }}>
            Loading case study…
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box component="main" sx={{ maxWidth: "720px", mx: "auto", px: 2.5, py: 10 }}>
        <Typography variant="h1" sx={{ color: "var(--ink)", fontSize: { xs: "2.6rem", sm: "3.4rem" } }}>
          Project not found.
        </Typography>
        <Typography sx={{ color: "var(--muted-ink)", lineHeight: 1.7, mt: 1.5, mb: 3 }}>
          This case study may have moved or is not currently published.
        </Typography>
        <Button
          component={RouterLink}
          to="/projects"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ ...buttonStyles, color: "var(--plum)", px: 0 }}
        >
          Back to all projects
        </Button>
      </Box>
    );
  }

  const { label: categoryLabel } = getProjectPresentation(project.category);
  const activeDiagram = project.diagrams[diagramTab] || project.diagrams[0];
  const activeCodeSample = project.codeSamples[codeTab] || project.codeSamples[0];
  const atAGlanceItems = [
    { label: "My role", value: project.role },
    { label: "Project type", value: categoryLabel },
    { label: "Context", value: project.context_label },
    {
      label: "Primary technologies",
      value: project.stack.slice(0, 4).join(" · ")
    }
  ].filter((item) => item.value);
  const hasArchitecture = project.diagrams.length > 0 || project.architecture_notes;

  return (
    <Box component="main" sx={{ overflow: "hidden" }}>
      <Box
        component="header"
        sx={{
          position: "relative",
          width: "min(1160px, calc(100% - 2.5rem))",
          mx: "auto",
          pt: { xs: 3.5, sm: 4.5 },
          pb: { xs: 6, sm: 8, md: 9 }
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            width: { xs: 180, sm: 300 },
            height: { xs: 180, sm: 300 },
            border: "52px solid rgba(255, 219, 233, 0.46)",
            borderRadius: "50%",
            right: { xs: -125, md: -90 },
            top: { xs: 35, md: 55 },
            zIndex: -1
          }}
        />

        <Button
          component={RouterLink}
          to="/projects"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ ...buttonStyles, color: "var(--plum)", mb: { xs: 4, md: 5 }, px: 0 }}
        >
          All projects
        </Button>

        <Box sx={{ maxWidth: "960px" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 1.5 }}>
            <Typography
              component="p"
              sx={{
                color: "var(--plum)",
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.13em",
                textTransform: "uppercase"
              }}
            >
              {categoryLabel}
            </Typography>
            {project.context_label && (
              <>
                <Box aria-hidden="true" sx={{ width: 4, height: 4, bgcolor: "var(--plum)", borderRadius: "50%" }} />
                <Typography
                  component="p"
                  sx={{ color: "var(--muted-ink)", fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {project.context_label}
                </Typography>
              </>
            )}
          </Box>

          <Typography
            variant="h1"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "2.45rem", sm: "4rem", md: "4.75rem" },
              letterSpacing: "-0.045em",
              lineHeight: { xs: 1.02, md: 0.98 },
              mb: 2.5,
              overflowWrap: "anywhere"
            }}
          >
            {project.title}
          </Typography>
          <Typography
            sx={{
              color: "var(--muted-ink)",
              fontSize: { xs: "1.04rem", md: "1.18rem" },
              lineHeight: 1.7,
              maxWidth: "820px"
            }}
          >
            {project.description}
          </Typography>

          <Box component="ul" aria-label="Technology stack" sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, listStyle: "none", m: 0, mt: 3, p: 0 }}>
            {project.stack.map((technology) => (
              <Chip
                key={technology}
                component="li"
                label={technology}
                size="small"
                sx={{
                  height: "auto",
                  minHeight: 27,
                  maxWidth: "100%",
                  bgcolor: "rgba(255, 255, 255, 0.58)",
                  border: "1px solid rgba(152, 0, 97, 0.12)",
                  color: "var(--ink)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  "& .MuiChip-label": { display: "block", whiteSpace: "normal", py: 0.4 }
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {atAGlanceItems.length > 0 && (
        <Box
          component="section"
          aria-labelledby="at-a-glance-title"
          sx={{
            bgcolor: "rgba(255, 250, 252, 0.72)",
            borderBlock: "1px solid rgba(152, 0, 97, 0.1)",
            py: { xs: 4, md: 5 }
          }}
        >
          <Box sx={{ width: "min(1160px, calc(100% - 2.5rem))", mx: "auto" }}>
            <Typography
              id="at-a-glance-title"
              component="h2"
              sx={{
                color: "var(--plum)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.13em",
                mb: 2,
                textTransform: "uppercase"
              }}
            >
              At a glance
            </Typography>
            <Box
              component="dl"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: `repeat(${Math.min(atAGlanceItems.length, 4)}, minmax(0, 1fr))` },
                gap: 1.5,
                m: 0
              }}
            >
              {atAGlanceItems.map((item) => (
                <Box key={item.label} sx={{ ...surfaceStyles, p: 2.25 }}>
                  <Typography component="dt" sx={{ color: "var(--plum)", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {item.label}
                  </Typography>
                  <Typography component="dd" sx={{ color: "var(--ink)", fontSize: "0.92rem", fontWeight: 700, lineHeight: 1.55, m: 0, mt: 0.65, overflowWrap: "anywhere" }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      <Box
        component="section"
        aria-labelledby="problem-title"
        sx={{
          width: "min(1080px, calc(100% - 2.5rem))",
          mx: "auto",
          py: { xs: 7, md: 10 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(240px, 0.65fr) minmax(0, 1.35fr)" },
          alignItems: "start",
          gap: { xs: 1, md: 7 }
        }}
      >
        <SectionHeading eyebrow="The challenge" title="The problem" id="problem-title" />
        <Box sx={{ maxWidth: "720px" }}>
          {splitParagraphs(project.long_description).map((paragraph) => (
            <Typography
              key={paragraph}
              component="p"
              sx={{
                color: "var(--ink)",
                fontSize: { xs: "1.02rem", md: "1.1rem" },
                lineHeight: 1.78,
                m: 0,
                "& + &": { mt: 2.25 }
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Box>

      {project.bullets.length > 0 && (
        <Box
          component="section"
          aria-labelledby="contributions-title"
          sx={{
            bgcolor: "rgba(255, 250, 252, 0.72)",
            borderBlock: "1px solid rgba(152, 0, 97, 0.1)",
            py: { xs: 7, md: 10 }
          }}
        >
          <Box sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto" }}>
            <SectionHeading
              eyebrow="My contribution"
              title="What I built"
              description="The implementation work, design decisions, and collaboration that moved the system forward."
              id="contributions-title"
            />
            <Box
              component="ol"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                gap: 1.5,
                listStyle: "none",
                m: 0,
                p: 0
              }}
            >
              {project.bullets.map((bullet, index) => (
                <Box
                  key={`${project.id}-${index}`}
                  component="li"
                  sx={{
                    ...surfaceStyles,
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    alignItems: "start",
                    gap: 1.25,
                    p: { xs: 2.25, sm: 2.5 }
                  }}
                >
                  <CheckCircleOutlineRoundedIcon sx={{ color: "var(--plum)", fontSize: 20, mt: 0.2 }} />
                  <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.95rem", lineHeight: 1.67 }}>
                    {bullet}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {project.impact && (
        <Box
          component="section"
          aria-labelledby="impact-title"
          sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto", py: { xs: 7, md: 9 } }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "auto minmax(0, 1fr)" },
              alignItems: "center",
              gap: { xs: 2.25, md: 3 },
              bgcolor: "var(--deep-plum)",
              borderRadius: { xs: "20px", md: "26px" },
              color: "white",
              p: { xs: 3, sm: 4, md: 5 }
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(255, 236, 242, 0.1)",
                border: "1px solid rgba(255, 236, 242, 0.14)",
                borderRadius: "15px",
                color: "#F7B7CF"
              }}
            >
              <TrendingUpRoundedIcon />
            </Box>
            <Box>
              <Typography
                component="p"
                sx={{ color: "#F7B7CF", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase" }}
              >
                Result / impact
              </Typography>
              <Typography
                id="impact-title"
                variant="h2"
                sx={{ color: "white", fontSize: { xs: "1.65rem", sm: "2.15rem" }, lineHeight: 1.3, mt: 0.75, mb: 0 }}
              >
                {project.impact}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {hasArchitecture && (
        <Box
          component="section"
          aria-labelledby="architecture-title"
          sx={{
            bgcolor: "rgba(255, 250, 252, 0.72)",
            borderBlock: "1px solid rgba(152, 0, 97, 0.1)",
            py: { xs: 7, md: 10 }
          }}
        >
          <Box sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto" }}>
            <SectionHeading
              eyebrow="System design"
              title="Architecture & how it works"
              description="A portfolio-level view of the workflow, its boundaries, and the decisions behind it."
              id="architecture-title"
            />

            {project.diagrams.length > 0 && activeDiagram && (
              <Box sx={{ ...surfaceStyles, p: { xs: 1.5, sm: 2.5, md: 3 } }}>
                {project.diagrams.length > 1 && (
                  <SoftTabs
                    value={diagramTab}
                    onChange={(event, value) => setDiagramSelection({ projectId: id, index: value })}
                    labels={project.diagrams.map((diagram) => diagram.title || "Diagram")}
                    ariaLabel="Architecture diagrams"
                  />
                )}
                <Box sx={{ px: { xs: 0.5, sm: 0.75 }, pt: project.diagrams.length > 1 ? 0.5 : 0 }}>
                  <Typography variant="h3" sx={{ color: "var(--ink)", fontSize: { xs: "1.35rem", sm: "1.55rem" }, mb: 0.8 }}>
                    {activeDiagram.title || "Architecture diagram"}
                  </Typography>
                  {activeDiagram.description && (
                    <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.94rem", lineHeight: 1.65, mb: 2.5 }}>
                      {activeDiagram.description}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.72)",
                      border: "1px solid rgba(152, 0, 97, 0.1)",
                      borderRadius: "14px",
                      minWidth: 0,
                      overflow: "hidden",
                      p: { xs: 1.25, sm: 2 }
                    }}
                  >
                    <MermaidDiagram chart={activeDiagram.diagram} label={activeDiagram.title} />
                  </Box>
                </Box>
              </Box>
            )}

            {project.architecture_notes && (
              <Box sx={{ ...surfaceStyles, mt: project.diagrams.length > 0 ? 2 : 0, p: { xs: 2.5, sm: 3 } }}>
                <Typography
                  component="p"
                  sx={{ color: "var(--plum)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Design decisions & trade-offs
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "var(--muted-ink)",
                    fontSize: "0.94rem",
                    lineHeight: 1.72,
                    mt: 1.25,
                    overflowWrap: "anywhere",
                    whiteSpace: "pre-line"
                  }}
                >
                  {project.architecture_notes}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {project.codeSamples.length > 0 && (
        <Box
          component="section"
          aria-labelledby="code-title"
          sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto", py: { xs: 7, md: 10 } }}
        >
          <SectionHeading
            eyebrow="Technical detail"
            title="Representative code"
            description="Code stays available for a closer look without interrupting the case-study narrative."
            id="code-title"
          />
          <SoftAccordion
            title={`Explore ${project.codeSamples.length} code sample${project.codeSamples.length === 1 ? "" : "s"}`}
          >
            {project.codeSamples.length > 1 && (
              <SoftTabs
                value={codeTab}
                onChange={(event, value) => setCodeSelection({ projectId: id, index: value })}
                labels={project.codeSamples.map((sample) => sample.title || "Snippet")}
                ariaLabel="Code samples"
              />
            )}
            {activeCodeSample && (
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h3" sx={{ color: "var(--ink)", fontSize: { xs: "1.25rem", sm: "1.45rem" }, mb: 0.8 }}>
                  {activeCodeSample.title || "Code sample"}
                </Typography>
                {activeCodeSample.description && (
                  <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.94rem", lineHeight: 1.65, mb: 2 }}>
                    {activeCodeSample.description}
                  </Typography>
                )}
                <Box
                  component="pre"
                  aria-label={activeCodeSample.title || "Project code sample"}
                  tabIndex={0}
                  sx={{
                    bgcolor: "var(--deep-plum)",
                    border: "1px solid rgba(152, 0, 97, 0.18)",
                    borderRadius: "14px",
                    color: "#FFE8F1",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: { xs: "0.76rem", sm: "0.84rem" },
                    lineHeight: 1.65,
                    m: 0,
                    maxWidth: "100%",
                    overflowX: "auto",
                    p: { xs: 2, sm: 2.5 },
                    whiteSpace: "pre",
                    "&:focus-visible": { outline: "3px solid rgba(152, 0, 97, 0.3)", outlineOffset: "3px" }
                  }}
                >
                  <code>{activeCodeSample.code}</code>
                </Box>
              </Box>
            )}
          </SoftAccordion>
        </Box>
      )}

      <Box
        component="footer"
        sx={{
          bgcolor: "rgba(255, 250, 252, 0.72)",
          borderTop: "1px solid rgba(152, 0, 97, 0.1)",
          py: { xs: 6, md: 8 }
        }}
      >
        <Box sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto" }}>
          <Button
            component={RouterLink}
            to="/projects"
            startIcon={<ArrowBackRoundedIcon />}
            sx={{ ...buttonStyles, color: "var(--plum)", mb: 2.5, px: 0 }}
          >
            Back to all projects
          </Button>

          {(previousProject || nextProject) && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1.5, mb: 3 }}>
              <NavigationCard project={previousProject} direction="previous" />
              <NavigationCard project={nextProject} direction="next" />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              gap: 2.5,
              bgcolor: "var(--soft-pink)",
              border: "1px solid rgba(152, 0, 97, 0.12)",
              borderRadius: "20px",
              p: { xs: 2.75, sm: 3.5 }
            }}
          >
            <Box>
              <Typography component="p" sx={{ color: "var(--plum)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Continue the story
              </Typography>
              <Typography variant="h2" sx={{ color: "var(--ink)", fontSize: { xs: "1.65rem", sm: "1.9rem" }, mt: 0.4, mb: 0 }}>
                See the experience behind the work.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button
                component={RouterLink}
                to="/resume"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ ...buttonStyles, bgcolor: "var(--plum)", "&:hover": { bgcolor: "var(--deep-plum)", boxShadow: "none" } }}
              >
                View resume
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                sx={{ ...buttonStyles, borderColor: "rgba(152, 0, 97, 0.28)", color: "var(--plum)", "&:hover": { borderColor: "var(--plum)", bgcolor: "rgba(255, 255, 255, 0.42)" } }}
              >
                About me
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import {
  Box,
  Chip,
  CircularProgress,
  Typography
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Link as RouterLink } from "react-router-dom";
import useProjects from "../../hooks/useProjects";
import { getProjectPresentation } from "./projectPresentation";

function ProjectCard({ project, index }) {
  const { Icon, label, surface } = getProjectPresentation(project.category);
  const isLeadProject = project.homepage_featured && index === 0;
  const visibleStack = project.stack.slice(0, isLeadProject ? 6 : 5);
  const remainingStackCount = project.stack.length - visibleStack.length;

  return (
    <Box
      component={RouterLink}
      to={`/projects/${project.id}`}
      aria-label={`Read the ${project.title} case study`}
      sx={{
        gridColumn: { md: isLeadProject ? "span 2" : "auto" },
        minWidth: 0,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: surface,
        border: `1px solid ${
          isLeadProject ? "rgba(152, 0, 97, 0.22)" : "rgba(152, 0, 97, 0.12)"
        }`,
        borderRadius: { xs: "18px", sm: "22px" },
        color: "inherit",
        overflow: "hidden",
        p: { xs: 2.5, sm: 3, md: isLeadProject ? 3.5 : 3 },
        position: "relative",
        textDecoration: "none",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          borderColor: "rgba(152, 0, 97, 0.28)",
          boxShadow: "0 18px 42px rgba(91, 15, 59, 0.12)",
          transform: "translateY(-4px)"
        },
        "&:hover .project-arrow": {
          transform: "translate(3px, -3px)"
        },
        "&:focus-visible": {
          outline: "3px solid rgba(152, 0, 97, 0.3)",
          outlineOffset: "3px"
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: { xs: 2.5, md: isLeadProject ? 3.5 : 2.75 }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(255, 255, 255, 0.62)",
              border: "1px solid rgba(152, 0, 97, 0.1)",
              borderRadius: "12px",
              color: "var(--plum)"
            }}
          >
            <Icon fontSize="small" />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="p"
              sx={{
                color: "var(--plum)",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.11em",
                lineHeight: 1.4,
                textTransform: "uppercase"
              }}
            >
              {project.context_label || "Case Study"}
            </Typography>
            <Typography
              component="p"
              sx={{ color: "var(--muted-ink)", fontSize: "0.78rem", fontWeight: 700, mt: 0.2 }}
            >
              {label}
            </Typography>
          </Box>
        </Box>
        <ArrowOutwardRoundedIcon
          className="project-arrow"
          sx={{
            color: "var(--plum)",
            flexShrink: 0,
            fontSize: 22,
            transition: "transform 180ms ease"
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: isLeadProject ? "minmax(0, 1.3fr) minmax(260px, 0.7fr)" : "1fr"
          },
          alignItems: "start",
          gap: { xs: 2, md: isLeadProject ? 5 : 2 }
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h2"
            variant="h3"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "1.45rem", sm: isLeadProject ? "1.9rem" : "1.55rem" },
              lineHeight: 1.22,
              mb: 1.35,
              overflowWrap: "anywhere"
            }}
          >
            {project.title}
          </Typography>
          <Typography
            sx={{
              color: "var(--muted-ink)",
              fontSize: { xs: "0.94rem", sm: "0.98rem" },
              lineHeight: 1.68
            }}
          >
            {project.description}
          </Typography>
        </Box>

        {project.impact && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 1.25,
              bgcolor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(152, 0, 97, 0.1)",
              borderRadius: "14px",
              p: 2
            }}
          >
            <TrendingUpRoundedIcon sx={{ color: "var(--plum)", fontSize: 20, mt: 0.15 }} />
            <Box>
              <Typography
                component="p"
                sx={{
                  color: "var(--plum)",
                  fontSize: "0.66rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                }}
              >
                Outcome
              </Typography>
              <Typography sx={{ color: "var(--ink)", fontSize: "0.88rem", lineHeight: 1.55, mt: 0.45 }}>
                {project.impact}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7, mt: 2.75 }}>
        {visibleStack.map((technology) => (
          <Chip
            key={technology}
            label={technology}
            size="small"
            sx={{
              height: "auto",
              minHeight: 25,
              maxWidth: "100%",
              bgcolor: "rgba(255, 255, 255, 0.58)",
              border: "1px solid rgba(152, 0, 97, 0.08)",
              color: "var(--ink)",
              fontSize: "0.72rem",
              "& .MuiChip-label": { display: "block", whiteSpace: "normal", py: 0.35 }
            }}
          />
        ))}
        {remainingStackCount > 0 && (
          <Chip
            label={`+${remainingStackCount}`}
            size="small"
            aria-label={`${remainingStackCount} more technologies`}
            sx={{ bgcolor: "rgba(152, 0, 97, 0.08)", color: "var(--plum)", fontWeight: 800 }}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "var(--plum)", mt: "auto", pt: 3 }}>
        <Typography sx={{ fontSize: "0.88rem", fontWeight: 800 }}>
          View case study
        </Typography>
        <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
      </Box>
    </Box>
  );
}

export default function Projects() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <Box component="main" sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <Box role="status" aria-live="polite" sx={{ textAlign: "center" }}>
          <CircularProgress size={30} sx={{ color: "var(--plum)" }} />
          <Typography sx={{ color: "var(--muted-ink)", mt: 1.5 }}>
            Loading case studies…
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="main" sx={{ maxWidth: "720px", mx: "auto", px: 2.5, py: 10 }}>
        <Typography variant="h2" sx={{ color: "var(--ink)" }}>
          The projects could not load.
        </Typography>
        <Typography role="alert" sx={{ color: "var(--muted-ink)", mt: 2 }}>
          Please refresh the page or try again in a moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        width: "min(1160px, calc(100% - 2.5rem))",
        mx: "auto",
        pt: { xs: 6, sm: 8, md: 9 },
        pb: { xs: 6, md: 10 }
      }}
    >
      <Box component="header" sx={{ maxWidth: "790px", mb: { xs: 4.5, md: 6 } }}>
        <Typography
          component="p"
          sx={{
            color: "var(--plum)",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase"
          }}
        >
          Selected work
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "var(--ink)",
            fontSize: { xs: "2.85rem", sm: "4rem", md: "4.7rem" },
            letterSpacing: "-0.045em",
            lineHeight: { xs: 1, md: 0.96 },
            mt: 1,
            mb: 2.25
          }}
        >
          Systems built for real problems.
        </Typography>
        <Typography
          sx={{
            color: "var(--muted-ink)",
            fontSize: { xs: "1.02rem", md: "1.16rem" },
            lineHeight: 1.7,
            maxWidth: "720px"
          }}
        >
          Production systems, financial workflows, full-stack products, and data platforms—each
          grounded in the problem, the trade-offs, and the outcome.
        </Typography>
      </Box>

      {projects.length > 0 ? (
        <Box
          aria-label="Project case studies"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 2, md: 2.5 }
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.58)",
            border: "1px solid rgba(152, 0, 97, 0.12)",
            borderRadius: "18px",
            p: 3
          }}
        >
          <Typography sx={{ color: "var(--muted-ink)" }}>
            New case studies are being prepared.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

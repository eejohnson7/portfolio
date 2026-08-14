import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import { createElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import ProfilePic from "../components/ProfilePic";
import useHomePage from "../hooks/useHomePage";

const iconMap = {
  analytics: InsightsRoundedIcon,
  hospitality: LocalBarRoundedIcon,
  pets: PetsRoundedIcon,
  software: CodeRoundedIcon,
  systems: HubRoundedIcon
};

const buttonStyles = {
  borderRadius: "999px",
  px: 2.5,
  py: 1.2,
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "none"
};

function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <Box sx={{ maxWidth: "680px", mb: { xs: 3.5, md: 5 } }}>
      <Typography
        component="p"
        sx={{
          color: "var(--plum)",
          fontSize: "0.76rem",
          fontWeight: 800,
          letterSpacing: "0.14em",
          mb: 1,
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
          mb: 1.5
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: "var(--muted-ink)",
            fontSize: { xs: "1rem", md: "1.08rem" },
            lineHeight: 1.7
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

function Home() {
  const {
    home,
    capabilities,
    featuredProjects,
    skills,
    professionalRange,
    loading,
    error
  } = useHomePage();

  if (loading) {
    return (
      <Box
        component="main"
        sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}
      >
        <Box role="status" aria-live="polite" sx={{ textAlign: "center" }}>
          <CircularProgress size={30} sx={{ color: "var(--plum)" }} />
          <Typography sx={{ mt: 1.5, color: "var(--muted-ink)" }}>
            Loading portfolio…
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !home) {
    return (
      <Box
        component="main"
        sx={{ maxWidth: "720px", mx: "auto", px: 2.5, py: 10 }}
      >
        <Typography variant="h2" sx={{ color: "var(--ink)" }}>
          The portfolio could not load.
        </Typography>
        <Typography role="alert" sx={{ color: "var(--muted-ink)", mt: 2 }}>
          Please refresh the page or try again in a moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ overflow: "hidden" }}>
      <Box
        component="section"
        aria-labelledby="home-title"
        sx={{
          width: "min(1160px, calc(100% - 2.5rem))",
          minHeight: { md: "calc(100vh - 170px)" },
          mx: "auto",
          py: { xs: 5, sm: 7, md: 8 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.25fr) minmax(320px, 0.75fr)"
          },
          alignItems: "center",
          gap: { xs: 6, md: 8 }
        }}
      >
        <Box sx={{ maxWidth: "720px" }}>
          <Typography
            component="p"
            sx={{
              color: "var(--plum)",
              fontSize: { xs: "0.72rem", sm: "0.8rem" },
              fontWeight: 800,
              letterSpacing: "0.13em",
              lineHeight: 1.5,
              mb: 2,
              textTransform: "uppercase"
            }}
          >
            {home.eyebrow}
          </Typography>

          <Typography
            id="home-title"
            variant="h1"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "3.1rem", sm: "4.5rem", md: "5.4rem" },
              lineHeight: { xs: 0.98, md: 0.94 },
              letterSpacing: "-0.045em",
              mb: 2.5
            }}
          >
            {home.title}
          </Typography>

          <Typography
            component="p"
            variant="h2"
            sx={{
              color: "var(--plum)",
              fontSize: { xs: "1.45rem", sm: "1.85rem", md: "2.1rem" },
              lineHeight: 1.2,
              mb: 2
            }}
          >
            {home.headline}
          </Typography>

          <Typography
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "1.08rem", md: "1.22rem" },
              lineHeight: 1.65,
              maxWidth: "650px"
            }}
          >
            {home.description}
          </Typography>
          {home.secondary_description && (
            <Typography
              sx={{
                color: "var(--muted-ink)",
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                lineHeight: 1.7,
                maxWidth: "640px",
                mt: 1.25
              }}
            >
              {home.secondary_description}
            </Typography>
          )}

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3.5 }}>
            <Button
              component={RouterLink}
              to={home.primary_cta_url}
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                ...buttonStyles,
                bgcolor: "var(--plum)",
                "&:hover": {
                  bgcolor: "var(--deep-plum)",
                  boxShadow: "none"
                }
              }}
            >
              {home.primary_cta_text}
            </Button>
            <Button
              component={RouterLink}
              to={home.secondary_cta_url}
              variant="outlined"
              sx={{
                ...buttonStyles,
                borderColor: "rgba(152, 0, 97, 0.35)",
                color: "var(--plum)",
                "&:hover": {
                  borderColor: "var(--plum)",
                  bgcolor: "rgba(255, 255, 255, 0.45)"
                }
              }}
            >
              {home.secondary_cta_text}
            </Button>
          </Box>

          <Box
            component="ul"
            aria-label="Professional focus"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              listStyle: "none",
              m: 0,
              mt: 4,
              p: 0
            }}
          >
            {home.focus_items.map((item) => (
              <Chip
                key={item}
                component="li"
                label={item}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.58)",
                  border: "1px solid rgba(152, 0, 97, 0.14)",
                  color: "var(--muted-ink)",
                  fontWeight: 700
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "grid",
            justifyItems: "center",
            pb: { xs: 3, md: 5 }
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              width: { xs: 270, sm: 330 },
              height: { xs: 270, sm: 330 },
              borderRadius: "50%",
              bgcolor: "rgba(255, 219, 233, 0.72)",
              filter: "blur(2px)",
              transform: "translate(12px, -12px)"
            }}
          />
          <ProfilePic />
          <Box
            sx={{
              position: "relative",
              width: { xs: "min(300px, 92%)", sm: "320px" },
              mt: { xs: -1, sm: -2 },
              ml: { xs: 0, sm: 8 },
              bgcolor: "rgba(255, 250, 252, 0.94)",
              border: "1px solid rgba(152, 0, 97, 0.16)",
              borderRadius: "16px",
              boxShadow: "0 18px 44px rgba(91, 15, 59, 0.12)",
              p: 2.25
            }}
          >
            <Typography
              component="p"
              sx={{
                color: "var(--plum)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase"
              }}
            >
              {home.process_label}
            </Typography>
            <Typography
              sx={{
                color: "var(--ink)",
                fontFamily: "monospace",
                fontSize: { xs: "0.87rem", sm: "0.95rem" },
                mt: 0.75
              }}
            >
              {home.process_text}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="capabilities-title"
        sx={{
          bgcolor: "rgba(255, 250, 252, 0.7)",
          borderBlock: "1px solid rgba(152, 0, 97, 0.1)",
          py: { xs: 7, md: 10 }
        }}
      >
        <Box sx={{ width: "min(1160px, calc(100% - 2.5rem))", mx: "auto" }}>
          <SectionHeading
            id="capabilities-title"
            eyebrow={home.capabilities_eyebrow}
            title={home.capabilities_title}
            description={home.capabilities_description}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2
            }}
          >
            {capabilities.map((capability) => (
              <Box
                key={capability.id}
                sx={{
                  minHeight: "100%",
                  bgcolor: "rgba(255, 255, 255, 0.64)",
                  border: "1px solid rgba(152, 0, 97, 0.12)",
                  borderRadius: "18px",
                  p: { xs: 2.5, md: 3 }
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "var(--soft-pink)",
                    borderRadius: "12px",
                    color: "var(--plum)",
                    mb: 2.5
                  }}
                >
                  {createElement(iconMap[capability.icon_key] || CodeRoundedIcon)}
                </Box>
                <Typography
                  variant="h3"
                  sx={{ color: "var(--ink)", fontSize: "1.45rem", mb: 1 }}
                >
                  {capability.title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--muted-ink)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65
                  }}
                >
                  {capability.description}
                </Typography>
                {capability.detail && (
                  <Typography
                    sx={{
                      color: "var(--plum)",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      mt: 2.5
                    }}
                  >
                    {capability.detail}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="work-title"
        sx={{
          width: "min(1160px, calc(100% - 2.5rem))",
          mx: "auto",
          py: { xs: 7, md: 11 }
        }}
      >
        <SectionHeading
          id="work-title"
          eyebrow={home.work_eyebrow}
          title={home.work_title}
          description={home.work_description}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2
          }}
        >
          {featuredProjects.map((project, index) => (
            <Box
              key={project.id}
              component={RouterLink}
              to={`/projects/${project.id}`}
              sx={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "var(--soft-pink)",
                border: "1px solid transparent",
                borderRadius: "18px",
                color: "inherit",
                p: { xs: 2.5, sm: 3 },
                textDecoration: "none",
                transition:
                  "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                "&:hover": {
                  borderColor: "rgba(152, 0, 97, 0.22)",
                  boxShadow: "0 18px 42px rgba(91, 15, 59, 0.12)",
                  transform: "translateY(-4px)"
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
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 2
                }}
              >
                <Typography
                  sx={{
                    color: "var(--plum)",
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    fontWeight: 700
                  }}
                >
                  CASE STUDY / {String(index + 1).padStart(2, "0")}
                </Typography>
                <ArrowOutwardRoundedIcon
                  sx={{ color: "var(--plum)", fontSize: 21 }}
                />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  color: "var(--ink)",
                  fontSize: { xs: "1.35rem", sm: "1.45rem" },
                  lineHeight: 1.25,
                  mb: 1.5
                }}
              >
                {project.title}
              </Typography>
              <Typography
                sx={{
                  color: "var(--muted-ink)",
                  fontSize: "0.96rem",
                  lineHeight: 1.65,
                  mb: 2.5
                }}
              >
                {project.description}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: "auto" }}>
                {project.stack.slice(0, 4).map((technology) => (
                  <Chip
                    key={technology}
                    label={technology}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.58)",
                      color: "var(--ink)",
                      fontSize: "0.75rem"
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          component={RouterLink}
          to={home.primary_cta_url}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ ...buttonStyles, color: "var(--plum)", mt: 2.5, px: 0 }}
        >
          {home.primary_cta_text}
        </Button>
      </Box>

      <Box
        component="section"
        aria-labelledby="skills-title"
        sx={{
          bgcolor: "var(--deep-plum)",
          color: "white",
          py: { xs: 7, md: 10 }
        }}
      >
        <Box sx={{ width: "min(1160px, calc(100% - 2.5rem))", mx: "auto" }}>
          <Box sx={{ maxWidth: "680px", mb: { xs: 3.5, md: 5 } }}>
            <Typography
              component="p"
              sx={{
                color: "#F7B7CF",
                fontSize: "0.76rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                mb: 1,
                textTransform: "uppercase"
              }}
            >
              {home.skills_eyebrow}
            </Typography>
            <Typography
              id="skills-title"
              variant="h2"
              sx={{
                color: "white",
                fontSize: { xs: "2rem", md: "2.65rem" },
                lineHeight: 1.08,
                mb: 1.5
              }}
            >
              {home.skills_title}
            </Typography>
            {home.skills_description && (
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.72)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7
                }}
              >
                {home.skills_description}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
              },
              gap: 1.5
            }}
          >
            {skills.map((group) => (
              <Box
                key={group.category}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.075)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "16px",
                  p: 2.5
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "white", fontSize: "1.2rem", mb: 1.5 }}
                >
                  {group.category}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {group.items.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 236, 242, 0.1)",
                        border: "1px solid rgba(255, 236, 242, 0.15)",
                        color: "rgba(255, 255, 255, 0.84)"
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="range-title"
        sx={{
          width: "min(1160px, calc(100% - 2.5rem))",
          mx: "auto",
          py: { xs: 7, md: 11 }
        }}
      >
        <SectionHeading
          id="range-title"
          eyebrow={home.range_eyebrow}
          title={home.range_title}
          description={home.range_description}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2
          }}
        >
          {professionalRange.map((item) => (
            <Box
              key={item.id}
              sx={{
                gridColumn: { md: item.featured ? "span 2" : "auto" },
                display: "grid",
                gridTemplateColumns: {
                  xs: "auto 1fr",
                  sm: item.featured ? "70px 1fr" : "auto 1fr"
                },
                alignItems: "start",
                gap: { xs: 1.75, sm: 2.5 },
                bgcolor: item.featured
                  ? "var(--soft-pink)"
                  : "rgba(255, 255, 255, 0.54)",
                border: "1px solid rgba(152, 0, 97, 0.12)",
                borderRadius: "18px",
                p: { xs: 2.5, sm: 3 }
              }}
            >
              <Box
                sx={{
                  width: { xs: 42, sm: item.featured ? 54 : 42 },
                  height: { xs: 42, sm: item.featured ? 54 : 42 },
                  display: "grid",
                  placeItems: "center",
                  bgcolor: item.featured ? "var(--plum)" : "var(--soft-pink)",
                  borderRadius: "12px",
                  color: item.featured ? "white" : "var(--plum)"
                }}
              >
                {createElement(iconMap[item.icon_key] || CodeRoundedIcon)}
              </Box>
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: "var(--plum)",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase"
                  }}
                >
                  {item.eyebrow}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--ink)",
                    fontSize: "1.35rem",
                    mt: 0.25,
                    mb: 0.75
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--muted-ink)",
                    fontSize: "0.96rem",
                    lineHeight: 1.65
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="next-title"
        sx={{
          width: "min(1160px, calc(100% - 2.5rem))",
          mx: "auto",
          pb: { xs: 8, md: 11 }
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: "var(--soft-pink)",
            border: "1px solid rgba(152, 0, 97, 0.12)",
            borderRadius: { xs: "20px", md: "28px" },
            p: { xs: 3, sm: 5, md: 6 }
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              border: "46px solid rgba(152, 0, 97, 0.05)",
              borderRadius: "50%",
              right: -80,
              top: -100
            }}
          />
          <Typography
            id="next-title"
            variant="h2"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.08,
              maxWidth: "720px"
            }}
          >
            {home.final_cta_title}
          </Typography>
          {home.final_cta_description && (
            <Typography
              sx={{
                color: "var(--muted-ink)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "680px",
                mt: 1.75
              }}
            >
              {home.final_cta_description}
            </Typography>
          )}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              gap: 1.25,
              mt: 3.5
            }}
          >
            <Button
              component={RouterLink}
              to={home.final_primary_cta_url}
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                ...buttonStyles,
                bgcolor: "var(--plum)",
                "&:hover": { bgcolor: "var(--deep-plum)" }
              }}
            >
              {home.final_primary_cta_text}
            </Button>
            <Button
              component={RouterLink}
              to={home.final_secondary_cta_url}
              sx={{ ...buttonStyles, color: "var(--plum)" }}
            >
              {home.final_secondary_cta_text}
            </Button>
            <Button
              component={RouterLink}
              to={home.final_tertiary_cta_url}
              sx={{ ...buttonStyles, color: "var(--plum)" }}
            >
              {home.final_tertiary_cta_text}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography
} from "@mui/material";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import { createElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAboutPage from "../hooks/useAboutPage";

const valueIconMap = {
  clarity: LightbulbRoundedIcon,
  communication: ForumRoundedIcon,
  data: InsightsRoundedIcon,
  experience: AutoAwesomeRoundedIcon,
  systems: AccountTreeRoundedIcon
};

const buttonStyles = {
  borderRadius: "999px",
  px: 2.5,
  py: 1.2,
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "none"
};

function splitParagraphs(text = "") {
  return text.split(/\n\s*\n/).filter(Boolean);
}

function Paragraphs({ text, color = "var(--ink)", fontSize }) {
  return splitParagraphs(text).map((paragraph) => (
    <Typography
      key={paragraph}
      component="p"
      sx={{
        color,
        fontSize: fontSize || { xs: "1.04rem", md: "1.14rem" },
        lineHeight: 1.75,
        m: 0,
        "& + &": { mt: 2 }
      }}
    >
      {paragraph}
    </Typography>
  ));
}

function SectionHeading({ id, eyebrow, title, description, inverse = false }) {
  return (
    <Box sx={{ maxWidth: "680px", mb: { xs: 3.5, md: 5 } }}>
      <Typography
        component="p"
        sx={{
          color: inverse ? "#F7B7CF" : "var(--plum)",
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
          color: inverse ? "white" : "var(--ink)",
          fontSize: { xs: "2rem", md: "2.65rem" },
          lineHeight: 1.08,
          mb: description ? 1.5 : 0
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: inverse ? "rgba(255, 255, 255, 0.72)" : "var(--muted-ink)",
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

function About() {
  const { about, values, loading, error } = useAboutPage();

  if (loading) {
    return (
      <Box
        component="main"
        sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}
      >
        <Box role="status" aria-live="polite" sx={{ textAlign: "center" }}>
          <CircularProgress size={30} sx={{ color: "var(--plum)" }} />
          <Typography sx={{ color: "var(--muted-ink)", mt: 1.5 }}>
            Loading my story…
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !about) {
    return (
      <Box
        component="main"
        sx={{ maxWidth: "720px", mx: "auto", px: 2.5, py: 10 }}
      >
        <Typography variant="h2" sx={{ color: "var(--ink)" }}>
          The About page could not load.
        </Typography>
        <Typography role="alert" sx={{ color: "var(--muted-ink)", mt: 2 }}>
          Please refresh the page or try again in a moment.
        </Typography>
      </Box>
    );
  }

  const pathParagraphs = splitParagraphs(about.path_text);
  const ctaLinks = (Array.isArray(about.cta_links) ? about.cta_links : [])
    .filter((link) => link.active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <Box component="main" sx={{ overflow: "hidden" }}>
      <Box
        component="section"
        aria-labelledby="about-title"
        sx={{
          position: "relative",
          width: "min(1080px, calc(100% - 2.5rem))",
          minHeight: { md: "calc(100vh - 170px)" },
          mx: "auto",
          py: { xs: 7, sm: 9, md: 11 },
          display: "grid",
          alignItems: "center"
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            width: { xs: 190, sm: 300 },
            height: { xs: 190, sm: 300 },
            border: "52px solid rgba(255, 219, 233, 0.5)",
            borderRadius: "50%",
            right: { xs: -120, md: -100 },
            top: { xs: 18, md: 40 },
            zIndex: -1
          }}
        />
        <Box sx={{ maxWidth: "880px" }}>
          <Typography
            component="p"
            sx={{
              color: "var(--plum)",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              mb: 2,
              textTransform: "uppercase"
            }}
          >
            {about.intro_title}
          </Typography>
          <Typography
            id="about-title"
            variant="h1"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "3rem", sm: "4.4rem", md: "5.2rem" },
              letterSpacing: "-0.045em",
              lineHeight: { xs: 1, md: 0.98 },
              mb: { xs: 3.5, md: 4.5 }
            }}
          >
            {about.headline}
          </Typography>
          <Box
            sx={{
              maxWidth: "780px",
              borderLeft: "3px solid rgba(152, 0, 97, 0.28)",
              pl: { xs: 2.25, sm: 3 }
            }}
          >
            <Paragraphs text={about.intro_text} />
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="path-title"
        sx={{
          bgcolor: "rgba(255, 250, 252, 0.7)",
          borderBlock: "1px solid rgba(152, 0, 97, 0.1)",
          py: { xs: 7, md: 11 }
        }}
      >
        <Box
          sx={{
            width: "min(1080px, calc(100% - 2.5rem))",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(250px, 0.7fr) minmax(0, 1.3fr)" },
            gap: { xs: 1, md: 8 }
          }}
        >
          <SectionHeading
            id="path-title"
            eyebrow={about.path_eyebrow}
            title={about.path_title}
          />
          <Box sx={{ maxWidth: "700px" }}>
            {pathParagraphs.map((paragraph, index) => {
              const isClosingThought = index === pathParagraphs.length - 1;

              return isClosingThought ? (
                <Box
                  key={paragraph}
                  sx={{
                    borderLeft: "3px solid var(--plum)",
                    mt: 3.5,
                    pl: { xs: 2.25, sm: 3 },
                    py: 0.5
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      color: "var(--plum)",
                      fontFamily: "Fraunces, serif",
                      fontSize: { xs: "1.32rem", sm: "1.55rem" },
                      lineHeight: 1.45,
                      m: 0
                    }}
                  >
                    {paragraph}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  key={paragraph}
                  component="p"
                  sx={{
                    color: "var(--ink)",
                    fontSize: { xs: "1.02rem", md: "1.1rem" },
                    lineHeight: 1.78,
                    m: 0,
                    "& + p": { mt: 2.25 }
                  }}
                >
                  {paragraph}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="values-title"
        sx={{
          width: "min(1080px, calc(100% - 2.5rem))",
          mx: "auto",
          py: { xs: 7, md: 11 }
        }}
      >
        <SectionHeading
          id="values-title"
          eyebrow={about.values_eyebrow}
          title={about.values_title}
          description={about.values_text}
        />

        <Box
          component="ol"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(6, 1fr)" },
            gap: 1.5,
            listStyle: "none",
            m: 0,
            p: 0
          }}
        >
          {values.map((value, index) => (
            <Box
              key={value.id}
              component="li"
              sx={{
                gridColumn: {
                  sm: index === values.length - 1 && values.length % 2 === 1 ? "1 / -1" : "auto",
                  lg: index < 3 ? "span 2" : "span 3"
                },
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "start",
                gap: 1.75,
                bgcolor: index < 3 ? "rgba(255, 255, 255, 0.58)" : "var(--soft-pink)",
                border: "1px solid rgba(152, 0, 97, 0.12)",
                borderRadius: "18px",
                p: { xs: 2.25, sm: 2.75 }
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: index < 3 ? "var(--soft-pink)" : "rgba(255, 255, 255, 0.58)",
                  borderRadius: "12px",
                  color: "var(--plum)"
                }}
              >
                {createElement(valueIconMap[value.icon_key] || AccountTreeRoundedIcon)}
              </Box>
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: "var(--plum)",
                    fontFamily: "monospace",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    mb: 0.7
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--ink)",
                    fontSize: { xs: "0.98rem", sm: "1.03rem" },
                    fontWeight: 700,
                    lineHeight: 1.55
                  }}
                >
                  {value.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="life-title"
        sx={{ bgcolor: "var(--deep-plum)", color: "white", py: { xs: 7, md: 11 } }}
      >
        <Box sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto" }}>
          <SectionHeading
            id="life-title"
            eyebrow={about.life_eyebrow}
            title={about.life_title}
            inverse
          />

          <Box sx={{ maxWidth: "790px", mb: { xs: 4, md: 5.5 } }}>
            <Paragraphs
              text={about.life_text}
              color="rgba(255, 255, 255, 0.82)"
              fontSize={{ xs: "1.04rem", md: "1.14rem" }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.12fr) minmax(0, 0.88fr)" },
              gap: 2
            }}
          >
            <Box
              sx={{
                bgcolor: "var(--soft-pink)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                borderRadius: "20px",
                color: "var(--ink)",
                p: { xs: 2.75, sm: 3.5 }
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "13px",
                  color: "var(--plum)",
                  mb: 2.75
                }}
              >
                <PetsRoundedIcon />
              </Box>
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
                {about.business_eyebrow}
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "var(--ink)", fontSize: { xs: "1.55rem", sm: "1.85rem" }, mt: 0.6, mb: 1.4 }}
              >
                {about.business_title}
              </Typography>
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "1rem", lineHeight: 1.72 }}>
                {about.business_text}
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.075)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "20px",
                p: { xs: 2.75, sm: 3.5 }
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(255, 236, 242, 0.1)",
                  borderRadius: "13px",
                  color: "#F7B7CF",
                  mb: 2.75
                }}
              >
                <LocalBarRoundedIcon />
              </Box>
              <Typography
                variant="h3"
                sx={{ color: "white", fontSize: { xs: "1.45rem", sm: "1.65rem" }, mb: 1.4 }}
              >
                {about.hospitality_title}
              </Typography>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1rem", lineHeight: 1.72 }}>
                {about.hospitality_text}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: { xs: 4, md: 5 } }}>
            <Typography
              variant="h3"
              sx={{ color: "white", fontSize: { xs: "1.35rem", sm: "1.55rem" }, mb: 2 }}
            >
              {about.interests_title}
            </Typography>
            <Box
              component="ul"
              aria-label="Interests outside work"
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, listStyle: "none", m: 0, p: 0 }}
            >
              {(about.interest_items ?? []).map((interest) => (
                <Chip
                  key={interest}
                  component="li"
                  label={interest}
                  sx={{
                    bgcolor: "rgba(255, 236, 242, 0.1)",
                    border: "1px solid rgba(255, 236, 242, 0.16)",
                    color: "rgba(255, 255, 255, 0.84)",
                    fontWeight: 700
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="about-cta-title"
        sx={{ width: "min(1080px, calc(100% - 2.5rem))", mx: "auto", py: { xs: 7, md: 10 } }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.85fr) minmax(360px, 1.15fr)" },
            alignItems: "center",
            gap: { xs: 3, md: 6 },
            bgcolor: "var(--soft-pink)",
            border: "1px solid rgba(152, 0, 97, 0.12)",
            borderRadius: { xs: "20px", md: "28px" },
            p: { xs: 3, sm: 4.5, md: 5.5 }
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              width: 210,
              height: 210,
              border: "44px solid rgba(152, 0, 97, 0.05)",
              borderRadius: "50%",
              right: -80,
              top: -110
            }}
          />
          <Box>
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
              {about.cta_eyebrow}
            </Typography>
            <Typography
              id="about-cta-title"
              variant="h2"
              sx={{ color: "var(--ink)", fontSize: { xs: "2rem", md: "2.65rem" }, mt: 0.5, mb: 1.25 }}
            >
              {about.cta_title}
            </Typography>
            <Typography sx={{ color: "var(--muted-ink)", fontSize: "1rem", lineHeight: 1.65 }}>
              {about.cta_text}
            </Typography>
          </Box>

          <Box sx={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 1.25 }}>
            {ctaLinks.map((link, index) => {
              const isExternal = /^https?:\/\//.test(link.url);

              return (
                <Button
                  key={link.id}
                  component={isExternal ? "a" : RouterLink}
                  {...(isExternal
                    ? { href: link.url, target: "_blank", rel: "noopener noreferrer" }
                    : { to: link.url })}
                  variant={index === 0 ? "contained" : "outlined"}
                  endIcon={isExternal ? <ArrowOutwardRoundedIcon /> : <ArrowForwardRoundedIcon />}
                  sx={{
                    ...buttonStyles,
                    ...(index === 0
                      ? {
                          bgcolor: "var(--plum)",
                          "&:hover": { bgcolor: "var(--deep-plum)", boxShadow: "none" }
                        }
                      : {
                          borderColor: "rgba(152, 0, 97, 0.28)",
                          color: "var(--plum)",
                          "&:hover": {
                            borderColor: "var(--plum)",
                            bgcolor: "rgba(255, 255, 255, 0.42)"
                          }
                        })
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;

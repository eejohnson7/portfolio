import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Typography
} from "@mui/material";
import PDFLink from "../components/PDFLink";
import useResume from "../hooks/useResume";

const surfaceStyles = {
  bgcolor: "rgba(255, 255, 255, 0.58)",
  border: "1px solid rgba(152, 0, 97, 0.12)",
  borderRadius: "18px"
};

function SectionHeading({ eyebrow, title, id }) {
  return (
    <Box sx={{ mb: 2.25 }}>
      <Typography
        component="p"
        sx={{
          color: "var(--plum)",
          fontSize: "0.7rem",
          fontWeight: 800,
          letterSpacing: "0.13em",
          lineHeight: 1.5,
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
          fontSize: { xs: "1.65rem", sm: "1.85rem" },
          lineHeight: 1.15,
          mt: 0.5,
          mb: 0
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

function SidebarSection({ eyebrow, title, children, id }) {
  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={{
        ...surfaceStyles,
        p: { xs: 2.25, sm: 2.5 }
      }}
    >
      <Typography
        component="p"
        sx={{
          color: "var(--plum)",
          fontSize: "0.67rem",
          fontWeight: 800,
          letterSpacing: "0.12em",
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
          fontSize: "1.35rem",
          lineHeight: 1.2,
          mt: 0.35,
          mb: 1.5
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

const rolePresentationByCategory = {
  engineering: {
    borderColor: "rgba(152, 0, 97, 0.15)",
    accentColor: "var(--plum)"
  },
  data: {
    borderColor: "rgba(152, 0, 97, 0.15)",
    accentColor: "var(--plum)"
  },
  entrepreneurship: {
    borderColor: "rgba(152, 0, 97, 0.16)",
    accentColor: "#B5487D"
  },
  hospitality: {
    borderColor: "rgba(152, 0, 97, 0.12)",
    accentColor: "#745565"
  }
};

const defaultRolePresentation = {
  borderColor: "rgba(152, 0, 97, 0.12)",
  accentColor: "var(--plum)"
};

function Resume() {
  const {
    profile,
    languages,
    toolbox,
    education,
    experience,
    loading,
    error
  } = useResume();

  if (loading) {
    return (
      <Box component="main" sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={30} sx={{ color: "var(--plum)" }} />
          <Typography sx={{ mt: 1.5, color: "var(--muted-ink)" }}>
            Loading resume
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box component="main" sx={{ maxWidth: "720px", mx: "auto", px: 2.5, py: 10 }}>
        <Typography variant="h2" sx={{ color: "var(--ink)" }}>
          The resume could not load.
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
        pt: { xs: 4.5, sm: 6, md: 7 },
        pb: { xs: 5, md: 8 },
        color: "var(--ink)"
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "end" },
          justifyContent: "space-between",
          gap: 2.5,
          mb: { xs: 4, md: 5 }
        }}
      >
        <Box>
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
            Experience & expertise
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: "2.7rem", sm: "3.6rem" },
              letterSpacing: "-0.035em",
              lineHeight: 1,
              mt: 0.75
            }}
          >
            Resume
          </Typography>
        </Box>
        <PDFLink />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(250px, 0.72fr) minmax(0, 2fr)" },
          alignItems: "start",
          gap: { xs: 3, md: 3.5, lg: 4 }
        }}
      >
        <Box
          component="aside"
          aria-label="Résumé details"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <SidebarSection eyebrow="Reach me" title="Contact" id="contact-title">
            <Box sx={{ display: "grid", gap: 0.65 }}>
              {[profile.location, profile.email, profile.phone].map((detail) => (
                <Typography
                  key={detail}
                  sx={{ color: "var(--muted-ink)", fontSize: "0.93rem", lineHeight: 1.55, overflowWrap: "anywhere" }}
                >
                  {detail}
                </Typography>
              ))}
            </Box>
          </SidebarSection>

          <SidebarSection eyebrow="Communication" title="Languages" id="languages-title">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {languages.map((lang) => (
                <Chip
                  key={lang.id}
                  label={`${lang.language_name}${lang.proficiency ? ` · ${lang.proficiency}` : ""}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 236, 242, 0.78)",
                    border: "1px solid rgba(152, 0, 97, 0.12)",
                    color: "var(--muted-ink)",
                    fontWeight: 700
                  }}
                />
              ))}
            </Box>
          </SidebarSection>

          <SidebarSection eyebrow="Technical toolkit" title="Technical Toolbox" id="toolbox-title">
            <Box sx={{ display: "grid", gap: 2 }}>
              {toolbox.map((section, sectionIndex) => (
                <Box key={section.category}>
                  <Typography
                    component="h3"
                    sx={{ color: "var(--ink)", fontSize: "0.88rem", fontWeight: 800, mb: 0.8 }}
                  >
                    {section.category}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                    {section.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{
                          height: "auto",
                          minHeight: 25,
                          maxWidth: "100%",
                          bgcolor: sectionIndex === 0 ? "rgba(152, 0, 97, 0.1)" : "rgba(255, 255, 255, 0.58)",
                          border: "1px solid rgba(152, 0, 97, 0.1)",
                          color: "var(--ink)",
                          fontSize: "0.72rem",
                          "& .MuiChip-label": {
                            display: "block",
                            whiteSpace: "normal",
                            py: 0.35
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </SidebarSection>

          <SidebarSection eyebrow="Foundation" title="Education" id="education-title">
            <Box sx={{ display: "grid", gap: 1.5 }}>
              {education.map((edu) => (
                <Box key={edu.id}>
                  <Typography sx={{ color: "var(--ink)", fontSize: "0.94rem", fontWeight: 800, lineHeight: 1.45 }}>
                    {edu.school}
                  </Typography>
                  <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.88rem", lineHeight: 1.55, mt: 0.35 }}>
                    {edu.degree}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SidebarSection>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Box component="section" aria-labelledby="summary-title">
            <SectionHeading eyebrow="Profile" title="Professional Summary" id="summary-title" />
            <Box
              sx={{
                bgcolor: surfaceStyles.bgcolor,
                border: "1px solid rgba(152, 0, 97, 0.16)",
                borderRadius: "18px",
                p: { xs: 2.5, sm: 3 }
              }}
            >
              <Typography sx={{ color: "var(--ink)", fontSize: { xs: "0.98rem", sm: "1.04rem" }, lineHeight: 1.75 }}>
                {profile.summary}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: { xs: 4.5, md: 5.5 }, borderColor: "rgba(152, 0, 97, 0.12)" }} />

          <Box component="section" aria-labelledby="experience-title">
            <SectionHeading eyebrow="Career story" title="Professional Experience" id="experience-title" />

            <Box sx={{ display: "grid", gap: 2 }}>
              {experience.map((role) => {
                const presentation = rolePresentationByCategory[role.category] || defaultRolePresentation;
                const workplace = [role.company, role.location].filter(Boolean).join(" · ");

                return (
                  <Box
                    key={role.id}
                    component="article"
                    sx={{
                      bgcolor: surfaceStyles.bgcolor,
                      border: `1px solid ${role.isPrimary ? "rgba(152, 0, 97, 0.22)" : presentation.borderColor}`,
                      borderRadius: "18px",
                      p: { xs: 2.5, sm: 3 }
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { sm: "flex-start" },
                        justifyContent: "space-between",
                        gap: { xs: 1.5, sm: 2 },
                        mb: 2
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Chip
                          label={role.badgeLabel}
                          size="small"
                          sx={{
                            height: 24,
                            bgcolor: "rgba(255, 255, 255, 0.62)",
                            border: `1px solid ${presentation.borderColor}`,
                            color: "var(--plum)",
                            fontSize: "0.67rem",
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                            mb: 1.15,
                            textTransform: "uppercase"
                          }}
                        />
                        <Typography
                          component="h3"
                          variant="h3"
                          sx={{
                            color: "var(--ink)",
                            fontSize: { xs: "1.3rem", sm: role.isPrimary ? "1.55rem" : "1.42rem" },
                            lineHeight: 1.2,
                            overflowWrap: "anywhere"
                          }}
                        >
                          {role.title}
                        </Typography>
                        {workplace && (
                          <Typography sx={{ color: "var(--plum)", fontSize: "0.9rem", fontWeight: 800, mt: 0.55 }}>
                            {workplace}
                          </Typography>
                        )}
                      </Box>

                      <Chip
                        label={role.dates}
                        size="small"
                        sx={{
                          flexShrink: 0,
                          alignSelf: { xs: "flex-start", sm: "auto" },
                          height: "auto",
                          minHeight: 27,
                          maxWidth: "100%",
                          bgcolor: "rgba(255, 255, 255, 0.72)",
                          border: "1px solid rgba(152, 0, 97, 0.12)",
                          color: "var(--muted-ink)",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          "& .MuiChip-label": { whiteSpace: "normal", py: 0.45 }
                        }}
                      />
                    </Box>

                    <Box
                      component="ul"
                      sx={{
                        m: 0,
                        pl: 2.25,
                        color: "var(--ink)",
                        "& li": { pl: 0.35, mb: 1.05 },
                        "& li:last-child": { mb: 0 },
                        "& li::marker": { color: presentation.accentColor }
                      }}
                    >
                      {role.bullets.map((bullet, bulletIndex) => (
                        <Typography
                          component="li"
                          key={`${role.id}-${bulletIndex}`}
                          sx={{ color: "var(--muted-ink)", fontSize: { xs: "0.92rem", sm: "0.96rem" }, lineHeight: 1.65 }}
                        >
                          {bullet}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Resume;

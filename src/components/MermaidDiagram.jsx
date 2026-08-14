import { useEffect, useId, useRef, useState } from "react";
import Box from "@mui/material/Box";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  themeVariables: {
    background: "#fffafc",
    primaryColor: "#ffdbe9",
    primaryTextColor: "#3b1b2d",
    primaryBorderColor: "#980061",
    lineColor: "#745565",
    secondaryColor: "#ffecf2",
    tertiaryColor: "#ffffff",
    fontFamily: "Nunito Sans, sans-serif"
  },
  flowchart: { htmlLabels: false, useMaxWidth: true }
});

const mermaidDiagramPattern = /^\s*(architecture-beta|block-beta|classDiagram|erDiagram|flowchart|gantt|gitGraph|graph|journey|kanban|mindmap|packet-beta|pie|quadrantChart|requirementDiagram|sankey-beta|sequenceDiagram|stateDiagram|timeline|xychart-beta)\b/i;

function TextDiagram({ chart, label }) {
  return (
    <Box
      component="pre"
      role="img"
      aria-label={label || "Text architecture diagram"}
      tabIndex={0}
      sx={{
        color: "var(--ink)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: { xs: "0.7rem", sm: "0.8rem" },
        lineHeight: 1.55,
        m: 0,
        maxWidth: "100%",
        overflowX: "auto",
        p: { xs: 0.5, sm: 1 },
        whiteSpace: "pre",
        "&:focus-visible": {
          outline: "3px solid rgba(152, 0, 97, 0.3)",
          outlineOffset: "3px"
        }
      }}
    >
      {chart}
    </Box>
  );
}

export default function MermaidDiagram({ chart = "", label }) {
  const ref = useRef(null);
  const reactId = useId();
  const [failedChart, setFailedChart] = useState(null);
  const isMermaidDiagram = mermaidDiagramPattern.test(chart);
  const renderFailed = failedChart === chart;

  useEffect(() => {
    if (!isMermaidDiagram || !ref.current) return undefined;

    let cancelled = false;
    const renderId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    ref.current.replaceChildren();

    async function renderChart() {
      try {
        const { svg } = await mermaid.render(renderId, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (error) {
        console.error("Unable to render project diagram", error);
        if (!cancelled) setFailedChart(chart);
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, isMermaidDiagram, reactId]);

  if (!isMermaidDiagram || renderFailed) {
    return <TextDiagram chart={chart} label={label} />;
  }

  return (
    <Box
      ref={ref}
      role="img"
      aria-label={label || "Architecture diagram"}
      sx={{
        minWidth: 0,
        maxWidth: "100%",
        overflowX: "auto",
        py: 0.5,
        "& svg": {
          display: "block",
          height: "auto",
          margin: "0 auto",
          maxWidth: "100%"
        }
      }}
    />
  );
}

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

export default function MermaidDiagram({ chart }) {
  const ref = useRef(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!ref.current) return;

      const id = `mermaid-${Math.random().toString(36).slice(2)}`;

      try {
        const { svg } = await mermaid.render(id, chart);
        ref.current.innerHTML = svg;
      } catch (err) {
        ref.current.innerHTML = `<pre>${err.message}</pre>`;
      }
    };

    renderChart();
  }, [chart]);

  return <div ref={ref} />;
}
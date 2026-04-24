import { Typography } from "@mui/material";
import CodeBox from "../components/CodeBox";
import { codeSamples } from "../data/codeSamples";

export default function CodeSamples() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      
      <Typography variant="h2" sx={{ mb: "1rem" }}>
        Code Samples
      </Typography>

      <Typography sx={{ mb: "2rem" }}>
        A small collection of examples that reflect how I approach engineering. I like
        building systems that are clear, reliable, and easy for other people to work
        with. Most of my work sits in backend services, data pipelines, and small UI
        patterns that make larger products feel consistent.
      </Typography>

      {codeSamples.map(sample => (
        <section key={sample.id} style={{ marginBottom: "3rem" }}>
          
          <Typography variant="h3">{sample.title}</Typography>

          {sample.stack && (
            <Typography variant="h4" sx={{ mb: "0.5rem" }}>
              {sample.stack}
            </Typography>
          )}

          <Typography sx={{ mb: "0.5rem" }}>
            {sample.description}
          </Typography>

          <CodeBox code>
            {sample.code}
          </CodeBox>

          {sample.extraCode && (
            <CodeBox code>
              {sample.extraCode}
            </CodeBox>
          )}
        </section>
      ))}
    </div>
  );
}
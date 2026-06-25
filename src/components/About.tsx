import Section from "./Section";

const strengths = [
  {
    title: "Operational context",
    description:
      "Deep RF and network strategy experience gives the data work real business context, not just clean charts.",
  },
  {
    title: "Production analytics",
    description:
      "Builds repeatable pipelines with SQL, Python, BigQuery, dbt practices, quality checks, and documented methodology.",
  },
  {
    title: "Executive decision support",
    description:
      "Turns ambiguous capital-planning questions into dashboards and metrics leaders can use to prioritize work.",
  },
  {
    title: "Portfolio discipline",
    description:
      "Public projects show end-to-end analytics engineering across transit equity, real estate, and financial controls.",
  },
];

export default function About() {
  return (
    <Section id="about">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="section-label">About</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            A data leader with infrastructure instincts.
          </h2>
        </div>

        <div>
          <div className="space-y-5 text-base leading-8 text-white/60">
            <p>
              I have 17+ years of progressive technical experience, starting in
              RF network infrastructure, moving into capital portfolio
              analytics, and now building production data pipelines for a
              national Verizon program.
            </p>
            <p>
              My strongest work sits where systems, data quality, and business
              decisions meet: automating slow workflows, clarifying portfolio
              movement, and giving leaders a reliable view of execution against
              strategy.
            </p>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {strengths.map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6 text-sm text-white/45">
            <span>NYC Metro</span>
            <span className="text-white/16">/</span>
            <span>MBA, BSEE</span>
            <span className="text-white/16">/</span>
            <span>Analytics leadership, BI, and data engineering roles</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

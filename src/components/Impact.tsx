import Section from "./Section";

const proofPoints = [
  {
    metric: "SQL workflow re-engineering",
    title: "Automated 1T Solution Configuration",
    description:
      "Re-engineered the 1T Solution Configuration analysis into an optimized SQL pipeline, turning a slow recurring process into a practical production asset.",
  },
  {
    metric: "Executive BI dashboards",
    title: "Strategic alignment and pipeline visibility",
    description:
      "Built Strategic Alignment and Pipeline Review dashboards that translate capital planning ambiguity into reliable execution metrics for a multi-billion dollar Verizon program.",
  },
  {
    metric: "Waypoint transition delivery",
    title: "Maintained momentum through platform change",
    description:
      "Shipped critical reporting and data functionality while the Accenture Waypoint platform was phased out, preserving continuity for planning stakeholders.",
  },
  {
    metric: "80%",
    title: "Resolved historical data mismatches",
    description:
      "Led data integrity work that improved trust in portfolio reporting and reduced noise for planning stakeholders.",
  },
  {
    metric: "5,600+",
    title: "Scaled relocation analysis",
    description:
      "Created high-rent relocation solutions nationwide, connecting network strategy, cost reduction, and execution planning.",
  },
  {
    metric: "745 oDAS",
    title: "Grounded in operational delivery",
    description:
      "Earlier network engineering work provides a concrete understanding of how plans, data, and field execution meet.",
  },
];

export default function Impact() {
  return (
    <Section id="impact" className="bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-label">Selected Impact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Impact from production analytics work.
        </h2>

        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {proofPoints.map((point) => (
            <article key={point.title} className="border-t border-white/[0.08] pt-5">
              <p className="font-mono text-sm font-semibold text-blue-300">
                {point.metric}
              </p>
              <h3 className="mt-3 text-base font-semibold text-white">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/45">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

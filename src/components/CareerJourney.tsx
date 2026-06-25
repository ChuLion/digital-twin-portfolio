import Section from "./Section";

const roles = [
  {
    period: "2024 - 2026",
    title: "Sr Engineer Consultant, Data Science",
    company: "Verizon",
    location: "Basking Ridge, NJ",
    highlights: [
      "Rebuilt 1T Solution Configuration analysis into an optimized SQL pipeline, reducing runtime from 2 hours to under 4 minutes.",
      "Built Strategic Alignment and Pipeline Review dashboards for a $4B+ national capital program.",
      "Delivered 26+ data and dashboard features during the Accenture Waypoint phase-out.",
      "Partnered with HQ and regional teams to translate planning ambiguity into reliable execution metrics.",
    ],
  },
  {
    period: "2017 - 2024",
    title: "Sr Engineer Consultant, RF Network Strategy",
    company: "Verizon",
    location: "Basking Ridge, NJ",
    highlights: [
      "Automated sector-capacity labeling logic through the Program Labels dashboard.",
      "Managed High Rent Relocation analysis and created 5,600+ relocation solutions.",
      "Co-developed KRW and KSP prioritization algorithms for network investment decisions.",
      "Led a data integrity effort that resolved 80% of historical portfolio mismatches.",
    ],
  },
  {
    period: "2014 - 2017",
    title: "RF Design Engineer III",
    company: "Verizon",
    location: "Greater NYC Area",
    highlights: [
      "Maintained VoLTE In-Effective Attempt rates below 0.55% for Bronx County.",
      "Activated a record-setting 745 oDAS nodes in a single year.",
      "Won 22 of 25 zip codes in throughput benchmarks.",
    ],
  },
  {
    period: "2006 - 2013",
    title: "RF Engineering and Consulting",
    company: "Ericsson, Open Mobile PR",
    location: "Puerto Rico",
    highlights: [
      "Built the infrastructure foundation that now informs analytics work across network planning, deployment, and operations.",
      "Progressed from RF engineer to implementation management within the first three years of the career.",
    ],
  },
];

export default function CareerJourney() {
  return (
    <Section id="career">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="section-label">Career Journey</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            From network infrastructure to analytics leadership.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/50">
            The job-search signal is not just tenure. It is the combination of
            technical depth, business-facing analytics, and repeated delivery
            inside complex national programs.
          </p>
        </div>

        <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {roles.map((role) => (
            <article
              key={`${role.period}-${role.title}`}
              className="grid gap-6 py-8 md:grid-cols-[14rem_1fr]"
            >
              <div>
                <p className="font-mono text-xs text-blue-300/75">
                  {role.period}
                </p>
                <p className="mt-2 text-sm text-white/60">{role.location}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-blue-200/70">{role.company}</p>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/52 lg:grid-cols-2">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300/70" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

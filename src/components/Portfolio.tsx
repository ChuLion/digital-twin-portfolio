import Section from "./Section";
import { BarChart3, Database, ExternalLink, LineChart } from "lucide-react";

const projects = [
  {
    title: "MTA Analytics Pipeline",
    description:
      "End-to-end analytics pipeline processing 88M+ rows of subway data with medallion architecture, testing, CI/CD, and documented methodology.",
    icon: Database,
    tags: ["Python", "dbt", "BigQuery", "SQL", "CI/CD"],
    stats: ["88M+ rows", "12 tables"],
    href: "https://github.com/ChuLion/mta-analytics-pipeline",
    source: "GitHub",
  },
  {
    title: "Fair-altor",
    description:
      "Public data-journalism platform analyzing Puerto Rico real estate pricing by combining CRIM tax assessment data, scraped listings, and census income data, surfacing gaps between market prices and official assessments in selected markets.",
    icon: LineChart,
    tags: ["Python", "Web Scraping", "Data Viz", "Census Data", "Public Data"],
    stats: ["Public repo", "3 data sources"],
    href: "https://github.com/ChuLion/pr-realestate-analysis",
    source: "GitHub",
  },
  {
    title: "Tableau Portfolio",
    description:
      "Interactive dashboards across transit equity, real estate analytics, and financial controls, built to show business-facing data storytelling.",
    icon: BarChart3,
    tags: ["Tableau", "Data Viz", "Storytelling"],
    stats: ["10+ dashboards", "4 domains"],
    href: "https://public.tableau.com/app/profile/jesus.de.leon1371/viz/",
    source: "Tableau Public",
  },
];

export default function Portfolio() {
  return (
    <Section id="portfolio">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="section-label">Portfolio</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Public work that backs up the resume.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/50">
            The portfolio should reinforce employability: production habits,
            analytical judgment, and clear communication across domains.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-blue-300/35 hover:bg-white/[0.04]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-300/10 text-blue-200">
                  <project.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">
                      {project.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-white/24 transition-colors group-hover:text-blue-200" />
                  </div>
                  <p className="mt-1 text-xs text-white/36">
                    {project.source}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/52">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/[0.08] px-2 py-1 font-mono text-xs text-white/42"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-4 border-t border-white/[0.08] pt-4 text-xs text-white/40">
                {project.stats.map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

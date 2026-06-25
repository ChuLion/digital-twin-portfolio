import { ArrowDown, BarChart3, Database, Download, Gauge, Layers3, MessageCircle } from "lucide-react";
import Image from "next/image";

const proofPoints = [
  {
    value: "17+",
    label: "years across RF engineering, strategy, and analytics",
    icon: Layers3,
  },
  {
    value: "$4B+",
    label: "capital program scope supported through executive BI",
    icon: BarChart3,
  },
  {
    value: "120x",
    label: "pipeline runtime improvement, from 2 hours to under 4 minutes",
    icon: Gauge,
  },
  {
    value: "26+",
    label: "features delivered during a critical platform transition",
    icon: Database,
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-500/[0.08] to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-28">
        <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="max-w-2xl">
            <p className="section-label">Analytics Engineer and BI Leader</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
              Jesus M. De Leon
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-white/68 md:text-2xl md:leading-9">
              I turn infrastructure expertise into production data systems for
              capital planning, executive reporting, and operational decision
              support.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/48">
              Python, SQL, BigQuery, dbt, Tableau, data quality automation, and
              stakeholder-facing analytics for high-stakes telecom programs.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-digital-twin"))}
                className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-mono text-xs text-white transition-colors hover:bg-blue-400"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Ask my digital twin
              </button>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-blue-300/25 px-4 py-2 font-mono text-xs text-blue-200 transition-colors hover:border-blue-200/45 hover:bg-blue-300/10"
              >
                <Download className="h-3.5 w-3.5" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-white/[0.08] md:h-80 md:w-80">
              <Image
                src="/profile.jpeg"
                alt="Jesus M. De Leon"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <dl className="mt-16 grid border-y border-white/[0.08] md:grid-cols-4">
          {proofPoints.map((point) => (
            <div
              key={point.value}
              className="border-b border-white/[0.08] py-6 md:border-b-0 md:border-r md:px-6 first:md:pl-0 last:md:border-r-0"
            >
              <div className="flex items-center gap-3">
                <point.icon className="h-4 w-4 text-blue-300" />
                <dt className="font-mono text-3xl font-semibold text-white">
                  {point.value}
                </dt>
              </div>
              <dd className="mt-3 text-sm leading-6 text-white/48">
                {point.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ArrowDown className="absolute bottom-8 left-1/2 h-5 w-5 -translate-x-1/2 text-white/24" />
    </section>
  );
}

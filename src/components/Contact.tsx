import { ExternalLink, FileDown, GitFork, Globe, Mail } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "jesusm.deleon@hotmail.com",
    href: "mailto:jesusm.deleon@hotmail.com",
    external: false,
  },
  {
    icon: Globe,
    label: "LinkedIn",
    value: "linkedin.com/in/jesus-m-de-leon-7a019b1b",
    href: "https://www.linkedin.com/in/jesus-m-de-leon-7a019b1b",
    external: true,
  },
  {
    icon: GitFork,
    label: "GitHub",
    value: "github.com/ChuLion",
    href: "https://github.com/ChuLion",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/[0.08] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dense opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="section-label">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Open to analytics, BI, and data leadership roles.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/50">
            Available for Analytics Engineer, BI Engineer, Senior Data Analyst,
            and Analytics Manager roles in NJ/NYC, especially in pharma,
            financial services, telecom, or tech.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group rounded-lg border border-white/[0.08] bg-[#0b0d10]/75 p-5 transition-colors hover:border-blue-300/35 hover:bg-white/[0.035]"
            >
              <div className="flex items-center gap-3">
                <link.icon className="h-4 w-4 text-blue-200" />
                <h3 className="font-medium text-white">{link.label}</h3>
                {link.external ? (
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-white/24 transition-colors group-hover:text-blue-200" />
                ) : null}
              </div>
              <p className="mt-3 break-words text-sm text-white/44">
                {link.value}
              </p>
            </a>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          className="group mt-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#0b0d10]/75 p-5 transition-colors hover:border-blue-300/35 hover:bg-white/[0.035]"
        >
          <div className="flex items-center gap-3">
            <FileDown className="h-4 w-4 text-blue-200" />
            <h3 className="font-medium text-white">Download Resume</h3>
          </div>
          <span className="font-mono text-xs text-white/44">PDF</span>
        </a>

        <footer className="mt-16 border-t border-white/[0.08] pt-6 text-sm text-white/28">
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Jesus M. De Leon</p>
        </footer>
      </div>
    </section>
  );
}

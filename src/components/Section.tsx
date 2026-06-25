interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative border-t border-white/[0.06] py-20 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

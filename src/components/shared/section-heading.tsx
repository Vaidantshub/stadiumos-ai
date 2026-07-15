import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("space-y-3 mb-10", center && "text-center", className)}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pitch-500 bg-pitch-500/10 px-3 py-1 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}

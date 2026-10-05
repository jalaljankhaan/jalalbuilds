const capabilities = [
  ["Web apps", "Fast, accessible product surfaces."],
  ["Mobile apps", "Native and cross-platform delivery."],
  ["SaaS", "Systems built to grow."],
  ["UI / UX", "Clear flows and interfaces."],
  ["APIs", "Reliable service layers."],
  ["Cloud", "Deployment and observability."],
] as const;
export function Features() {
  return (
    <section id="services" className="border-b border-[#29483b] bg-[#0a1b14]">
      <div className="shell grid border-l border-[#29483b] lg:grid-cols-[1.15fr_repeat(6,1fr)]">
        <div className="flex min-h-32 items-center border-r border-[#29483b] p-5">
          <h2 className="display text-4xl leading-none">One connected product system.</h2>
        </div>
        {capabilities.map(([title, copy]) => (
          <div
            key={title}
            className="min-h-32 border-b border-r border-[#29483b] p-4 lg:border-b-0"
          >
            <span className="mb-8 block h-2 w-2 bg-[#dfff4f]" aria-hidden />
            <h3 className="display text-2xl">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#9fbaaa]">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

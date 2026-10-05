const stages = [
  ["Discover", "Opportunity, constraints, roadmap."],
  ["Design", "Flows, interfaces, system."],
  ["Build", "Engineering, integration, quality."],
  ["Scale", "Delivery, observation, evolution."],
] as const;
export function Delivery() {
  return (
    <section id="delivery" className="border-b border-[#29483b] bg-[#06110d]">
      <div className="shell grid border-l border-[#29483b] lg:grid-cols-[1.1fr_repeat(4,1fr)]">
        <div className="flex min-h-56 flex-col justify-between border-r border-[#29483b] p-6">
          <h2 className="display text-5xl leading-[.9]">
            From signal to shipped product.
          </h2>
          <p className="text-sm leading-6 text-[#b8d2c2]">
            One accountable system from product decision to production delivery.
          </p>
        </div>
        {stages.map(([title, copy], index) => (
          <div
            key={title}
            className="relative min-h-56 border-b border-r border-[#29483b] bg-[#0a1b14] p-5 lg:border-b-0"
          >
            <span className="display text-4xl text-[#46735d]">0{index + 1}</span>
            <i className="absolute right-5 top-5 h-2 w-2 bg-[#dfff4f]" aria-hidden />
            <h3 className="display mt-12 text-3xl">{title}</h3>
            <p className="mt-3 text-xs leading-5 text-[#b8d2c2]">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

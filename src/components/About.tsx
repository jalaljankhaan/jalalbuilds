export function About() {
  return (
    <section id="company" className="border-t border-[#29483b] bg-[#06110d]">
      <div className="shell grid lg:grid-cols-[1fr_1fr]">
        <div className="border-x border-[#29483b] p-7 lg:p-10">
          <h2 className="display max-w-[11ch] text-6xl leading-[.88] sm:text-7xl">
            A focused product partner for what comes next.
          </h2>
        </div>
        <div className="border-r border-[#29483b] p-7 lg:p-10">
          <p className="text-lg leading-8 text-[#d5eadd]">
            J Nova Systems brings product thinking, interface design, engineering, and
            cloud delivery into one accountable team.
          </p>
          <div className="mt-8 grid grid-cols-2 border-l border-t border-[#29483b]">
            <strong className="display border-b border-r border-[#29483b] p-4 text-xl">
              Systems over silos
            </strong>
            <strong className="display border-b border-r border-[#29483b] p-4 text-xl">
              Clarity over theatre
            </strong>
            <strong className="display border-b border-r border-[#29483b] p-4 text-xl">
              Quality in the loop
            </strong>
            <strong className="display border-b border-r border-[#29483b] p-4 text-xl">
              Built to evolve
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const stages = ["Discover", "Design", "Build", "Scale"] as const;
export function Hero() {
  return (
    <section id="home" className="grid-surface relative border-b border-[#29483b]">
      <div className="shell grid min-h-[calc(100svh-72px)] items-center gap-8 py-16 lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative z-10 max-w-3xl">
          <h1 className="display max-w-full text-[clamp(3.35rem,8.6vw,8.5rem)] leading-[.8] text-[#effff5]">
            Digital products engineered to keep moving.
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-7 text-[#b8d2c2] sm:text-lg">
            J Nova Systems turns ambitious product ideas into web apps, mobile apps, and
            SaaS platforms—from interface to infrastructure.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              style={{ color: "#06110d" }}
              className="focus-ring bg-[#8cfbb0] px-6 py-4 font-bold transition-colors hover:bg-[#dfff4f]"
            >
              Start a project →
            </a>
            <a
              href="#projects"
              className="focus-ring border border-[#46735d] px-6 py-4 font-bold text-[#effff5] transition-colors hover:border-[#8cfbb0]"
            >
              Explore our work
            </a>
          </div>
        </div>
        <div className="relative mx-auto h-[390px] w-full max-w-[680px] lg:h-[620px]">
          <Image
            src="/assets/jnova/hero-system.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="network object-contain"
          />
          <div
            className="absolute inset-x-[5%] bottom-[3%] grid grid-cols-4 border border-[#46735d] bg-[#06110de8]"
            aria-label="Delivery stages"
          >
            {stages.map((stage, index) => (
              <div
                key={stage}
                className="border-r border-[#46735d] p-2 last:border-r-0 sm:p-3"
              >
                <span className="block text-[9px] text-[#8cfbb0]">0{index + 1}</span>
                <span className="display text-sm sm:text-lg">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import ParallaxImage from "@/app/(marketing)/components/shared/parallax-image";
import ServicesList, {
  type Service,
} from "@/app/(marketing)/components/studio/services-list";
import TeamWeb, {
  type TeamMember,
} from "@/app/(marketing)/components/studio/team-web";

export const metadata = { title: "Studio — Cray Creative" };

// ---------------------------------------------------------------------------
// Page content. Everything below is placeholder copy — swap for the real thing.
// ---------------------------------------------------------------------------

const services: Service[] = [
  {
    name: "Branding",
    description: "Names, logos and visual identities that hold up everywhere.",
    image: "/images/slide-2.webp",
  },
  {
    name: "Web Design",
    description:
      "Websites and digital products that feel as good as they look.",
    image: "/images/slide-3.webp",
  },
  {
    name: "Photography",
    description:
      "Campaign, editorial and product shoots, in studio or on location.",
    image: "/images/slide-4.webp",
  },
];

const stats = [
  { value: "2020", label: "Founded" },
  { value: "60+", label: "Projects delivered" },
  { value: "25", label: "Brands we've worked with" },
  { value: "8", label: "People in the studio" },
];

const team: TeamMember[] = [
  { name: "Famimi", role: "Creative Director", src: "/images/team/member-1.png", color: "#f4c95d" },
  { name: "Adams", role: "Content Creator", src: "/images/team/member-2.png", color: "#f28b82" },
  { name: "Tek", role: "Designer", src: "/images/team/member-3.png", color: "#8ab4f8" },
  { name: "Amara", role: "Photographer", src: "/images/team/member-4.png", color: "#c58af9" },
  { name: "Titi", role: "Developer", src: "/images/team/member-5.png", color: "#81c995" },
  { name: "Timi", role: "Artist", src: "/images/team/member-6.png", color: "#ff9e6d" },
];

const Studio = () => {
  return (
    <div className="flex flex-col gap-24 pb-40 md:gap-40">
      {/* ---------- Intro ---------- */}
      <section>
        <div className="mb-12 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h1 className="header-text flex flex-col translate-y-[0.08em]">
            <span>The</span>
            <span>Studio</span>
          </h1>
          <p className="max-w-130 text-xl md:mr-10 md:mb-1">
            Cray Creative is a small, independent studio for branding, design,
            photography and film. We work with people who care about the details
            as much as we do.
          </p>
        </div>

        <div className="relative aspect-4/5 overflow-hidden md:aspect-video">
          <ParallaxImage
            src="/images/slide-1.webp"
            alt="The Cray Creative studio"
            sizes="100vw"
            strength={12}
          />
        </div>
      </section>
      
      {/* ---------- Stats ---------- */}
      <section className="">
        <h2 className="max-w-[9em] font-heading text-[clamp(3.5rem,8vw,9rem)] uppercase leading-[0.82] tracking-[-0.02em]">
          We got tired of safe work, so we stopped making it.
        </h2>

        <div className="mt-24 grid gap-10 md:mt-40 md:grid-cols-2 md:gap-7">
          <h3 className="max-w-[10em] font-heading text-4xl uppercase leading-[0.9] md:text-5xl">
            Small on purpose. Hands-on always. We&apos;re not small.
          </h3>
          <div className="grid grid-cols-2 gap-x-7 gap-y-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-t border-foreground/20 pt-4"
              >
                <p className="font-heading text-7xl leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-lg text-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section>
        <ServicesList services={services} />
      </section>

      {/* ---------- Team ---------- */}
      <TeamWeb team={team}>
        <span>A small team,</span>
        <span>a shared obsession</span>
      </TeamWeb>

      {/* ---------- Call to action ---------- */}
      <Link
        href="/contact"
        className="group block border-t border-foreground/20 pt-6"
      >
        <span className="header-text mt-6 block translate-y-[0.08em] transition-opacity group-hover:opacity-50">
          Let&apos;s connect
        </span>
      </Link>
    </div>
  );
};

export default Studio;

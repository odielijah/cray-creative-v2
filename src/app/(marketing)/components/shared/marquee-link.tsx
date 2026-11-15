import Link from "next/link";

type MarqueeLinkProps = {
  href: string;
  children: React.ReactNode;
  /** How many times the text repeats in each half of the loop. */
  repeat?: number;
  className?: string;
};

// A full-width band of giant text that scrolls sideways forever.
// The track holds two identical halves and slides left by exactly one half
// (see the `marquee` keyframes in globals.css), so the loop has no visible seam.
const MarqueeLink = ({
  href,
  children,
  repeat = 4,
  className = "",
}: MarqueeLinkProps) => {
  return (
    <Link
      href={href}
      className={`group block overflow-hidden border-y border-foreground/20 py-4 ${className}`}
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
            {Array.from({ length: repeat }, (_, i) => (
              <span
                key={i}
                // Screen readers only need to hear the text once.
                aria-hidden={i > 0}
                className="translate-y-[0.06em] whitespace-nowrap pr-[0.3em] font-heading text-[clamp(6rem,13vw,15rem)] uppercase leading-[0.85] tracking-[-0.03em]"
              >
                {children}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Link>
  );
};

export default MarqueeLink;

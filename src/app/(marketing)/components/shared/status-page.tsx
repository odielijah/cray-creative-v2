import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type StatusPageProps = {
  /** The big heading in the middle of the screen, e.g. "404". */
  title: string;
  /** Short lines of text under the heading, one per row. */
  lines: string[];
  /** The link in the bottom-left corner. */
  link?: { label: string; href: string };
};

/**
 * Full-screen layout for "nothing to see here" pages (404, coming soon):
 * a big heading and a couple of lines centred on the screen, with a single
 * link along the bottom.
 * Expects to sit inside the pages layout (px-6 pt-30).
 */
const StatusPage = ({
  title,
  lines,
  link = { label: "Back Home", href: "/" },
}: StatusPageProps) => {
  return (
    // 7.5rem = the pages layout's top padding, so this fills the screen exactly.
    <div className="flex min-h-[calc(100svh-7.5rem)] flex-col pb-8">
      {/* Middle: takes all the spare height and centres its content in it */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center">
        {/* Font size follows the screen width so long titles still fit on
            phones, within sensible minimum and maximum sizes. */}
        <h1 className="header-text translate-y-[0.08em] text-[clamp(5rem,18vw,16rem)]">
          {title}
        </h1>
        <p className="text-xl leading-snug md:text-2xl">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Bottom: divider line and the way out */}
      <div className="border-t border-foreground/20 pt-8">
        <Link
          href={link.href}
          className="group inline-flex items-center gap-4 text-lg"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            strokeWidth={2}
          />
          {link.label}
        </Link>
      </div>
    </div>
  );
};

export default StatusPage;

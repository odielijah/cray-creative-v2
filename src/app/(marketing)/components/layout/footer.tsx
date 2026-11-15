"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinFill,
} from "@remixicon/react";
import { ChevronsUp } from "lucide-react";

type FooterLink = { label: string; href: string };

// Every link here is a real page on the site. "/404" isn't a page of its own:
// any address that doesn't exist shows the 404 page, and this is one of them.
const sitemapColumns: FooterLink[][] = [
  [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
  ],
  [
    { label: "Studio", href: "/studio" },
    { label: "Merch", href: "/merch" },
  ],
  [
    { label: "Contact", href: "/contact" },
    { label: "404", href: "/404" },
  ],
];

const socialLinks = [
  {
    label: "linkedin",
    icon: RiLinkedinFill,
    href: "https://www.linkedin.com/company/detroit-talents/",
  },
  { label: "twitter", icon: RiTwitterFill, href: "https://twitter.com/" },
  {
    label: "instagram",
    icon: RiInstagramFill,
    href: "https://www.instagram.com/detroit__paris/",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const LinkList = ({ links }: { links: FooterLink[] }) => (
  <ul className="flex flex-col">
    {links.map(({ label, href }) => (
      <li key={label}>
        <Link href={href} className="footer-link">
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

// How far a letter's ink sits in from the left edge of its box, in em.
// Every letter in a font carries a sliver of empty space on each side.
const leftGapEm = (letter: string, font: CSSStyleDeclaration) => {
  const size = 200;
  const context = document.createElement("canvas").getContext("2d");
  if (!context) return 0;
  context.font = `${font.fontWeight} ${size}px ${font.fontFamily}`;
  // actualBoundingBoxLeft is negative when the ink starts right of the origin.
  return -context.measureText(letter).actualBoundingBoxLeft / size;
};

const Footer = () => {
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const wordmarkTextRef = useRef<HTMLSpanElement>(null);

  // Stretch the wordmark so its visible letters span exactly from the left
  // edge to the right edge of the small text rows. CSS can't measure text, so
  // we measure it once here and hand the numbers to the .footer-wordmark rule
  // in globals.css, which does the sizing (and keeps it right on resize).
  useEffect(() => {
    const wordmark = wordmarkRef.current;
    const text = wordmarkTextRef.current;
    if (!wordmark || !text) return;

    let cancelled = false;

    // Wait for the heading font, or we'd measure the fallback font instead.
    document.fonts.ready.then(() => {
      if (cancelled) return;

      const font = getComputedStyle(wordmark);
      const fontSize = parseFloat(font.fontSize);
      if (!fontSize) return;

      // Full width of the text in em, including the empty slivers at the ends.
      const widthEm = text.offsetWidth / fontSize;
      // Empty space before the "C", and after the final "E" (it is mirrored,
      // so the gap that is normally on its left ends up on the right).
      const startGap = leftGapEm("C", font);
      const endGap = leftGapEm("E", font);

      wordmark.style.setProperty(
        "--wordmark-width-em",
        String(widthEm - startGap - endGap),
      );
      wordmark.style.setProperty("--wordmark-left-gap-em", String(startGap));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer
      id="footer"
      className="footer bg-[#9401fc] text-white px-6 relative flex min-h-dvh flex-col overflow-hidden pt-16 md:pt-28"
    >
      <div className="grid min-h-50 grid-cols-1 gap-16 text-[12px] md:grid-cols-4 md:gap-8">
        {/* Brand + info */}
        <div className="flex flex-col gap-16 md:col-span-4">
          <h1 className="text-4xl md:text-[50px] max-w-lg leading-[0.9] underline tracking-[-0.02em] font-bold">
            Let&apos;s work on something together
          </h1>

          <div className="grid grid-cols-1 gap-12 border-t border-white/30 pt-10 text-lg md:grid-cols-2">
            <div className="footer-section md:col-start-2">
              <div className="grid grid-cols-3">
                {sitemapColumns.map((column, i) => (
                  <div key={i} className={i === 1 ? "col-start-2" : ""}>
                    <LinkList links={column} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Wordmark */}
      <div className="mt-auto pt-16 flex flex-col w-full justify-center overflow-visible text-center">
        {/* Wraps onto two lines on narrow phones instead of squashing */}
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 mb-2 mr-1">
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-link flex gap-4 items-center cursor-pointer"
          >
            Scroll back to top
            <ChevronsUp className="w-4.5 h-4.5 mt-1" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="footer-link capitalize"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <h1 ref={wordmarkRef} aria-hidden="true" className="footer-wordmark">
          {/* inline-block so this span is exactly as wide as the text,
              which is what the effect above measures */}
          <span ref={wordmarkTextRef} className="inline-block">
            C<span className="footer-wordmark-flip mr-[-0.02em]">r</span>
            ay Creativ
            <span className="footer-wordmark-flip ml-[0.02em]">e</span>
          </span>
        </h1>

        <div className="flex justify-end gap-7 my-2 mr-1">
          <span>2026 &copy; Cray Creative. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

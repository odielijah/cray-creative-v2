"use client";
import {
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinFill,
} from "@remixicon/react";
import { ChevronsUp } from "lucide-react";

type FooterLink = { label: string; href: string };

const sitemapColumns: FooterLink[][] = [
  [
    { label: "Index", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  [
    { label: "Studio", href: "/studio" },
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
  ],
  [
    { label: "Page 404", href: "/404" },
    { label: "Terms", href: "/terms" },
    { label: "Help Center", href: "/help" },
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
        <a href={href} className="footer-link">
          {label}
        </a>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <footer
      id="footer"
      className="footer bg-[#9401fc] text-white px-6 relative flex min-h-dvh flex-col overflow-hidden pt-16 md:pt-28"
    >
      <div className="grid min-h-50 grid-cols-1 gap-16 text-[12px] md:grid-cols-4 md:gap-8">
        {/* Brand + info */}
        <div className="flex flex-col gap-16 md:col-span-4">
          <h1 className="text-4xl md:text-[50px] max-w-md leading-[0.9] tracking-tight font-bold">
            Let&apos;s work on something together
          </h1>

          <div className="grid grid-cols-1 gap-12 border-t border-white/30 pt-10 text-lg md:grid-cols-2">
            <div className="footer-section md:col-start-2">
              <h2 className="footer-heading font-medium">Sitemap</h2>
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

        <h1 aria-hidden="true" className="footer-wordmark">
          C<span className="footer-wordmark-flip mr-[-0.02em]">r</span>
          ay Creativ
          <span className="footer-wordmark-flip ml-[0.02em]">e</span>
        </h1>

        <div className="flex justify-end gap-7 my-2 mr-1">
          <span>2026 &copy; Cray Creative. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

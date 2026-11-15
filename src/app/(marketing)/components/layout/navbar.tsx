"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import Logo from "@/app/(marketing)/components/shared/logo";

// Size of the logo in the navbar: 44px tall (it is 64px at full size), with
// the width following automatically. Change h-11 to make it bigger or smaller.
const logoSize = "h-11 w-auto";

const rightLinksData = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
];

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

// Desktop links (md and up). Hidden on mobile, where the hamburger takes over.
export function RightLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center justify-end gap-[3vw] md:flex">
      {rightLinksData.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(pathname, link.href) ? "page" : undefined}
          className="pointer-events-auto aria-[current=page]:italic"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

// Full-screen menu shown on mobile when the hamburger is open.
const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname();

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-98 flex flex-col justify-end bg-background px-6 pb-10 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex flex-col gap-2">
        {rightLinksData.map((link, index) => (
          <motion.div
            key={link.href}
            // Each link slides up a little after the one before it.
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className="block font-heading text-8xl uppercase leading-[0.85] aria-[current=page]:italic"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  const closeMenu = () => setMenuOpen(false);

  // While the menu is open: stop the page scrolling behind it.
  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [menuOpen, lenis]);

  // Close the menu with the Escape key, or if the screen gets wide
  // enough to show the desktop links (e.g. rotating a tablet).
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);

    // Cleanup: remove the listeners when the menu closes.
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Blended layer: links + hamburger */}
      <header className="pointer-events-none fixed z-99 flex min-h-14 w-full items-center px-6 py-5 text-white mix-blend-difference">
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-[5vw]">
            {/* Invisible spacer so links stay where they were */}
            <div className="invisible w-13" aria-hidden>
              <Logo className={logoSize} />
            </div>
          </div>

          <RightLinks />

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="pointer-events-auto -m-2 p-2 md:hidden"
          >
            {menuOpen ? (
              <X className="h-7 w-7" strokeWidth={1.5} />
            ) : (
              <Menu className="h-7 w-7" strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </header>

      {/* Unblended layer: the real logo */}
      <div className="pointer-events-none fixed left-6 top-0 z-100 flex min-h-14 items-center py-5">
        <Link href="/" onClick={closeMenu} className="pointer-events-auto w-13">
          <Logo className={logoSize} />
        </Link>
      </div>

      {/* AnimatePresence lets the menu fade out before it's removed */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";

import Footer from "./footer";

const ConditionalFooter = () => {
  const pathname = usePathname();

  const showFooter =
    pathname === "/work" ||
    pathname.startsWith("/work/") ||
    pathname === "/studio" ||
    pathname === "/merch";

  if (!showFooter) return null;

  return <Footer />;
};

export default ConditionalFooter;

import { notFound } from "next/navigation";

// The tab title lives here because Next ignores metadata in not-found.tsx.
export const metadata = { title: "Page not found — Cray Creative" };

// Catch-all: matches every URL that no other page claims and sends it to
// not-found.tsx. Without this, unknown URLs would get Next's default 404,
// which renders outside this layout (no navbar, no page padding).
const CatchAll = () => {
  notFound();
};

export default CatchAll;

import Image from "next/image";
import type { CSSProperties } from "react";

// Placeholder products — swap names/images for real merch.
const products = [
  { name: "Cray Tee — Black", src: "/images/slide-1.webp" },
  { name: "Studio Hoodie", src: "/images/slide-2.webp" },
  { name: "Logo Cap", src: "/images/slide-3.webp" },
  { name: "Tote Bag", src: "/images/slide-4.webp" },
  { name: "Cray Tee — White", src: "/images/slide-5.webp" },
  { name: "Poster Print", src: "/images/slide-6.webp" },
  { name: "Sticker Pack", src: "/images/slide-7.webp" },
  { name: "Crewneck", src: "/images/slide-8.webp" },
  { name: "Beanie", src: "/images/slide-9.webp" },
  { name: "Zine Vol. 1", src: "/images/slide-10.webp" },
  { name: "Enamel Pin", src: "/images/slide-11.webp" },
];

// Desktop layout repeats every 4 items, zig-zagging across a 2fr/1fr/2fr/1fr grid:
// row A → big (col 1) + small (col 2, bottom-aligned)
// row B → big (col 3) + small (col 4, top-aligned)
const placement = [
  "md:col-start-1",
  "md:col-start-2 md:self-end",
  "md:col-start-3",
  "md:col-start-4",
];

const Merch = () => {
  return (
    <div className="pb-40">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-[2fr_1fr_2fr_1fr] md:gap-x-7 md:gap-y-0">
        {/* Intro — fills the empty right half of the first row on desktop */}
        <h1 className="col-span-2 mb-6 max-w-3xl text-[4rem] font-bold leading-[1.1] tracking-tight md:col-start-3 md:row-start-1 md:mb-0 md:self-start">
          Made in the studio, worn by the culture vulture ha ha blah blah.
        </h1>

        {products.map(({ name, src }, i) => (
          <article
            key={name}
            className={`group md:row-start-(--row) ${placement[i % 4]}`}
            style={{ "--row": Math.floor(i / 2) + 1 } as CSSProperties}
          >
            <div className="relative aspect-4/5 overflow-hidden bg-foreground/5">
              <Image
                src={src}
                alt={name}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="mt-2 flex justify-between gap-4 text-sm md:text-base">
              <span>{name}</span>
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Merch;

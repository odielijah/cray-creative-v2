import ParallaxImage from "@/app/(marketing)/components/shared/parallax-image";

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

// One line of text per row. Placeholder copy — swap for real lines.
const statements = [
  "Heavyweight cotton, built to outlast the trend that inspired it.",
  "Cut, printed and stitched in small runs. Once it's gone, it's gone.",
  "Heavyweight cotton, built to outlast the trend that inspired it.",
  "Every piece starts as a sketch on the studio wall.",
  "Designed for the people who make things happen.",
  "New drops land quietly. Keep an eye out.",
];

// Split the products into rows of two: [[p1, p2], [p3, p4], ...]
const rows: (typeof products)[] = [];
for (let i = 0; i < products.length; i += 2) {
  rows.push(products.slice(i, i + 2));
}

type ProductCardProps = {
  name: string;
  src: string;
  number: number;
  className: string;
};

const ProductCard = ({ name, src, number, className }: ProductCardProps) => {
  return (
    <article className={`group ${className}`}>
      <div className="relative aspect-4/5 overflow-hidden bg-foreground/5">
        {/* Drifts slowly inside its frame as the page scrolls */}
        <ParallaxImage
          src={src}
          alt={name}
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-2 flex justify-between gap-4 text-sm md:text-base">
        <span>{name}</span>
        {/* 1 → "01", 2 → "02", ... */}
        <span>{String(number).padStart(2, "0")}</span>
      </div>
    </article>
  );
};

const Merch = () => {
  return (
    <div className="flex flex-col gap-y-10 pb-40 md:gap-y-20 lg:gap-y-30">
      {rows.map((rowProducts, rowIndex) => {
        // Phones and tablets: 2 columns — the text on top, then the two products.
        // Desktop (lg and up): 4 columns (big, small, big, small).
        // Rows take turns:
        //   even rows → products on the left (cols 1–2), text on the right (cols 3–4)
        //   odd rows  → text on the left (cols 1–2), products on the right (cols 3–4)
        const isEvenRow = rowIndex % 2 === 0;

        const textColumn = isEvenRow ? "lg:col-start-3" : "lg:col-start-1";
        const productColumns = isEvenRow
          ? ["lg:col-start-1", "lg:col-start-2 lg:self-end"] // small one sits at the bottom
          : ["lg:col-start-3", "lg:col-start-4"];

        const textClass = `col-span-2 mb-6 max-w-4xl text-[clamp(2.25rem,8vw,5.5rem)] font-heading leading-[1.1] tracking-[-0.02em] lg:row-start-1 lg:mb-0 lg:self-start ${textColumn}`;
        const statement = statements[rowIndex];

        return (
          <div
            key={rowIndex}
            className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-7 lg:grid-cols-[2fr_1fr_2fr_1fr]"
          >
            {/* The first row's text is the page heading */}
            {statement && rowIndex === 0 && (
              <h1 className={textClass}>{statement}</h1>
            )}
            {statement && rowIndex > 0 && (
              <p className={textClass}>{statement}</p>
            )}

            {rowProducts.map((product, j) => (
              <ProductCard
                key={product.name}
                name={product.name}
                src={product.src}
                number={rowIndex * 2 + j + 1}
                className={`lg:row-start-1 ${productColumns[j]}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Merch;

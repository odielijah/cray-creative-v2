"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export type Service = {
  name: string;
  description: string;
  /** Image shown in the floating card while the row is hovered. */
  image: string;
};

type ServicesListProps = {
  services: Service[];
};

/**
 * The services rows. Hovering a row turns it black edge to edge and shows a
 * portrait image card that follows the cursor up and down only: its
 * horizontal position never changes.
 */
const ServicesList = ({ services }: ServicesListProps) => {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cursor height measured from the top of the list, smoothed so the card
  // trails slightly behind the pointer. Only Y is tracked, never X.
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 });

  const cursorY = (event: React.PointerEvent) =>
    event.clientY - (wrapperRef.current?.getBoundingClientRect().top ?? 0);

  return (
    <div ref={wrapperRef} className="relative">
      {/* -mx-6 / px-6: the rows run edge to edge so the black fill is
          full-bleed, while the text stays lined up with the rest of the page. */}
      <ul
        className="-mx-6 mt-8 border-t border-foreground/20"
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") y.set(cursorY(event));
        }}
        onPointerLeave={() => setActive(null)}
      >
        {services.map((service, index) => (
          <li
            key={service.name}
            data-active={active === index}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse") return;
              // Start the card at the cursor instead of sliding in from afar.
              if (active === null) {
                y.set(cursorY(event));
                smoothY.jump(cursorY(event));
              }
              setActive(index);
            }}
            // items-baseline-last: the three columns sit on one shared text
            // baseline (the last line of each), so the big name lines up with
            // the smaller text despite the extra space its font has below it.
            className="group grid gap-2 border-b border-foreground/20 px-6 py-6 transition-colors duration-200 data-[active=true]:bg-foreground data-[active=true]:text-background md:grid-cols-4 md:items-baseline-last md:gap-7"
          >
            <span className="hidden text-lg text-foreground/50 transition-colors duration-200 group-data-[active=true]:text-background/50 md:block">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-heading text-6xl uppercase leading-[0.85] md:col-span-2 md:text-8xl">
              {service.name}
            </h2>
            <p className="text-lg leading-tight text-foreground/70 transition-colors duration-200 group-data-[active=true]:text-background/70">
              {service.description}
            </p>
          </li>
        ))}
      </ul>

      {/* Image card. Horizontally it is locked to the third column, between
          the service name and its description (this
          overlay repeats the rows' grid so it lines up); vertically it follows
          the cursor. pointer-events-none keeps it from stealing the hover
          from the rows underneath. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden items-start gap-7 md:grid md:grid-cols-4"
      >
        <motion.div
          className="w-3/4 max-w-60 justify-self-end md:col-start-3"
          style={{ y: reduceMotion ? y : smoothY }}
        >
          <motion.div
            // Pulled up by half its height so it is centred on the cursor.
            // All images stay mounted and cross-fade between services.
            className="relative aspect-3/4 -translate-y-1/2 overflow-hidden bg-foreground/10"
            initial={false}
            animate={{
              opacity: active === null ? 0 : 1,
              scale: active === null ? 0.85 : 1,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          >
            {services.map((service, index) => (
              <Image
                key={service.name}
                src={service.image}
                alt=""
                fill
                sizes="240px"
                className={`object-cover transition-opacity duration-300 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesList;

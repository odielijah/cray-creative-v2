"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

export type TeamMember = {
  name: string;
  role: string;
  src: string;
  /** Background colour of the avatar circle. */
  color: string;
};

// Pill centres as [x%, y%] of the section, in the same order as the team
// array. The line below is drawn through these points in order, so if you move
// a pill, move the matching point in the path too.
const DESKTOP_POINTS = [
  [47.5, 14.4],
  [83.1, 27.8],
  [86.3, 71.1],
  [56.3, 88.9],
  [18.8, 77.8],
  [14.4, 33.3],
];
const MOBILE_POINTS = [
  [30, 6.6],
  [71.3, 18.4],
  [32.5, 30.3],
  [67.5, 69.7],
  [31.3, 81.6],
  [70, 93.4],
];

// viewBox 1600 x 900
const DESKTOP_PATH =
  "M 760 130 C 900 170, 980 -20, 1150 40 S 1420 120, 1330 250 S 1560 420, 1380 640 S 1050 700, 900 800 C 750 900, 560 860, 560 760 C 560 680, 660 680, 650 760 C 640 840, 420 800, 300 700 C 180 560, 420 420, 700 520 S 1150 700, 1180 420 S 900 250, 700 330 S 330 420, 230 300 C 300 150, 520 60, 760 130";
// viewBox 400 x 760
const MOBILE_PATH =
  "M 120 50 C 260 0, 400 70, 285 140 C 200 190, 20 130, 130 230 C 220 310, 400 260, 340 380 C 290 480, 60 380, 60 470 C 60 540, 200 500, 270 530 C 360 570, 40 540, 125 620 C 190 690, 380 620, 280 710";

const DRAW_DURATION = 3.5;

const TeamWeb = ({
  team,
  children,
}: {
  team: TeamMember[];
  /** The headline shown in the middle of the web. */
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const show = inView || reduceMotion;

  const line = (d: string, viewBox: string, strokeWidth: number, className: string) => (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full overflow-visible ${className}`}
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          pathLength: {
            duration: reduceMotion ? 0 : DRAW_DURATION,
            ease: "easeInOut",
          },
          opacity: { duration: 0.01 },
        }}
      />
    </svg>
  );

  return (
    <section
      ref={ref}
      className="relative aspect-400/760 md:aspect-video"
    >
      <h2 className="absolute inset-0 flex flex-col items-center justify-center text-center font-heading text-[11vw] uppercase leading-[0.85] tracking-[-0.02em] md:text-[8.5vw]">
        {children}
      </h2>

      {line(DESKTOP_PATH, "0 0 1600 900", 1.5, "hidden md:block")}
      {line(MOBILE_PATH, "0 0 400 760", 1, "md:hidden")}

      <ul>
        {team.map((person, i) => {
          const [x, y] = DESKTOP_POINTS[i % DESKTOP_POINTS.length];
          const [mx, my] = MOBILE_POINTS[i % MOBILE_POINTS.length];
          return (
            <li
              key={person.name}
              style={
                {
                  "--x": `${x}%`,
                  "--y": `${y}%`,
                  "--mx": `${mx}%`,
                  "--my": `${my}%`,
                } as CSSProperties
              }
              className="absolute left-(--mx) top-(--my) -translate-x-1/2 -translate-y-1/2 md:left-(--x) md:top-(--y)"
            >
              <motion.div
                title={person.name}
                className="flex items-center gap-[0.5em] whitespace-nowrap rounded-full border border-foreground bg-background p-[0.3em] pr-[0.8em] font-heading text-[clamp(1.25rem,2.6vw,2.75rem)] uppercase leading-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={show ? { scale: 1, opacity: 1 } : undefined}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        // Pop in roughly as the line reaches the pill.
                        delay: (i / team.length) * DRAW_DURATION * 0.8,
                      }
                }
                whileHover={{ scale: 1.06 }}
              >
                <span
                  className="relative block size-[1.6em] shrink-0 overflow-hidden rounded-full"
                  style={{ backgroundColor: person.color }}
                >
                  <Image
                    src={person.src}
                    alt={person.name}
                    fill
                    sizes="80px"
                    className="object-contain p-[12%]"
                  />
                </span>
                <span className="translate-y-[0.06em]">{person.role}</span>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TeamWeb;

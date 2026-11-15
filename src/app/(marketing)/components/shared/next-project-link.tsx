"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { Work } from "@/app/(marketing)/constants/works";

/**
 * Big "next project" title; on hover (fine pointers only) a preview of the
 * project's image fades in and trails the cursor.
 */
const NextProjectLink = ({ work }: { work: Work }) => {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 300, damping: 30, mass: 0.5 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <Link
      href={`/work/${work.id}`}
      onMouseEnter={(e) => {
        handleMove(e);
        // Snap the spring to the entry point so the image doesn't fly in from 0,0.
        springX.jump(x.get());
        springY.jump(y.get());
        setHovered(true);
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => setHovered(false)}
      className="group relative mt-24 block border-t border-foreground/20 pt-6 md:mt-32"
    >
      <span className="flex justify-between text-lg tracking-wide text-foreground/50">
        <span>Next project</span>
        <span>{work.category}</span>
      </span>
      <span className="header-text relative z-10 mt-6 block translate-y-[0.08em]">
        {work.title}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-0 hidden aspect-4/5 w-64 overflow-hidden pointer-fine:block lg:w-80"
            style={{
              x: reduceMotion ? x : springX,
              y: reduceMotion ? y : springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={work.src}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default NextProjectLink;

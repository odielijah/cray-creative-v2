"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  /** How far the image drifts, as a % of the frame height in each direction. */
  strength?: number;
  className?: string;
};

/**
 * Fills its (relatively positioned, overflow-hidden) parent and drifts the image
 * vertically as the frame scrolls through the viewport.
 */
const ParallaxImage = ({
  src,
  alt,
  sizes,
  strength = 10,
  className = "",
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          // Oversize the image so the drift never reveals an edge.
          top: `-${strength}%`,
          bottom: `-${strength}%`,
          y: reduceMotion ? 0 : y,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;

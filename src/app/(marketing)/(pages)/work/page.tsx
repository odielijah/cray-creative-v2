"use client";

import { useState } from "react";
import ParallaxImage from "@/app/(marketing)/components/shared/parallax-image";
import { ChevronsDown, ChevronDown } from "lucide-react";
import Link from "next/link";
import { works } from "@/app/(marketing)/constants/works";

const content = works;

const categories = [
  "All Work",
  ...Array.from(new Set(content.map((item) => item.category))),
];

const Work = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredContent =
    activeCategory === "All Work"
      ? content
      : content.filter((item) => item.category === activeCategory);

  return (
    <div className="relative pb-40 flex flex-col gap-5">
      {/* Heading + intro: stacked on mobile, side by side from md up */}
      <div className="flex flex-col gap-8 mb-12 md:flex-row md:justify-between md:items-end md:mb-20">
        <h1 className="flex flex-col header-text translate-y-[0.08em]">
          <span>Our</span>
          <span>
            Wor<span className="inline-block -scale-x-100 ml-[0.02em]">k</span>
          </span>
        </h1>
        <p className="max-w-130 text-lg md:text-xl md:mr-10 md:mb-1 md:translate-y-20">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
          temporibus dolorum nostrum sit doloribus nam scum. Odit, autem
          doloribus delectus?
        </p>
      </div>

      <h2 className="text-3xl font-bold">2020 - Present</h2>
      <div className="bg-black/10 h-px my-5" />

      <div className="grid grid-cols-2 gap-6 justify-center mb-10 md:mb-15 text-base md:text-lg">
        <div>
          <button
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              document.getElementById("work-grid")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Scroll to Explore
            <ChevronsDown className="w-5 h-5 mt-1" strokeWidth={1.5} />
          </button>
        </div>

        <div>
          <button
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            Categories
            <ChevronDown className="w-5 h-5 mt-1" strokeWidth={1.5} />
          </button>
        </div>

        {openDropdown && (
          // Full width on mobile, right-hand column from md up
          <div className="font-heading col-span-2 py-5 text-4xl max-w-150 md:col-span-1 md:col-start-2 md:text-6xl">
            {categories.map((category, index) => (
              <span key={category}>
                <button
                  className={`cursor-pointer ${
                    activeCategory === category
                      ? "underline"
                      : "text-foreground/20"
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                  }}
                >
                  {category}
                </button>
                {index < categories.length - 1 && (
                  <span
                    className={
                      activeCategory === category
                        ? "text-foreground"
                        : "text-foreground/20"
                    }
                  >
                    ,{" "}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        id="work-grid"
        className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6"
      >
        {filteredContent.map((item) => (
          <div key={item.id} className="group">
            <span className="pb-3 flex justify-start">
              {String(item.id).padStart(2, "0")}
            </span>

            <Link
              href={`/work/${item.id}`}
              className="group relative block aspect-4/5 overflow-hidden cursor-pointer"
            >
              <ParallaxImage
                src={item.src}
                alt={item.title}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </Link>

            {/* Title and category stack on mobile, share a line from md up */}
            <div className="flex flex-col pt-3 text-sm md:flex-row md:items-center md:justify-between md:gap-4 md:text-base">
              <span>{item.title}</span>
              <h3 className="text-foreground/50">{item.category}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

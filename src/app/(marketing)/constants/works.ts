export interface Work {
  id: number;
  src: string;
  title: string;
  category: string;
}

export const works: Work[] = [
  {
    id: 1,
    src: "/images/slide-1.webp",
    title: "Festival Experience",
    category: "Festival",
  },
  {
    id: 2,
    src: "/images/slide-2.webp",
    title: "Visual Stories",
    category: "Photography",
  },
  {
    id: 3,
    src: "/images/slide-5.webp",
    title: "Motion Pictures",
    category: "Videography",
  },
  {
    id: 4,
    src: "/images/slide-6.webp",
    title: "Identity Design",
    category: "Branding",
  },
  {
    id: 5,
    src: "/images/slide-4.webp",
    title: "Digital Experiences",
    category: "Web Design",
  },
  {
    id: 6,
    src: "/images/slide-3.webp",
    title: "Frames of Life",
    category: "Photography",
  },
  {
    id: 7,
    src: "/images/slide-7.webp",
    title: "Culture in Motion",
    category: "Festival",
  },
  {
    id: 8,
    src: "/images/slide-11.webp",
    title: "Brand Language",
    category: "Branding",
  },
  {
    id: 9,
    src: "/images/slide-9.webp",
    title: "Moving Images",
    category: "Videography",
  },
];

export const getWork = (id: number) => works.find((work) => work.id === id);

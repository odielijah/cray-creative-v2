import Link from "next/link";
import { notFound } from "next/navigation";
import NextProjectLink from "@/app/(marketing)/components/shared/next-project-link";
import ParallaxImage from "@/app/(marketing)/components/shared/parallax-image";
import { getWork, works } from "@/app/(marketing)/constants/works";

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () =>
  works.map((work) => ({ id: String(work.id) }));

export const generateMetadata = async ({ params }: Props) => {
  const work = getWork(Number((await params).id));
  return { title: work ? `${work.title} — Cray Creative` : "Work" };
};

const WorkDetail = async ({ params }: Props) => {
  const work = getWork(Number((await params).id));
  if (!work) notFound();

  const index = works.findIndex((w) => w.id === work.id);
  const next = works[(index + 1) % works.length];
  // Placeholder gallery: borrow neighbouring images until real project shots exist.
  const gallery = [1, 2, 3].map((n) => works[(index + n) % works.length]);

  return (
    <article className="pb-40">
      <Link
        href="/work"
        className="text-lg tracking-wide text-foreground/50 transition-opacity hover:opacity-50"
      >
        Back to projects
      </Link>

      <h1 className="header-text mt-12 mb-10 translate-y-[0.08em] md:mt-16 md:mb-14">
        {work.title}
      </h1>

      {/* Hero */}
      <div className="relative aspect-4/5 overflow-hidden md:aspect-video">
        <ParallaxImage src={work.src} alt={work.title} sizes="100vw" strength={12} />
      </div>

      {/* Meta */}
      <div className="mt-6 grid gap-6 border-t border-foreground/20 pt-6 text-lg md:grid-cols-4">
        <p className="text-foreground/50">
          {String(work.id).padStart(2, "0")}
        </p>
        <p>{work.category}</p>
        <p className="leading-tight md:col-span-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde,
          temporibus dolorum nostrum sit doloribus nam. Odit, autem doloribus
          delectus?
        </p>
      </div>

      {/* Gallery */}
      <div className="mt-24 grid gap-6 md:mt-32 md:grid-cols-2">
        {gallery.map((item, i) => (
          <div
            key={item.id}
            className={`relative overflow-hidden ${
              i === 2 ? "aspect-4/5 md:col-span-2 md:aspect-video" : "aspect-4/5"
            }`}
          >
            <ParallaxImage
              src={item.src}
              alt=""
              sizes={i === 2 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            />
          </div>
        ))}
      </div>

      {/* Next project */}
      <NextProjectLink work={next} />
    </article>
  );
};

export default WorkDetail;

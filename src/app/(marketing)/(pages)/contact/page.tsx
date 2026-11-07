import React from "react";

const EMAIL = "cray.creative@gmail.com";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
];

const label = "flex flex-col text-sm text-foreground";

const field =
  "w-full border-b border-foreground/30 bg-transparent pb-3 pt-2 text-lg outline-none transition-colors placeholder:text-foreground/35 focus:border-foreground";

const Contact = () => {
  return (
    <div className="">
      <section className="">
        <div className="mb-16 flex flex-col gap-10 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h1 className="flex flex-col justify-center header-text text-[24rem] translate-y-[0.08em]">
            say hello.
          </h1>
        </div>

        {/* Contact details + form */}
        <div className="grid gap-16 pt-12 md:grid-cols-2 md:gap-20 md:pt-16">
          <div className="flex flex-col items-start gap-6">
            <p className="text-lg text-foreground/60">
              Prefer to write directly?
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="w-fit text-[clamp(2rem,4.4vw,4.25rem)] font-heading leading-[0.95] tracking-[-0.02em] transition-opacity hover:opacity-60"
              >
                {EMAIL.split("@")[0]}
                <br />@{EMAIL.split("@")[1]}
              </a>

              <ul className="flex items-center text-lg text-foreground/50">
                {SOCIALS.map(({ label, href }, i) => (
                  <li key={label} className="flex items-center">
                    {i > 0 && (
                      <span className="mx-4" aria-hidden="true">
                        |
                      </span>
                    )}
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form className="flex flex-col gap-8 text-foreground">
            <label className={label}>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Name"
                className={field}
              />
            </label>

            <label className={label}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className={field}
              />
            </label>

            <label className={label}>
              <textarea
                name="project"
                rows={1}
                placeholder="What's your project about?"
                className={`${field} resize-none`}
              />
            </label>

            <button
              type="submit"
              className="w-fit text-lg underline underline-offset-2 transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

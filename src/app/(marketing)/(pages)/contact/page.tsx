const EMAIL = "greetings@cray.com";

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
    <div className="pb-24 md:pb-40">
      <section>
        {/* Font size follows the screen width (24vw), but never below 4.5rem
            or above 24rem, so the heading always fits on one line. */}
        <h1 className="header-text mb-10 translate-y-[0.08em] whitespace-nowrap text-[clamp(4.5rem,24vw,24rem)] md:mb-20">
          say hello.
        </h1>

        {/* Contact details + form: stacked on mobile, side by side from md up */}
        <div className="grid gap-16 pt-8 md:grid-cols-2 md:gap-20 md:pt-16">
          <div className="flex flex-col items-start">
            <p className="text-lg text-foreground/60">
              Prefer to write directly?
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="w-fit text-[clamp(2rem,4.4vw,4rem)] font-bold pb-6 leading-[0.95] tracking-tighter underline transition-opacity hover:opacity-60"
            >
              {EMAIL.split("@")[0]}
              <br />@{EMAIL.split("@")[1]}
            </a>

            <ul className="flex flex-wrap items-center gap-y-2 text-lg text-foreground/50">
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

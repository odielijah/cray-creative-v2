"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  timeZone: string;
  className?: string;
};

const format = (timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

const LocalTime = ({ timeZone, className }: LocalTimeProps) => {
  // Rendered only on the client to avoid a server/client hydration mismatch.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format(timeZone));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
};

export default LocalTime;

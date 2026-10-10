import { useEffect, useState } from "react";

const format = (lang) =>
  new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: lang !== "bn",
  }).format(new Date());

// Live clock for Dhaka, so visitors in other time zones know when I'm around.
export default function useDhakaTime(lang = "en") {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 15_000);
    return () => clearInterval(id);
  }, []);

  return format(lang);
}

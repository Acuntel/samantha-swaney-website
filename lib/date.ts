// Pure date helpers — safe to import from both server and client components
// (no node:fs, unlike lib/blog.ts / lib/properties.ts).

// "2026-05-27" -> "May 27, 2026". Parsed as UTC noon so the calendar day never
// shifts across timezones.
export function formatPostDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

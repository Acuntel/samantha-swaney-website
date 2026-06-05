// Browser-only helpers for the admin "Export to publish" flow. No backend.

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "application/json" });
  triggerDownload(filename, URL.createObjectURL(blob));
}

export function downloadFile(filename: string, file: Blob) {
  triggerDownload(filename, URL.createObjectURL(file));
}

function triggerDownload(filename: string, href: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 4000);
}

export function sanitizeFilename(name: string) {
  return name.replace(/[^a-z0-9.\-_]/gi, "-").toLowerCase();
}

// "836 Lyford Lane" + "Elmhurst" -> "836-lyford-lane-elmhurst"
export function slugify(...parts: string[]) {
  return (
    parts
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80) || "listing"
  );
}

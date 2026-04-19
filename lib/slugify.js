export function slugify(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function playSlug(play) {
  return `${play.id}-${slugify(play.title || "")}`;
}

export function parsePlayId(slug) {
  const id = parseInt(slug, 10);
  return isNaN(id) ? null : id;
}

export async function fetchImages() {
  const res = await fetch("/api/landingpageimg");
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await res.json();
  return data;
}

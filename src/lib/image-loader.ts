// next/image loader for the static export (GitHub Pages): images are served as-is
// (no optimisation server), with the deploy base path prefixed onto local paths.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // Statically imported images already include the base path.
  const url = src.startsWith("/") && !src.startsWith(`${basePath}/`) ? `${basePath}${src}` : src;
  return `${url}?w=${width}`;
}

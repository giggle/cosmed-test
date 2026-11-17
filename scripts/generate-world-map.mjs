/**
 * Fetches world-atlas 110m TopoJSON from jsDelivr CDN and converts it to a
 * pre-projected equirectangular SVG path string — zero runtime dependencies.
 *
 * Output: src/lib/world-map-data.ts
 * viewBox: "0 0 1000 500"
 *
 * Run: node scripts/generate-world-map.mjs
 */

import https from "node:https";
import fs from "node:fs";

const URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const W = 1000;
const H = 500;

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(JSON.parse(data)));
      res.on("error", reject);
    });
  });
}

// Decode a single TopoJSON arc from delta-encoded coords → [lng, lat]
function decodeArc(arc, scale, translate) {
  let x = 0,
    y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
}

// Project [lng, lat] → SVG [x, y] (equirectangular)
function project([lng, lat]) {
  return [(lng + 180) / 360 * W, (90 - lat) / 180 * H];
}

// One coordinate ring (flat array of [lng,lat]) → SVG path segment
function ringToSvg(ring) {
  return (
    ring
      .map(([lng, lat], i) => {
        const [x, y] = project([lng, lat]);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

function processGeometry(geom, arcs, scale, translate) {
  const getArc = (i) => {
    const decoded = decodeArc(arcs[i < 0 ? ~i : i], scale, translate);
    return i < 0 ? decoded.reverse() : decoded;
  };

  if (geom.type === "Polygon") {
    return geom.arcs.map((ring) => ring.flatMap(getArc));
  }
  if (geom.type === "MultiPolygon") {
    return geom.arcs.flatMap((poly) => poly.map((ring) => ring.flatMap(getArc)));
  }
  return [];
}

async function main() {
  console.log("Fetching world-atlas 110m TopoJSON…");
  const topo = await get(URL);

  const { scale, translate } = topo.transform;
  // land is a GeometryCollection — grab the single geometry inside it
  const land = topo.objects.land;
  const geom =
    land.type === "GeometryCollection" ? land.geometries[0] : land;

  const rings = processGeometry(geom, topo.arcs, scale, translate);
  const pathData = rings.map(ringToSvg).join(" ");

  const out = `// Auto-generated — do not edit. Run: node scripts/generate-world-map.mjs
// Source: world-atlas@2 110m, equirectangular projection, viewBox "0 0 1000 500"
export const WORLD_MAP_PATH = \`${pathData}\`;
`;

  fs.writeFileSync("src/lib/world-map-data.ts", out);
  console.log(`Done. Path data: ${(pathData.length / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

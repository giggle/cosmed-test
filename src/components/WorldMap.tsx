"use client";

import { motion } from "framer-motion";
import { WORLD_MAP_PATH } from "@/lib/world-map-data";

// Equirectangular projection, viewBox "0 0 1000 500"
// x = (lng + 180) / 360 * 1000,  y = (90 - lat) / 180 * 500
const MARKERS = [
  { countryId: 0, label: "Abuja",  cx: 520.6, cy: 224.7 }, // Nigeria
  { countryId: 1, label: "New Delhi", cx: 714.5, cy: 170.5 }, // India
  { countryId: 2, label: "Accra",  cx: 499.4, cy: 234.4 }, // Ghana
  { countryId: 3, label: "Dubai",  cx: 653.6, cy: 179.7 }, // Dubai
];

export default function WorldMap({ activeCountry }: { activeCountry: number }) {
  return (
    <motion.svg
      viewBox="0 0 1000 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2 }}
    >
      {/* Land masses */}
      <path
        d={WORLD_MAP_PATH}
        fill="rgba(255,255,255,0.07)"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      {/* Markers */}
      {MARKERS.map((m) => {
        const active = m.countryId === activeCountry;
        return (
          <g key={m.label}>
            {/* Outer pulsing ring */}
            <motion.g
              style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
              animate={{
                scale: [1, active ? 3.5 : 2.8, 1],
                opacity: [active ? 0.7 : 0.35, 0, active ? 0.7 : 0.35],
              }}
              transition={{
                duration: active ? 1.5 : 2.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <circle
                cx={m.cx}
                cy={m.cy}
                r={active ? 7 : 5}
                fill="none"
                stroke="#F5922E"
                strokeWidth={active ? 1.5 : 1}
              />
            </motion.g>

            {/* Core dot */}
            <motion.circle
              cx={m.cx}
              cy={m.cy}
              fill={active ? "#F5922E" : "rgba(245,146,46,0.6)"}
              animate={{ r: active ? 4.5 : 3 }}
              transition={{ duration: 0.3 }}
            />

            {/* City label — active only */}
            {active && (
              <motion.text
                x={m.cx}
                y={m.cy - 12}
                textAnchor="middle"
                fill="#F5922E"
                fontSize="9"
                fontFamily="DM Sans, sans-serif"
                fontWeight="600"
                letterSpacing="0.5"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {m.label}
              </motion.text>
            )}
          </g>
        );
      })}
    </motion.svg>
  );
}

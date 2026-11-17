"use client";

import { useEffect, useState } from "react";

export default function PdfMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("pdf") !== "1") return;
    document.body.dataset.pdf = "1";
    requestAnimationFrame(() => {
      setEnabled(true);
    });
    return () => {
      delete document.body.dataset.pdf;
    };
  }, []);

  if (!enabled) return null;

  return (
    <style>{`
      [data-pdf="1"] *,
      [data-pdf="1"] *::before,
      [data-pdf="1"] *::after {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }
      [data-pdf="1"] [style*="position: sticky"],
      [data-pdf="1"] [style*="position:sticky"],
      [data-pdf="1"] header {
        position: static !important;
      }
    `}</style>
  );
}

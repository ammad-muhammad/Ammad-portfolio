"use client";
import { useState, useEffect } from "react";
import { PageLoader } from "./page-loader";

import { SmoothScrolling } from "./smooth-scrolling";

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <PageLoader onComplete={handleComplete} />
      ) : (
        <SmoothScrolling>
          <div className="animate-in fade-in duration-700">{children}</div>
        </SmoothScrolling>
      )}
    </>
  );
}

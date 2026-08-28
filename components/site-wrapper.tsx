"use client";
import { SmoothScrolling } from "./smooth-scrolling";

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrolling>
      {children}
    </SmoothScrolling>
  );
}

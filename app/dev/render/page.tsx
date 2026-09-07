"use client";

import dynamic from "next/dynamic";

const RenderLab = dynamic(() => import("./RenderLab").then((m) => m.RenderLab), { ssr: false });

/** Dev-only: renders one product model on a transparent canvas for still images. */
export default function RenderPage() {
  return <RenderLab />;
}

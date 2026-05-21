"use client";

import dynamic from "next/dynamic";

const Body = dynamic(() => import("./body"), {
  ssr: false,
  loading: () => null,
});

export default function CSRPage() {
  return <Body />;
}

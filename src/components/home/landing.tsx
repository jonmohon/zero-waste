"use client";

import { useEffect } from "react";

type Props = {
  html: string;
  script: string;
};

export function Landing({ html, script }: Props) {
  useEffect(() => {
    const el = document.createElement("script");
    el.textContent = script;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [script]);

  return <div className="landing-root" dangerouslySetInnerHTML={{ __html: html }} />;
}

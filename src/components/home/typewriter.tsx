/**
 * Typewriter — animated text cycling effect for the shop collections header.
 * Cycles through a list of words with a typing/deleting animation.
 * Small client component to minimize client JS footprint.
 *
 * @param words - array of strings to cycle through
 */
"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  words: string[];
}

export function Typewriter({ words }: TypewriterProps) {
  const [display, setDisplay] = useState(words[0]);
  const stateRef = useRef({ wi: 0, ci: words[0].length, del: true });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function tick() {
      const s = stateRef.current;
      const word = words[s.wi];

      if (!s.del) {
        s.ci++;
        setDisplay(word.slice(0, s.ci));
        if (s.ci === word.length) {
          s.del = true;
          timerRef.current = setTimeout(tick, 1800);
          return;
        }
        timerRef.current = setTimeout(tick, 110);
      } else {
        s.ci--;
        setDisplay(word.slice(0, s.ci));
        if (s.ci === 0) {
          s.del = false;
          s.wi = (s.wi + 1) % words.length;
          timerRef.current = setTimeout(tick, 300);
          return;
        }
        timerRef.current = setTimeout(tick, 60);
      }
    }

    /* Start deleting the first word after an initial pause */
    timerRef.current = setTimeout(tick, 1800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words]);

  return (
    <span className="border-r-4 border-blue pr-1 animate-type-blink">
      {display}
    </span>
  );
}

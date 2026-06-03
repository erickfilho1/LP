"use client";

import { useEffect, useRef } from "react";

const interactiveSelector =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="action"]';

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!cursor || !canUseCustomCursor) {
      return;
    }

    document.body.classList.add("has-haki-cursor");

    const moveCursor = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");

      const target = event.target instanceof Element ? event.target : null;
      const isCaseSlide = Boolean(target?.closest(".umano-case-slide"));
      const isInteractive = Boolean(target?.closest(interactiveSelector));

      cursor.classList.toggle("is-hidden", isCaseSlide);
      cursor.classList.toggle("is-active", isInteractive && !isCaseSlide);
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible", "is-active");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      document.body.classList.remove("has-haki-cursor");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, []);

  return <div ref={cursorRef} className="haki-global-cursor" aria-hidden="true" />;
}

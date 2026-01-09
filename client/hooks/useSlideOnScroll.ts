"use client";

import {useEffect, useRef } from "react";
import { UseSlideOnScrollOptions } from "@/types/effects.types";

export function useSlideOnScroll<T extends HTMLElement>({
    // Shape of Observer box
    rootMargin = "0px 0px 0px 0px", // trbl
    // how much of the element must be inside the Observer box
    threshold = 0, // 0-1
    // controls whether the element comes back
    once = false,
}: UseSlideOnScrollOptions = {}) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) return;

        let didSlide = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    if (once && didSlide) return;
                    el.dataset.slide = "out";
                    didSlide = true;
                } else if (!once) {
                    el.dataset.slide = "in";
                }
            },
            { rootMargin, threshold }
        );

        el.dataset.slide = "in";

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin, threshold, once]);

    return ref;
}
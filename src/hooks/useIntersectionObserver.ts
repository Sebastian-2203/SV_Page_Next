"use client";

import { useEffect, useRef } from "react";

export function useIntersectionObserver(
    options = { threshold: 0.15, rootMargin: "0px" }
) {
    const elementsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observerInstance.unobserve(entry.target);
                }
            });
        }, options);

        const currentElements = elementsRef.current;
        currentElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            currentElements.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [options]);

    const setRef = (el: HTMLElement | null, index: number) => {
        if (el) {
            elementsRef.current[index] = el;
        }
    };

    return { setRef };
}

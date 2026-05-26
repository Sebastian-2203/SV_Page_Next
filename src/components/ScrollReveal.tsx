"use client";

import React, { useEffect, useRef, useMemo, ReactNode, isValidElement, cloneElement, Children } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement | null>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
    as?: React.ElementType;
}

const ScrollReveal = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom',
    as: Component = "span"
}: ScrollRevealProps) => {
    const containerRef = useRef<any>(null);

    const splitText = useMemo(() => {
        const processNode = (node: ReactNode, keyPrefix = "0"): ReactNode => {
            if (typeof node === "string") {
                return node.split(/(\s+)/).map((word, index) => {
                    if (word.match(/^\s+$/)) return word;
                    return (
                        <span className="word" key={`${keyPrefix}-${index}`}>
                            {word}
                        </span>
                    );
                });
            }
            if (isValidElement(node)) {
                if (node.type === 'br') return node;
                const props = node.props as any;
                if (props && props.children) {
                    const mappedChildren = Children.map(props.children, (child, idx) => processNode(child, `${keyPrefix}-${idx}`));
                    return cloneElement(node, { ...props, key: keyPrefix }, mappedChildren);
                }
                return node;
            }
            if (Array.isArray(node)) {
                return node.map((child, idx) => processNode(child, `${keyPrefix}-${idx}`));
            }
            return node;
        };

        return processNode(children);
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        const ctx = gsap.context(() => {
            // Give GSAP time to ensure the DOM has painted all nested React nodes
            setTimeout(() => {
                const wordElements = el.querySelectorAll('.word');
                if (!wordElements.length) return;

                // Ensure initial invisible state is explicitly applied before trigger computation
                gsap.set(wordElements, { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' });

                gsap.fromTo(
                    el,
                    { transformOrigin: '0% 50%', rotate: baseRotation },
                    {
                        ease: 'none',
                        rotate: 0,
                        scrollTrigger: {
                            trigger: el,
                            scroller,
                            start: 'top bottom+=100px', // trigger slightly later when it's fully into view
                            end: rotationEnd,
                            scrub: true
                        }
                    }
                );

                gsap.to(wordElements, {
                    ease: 'none',
                    opacity: 1,
                    filter: 'blur(0px)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: 'top bottom-=10%', // trigger when a bit higher
                        end: wordAnimationEnd,
                        scrub: true
                    }
                });
            }, 50);

        }, containerRef);

        return () => ctx.revert();
    }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

    return (
        <Component ref={containerRef} className={`scroll-reveal ${containerClassName} ${textClassName}`}>
            {splitText}
        </Component>
    );
};

export default ScrollReveal;

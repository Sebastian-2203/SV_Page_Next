import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...rest }, ref) => (
    <div ref={ref} {...rest} className={`card ${className ?? ''}`.trim()}>
        <div className="card-content">
            {children}
        </div>
    </div>
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el: Element, slot: any, skew: number, isFront: boolean) => {
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        opacity: isFront ? 1 : 0.4,
        force3D: true
    });
    const content = el.querySelector('.card-content');
    if (content) {
        gsap.set(content, {
            filter: isFront ? 'blur(0px)' : 'blur(12px)'
        });
    }
};

export interface CardSwapProps {
    width?: number | string;
    height?: number | string;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (index: number) => void;
    skewAmount?: number;
    easing?: 'elastic' | 'power1';
    children?: React.ReactNode;
}

const CardSwapLayout = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = 'elastic',
    children
}: CardSwapProps) => {
    const config =
        easing === 'elastic'
            ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
            : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);
    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number | NodeJS.Timeout | undefined>(undefined);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) => {
            if (r.current) placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount, i === 0);
        });

        const swap = () => {
            if (order.current.length < 2) return;
            const [front, ...rest] = order.current;
            const elFront = refs[front].current;
            if (!elFront) return;

            const tl = gsap.timeline();
            tlRef.current = tl;
            
            // Drop animation for front card
            tl.to(elFront, { 
                y: '+=500', 
                opacity: 0.4,
                duration: config.durDrop, 
                ease: config.ease 
            });
            const contentFront = elFront.querySelector('.card-content');
            if (contentFront) {
                tl.to(contentFront, {
                    filter: 'blur(12px)',
                    duration: config.durDrop,
                    ease: config.ease
                }, '<');
            }

            let promote = `-=${config.durDrop * config.promoteOverlap}`;
            tl.addLabel('promote', promote);

            rest.forEach((idx, i) => {
                const el = refs[idx].current;
                if (!el) return;
                const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
                const isNewFront = i === 0;
                tl.set(el, { zIndex: slot.zIndex }, 'promote');
                
                // Move card container
                tl.to(
                    el,
                    { 
                        x: slot.x, 
                        y: slot.y, 
                        z: slot.z, 
                        opacity: isNewFront ? 1 : 0.4,
                        duration: config.durMove, 
                        ease: config.ease 
                    },
                    `promote+=${i * 0.15}`
                );
                
                // Animate child card-content filter in parallel
                const content = el.querySelector('.card-content');
                if (content) {
                    tl.to(
                        content,
                        {
                            filter: isNewFront ? 'blur(0px)' : 'blur(12px)',
                            duration: config.durMove,
                            ease: config.ease
                        },
                        `<`
                    );
                }
            });

            const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
            const returnLabel = `promote+=${config.durMove * config.returnDelay}`;
            tl.addLabel('return', returnLabel);

            tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
            
            // Return animation for card container
            tl.to(elFront, { 
                x: backSlot.x, 
                y: backSlot.y, 
                z: backSlot.z, 
                opacity: 0.4,
                duration: config.durReturn, 
                ease: config.ease 
            }, 'return');
            if (contentFront) {
                tl.to(contentFront, {
                    filter: 'blur(12px)',
                    duration: config.durReturn,
                    ease: config.ease
                }, 'return');
            }

            tl.call(() => {
                order.current = [...rest, front];
            });
        };

        intervalRef.current = setInterval(swap, delay);

        if (pauseOnHover && container.current) {
            const node = container.current;
            const pause = () => {
                tlRef.current?.pause();
                clearInterval(intervalRef.current);
            };
            const resume = () => {
                tlRef.current?.play();
                intervalRef.current = setInterval(swap, delay);
            };
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
            return () => {
                node.removeEventListener('mouseenter', pause);
                node.removeEventListener('mouseleave', resume);
                clearInterval(intervalRef.current);
            };
        }

        return () => clearInterval(intervalRef.current);
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length, config.durDrop, config.durMove, config.durReturn, config.ease, config.promoteOverlap, config.returnDelay, refs]);

    const rendered = childArr.map((child, i) => {
        if (isValidElement(child)) {
            const childElement = child as React.ReactElement<any>;
            return cloneElement(childElement, {
                key: i,
                ref: refs[i],
                style: { width, height, ...(childElement.props.style ?? {}) },
                onClick: (e: any) => {
                    childElement.props.onClick?.(e);
                    onCardClick?.(i);
                }
            });
        }
        return child;
    });

    return (
        <div ref={container} className="card-swap-container" style={{ width, height }}>
            {rendered}
        </div>
    );
};

export default function CardSwap({ en = false }: { en?: boolean }) {
    const [dimensions, setDimensions] = useState({
        width: 380,
        height: 380,
        cardDistance: 50,
        verticalDistance: 55,
    });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w <= 480) { // Mobile
                setDimensions({
                    width: 310,
                    height: 310,
                    cardDistance: 32,
                    verticalDistance: 36,
                });
            } else if (w <= 1024) { // Tablet / iPad
                setDimensions({
                    width: 340,
                    height: 340,
                    cardDistance: 40,
                    verticalDistance: 45,
                });
            } else { // Desktop
                setDimensions({
                    width: 380,
                    height: 380,
                    cardDistance: 50,
                    verticalDistance: 55,
                });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial call
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const cardData = [
        {
            tag: "01 / DESARROLLO",
            title: "Diseño y Desarrollo Web Profesional",
            items: en ? ["Fast sites with Next.js & React", "Optimized for conversion & SEO", "Scalable APIs & backends", "Serverless hosting with guaranteed performance"] : ["Sitios rápidos y modernos con Next.js y React", "Optimizados para conversión y SEO", "APIs y backends escalables", "Hosting serverless con rendimiento garantizado"],
        },
        {
            tag: "02 / IDENTIDAD",
            title: "Identidad Visual y Branding Empresarial",
            items: en ? ["Memorable logo design", "Coherent visual systems", "Color palettes & brand guides", "Creative direction"] : ["Diseño de logotipos memorables", "Sistemas visuales coherentes", "Paletas de color y guías de marca", "Dirección creativa"],
        },
        {
            tag: "03 / COMERCIO",
            title: "Tiendas Online y Plataformas de Venta",
            items: en ? ["Custom online stores", "Secure payment integrations", "Conversion-optimized flows", "Real-time analytics"] : ["Desarrollo de tiendas online personalizadas", "Integración de pagos seguros", "Flujos de compra optimizados", "Analytics y reportes de ventas"],
        },
        {
            tag: "04 / SISTEMAS",
            title: "Automatización de Procesos e Integraciones API",
            items: en ? ["Zapier & Make automations", "Custom API integrations", "Real-time monitoring dashboards", "Reduce operational time by 70%+"] : ["Automatización con Zapier y Make", "Integraciones API personalizadas", "Dashboards de monitoreo", "Reduce tiempos operativos en 70%+"],
        },
    ];

    return (
        <CardSwapLayout 
            cardDistance={dimensions.cardDistance} 
            verticalDistance={dimensions.verticalDistance} 
            delay={5000} 
            pauseOnHover={false} 
            width={dimensions.width} 
            height={dimensions.height}
        >
            {cardData.map((card, idx) => (
                <Card key={idx} className="syv-card">
                    <p className="syv-card-tag">
                        {card.tag}
                    </p>
                    <h3 className="syv-card-title">
                        {card.title}
                    </h3>
                    <div className="syv-card-items">
                        {card.items.map((item, i) => (
                            <div key={i} className="syv-card-item">
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-brand)", flexShrink: 0 }} />
                                {item}
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </CardSwapLayout>
    );
}

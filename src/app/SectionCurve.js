import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SectionCurve({ fill, className }) {
  const containerRef = useRef(null);
  const filterId = useRef(`goo-${Math.random().toString(36).substr(2, 9)}`);
  
  // Generate random drips
  const drips = useRef(Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    cx: (i * (1000 / 24)) + (Math.random() * 20 - 10),
    cy: 50,
    r: 20 + Math.random() * 35,
    targetY: 100 + Math.random() * 250,
    targetX: (Math.random() - 0.5) * 60,
    scale: Math.random() * 0.3 + 0.1,
    start: Math.random() * 0.4,
    duration: 0.6 + Math.random() * 0.4,
    ref: null
  })));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        end: "bottom -20%",
        scrub: 0.8,
      }
    });

    // The main body shrinks slightly while stretching down
    tl.to(".goo-main-rect", {
      height: "40%",
      ease: "power1.out",
      duration: 1
    }, 0);

    // Animate each drip physically detaching and falling
    drips.current.forEach((drip) => {
      if (!drip.ref) return;
      tl.to(drip.ref, {
        cy: `+=${drip.targetY}`,
        cx: `+=${drip.targetX}`,
        scale: drip.scale,
        transformOrigin: "center center",
        ease: "power2.in",
      }, drip.start);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "18vw",
        minHeight: "120px",
        maxHeight: "300px",
        position: "absolute",
        bottom: 0,
        left: 0,
        transform: "translateY(99%)",
        zIndex: 10,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
        
        {/* We apply the filter to a group containing the rect and the circles */}
        <g filter={`url(#${filterId.current})`} fill={fill}>
          {/* Main rectangle forming the solid bottom of the section */}
          <rect className="goo-main-rect" x="-50" y="-10" width="1100" height="70" />
          
          {/* Drips that will detach */}
          {drips.current.map((drip) => (
            <circle
              key={drip.id}
              ref={(el) => (drip.ref = el)}
              cx={drip.cx}
              cy={drip.cy}
              r={drip.r}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

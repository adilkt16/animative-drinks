"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BottleScene.module.css";

const IMG_W = 1024;
const IMG_H = 1536;
const CAP_TOP_Y = 358;
const CAP_BOTTOM_Y = 418;
const CAP_H = CAP_BOTTOM_Y - CAP_TOP_Y;

const BUBBLE_CONFIGS = [
  { dx: -0.35, size: 22, delay: 0, wobble: 18 },
  { dx: 0.2, size: 14, delay: 0.08, wobble: -14 },
  { dx: -0.1, size: 30, delay: 0.04, wobble: 10 },
  { dx: 0.4, size: 18, delay: 0.12, wobble: -22 },
  { dx: -0.55, size: 12, delay: 0.18, wobble: 16 },
  { dx: 0.6, size: 26, delay: 0.06, wobble: -8 },
  { dx: 0.05, size: 20, delay: 0.2, wobble: 20 },
  { dx: -0.7, size: 16, delay: 0.14, wobble: -18 },
  { dx: 0.3, size: 10, delay: 0.24, wobble: 12 },
  { dx: -0.2, size: 24, delay: 0.16, wobble: -10 },
  { dx: 0.5, size: 16, delay: 0.28, wobble: 24 },
  { dx: -0.45, size: 12, delay: 0.22, wobble: -20 },
];

export default function BottleScene({ containerRef, storyRef }) {
  const wrapRef = useRef(null);
  const motionWrapRef = useRef(null);
  const baseImgRef = useRef(null);
  const bodyCanvasRef = useRef(null);
  const capCanvasRef = useRef(null);
  const bubblesRef = useRef([]);
  const imgRef = useRef(null);
  const drawnRef = useRef(false);

  function drawSlices() {
    if (drawnRef.current) return;

    const img = imgRef.current;
    const bodyCanvas = bodyCanvasRef.current;
    const capCanvas = capCanvasRef.current;

    if (!img || !bodyCanvas || !capCanvas) return;

    const bodyCtx = bodyCanvas.getContext("2d");
    const capCtx = capCanvas.getContext("2d");

    if (!bodyCtx || !capCtx) return;

    bodyCanvas.width = IMG_W;
    bodyCanvas.height = IMG_H;
    bodyCtx.drawImage(img, 0, 0);
    bodyCtx.clearRect(0, CAP_TOP_Y, IMG_W, CAP_H);

    capCanvas.width = IMG_W;
    capCanvas.height = CAP_H;
    capCtx.drawImage(img, 0, CAP_TOP_Y, IMG_W, CAP_H, 0, 0, IMG_W, CAP_H);

    if (baseImgRef.current) {
      baseImgRef.current.style.opacity = "0";
    }

    drawnRef.current = true;
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let rafId = 0;
    let ctx;

    const setup = () => {
      const containerEl = containerRef?.current;
      const storyEl = storyRef?.current;
      const wrapEl = wrapRef.current;
      const motionWrapEl = motionWrapRef.current;
      const capEl = capCanvasRef.current;

      if (!containerEl || !storyEl || !wrapEl || !motionWrapEl || !capEl) {
        rafId = window.requestAnimationFrame(setup);
        return;
      }

      const bubbleEls = bubblesRef.current;

      if (imgRef.current?.complete && imgRef.current.naturalWidth) {
        drawSlices();
      }

      window.requestAnimationFrame(() => {
        drawSlices();
        ScrollTrigger.refresh();
      });

      ctx = gsap.context(() => {
        gsap.set(capEl, { y: 0, rotation: 0, opacity: 1, transformOrigin: "50% 100%" });
        gsap.set(motionWrapEl, {
          transformOrigin: "50% 50%",
          x: 0,
          y: 0,
          rotation: -12,
          scale: 1,
        });

        gsap.fromTo(
          motionWrapEl,
          { x: 0, y: 0, rotation: -12, scale: 1 },
          {
            x: -260,
            y: 260,
            rotation: 320,
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: containerEl,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );

        bubbleEls.forEach((bubble) => {
          if (bubble) {
            gsap.set(bubble, { opacity: 0.35, y: 0, x: 0, scale: 0.4 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storyEl,
            start: "top 80%",
            end: "top 5%",
            scrub: 1.6,
          },
        });

        tl.to(
          capEl,
          {
            y: "-140%",
            rotation: 32,
            opacity: 0,
            ease: "power2.in",
            duration: 0.45,
          },
          0
        );

        BUBBLE_CONFIGS.forEach((cfg, index) => {
          const bubble = bubbleEls[index];
          if (!bubble) return;

          const xEnd = cfg.dx * 180;
          const yEnd = -300 - index * 6;
          const offset = cfg.delay * 0.7;

          tl.fromTo(
            bubble,
            { opacity: 0.35, y: 0, x: 0, scale: 0.3 },
            {
              opacity: 1,
              y: yEnd,
              x: xEnd + cfg.wobble,
              scale: 1,
              ease: "power1.out",
              duration: 0.5,
            },
            offset
          );

          tl.to(
            bubble,
            {
              opacity: 0,
              y: yEnd - 70,
              scale: 0.6,
              ease: "power1.in",
              duration: 0.3,
            },
            offset + 0.42
          );
        });
      }, wrapRef);
    };

    setup();

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [storyRef]);

  return (
    <div className={styles.scene} ref={wrapRef} aria-hidden="true">
      <div ref={motionWrapRef} className={styles.motionWrap}>
        <img
          ref={imgRef}
          src="/assets/empty.png"
          alt=""
          className={styles.sourceImg}
          onLoad={drawSlices}
        />

        <img
          ref={baseImgRef}
          src="/assets/empty.png"
          alt=""
          className={styles.baseImg}
        />

        <canvas ref={bodyCanvasRef} className={styles.bodyCanvas} />

        <canvas
          ref={capCanvasRef}
          className={styles.capCanvas}
          style={{ top: `${(CAP_TOP_Y / IMG_H) * 100}%` }}
        />

        <div
          className={styles.bubbleOrigin}
          style={{ top: `${(CAP_TOP_Y / IMG_H) * 100}%` }}
        >
          {BUBBLE_CONFIGS.map((cfg, index) => (
            <div
              key={index}
              ref={(el) => {
                bubblesRef.current[index] = el;
              }}
              className={styles.bubble}
              style={{ width: cfg.size, height: cfg.size }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
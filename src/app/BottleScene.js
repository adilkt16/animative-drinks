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
  { "dx": 0.3, "size": 24, "delay": 0.2, "wobble": 2, "isDrool": false, "dropY": -203 },
  { "dx": -0.7, "size": 45, "delay": 0.47, "wobble": 7, "isDrool": false, "dropY": -240 },
  { "dx": -0.61, "size": 31, "delay": 0.51, "wobble": 18, "isDrool": false, "dropY": -319 },
  { "dx": -0.24, "size": 56, "delay": 0.17, "wobble": 6, "isDrool": false, "dropY": -357 },
  { "dx": 0.33, "size": 36, "delay": 0.1, "wobble": -11, "isDrool": false, "dropY": -208 },
  { "dx": 0.22, "size": 18, "delay": 0.04, "wobble": 10, "isDrool": false, "dropY": -316 },
  { "dx": -0.41, "size": 42, "delay": 0.42, "wobble": 8, "isDrool": false, "dropY": -307 },
  { "dx": -0.65, "size": 16, "delay": 0.19, "wobble": -3, "isDrool": false, "dropY": -305 },
  { "dx": 0.69, "size": 26, "delay": 0.29, "wobble": 16, "isDrool": false, "dropY": -224 },
  { "dx": 0.1, "size": 29, "delay": 0.47, "wobble": 17, "isDrool": false, "dropY": -283 },
  { "dx": 0.37, "size": 39, "delay": 0.35, "wobble": -11, "isDrool": false, "dropY": -394 },
  { "dx": -0.14, "size": 52, "delay": 0.23, "wobble": -8, "isDrool": false, "dropY": -368 },
  { "dx": 0.29, "size": 39, "delay": 0.57, "wobble": 5, "isDrool": false, "dropY": -284 },
  { "dx": -0.23, "size": 30, "delay": 0.43, "wobble": -8, "isDrool": false, "dropY": -284 },
  { "dx": 0.01, "size": 21, "delay": 0.46, "wobble": -17, "isDrool": false, "dropY": -259 },
  { "dx": 0.16, "size": 51, "delay": 0.33, "wobble": 4, "isDrool": false, "dropY": -348 },
  { "dx": 0.31, "size": 47, "delay": 0.37, "wobble": -16, "isDrool": false, "dropY": -330 },
  { "dx": -0.19, "size": 47, "delay": 0.22, "wobble": -6, "isDrool": false, "dropY": -229 },
  { "dx": 0.44, "size": 31, "delay": 0.2, "wobble": 7, "isDrool": false, "dropY": -328 },
  { "dx": 0.69, "size": 27, "delay": 0.08, "wobble": 11, "isDrool": false, "dropY": -307 },
  { "dx": 0.49, "size": 37, "delay": 0.32, "wobble": 10, "isDrool": false, "dropY": -317 },
  { "dx": 0.37, "size": 58, "delay": 0.14, "wobble": -3, "isDrool": false, "dropY": -268 },
  { "dx": 0.03, "size": 33, "delay": 0.36, "wobble": 19, "isDrool": false, "dropY": -334 },
  { "dx": -0.74, "size": 58, "delay": 0.15, "wobble": 10, "isDrool": false, "dropY": -360 },
  { "dx": -0.66, "size": 35, "delay": 0.25, "wobble": 12, "isDrool": false, "dropY": -314 },
  { "dx": 0.56, "size": 48, "delay": 0.56, "wobble": -18, "isDrool": false, "dropY": -386 },
  { "dx": 0.54, "size": 50, "delay": 0.16, "wobble": 9, "isDrool": true, "dropY": 219 },
  { "dx": -0.33, "size": 16, "delay": 0.35, "wobble": 11, "isDrool": true, "dropY": 230 },
  { "dx": 0.34, "size": 16, "delay": 0.53, "wobble": 3, "isDrool": true, "dropY": 236 },
  { "dx": -0.44, "size": 35, "delay": 0.38, "wobble": -11, "isDrool": true, "dropY": 208 },
  { "dx": 0.37, "size": 40, "delay": 0.07, "wobble": 8, "isDrool": true, "dropY": 246 },
  { "dx": -0.59, "size": 25, "delay": 0.6, "wobble": 11, "isDrool": true, "dropY": 125 },
  { "dx": 0.3, "size": 41, "delay": 0.05, "wobble": 16, "isDrool": true, "dropY": 324 },
  { "dx": -0.62, "size": 27, "delay": 0.05, "wobble": 4, "isDrool": true, "dropY": 110 },
  { "dx": 0.97, "size": 38, "delay": 0.3, "wobble": -16, "isDrool": true, "dropY": 208 },
  { "dx": -0.69, "size": 29, "delay": 0.58, "wobble": 1, "isDrool": true, "dropY": 153 },
  { "dx": 0.7, "size": 27, "delay": 0.53, "wobble": -17, "isDrool": true, "dropY": 133 },
  { "dx": -0.64, "size": 38, "delay": 0.45, "wobble": 0, "isDrool": true, "dropY": 222 },
  { "dx": 0.45, "size": 53, "delay": 0.45, "wobble": 5, "isDrool": true, "dropY": 325 },
  { "dx": -0.3, "size": 28, "delay": 0.06, "wobble": 16, "isDrool": true, "dropY": 192 },
  { "dx": 0.93, "size": 23, "delay": 0.17, "wobble": -10, "isDrool": true, "dropY": 101 },
  { "dx": -0.82, "size": 37, "delay": 0.59, "wobble": 10, "isDrool": true, "dropY": 234 },
  { "dx": 0.46, "size": 38, "delay": 0.18, "wobble": 3, "isDrool": true, "dropY": 182 },
  { "dx": -0.36, "size": 34, "delay": 0.6, "wobble": -9, "isDrool": true, "dropY": 223 },
  { "dx": 1.09, "size": 37, "delay": 0.34, "wobble": 11, "isDrool": true, "dropY": 318 },
  { "dx": -0.34, "size": 36, "delay": 0.28, "wobble": -1, "isDrool": true, "dropY": 300 },
  { "dx": 0.46, "size": 54, "delay": 0.52, "wobble": -7, "isDrool": true, "dropY": 267 },
  { "dx": -0.59, "size": 24, "delay": 0.11, "wobble": 4, "isDrool": true, "dropY": 340 },
  { "dx": 0.63, "size": 50, "delay": 0.04, "wobble": 4, "isDrool": true, "dropY": 159 },
  { "dx": -1.07, "size": 23, "delay": 0.09, "wobble": 0, "isDrool": true, "dropY": 246 },
  { "dx": 0.76, "size": 35, "delay": 0.29, "wobble": -9, "isDrool": true, "dropY": 181 },
  { "dx": -0.85, "size": 31, "delay": 0.25, "wobble": -12, "isDrool": true, "dropY": 212 },
  { "dx": 0.95, "size": 55, "delay": 0.58, "wobble": -1, "isDrool": true, "dropY": 227 },
  { "dx": -0.56, "size": 56, "delay": 0.35, "wobble": 5, "isDrool": true, "dropY": 105 },
  { "dx": 0.64, "size": 25, "delay": 0.08, "wobble": -18, "isDrool": true, "dropY": 244 },
  { "dx": -0.33, "size": 57, "delay": 0.24, "wobble": 1, "isDrool": true, "dropY": 338 },
  { "dx": 0.39, "size": 31, "delay": 0.02, "wobble": -10, "isDrool": true, "dropY": 313 },
  { "dx": -0.74, "size": 42, "delay": 0.02, "wobble": -3, "isDrool": true, "dropY": 137 },
  { "dx": 0.94, "size": 47, "delay": 0.34, "wobble": 13, "isDrool": true, "dropY": 299 },
  { "dx": -0.99, "size": 18, "delay": 0.17, "wobble": 9, "isDrool": true, "dropY": 195 }
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
            gsap.set(bubble, { opacity: 0, y: 0, x: 0, scale: 0.4 });
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
          const yEnd = cfg.isDrool ? cfg.dropY : cfg.dropY - index * 2;
          const offset = cfg.delay * 0.7;

          if (cfg.isDrool) {
            tl.fromTo(
              bubble,
              { opacity: 0, y: 0, x: 0, scale: 0.3 },
              {
                opacity: 1,
                y: -60 - Math.random() * 40,
                x: (xEnd + cfg.wobble) * 0.5,
                scale: 1.2,
                ease: "power1.out",
                duration: 0.25,
              },
              offset
            );
            
            tl.to(
              bubble,
              {
                opacity: 0,
                y: yEnd,
                x: xEnd + cfg.wobble,
                scale: 0.8,
                ease: "power2.in",
                duration: 0.4,
              },
              offset + 0.25
            );
          } else {
            tl.fromTo(
              bubble,
              { opacity: 0, y: 0, x: 0, scale: 0.3 },
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
                y: yEnd - 100,
                scale: 0.5,
                ease: "power1.in",
                duration: 0.3,
              },
              offset + 0.42
            );
          }
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
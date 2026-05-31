"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import BottleScene from "./BottleScene";

const whatsappLink =
  "https://wa.me/15551234567?text=Hi%20Thirtysix%20Hours%2C%20I%27d%20like%20to%20order%20juice.";

const heroBubbles = [
  {
    size: "46px",
    left: "6%",
    top: "18%",
    duration: "7s",
    delay: "0s",
    opacity: "0.7",
  },
  {
    size: "20px",
    left: "22%",
    top: "68%",
    duration: "5s",
    delay: "1s",
    opacity: "0.6",
  },
  {
    size: "32px",
    left: "40%",
    top: "26%",
    duration: "8s",
    delay: "0.5s",
    opacity: "0.5",
  },
  {
    size: "18px",
    left: "62%",
    top: "74%",
    duration: "6s",
    delay: "0.2s",
    opacity: "0.6",
  },
  {
    size: "36px",
    left: "78%",
    top: "22%",
    duration: "9s",
    delay: "0.4s",
    opacity: "0.55",
  },
  {
    size: "26px",
    left: "90%",
    top: "58%",
    duration: "7.5s",
    delay: "1.2s",
    opacity: "0.5",
  },
  {
    size: "18px",
    left: "12%",
    top: "36%",
    duration: "6.5s",
    delay: "0.6s",
    opacity: "0.55",
  },
  {
    size: "28px",
    left: "26%",
    top: "14%",
    duration: "8.5s",
    delay: "0.9s",
    opacity: "0.6",
  },
  {
    size: "40px",
    left: "44%",
    top: "68%",
    duration: "9.5s",
    delay: "0.4s",
    opacity: "0.5",
  },
  {
    size: "22px",
    left: "58%",
    top: "10%",
    duration: "7s",
    delay: "1s",
    opacity: "0.55",
  },
  {
    size: "30px",
    left: "74%",
    top: "36%",
    duration: "8s",
    delay: "0.2s",
    opacity: "0.6",
  },
  {
    size: "16px",
    left: "84%",
    top: "82%",
    duration: "6s",
    delay: "0.7s",
    opacity: "0.5",
  },
  {
    size: "36px",
    left: "96%",
    top: "30%",
    duration: "9s",
    delay: "1.1s",
    opacity: "0.55",
  },
];

const coralBubbles = [
  {
    size: "38px",
    left: "10%",
    top: "30%",
    duration: "8s",
    delay: "0.3s",
    opacity: "0.5",
  },
  {
    size: "22px",
    left: "32%",
    top: "58%",
    duration: "6s",
    delay: "0s",
    opacity: "0.6",
  },
  {
    size: "42px",
    left: "66%",
    top: "22%",
    duration: "9s",
    delay: "0.6s",
    opacity: "0.55",
  },
  {
    size: "18px",
    left: "82%",
    top: "68%",
    duration: "5.5s",
    delay: "1.1s",
    opacity: "0.6",
  },
];

const products = [
  {
    name: "Lime Lift",
    notes: "Lime, mint, pinch of sea salt",
    size: "300 ml",
    image: "/assets/lime.jpg",
    tone: "lime",
  },
  {
    name: "Watermelon Rush",
    notes: "Watermelon, basil, splash of citrus",
    size: "300 ml",
    image: "/assets/watermelon.jpg",
    tone: "watermelon",
  },
  {
    name: "Coconut Cloud",
    notes: "Tender coconut, vanilla bean",
    size: "300 ml",
    image: "/assets/coconut.jpg",
    tone: "coconut",
  },
];

const globalBubbles = [
  { size: "52px", left: "6%", top: "16%", duration: "9s", delay: "0s", opacity: "0.6" },
  { size: "26px", left: "12%", top: "74%", duration: "7s", delay: "0.8s", opacity: "0.5" },
  { size: "18px", left: "28%", top: "32%", duration: "6s", delay: "0.5s", opacity: "0.55" },
  { size: "34px", left: "36%", top: "62%", duration: "8s", delay: "1s", opacity: "0.6" },
  { size: "22px", left: "48%", top: "18%", duration: "7.5s", delay: "0.2s", opacity: "0.5" },
  { size: "44px", left: "54%", top: "52%", duration: "10s", delay: "0.7s", opacity: "0.55" },
  { size: "20px", left: "64%", top: "26%", duration: "6.5s", delay: "1.1s", opacity: "0.45" },
  { size: "38px", left: "72%", top: "70%", duration: "9s", delay: "0.3s", opacity: "0.55" },
  { size: "16px", left: "78%", top: "40%", duration: "6s", delay: "0.6s", opacity: "0.5" },
  { size: "30px", left: "84%", top: "16%", duration: "8s", delay: "0.4s", opacity: "0.55" },
  { size: "24px", left: "90%", top: "58%", duration: "7s", delay: "0.9s", opacity: "0.5" },
  { size: "18px", left: "94%", top: "78%", duration: "6s", delay: "0.2s", opacity: "0.45" },
];

function BubbleField({ bubbles, className }) {
  return (
    <div className={`${styles.bubbleField} ${className || ""}`.trim()}>
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          data-bubble
          style={{
            "--size": bubble.size,
            "--left": bubble.left,
            "--top": bubble.top,
            "--duration": bubble.duration,
            "--delay": bubble.delay,
            "--opacity": bubble.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const storyImageRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoFrameRef = useRef(null);
  const productSectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    document.body.classList.add("has-gsap");

    const ctx = gsap.context(() => {
      if (storyImageRef.current && storyRef.current) {
        gsap.fromTo(
          storyImageRef.current,
          { y: 40 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (videoFrameRef.current && videoSectionRef.current) {
        gsap.fromTo(
          videoFrameRef.current,
          { y: 50 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: videoSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (productSectionRef.current) {
        const cards = productSectionRef.current.querySelectorAll(
          "[data-parallax='product']"
        );
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 50 + index * 10 },
            {
              y: -20 - index * 6,
              ease: "none",
              scrollTrigger: {
                trigger: productSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }

      const bubbleNodes = gsap.utils.toArray(
        "[data-bubble]",
        containerRef.current
      );
      bubbleNodes.forEach((bubble) => {
        gsap.to(bubble, {
          x: gsap.utils.random(-24, 24, 1),
          y: gsap.utils.random(-36, 36, 1),
          scale: gsap.utils.random(0.95, 1.08, 0.01),
          duration: gsap.utils.random(6, 12, 0.1),
          delay: gsap.utils.random(0, 1.6, 0.1),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => {
      document.body.classList.remove("has-gsap");
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page} ref={containerRef}>
      <div className={styles.globalBubbles} aria-hidden="true">
        <BubbleField bubbles={globalBubbles} className={styles.bubblesGlobal} />
      </div>
      <BottleScene storyRef={storyRef} />
      <main className={styles.main}>
        <section className={styles.hero} id="start" ref={heroRef}>
          <header className={styles.header}>
            <a
              className={styles.social}
              href="https://www.instagram.com/thirtysix.hours/"
              target="_blank"
              rel="noreferrer"
              aria-label="Thirtysix Hours Instagram"
            >
              <span>IG</span>
            </a>
            <img
              className={styles.logo}
              src="/assets/logo.png"
              alt="Thirtysix Hours"
            />
            <button className={styles.menuButton} type="button">
              <span />
              <span />
            </button>
          </header>

          <BubbleField
            bubbles={heroBubbles}
            className={`${styles.bubblesLight} ${styles.heroBubbles}`}
          />
          <div className={styles.heroStage}>
            <div className={styles.heroType} data-reveal>
              <p className={styles.heroTag}>Thirtysix hours of fresh.</p>
              <h1 className={styles.heroTitleLarge}>
                <span>LA BURBUJA</span>
                <span>IBERICA</span>
              </h1>
              <a className={styles.heroCta} href="#flavors">
                Discover our drinks
              </a>
            </div>
          </div>
          <div className={styles.scrollHint}>Scroll</div>
        </section>

        <section className={styles.story} id="story" ref={storyRef}>
          <div className={styles.storyText} data-reveal>
            <p className={styles.eyebrow}>The 36-hour promise</p>
            <h2>Freshness that stays loud, longer.</h2>
            <p>
              Thirtysix Hours is designed to stay vibrant long after the first
              squeeze. We cold-press, bottle, and keep it crisp so every sip
              tastes like it just left the fruit.
            </p>
            <ul className={styles.storyList}>
              <li>
                <span className={styles.dot} />
                Cold-pressed every morning
              </li>
              <li>
                <span className={styles.dot} />
                Zero additives or preservatives
              </li>
              <li>
                <span className={styles.dot} />
                Bright flavor for up to 36 hours
              </li>
            </ul>
            <a className={styles.linkButton} href="#contact">
              Start a custom order
            </a>
          </div>
          <div className={styles.storyImage} data-reveal ref={storyImageRef}>
            <img src="/assets/lime.jpg" alt="Lime juice bottle" />
          </div>
        </section>

        <section className={styles.videoSection} ref={videoSectionRef}>
          <BubbleField bubbles={coralBubbles} className={styles.bubblesBright} />
          <div className={styles.videoFrame} data-reveal ref={videoFrameRef}>
            <video
              src="/assets/hero.mp4"
              poster="/assets/lineup.jpg"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className={styles.videoCopy} data-reveal>
            <p className={styles.eyebrow}>Moments in motion</p>
            <h2>Grab a bottle. Make it a ritual.</h2>
            <p>
              From a midday reset to a midnight toast, our juices travel fast.
              The best part is how they disappear before the vibe does.
            </p>
            <div className={styles.videoTags}>
              <span>Morning energy</span>
              <span>Desk refresh</span>
              <span>After-hours glow</span>
            </div>
          </div>
        </section>

        <section className={styles.bubbleStatement}>
          <BubbleField bubbles={heroBubbles} className={styles.bubblesLight} />
          <h2>ALL DAY. ALL JUICE.</h2>
        </section>

        <section className={styles.centerQuote}>
          <div data-reveal>
            <p className={styles.eyebrow}>Flavor shifts daily</p>
            <h3>Some days zingy, some days sweet.</h3>
            <p>
              The fruit stays real, the mood changes. That is the magic of
              small-batch juice.
            </p>
          </div>
        </section>

        <section
          className={styles.products}
          id="flavors"
          ref={productSectionRef}
        >
          <div className={styles.sectionHeader} data-reveal>
            <h2>Three essentials, more in the making.</h2>
            <p>Choose your lineup or grab all three.</p>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <article
                key={product.name}
                className={`${styles.productCard} ${styles[`card${product.tone}`]}`}
                data-reveal
                data-parallax="product"
              >
                <img src={product.image} alt={product.name} />
                <div className={styles.productMeta}>{product.size}</div>
                <h3>{product.name}</h3>
                <p>{product.notes}</p>
              </article>
            ))}
          </div>
          <a className={styles.outlineButton} href={whatsappLink}>
            View all flavors
          </a>
        </section>

        <section className={styles.bigType}>
          <p>FRESH. PURE. 36 HOURS.</p>
        </section>

        <section className={styles.contact} id="contact">
          <div className={styles.contactContent} data-reveal>
            <p className={styles.eyebrow}>Let's plan your order</p>
            <h2>What are you craving?</h2>
            <p>
              Tell us the vibe and we will build the perfect juice drop for you.
            </p>
            <div className={styles.contactPanel}>
              <label className={styles.contactLabel}>
                <span>Choose a request</span>
                <select defaultValue="whatsapp">
                  <option value="whatsapp">WhatsApp order</option>
                  <option value="catering">Event catering</option>
                  <option value="wholesale">Wholesale order</option>
                  <option value="custom">Custom blend</option>
                </select>
              </label>
              <a className={styles.contactButton} href={whatsappLink}>
                -&gt;
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h4>Navigate</h4>
            <a href="#start">Start</a>
            <a href="#story">Story</a>
            <a href="#flavors">Flavors</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.footerColumn}>
            <h4>Contact</h4>
            <a href="mailto:hello@thirtysixhours.com">
              hello@thirtysixhours.com
            </a>
            <a href={whatsappLink}>WhatsApp orders</a>
            <a href="https://www.instagram.com/thirtysix.hours/">
              Instagram
            </a>
          </div>
          <div className={styles.footerColumn}>
            <img
              className={styles.footerLogo}
              src="/assets/logo.png"
              alt="Thirtysix Hours"
            />
            <p>Fresh juice for the hours that matter.</p>
          </div>
        </div>
        <div className={styles.footerMeta}>
          <p>2026 Thirtysix Hours. All rights reserved.</p>
          <p>Built for quick sips and bold plans.</p>
        </div>
      </footer>
    </div>
  );
}

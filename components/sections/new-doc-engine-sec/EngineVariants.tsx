"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FiArrowRight,
  FiCheckCircle,
  FiChevronDown,
  FiInfo,
  FiSearch,
  FiShuffle,
  FiTool,
} from "react-icons/fi";
import type { EngineVariantsSectionData } from "@/types/engine-page";
import styles from "./NewDocEngine.module.css";
import SectionHeading from "./SectionHeading";

type Props = {
  data: EngineVariantsSectionData;
  engineCode: string;
  engineImage?: string;
  backgroundImage?: string;
};

const fallbackCards = [
  [
    "Where to find the code",
    "The engine code is stamped on the engine block, typically on the front face near the timing cover or on the driver’s side. It also appears on the V5C registration document under “Engine number”. A VIN decoder will confirm the exact factory build code.",
  ],
  [
    "Which codes get confused with it",
    "The 10E4E is commonly confused with the later 10E4F (2020+) and the naturally aspirated 1.0-litre 10S4G used in some Chinese-market SAIC vehicles.",
  ],
  [
    "Why fitting the wrong revision matters",
    "A later revision may physically fit but can cause injector timing mismatches or emissions test failures. Always match the exact suffix when buying a replacement.",
  ],
];
function ExpandableVariantText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [isClamped, setIsClamped] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [iconPosition, setIconPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const checkOverflow = () => {
      // 1. Get computed line-height
      const computed = window.getComputedStyle(el);
      let lh = parseFloat(computed.lineHeight);
      if (isNaN(lh)) {
        // Fallback: font-size * 1.42
        lh = parseFloat(computed.fontSize) * 1.42;
      }

      // Max allowable height for 10 lines (+2px buffer for subpixel rounding)
      const maxHeightFor10Lines = lh * 10 + 2;

      // 2. Temporarily unclamp to get real natural scroll height
      const currentClamp = el.style.webkitLineClamp;
      const currentDisplay = el.style.display;
      el.style.webkitLineClamp = "unset";
      el.style.display = "block";

      const fullHeight = el.scrollHeight;
      const range = document.createRange();
      range.selectNodeContents(el);
      const lineRects = Array.from(range.getClientRects()).reduce<DOMRect[]>(
        (lines, rect) => {
          const previousLine = lines.at(-1);

          if (!previousLine || Math.abs(previousLine.top - rect.top) > 1) {
            lines.push(rect);
          }

          return lines;
        },
        [],
      );

      // Restore styling
      el.style.webkitLineClamp = currentClamp;
      el.style.display = currentDisplay;

      const overflows = fullHeight > maxHeightFor10Lines;
      setHasOverflow(overflows);

      const wrapper = wrapperRef.current;
      const lastVisibleLine = lineRects[isClamped ? 9 : lineRects.length - 1];
      if (overflows && wrapper && lastVisibleLine) {
        const wrapperRect = wrapper.getBoundingClientRect();
        setIconPosition({
          left: Math.min(
            lastVisibleLine.right - wrapperRect.left + 4,
            wrapperRect.width - 24,
          ),
          top:
            lastVisibleLine.top -
            wrapperRect.top +
            (lastVisibleLine.height - 24) / 2,
        });
      } else {
        setIconPosition(null);
      }
    };

    checkOverflow();

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(checkOverflow);
    }

    const observer = new ResizeObserver(() => checkOverflow());
    observer.observe(el);

    return () => observer.disconnect();
  }, [isClamped, text]);

  return (
    <div ref={wrapperRef} className={styles.variantExpandableWrapper}>
      <p
        ref={textRef}
        className={`${styles.variantParagraph} ${className} ${
          isClamped ? styles.clampTen : ""
        }`}
      >
        {text}
      </p>

      {hasOverflow && (
        <button
          type="button"
          className={`${styles.expandVariantButton} ${
            !isClamped ? styles.expandVariantButtonOpen : ""
          }`}
          onClick={() => setIsClamped((prev) => !prev)}
          aria-expanded={!isClamped}
          aria-label={isClamped ? "Show more text" : "Show less text"}
          style={
            iconPosition
              ? {
                  left: `${iconPosition.left}px`,
                  top: `${iconPosition.top}px`,
                  right: "auto",
                  bottom: "auto",
                }
              : undefined
          }
        >
          <FiChevronDown />
        </button>
      )}
    </div>
  );
}

export default function EngineVariants({
  data,
  engineCode,
  engineImage,
  backgroundImage = "/images/brands/mg/brand/mg-hero-bg.png",
}: Props) {
  const cards =
    data.cards ?? fallbackCards.map(([title, body]) => ({ title, body }));

  return (
    <section
      className={styles.variantsSection}
      style={
        { "--variants-bg": `url("${backgroundImage}")` } as React.CSSProperties
      }
      aria-labelledby={`${engineCode.toLowerCase()}-variants-title`}
    >
      <div className={styles.sectionContainer}>
        <p className={styles.eyebrow}>{data.tag}</p>
        <h2 id={`${engineCode.toLowerCase()}-variants-title`}>
          <SectionHeading
            title={data.title}
            accentFrom={`You Have the ${engineCode}`}
          />
        </h2>
        <ExpandableVariantText
          text={data.intro.split(" Where to find")[0]}
          className={styles.sectionIntro}
        />

        <div className={styles.variantGrid}>
          <article className={styles.engineIdentity}>
            {engineImage ? (
              <Image
                src={engineImage}
                alt={`${engineCode} engine`}
                width={270}
                height={220}
              />
            ) : null}
            <h3>{engineCode}</h3>
            <strong>1.0-litre Turbo GDI</strong>
            <span>Part of SAIC&apos;s SGE family</span>
          </article>

          {cards.map((card, index) => {
            const Icon = [FiSearch, FiShuffle, FiTool][index] ?? FiInfo;
            return (
              <article
                className={`${styles.variantCard} ${
                  index === 2 ? styles.variantDarkCard : ""
                }`}
                key={card.title}
              >
                <div className={styles.variantHeading}>
                  <div className={styles.variantIcon}>
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                </div>

                <ExpandableVariantText text={card.body} />

                {index === 0 ? (
                  <div className={styles.variantMiniList}>
                    <div className={styles.variantMini}>
                      <FiTool />
                      <span>
                        <strong>Engine block</strong>Front face near the timing
                        cover or driver&apos;s side.
                      </span>
                    </div>
                    <div className={styles.variantMini}>
                      <FiInfo />
                      <span>
                        <strong>V5C document</strong>Under “Engine number”.
                      </span>
                    </div>
                    <div className={styles.variantMini}>
                      <FiSearch />
                      <span>
                        <strong>VIN decoder</strong>Confirm the exact factory
                        build code.
                      </span>
                    </div>
                  </div>
                ) : null}

                {index === 1 ? (
                  <div className={styles.codeList}>
                    <div className={styles.codeItem}>
                      <FiCheckCircle />
                      <div className={styles.codeText}>
                        <strong>10E4E</strong>
                        <span>Original engine code</span>
                      </div>
                    </div>
                    <div className={styles.codeItem}>
                      <FiInfo />
                      <div className={styles.codeText}>
                        <strong>10E4F</strong>
                        <span>Later revision (2020+)</span>
                      </div>
                    </div>
                    <div className={styles.codeItem}>
                      <FiInfo />
                      <div className={styles.codeText}>
                        <strong>10S4G</strong>
                        <span>Naturally aspirated</span>
                      </div>
                    </div>
                  </div>
                ) : null}
                {index === 2 && engineImage ? (
                  <Image
                    className={styles.variantDarkImage}
                    src={engineImage}
                    alt=""
                    width={180}
                    height={150}
                  />
                ) : null}
              </article>
            );
          })}
        </div>

        <div className={styles.variantClosing}>
          <FiInfo />
          <p>
            <strong>Not sure?</strong>
            {data.closing}
          </p>
          <a href="#quote-form">
            Get {engineCode} quotes <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

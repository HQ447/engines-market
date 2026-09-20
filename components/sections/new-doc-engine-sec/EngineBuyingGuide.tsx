"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiTruck,
  FiTool,
  FiShield,
  FiChevronDown,
} from "react-icons/fi";
import type { EngineBuyingGuideSectionData } from "@/types/engine-page";
import styles from "./NewDocEngine.module.css";
import SectionHeading from "./SectionHeading";

type Props = {
  data: EngineBuyingGuideSectionData;
  engineCode: string;
  engineImage?: string;
  backgroundImage?: string;
};

export default function EngineBuyingGuide({
  data,
  engineCode,
  engineImage,
  backgroundImage = "/images/brands/mg/brand/mg-hero-bg.png",
}: Props) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [offset, setOffset] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [overflowCards, setOverflowCards] = useState<Record<number, boolean>>(
    {},
  );
  const pRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const update = () =>
      setVisibleCount(
        window.innerWidth < 621 ? 1 : window.innerWidth < 921 ? 2 : 3,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxOffset = Math.max(0, data.options.length - visibleCount);

  useEffect(
    () => setOffset((current) => Math.min(current, maxOffset)),
    [maxOffset],
  );

  // Reliably detect if text exceeds 6 lines
  useEffect(() => {
    const checkOverflow = () => {
      const map: Record<number, boolean> = {};
      pRefs.current.forEach((el, index) => {
        if (el) {
          map[index] = el.scrollHeight > el.clientHeight + 1;
        }
      });
      setOverflowCards(map);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [data.options]);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={styles.buyingSection}
      style={
        { "--buying-bg": `url("${backgroundImage}")` } as React.CSSProperties
      }
      aria-labelledby={`${engineCode.toLowerCase()}-buying-title`}
    >
      <div className={styles.sectionContainer}>
        <p className={styles.eyebrow}>{data.tag}</p>
        <h2 id={`${engineCode.toLowerCase()}-buying-title`}>
          <SectionHeading title={data.title} accentFrom="What to Choose" />
        </h2>

        <div className={styles.sliderControls}>
          <button
            type="button"
            onClick={() => setOffset((current) => Math.max(0, current - 1))}
            disabled={offset === 0}
            aria-label="Previous buying option"
          >
            <FiArrowRight className={styles.previousArrow} />
          </button>
          <button
            type="button"
            onClick={() =>
              setOffset((current) => Math.min(maxOffset, current + 1))
            }
            disabled={offset >= maxOffset}
            aria-label="Next buying option"
          >
            <FiArrowRight />
          </button>
        </div>

        <div className={styles.buyingViewport}>
          <div
            className={styles.buyingTrack}
            style={{
              transform: `translateX(calc(-${offset} * (100% + 14px) / ${visibleCount}))`,
            }}
          >
            {data.options.map((option, index) => {
              const isExpanded = expandedIndex === index;
              const hasMore = overflowCards[index] || isExpanded;

              return (
                <article
                  className={`${styles.buyingCard} ${
                    index === 1 ? styles.recommended : ""
                  } ${index === 2 ? styles.blueButtonCard : ""}`}
                  key={option.label}
                >
                  {index === 1 ? (
                    <span className={styles.recommendedBadge}>Recommended</span>
                  ) : null}

                  <div className={styles.buyingCardContent}>
                    <h3>{option.label}</h3>
                    <div className={styles.expandableCopy}>
                      <p
                        ref={(el) => {
                          pRefs.current[index] = el;
                        }}
                        className={!isExpanded ? styles.clampSix : undefined}
                      >
                        {option.body}
                      </p>
                      {hasMore && (
                        <button
                          type="button"
                          className={`${styles.expandInlineButton} ${
                            isExpanded ? styles.expandCopyButtonOpen : ""
                          }`}
                          onClick={() => toggleExpand(index)}
                          aria-label={`Toggle description for ${option.label}`}
                        >
                          <FiChevronDown aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>

                  <a href={option.href}>
                    View {option.label} engines <FiArrowRight />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.supplyStrip}>
          <FiTool />
          <p>
            <strong>Supply &amp; fit available</strong>
            {data.supplyFitLine}
          </p>
          <span>
            <FiTruck />
            Nationwide delivery
          </span>
          <span>
            <FiShield />
            12-month warranty
          </span>
        </div>

        <div className={styles.valueStrip}>
          <FiTool />
          <p>
            <strong>Vehicle value considerations</strong>
            {data.vehicleValueNote}
          </p>
          <a href="#quote-form">
            {data.cta} <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowRight, FiTruck, FiTool, FiShield } from "react-icons/fi";
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
            {data.options.map((option, index) => (
              <article
                className={`${styles.buyingCard} ${index === 1 ? styles.recommended : ""} ${index === 2 ? styles.blueButtonCard : ""}`}
                key={option.label}
              >
                {index === 1 ? (
                  <span className={styles.recommendedBadge}>Recommended</span>
                ) : null}
                {/* {engineImage ? (
                  <Image src={engineImage} alt="" width={110} height={100} />
                ) : null} */}
                <div>
                  <h3>{option.label}</h3>
                  <p>{option.body}</p>
                </div>
                <a href={option.href}>
                  View {option.label} engines <FiArrowRight />
                </a>
              </article>
            ))}
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

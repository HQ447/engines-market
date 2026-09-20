"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiInfo, FiChevronDown } from "react-icons/fi";
import type { EngineRelatedSectionData } from "@/types/engine-page";
import styles from "./NewDocEngine.module.css";
import SectionHeading from "./SectionHeading";

type Props = {
  data: EngineRelatedSectionData;
  engineCode: string;
  engineImage?: string;
  backgroundImage?: string;
};

type RelatedItem = EngineRelatedSectionData["items"][number];

function RelatedCardItem({
  item,
  engineImage,
}: {
  item: RelatedItem;
  engineImage?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const check = () => {
      const wasClamped = el.classList.contains(styles.clampSix);
      if (wasClamped) el.classList.remove(styles.clampSix);

      const fullHeight = el.scrollHeight;

      if (wasClamped) el.classList.add(styles.clampSix);

      // Trigger button only if unconstrained height exceeds 6 lines (~128px)
      setHasOverflow(fullHeight > 132);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [item.description]);

  return (
    <article className={styles.relatedCard}>
      <span className={styles.relation}>{item.relation}</span>

      {engineImage && item.code !== "none" ? (
        <Image src={engineImage} alt="" width={108} height={84} />
      ) : null}

      <h3>{item.code === "none" ? "None" : item.code}</h3>
      <strong>
        {item.code === "none"
          ? "First in UK range"
          : item.relation === "Successor"
            ? "Direct replacement"
            : "Related engine"}
      </strong>

      <div className={styles.expandableCopy}>
        <p ref={pRef} className={!isExpanded ? styles.clampSix : undefined}>
          {item.description}
        </p>

        {hasOverflow && (
          <button
            type="button"
            className={`${styles.expandInlineButton} ${
              isExpanded ? styles.expandCopyButtonOpen : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded((prev) => !prev);
            }}
            aria-label={`Toggle description for ${item.code}`}
          >
            <FiChevronDown aria-hidden="true" />
          </button>
        )}
      </div>

      {item.code !== "none" ? (
        <Link href={item.href}>
          View {item.code} <FiArrowRight />
        </Link>
      ) : (
        <button type="button" className={styles.relatedButtonDisabled} disabled>
          No direct variant <FiArrowRight />
        </button>
      )}
    </article>
  );
}

export default function EngineRelated({
  data,
  engineCode,
  engineImage,
  backgroundImage = "/images/brands/mg/brand/mg-hero-bg.png",
}: Props) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () =>
      setVisibleCount(
        window.innerWidth < 621 ? 1 : window.innerWidth < 921 ? 2 : 4,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxOffset = Math.max(0, data.items.length - visibleCount);

  useEffect(
    () => setOffset((current) => Math.min(current, maxOffset)),
    [maxOffset],
  );

  return (
    <section
      className={styles.relatedSection}
      style={
        { "--related-bg": `url("${backgroundImage}")` } as React.CSSProperties
      }
      aria-labelledby={`${engineCode.toLowerCase()}-related-title`}
    >
      <div className={styles.sectionContainer}>
        <p className={styles.eyebrow}>{data.tag}</p>
        <h2 id={`${engineCode.toLowerCase()}-related-title`}>
          <SectionHeading title={data.title} accentFrom={engineCode} />
        </h2>
        <p className={styles.sectionIntro}>
          The {engineCode} is part of the SAIC&apos;s SGE family and has a few
          close relatives that replacement buyers should be aware of.
        </p>
        <div className={styles.sliderControls}>
          <button
            type="button"
            onClick={() => setOffset((current) => Math.max(0, current - 1))}
            disabled={offset === 0}
            aria-label="Previous related engine"
          >
            <FiArrowRight className={styles.previousArrow} />
          </button>
          <button
            type="button"
            onClick={() =>
              setOffset((current) => Math.min(maxOffset, current + 1))
            }
            disabled={offset >= maxOffset}
            aria-label="Next related engine"
          >
            <FiArrowRight />
          </button>
        </div>
        <div className={styles.relatedViewport}>
          <div
            className={styles.relatedTrack}
            style={{
              transform: `translateX(calc(-${offset} * (100% + 14px) / ${visibleCount}))`,
            }}
          >
            {data.items.map((item, index) => (
              <RelatedCardItem
                key={`${item.code}-${item.relation}-${index}`}
                item={item}
                engineImage={engineImage}
              />
            ))}
          </div>
        </div>
        <div className={styles.relatedNote}>
          <FiInfo />
          <p>
            <strong>Important note:</strong> The {engineCode} is not related to
            BMW, Ford or VW engine families — it is a wholly SAIC-developed SGE
            unit.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiActivity, FiArrowRight, FiCheckCircle, FiSettings, FiTool } from "react-icons/fi";
import type { EngineFailuresSectionData } from "@/types/engine-page";
import styles from "./NewDocEngine.module.css";

type Props = { data: EngineFailuresSectionData; engineCode: string; backgroundImage?: string };
const fallbackImages = [
  "/case-studies/assets/borescope-valves-pistons.png",
  "/case-studies/assets/injector-carbon.png",
  "/case-studies/assets/twin-turbo-debris.png",
];

function ctaLabel(value: string) {
  return value.replace(/^\[/, "").replace(/\]\(#\)$/, "").trim();
}

export default function EngineFailures({ data, engineCode, backgroundImage = "/images/brands/mg/brand/mg-hero-bg.png" }: Props) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 621 ? 1 : window.innerWidth < 921 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const maxOffset = Math.max(0, data.items.length - visibleCount);
  useEffect(() => setOffset((current) => Math.min(current, maxOffset)), [maxOffset]);

  return (
    <section className={styles.failuresSection} style={{ "--failures-bg": `url("${backgroundImage}")` } as React.CSSProperties} aria-labelledby={`${engineCode.toLowerCase()}-failures-title`}>
      <div className={styles.sectionContainer}>
        <p className={styles.eyebrowLight}>{data.tag}</p>
        <h2 id={`${engineCode.toLowerCase()}-failures-title`}>{data.title}</h2>
        <p className={styles.sectionIntroLight}>While the {engineCode} is generally a reliable and efficient engine, there are some well-documented issues to be aware of, particularly with its GDI system.</p>
        <div className={styles.sliderControls}><button type="button" onClick={() => setOffset((current) => Math.max(0, current - 1))} disabled={offset === 0} aria-label="Previous engine problem"><FiArrowRight className={styles.previousArrow} /></button><button type="button" onClick={() => setOffset((current) => Math.min(maxOffset, current + 1))} disabled={offset >= maxOffset} aria-label="Next engine problem"><FiArrowRight /></button></div>
        <div className={styles.failureViewport}><div className={styles.failureTrack} style={{ transform: `translateX(-${offset * (100 / visibleCount)}%)` }}>
          {data.items.map((item, index) => {
            const image = item.image ?? fallbackImages[index % fallbackImages.length];
            const titleParts = item.title.split(" - ");
            return <article className={styles.failureCard} key={item.title}>
              <div className={styles.failureImage}><Image src={image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className={styles.failureBody}><h3>{titleParts[0]}</h3>
                <div className={styles.failureOnset}><FiActivity /><span><strong>Typical onset</strong>{item.onset.replace(/\s*\[PATTERN DATA.*$/, "")}</span></div>
                <div className={styles.failureDetail}><FiSettings /><p><strong>What happens</strong>{item.whatHappens}</p></div>
                <div className={styles.failureDetail}><FiTool /><p><strong>Repair vs replace</strong>{item.repairVsReplace}</p></div>
              </div>
            </article>;
          })}
        </div></div>
        <div className={styles.failureFooter}><div><FiCheckCircle /><p><strong>Good to know</strong>{data.goodYearsLine}</p></div><a href="#quote-form">{ctaLabel(data.cta)} <FiArrowRight /></a></div>
      </div>
    </section>
  );
}

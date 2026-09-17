"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiClock,
  FiInfo,
  FiTruck,
} from "react-icons/fi";
import type { VariantPreviewData } from "@/data/variant-preview/peugeot207Hdi";
import shared from "./VariantShared.module.css";
import styles from "./NewDocVariantCommonProblems.module.css";

type Props = {
  data: VariantPreviewData["commonProblems"];
  vehicleImage: string;
  backgroundImage: string;
};

export default function NewDocVariantCommonProblems({
  data,
  vehicleImage,
  backgroundImage,
}: Props) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () =>
      setVisibleCount(
        window.innerWidth < 661 ? 1 : window.innerWidth < 981 ? 2 : 3,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxOffset = Math.max(0, data.cards.length - visibleCount);
  const currentOffset = Math.min(offset, maxOffset);

  return (
    <section
      className={styles.section}
      aria-labelledby="variant-problems-title"
    >
      <div
        className={styles.header}
        style={
          { "--problem-bg": `url("${backgroundImage}")` } as React.CSSProperties
        }
      >
        <div className={`${shared.container} ${styles.headerInner}`}>
          <div>
            <p className={`${shared.eyebrow} ${styles.eyebrow}`}>
              {data.eyebrow}
            </p>
            <h2
              id="variant-problems-title"
              className={`${shared.sectionTitle} ${styles.headerTitle}`}
            >
              {data.titleLead}{" "}
              <span className={shared.headingAccent}>{data.titleAccent}</span>
            </h2>
            <p
              className={`${shared.sectionSubtitle} ${styles.headerDescription}`}
            >
              {data.description}
            </p>
          </div>
          <div className={styles.vehicleVisual} aria-hidden="true">
            <Image src={vehicleImage} alt="" width={600} height={330} />
          </div>
        </div>
      </div>

      <div className={shared.container}>
        <aside className={styles.valueCheck}>
          <FiActivity />
          <div>
            <strong>Vehicle value check</strong>
            <p>{data.vehicleValue}</p>
          </div>
        </aside>

        <div className={styles.controls}>
          <p>Most common 8HZ failure points and repair options</p>
          <div>
            <button
              type="button"
              onClick={() =>
                setOffset((value) =>
                  Math.max(0, Math.min(maxOffset, value - 1)),
                )
              }
              disabled={currentOffset === 0}
              aria-label="Previous problems"
            >
              <FiArrowLeft />
            </button>
            <button
              type="button"
              onClick={() =>
                setOffset((value) => Math.min(maxOffset, value + 1))
              }
              disabled={currentOffset >= maxOffset}
              aria-label="Next problems"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{
              transform: `translateX(calc(-${offset} * (100% + 14px) / ${visibleCount}))`,
            }}
          >
            {data.cards.map((card, index) => {
              const problemEmoji = ["🌡️", "⏱️", "⚙️"][index] ?? "🔧";
              return (
                <article className={styles.failureCard} key={card.title}>
                  <div className={styles.cardHeading}>
                    <span className={styles.problemIcon} aria-hidden="true">
                      {problemEmoji}
                    </span>
                    <h3>{card.title}</h3>
                  </div>
                  <dl className={styles.facts}>
                    <div>
                      <dt>
                        <FiTruck />
                        Affected
                      </dt>
                      <dd>{card.affected}</dd>
                    </div>
                    <div>
                      <dt>
                        <FiClock />
                        Typical failure mileage
                      </dt>
                      <dd>{card.mileage}</dd>
                    </div>
                  </dl>
                  <div className={styles.rootCause}>
                    <FiInfo />
                    <p>
                      <strong>Root cause</strong>
                      {card.rootCause}
                    </p>
                  </div>
                  <div className={styles.repairTable}>
                    <p>Repair options</p>
                    <table>
                      <thead>
                        <tr>
                          <th>Repair tier</th>
                          <th>Dealer price</th>
                          <th>Specialist price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {card.repairOptions.map((option) => (
                          <tr key={option.tier}>
                            <td>{option.tier}</td>
                            <td>{option.dealer}</td>
                            <td>{option.specialist}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.recommendation}>
                    <FiAward />
                    <p>
                      <strong>Our recommendation</strong>
                      {card.recommendation}
                    </p>
                  </div>
                  <a href="#quote">
                    {card.cta}
                    <FiArrowRight />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

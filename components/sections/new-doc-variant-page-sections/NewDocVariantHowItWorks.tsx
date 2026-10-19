"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import type { NewDocVariantData } from "@/types/new-doc-variant";
import shared from "./VariantShared.module.css";
import styles from "./NewDocVariantHowItWorks.module.css";

type Props = { steps: NewDocVariantData["howItWorks"] };
const icons = [
  "/Home/reg-here.webp",
  "/icons/engine-market/how-compare-prices-3d.png",
  "/icons/engine-market/how-choose-deal.png",
];

function stripStepIconLabel(text: string) {
  return text
    .replace(
      /^\s*(?:🖼️\s*)?(?:\[(?:registration|compare|booking)\s+icon\]|(?:registration|compare|booking)\s+icon)\.?\s*/i,
      "",
    )
    .trim();
}

export default function NewDocVariantHowItWorks({ steps }: Props) {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section
      className={styles.section}
      aria-labelledby="variant-how-it-works-title"
    >
      <div className={shared.container}>
        <p className={shared.eyebrow}>How it works</p>
        <h2 id="variant-how-it-works-title" className={shared.sectionTitle}>
          3 Simple Steps to Finding the Right{" "}
          <span className={shared.headingAccent}>Replacement Engine</span>
        </h2>
        <p className={shared.sectionSubtitle}>
          Clear information first, then the right engine and specialist for your
          exact vehicle.
        </p>
        <div className={styles.grid}>
          {steps.map((step, index) => {
            const icon = icons[index] ?? "/icons/how-choose-deal.png";
            const isFlipped = flipped === step.number;
            const isFirst = index === 0;
            const isComparison = index === 1;

            return (
              <button
                key={step.number}
                type="button"
                className={`${styles.flipCard} ${isFlipped ? styles.flipped : ""}`}
                aria-pressed={isFlipped}
                onClick={() => setFlipped(isFlipped ? null : step.number)}
              >
                <span className={styles.cardInner}>
                  {/* FRONT */}
                  <span className={`${styles.face} ${styles.front}`}>
                    <span className={styles.number}>{step.number}</span>
                    <span
                      className={`${styles.icon} ${isFirst ? styles.iconFirst : isComparison ? styles.iconComparison : ""}`}
                      aria-hidden="true"
                    >
                      <Image
                        src={icon}
                        alt=""
                        width={isFirst ? 120 : 92}
                        height={isFirst ? 120 : 92}
                      />
                    </span>
                    <span
                      className={`${shared.cardTitle} ${styles.cardTitle}`}
                      style={{
                        fontFamily:
                          '"Bebas Neue", "Urbanist", ui-sans-serif, system-ui, sans-serif',
                        fontWeight: 550,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`${shared.cardDescription} ${styles.cardDescription}`}
                    >
                      {stripStepIconLabel(step.description)}
                    </span>
                    <span className={styles.action}>
                      Learn more <FiArrowRight />
                    </span>
                  </span>

                  {/* BACK */}
                  <span className={`${styles.face} ${styles.back}`}>
                    <span className={styles.backBody}>
                      <span className={styles.backLabel}>Why this matters</span>
                      <span
                        className={`${shared.cardTitle} ${styles.cardTitle}`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`${shared.cardDescription} ${styles.cardDescription}`}
                      >
                        {step.back}
                      </span>
                    </span>
                    <span className={styles.action}>
                      Tap to return <FiArrowRight />
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

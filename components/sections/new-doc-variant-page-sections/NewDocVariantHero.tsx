import Image from "next/image";
import {
  FiArrowRight,
  FiCheckCircle,
  FiLock,
  FiTool,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import type { VariantPreviewData } from "@/data/variant-preview/peugeot207Hdi";
import shared from "./VariantShared.module.css";
import styles from "./NewDocVariantHero.module.css";

type Props = Pick<
  VariantPreviewData,
  "brand" | "model" | "variant" | "engineCode" | "images" | "hero"
>;

const trustIcons = [FiTool, FiCheckCircle, FiTruck, FiUsers];

export default function NewDocVariantHero({
  brand,
  model,
  variant,
  images,
  hero,
}: Props) {
  const ticker = [
    ...hero.tickerItems,
    ...hero.tickerItems,
    ...hero.tickerItems,
    ...hero.tickerItems,
  ];

  return (
    <section className={styles.hero} aria-labelledby="variant-preview-title">
      <Image
        className={styles.background}
        src={images.heroBackground}
        alt=""
        fill
        priority
        unoptimized
      />
      <div className={styles.overlay} />
      <div className={`${shared.container} ${styles.content}`}>
        <div className={styles.copy}>
          <p className={styles.specialistBadge}>{hero.eyebrow}</p>
          <h1 id="variant-preview-title" className={styles.title}>
            <span>{hero.titleLead}</span>{" "}
            <span className={styles.titleAccent}>{hero.titleAccent}</span>
          </h1>
          <p className={styles.description}>{hero.description}</p>
          <div className={styles.trustGrid}>
            {hero.trustItems.map((item, index) => {
              const Icon = trustIcons[index] ?? FiCheckCircle;
              return (
                <div key={item} className={styles.trustItem}>
                  <Icon />
                  <span>{item}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.priceAnchor}>
            <div>
              <strong>{hero.price.engineName}</strong>
              <span>
                from <b>{hero.price.range}</b>
              </span>
            </div>
            <ul>
              {hero.price.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.optionCardsWrap}>
            <div className={styles.optionCards}>
              {hero.options.map((option) => (
                <a
                  key={option.description}
                  className={styles.optionCard}
                  href={option.href}
                >
                  <span className={styles.optionImageArea}>
                    <Image
                      src={option.image}
                      alt={`${brand} ${model} ${variant} ${option.description}`}
                      width={120}
                      height={82}
                    />
                  </span>
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.visuals} aria-hidden="true">
          <Image
            className={styles.brandLogo}
            src={images.brandLogo}
            alt=""
            width={160}
            height={160}
            priority
          />
          <Image
            className={styles.vehicle}
            src={images.vehicle}
            alt=""
            width={650}
            height={365}
            priority
          />
        </div>

        <form className={styles.quoteCard} id="quote">
          <h2>
            Get your free {brand} {model} {variant} engine quotes
          </h2>
          <label className="sr-only" htmlFor="variant-registration">
            Vehicle registration
          </label>
          <div className={styles.regInput}>
            <span aria-hidden="true">🇬🇧 GB</span>
            <input
              id="variant-registration"
              placeholder="Enter your reg — e.g. AB12 CDE"
            />
          </div>
          <button type="submit">
            {hero.cta} <FiArrowRight />
          </button>
          <p>
            <FiLock /> Secure enquiry — no spam, no pressure. Genuine quotes
            only from vetted UK specialists.
          </p>
        </form>
      </div>
      <div className={styles.ticker} aria-label="Engine service benefits">
        <div className={styles.tickerTrack}>
          {ticker.map((item, index) => (
            <span key={`${item}-${index}`}>
              <FiCheckCircle />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

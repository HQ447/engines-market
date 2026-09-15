import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiActivity,
  FiAward,
  FiCalendar,
  FiChevronDown,
  FiChevronRight,
  FiDroplet,
  FiLock,
  FiSettings,
  FiShield,
  FiTool,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { FaGears, FaGaugeHigh, FaMoneyBillTrendUp } from "react-icons/fa6";
import type {
  EngineCompatibilitySectionData,
  EnginePageHeroData,
  EngineSpecsSectionData,
} from "@/types/engine-page";
import styles from "./Mg10e4eHero.module.css";

type Props = {
  data: EnginePageHeroData;
  engineCode: string;
  specs: EngineSpecsSectionData;
  compatibility: EngineCompatibilitySectionData;
};

const benefitIcons = [FiTool, FiShield, FiTruck, FiUsers];
const benefitLabels = [
  ["Supply & Fit", "Available"],
  ["12-Month", "Warranty"],
  ["Nationwide", "Delivery"],
  ["100+", "Suppliers"],
];

function UkFlag() {
  return (
    <svg viewBox="0 0 28 18" className={styles.flag} aria-hidden="true">
      <rect width="28" height="18" fill="#012169" />
      <path d="M0 0 28 18M28 0 0 18" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 28 18M28 0 0 18" stroke="#c8102e" strokeWidth="2" />
      <path d="M14 0v18M0 9h28" stroke="#fff" strokeWidth="6" />
      <path d="M14 0v18M0 9h28" stroke="#c8102e" strokeWidth="3" />
    </svg>
  );
}

export default function Mg10e4eHero({ data, engineCode, specs, compatibility }: Props) {
  const engineCutout = "/images/shared/hero-engines/temporary-petrol-engine-cutout.png";

  return (
    <>
      <section className={styles.hero} aria-labelledby="mg-10e4e-title">
        <div className={styles.background} aria-hidden="true">
          <Image src="/images/brands/mg/brand/mg-hero-bg.png" alt="" fill priority sizes="100vw" />
        </div>
        <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.copy}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              {data.breadcrumbs.map((item) => (
                <span key={item.label} className={styles.breadcrumbItem}>
                  {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                  <FiChevronRight aria-hidden="true" />
                </span>
              ))}
              <span>{engineCode}</span>
            </nav>

            <div className={styles.pills} aria-label="Engine summary">
              {data.pills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>

            <h1 id="mg-10e4e-title">{data.title}</h1>
            <p className={styles.description}>{data.description}</p>

            <div className={styles.benefits}>
              {data.trustBadges.map((benefit, index) => {
                const Icon = benefitIcons[index] ?? FiSettings;
                const lines = benefitLabels[index] ?? [benefit];
                return (
                  <div className={styles.benefit} key={benefit}>
                    <Icon aria-hidden="true" />
                    <span>
                      {lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.pricePanel} aria-label="Starting engine prices">
              {data.prices.map((price) => (
                <div className={styles.price} key={price.label}>
                  <span>{price.label}</span>
                  <strong>{price.price}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.visualGlow} />
            <div className={styles.mgMark} aria-hidden="true">MG</div>
            <Image
              className={styles.engine}
              src={engineCutout}
              alt={data.engineImage.alt}
              fill
              priority
              sizes="(max-width: 820px) 92vw, 48vw"
            />
            <p className={styles.visualTagline}>Same engineering.<br />More journeys.</p>
          </div>
        </div>

        <div className={styles.quotePanel} id="quote-form">
          <div className={styles.registration}>
            <div className={styles.country}>
              <UkFlag />
              <span>{data.quoteCard.countryCode}</span>
              <FiChevronDown aria-hidden="true" />
            </div>
            <label className="sr-only" htmlFor="mg-registration">Vehicle registration</label>
            <input id="mg-registration" name="registration" placeholder={data.quoteCard.placeholder} />
          </div>
          <a className={styles.quoteButton} href="#quote-form">
            {data.quoteCard.buttonText}
            <FiArrowRight aria-hidden="true" />
          </a>
          <p className={styles.quoteNote}>
            <FiLock aria-hidden="true" />
            <span>{data.quoteCard.note}</span>
          </p>
        </div>

        <div className={styles.proofRow}>
          <div><FiSettings aria-hidden="true" /><span><strong>Genuine & quality checked</strong><small>Engines</small></span></div>
          <div><FiShield aria-hidden="true" /><span><strong>Competitive</strong><small>UK pricing</small></span></div>
          <div><FiUsers aria-hidden="true" /><span><strong>Expert support</strong><small>We help you find the right engine</small></span></div>
          <div className={styles.trustpilot}><span aria-hidden="true">★</span><strong>Trusted by UK drivers</strong></div>
        </div>
        </div>
      </section>

      <section className={styles.specsSection} aria-labelledby="mg-specs-title">
        <div className={styles.specsContainer}>
          <p className={styles.eyebrow}>{specs.tag}</p>
          <h2 id="mg-specs-title">{specs.title}</h2>
          <p className={styles.specsIntro}>
            Key technical details for the MG 10E4E engine, including performance, fitment and replacement information.
          </p>

          <div className={styles.specsGrid}>
            <dl className={styles.specTable}>
              {specs.specs.map((spec, index) => {
                const Icon = [FiSettings, FiDroplet, FiTool, FiActivity, FiCalendar, FiUsers][index] ?? FiAward;
                return (
                  <div className={styles.specRow} key={spec.label}>
                    <dt><Icon aria-hidden="true" />{spec.label}</dt>
                    <dd>{spec.value || "Available on request"}</dd>
                  </div>
                );
              })}
            </dl>

            <aside className={styles.specAside}>
              <div className={styles.specFeatureCard}>
                <div className={styles.specImage}>
                  <Image src={data.engineImage.src} alt="MG 10E4E engine close-up" fill sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className={styles.specHighlights}>
                  <div><FaGears aria-hidden="true" /><strong>1.0L Turbo GDI</strong><span>Modern & efficient</span></div>
                  <div><FaMoneyBillTrendUp aria-hidden="true" /><strong>Improved economy</strong><span>Lower running costs</span></div>
                  <div><FaGaugeHigh aria-hidden="true" /><strong>Proven platform</strong><span>Used in MG3 & ZS</span></div>
                </div>
              </div>
              <blockquote>
                <span aria-hidden="true">“</span>
                <div>
                  <p>A modern, efficient turbocharged engine designed for everyday performance and reliability.</p>
                  <cite>— Engines Market</cite>
                </div>
              </blockquote>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.fitmentSection} aria-labelledby="mg-fitment-title">
        <div className={styles.fitmentContainer}>
          <p className={styles.eyebrow}>{compatibility.tag}</p>
          <h2 id="mg-fitment-title">{compatibility.title}</h2>
          <p className={styles.fitmentIntro}>{compatibility.intro}</p>

          <div className={styles.fitmentGrid}>
            <div className={styles.modelTable}>
              <div className={styles.modelHeader}>
                <span>Model</span><span>Generation / Chassis</span><span>Badge(s)</span><span>Years</span><span>View model</span>
              </div>
              {compatibility.rows.map((model, index) => {
                const image = index === 0
                  ? "/images/brands/mg/models/mg-3-model-card.png"
                  : "/images/brands/mg/models/mg-zs-model-card.png";
                return (
                  <div className={styles.modelRow} key={model.model}>
                    <div className={styles.modelName}>
                      <Image src={image} alt={model.model} width={88} height={48} sizes="88px" />
                      <strong>{model.model}</strong>
                    </div>
                    <span>{model.generation}</span>
                    <span>{model.badges}</span>
                    <span>{model.years}</span>
                    <div>
                      {model.links[0] ? <Link href={model.links[0].href}>{model.links[0].label} <FiArrowRight aria-hidden="true" /></Link> : "—"}
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className={styles.fitmentNotes}>
              <div className={styles.fitmentNote}>
                <FiActivity aria-hidden="true" />
                <div>
                  <strong>Not shared with European brands</strong>
                  <p>The 10E4E is SAIC&apos;s own design and is not shared with any mainstream European brand. Always match the exact engine-code suffix before buying.</p>
                </div>
              </div>
              <div className={styles.fitmentNote}>
                <FiUsers aria-hidden="true" />
                <div>
                  <strong>Not sure which engine your car has?</strong>
                  <p>Enter your registration above — we&apos;ll confirm your exact 10E4E fitment before any quotes are sent.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

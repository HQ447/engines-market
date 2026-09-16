import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiInfo, FiSearch, FiShuffle, FiTool } from "react-icons/fi";
import type { EngineVariantsSectionData } from "@/types/engine-page";
import styles from "./NewDocEngine.module.css";

type Props = { data: EngineVariantsSectionData; engineCode: string; engineImage?: string; backgroundImage?: string };

const fallbackCards = [
  ["Where to find the code", "The engine code is stamped on the engine block, typically on the front face near the timing cover or on the driver’s side. It also appears on the V5C registration document under “Engine number”. A VIN decoder will confirm the exact factory build code."],
  ["Which codes get confused with it", "The 10E4E is commonly confused with the later 10E4F (2020+) and the naturally aspirated 1.0-litre 10S4G used in some Chinese-market SAIC vehicles."],
  ["Why fitting the wrong revision matters", "A later revision may physically fit but can cause injector timing mismatches or emissions test failures. Always match the exact suffix when buying a replacement."],
];

export default function EngineVariants({ data, engineCode, engineImage, backgroundImage = "/images/brands/mg/brand/mg-hero-bg.png" }: Props) {
  const cards = data.cards ?? fallbackCards.map(([title, body]) => ({ title, body }));
  return (
    <section className={styles.variantsSection} style={{ "--variants-bg": `url("${backgroundImage}")` } as React.CSSProperties} aria-labelledby={`${engineCode.toLowerCase()}-variants-title`}>
      <div className={styles.sectionContainer}>
        <p className={styles.eyebrow}>{data.tag}</p><h2 id={`${engineCode.toLowerCase()}-variants-title`}>{data.title}</h2><p className={styles.sectionIntro}>{data.intro.split(" Where to find")[0]}</p>
        <div className={styles.variantGrid}>
          <article className={styles.engineIdentity}>{engineImage ? <Image src={engineImage} alt={`${engineCode} engine`} width={270} height={220} /> : null}<h3>{engineCode}</h3><strong>1.0-litre Turbo GDI</strong><span>Part of SAIC&apos;s SGE family</span></article>
          {cards.map((card, index) => { const Icon = [FiSearch, FiShuffle, FiTool][index] ?? FiInfo; return <article className={`${styles.variantCard} ${index === 2 ? styles.variantDarkCard : ""}`} key={card.title}><div className={styles.variantIcon}><Icon /></div><h3>{card.title}</h3><p>{card.body}</p>{index === 0 ? <div className={styles.variantMiniList}><div className={styles.variantMini}><FiTool /><span><strong>Engine block</strong>Front face near the timing cover or driver&apos;s side.</span></div><div className={styles.variantMini}><FiInfo /><span><strong>V5C document</strong>Under “Engine number”.</span></div><div className={styles.variantMini}><FiSearch /><span><strong>VIN decoder</strong>Confirm the exact factory build code.</span></div></div> : null}{index === 1 ? <div className={styles.codeList}><span><FiCheckCircle /><strong>10E4E</strong> Original engine code</span><span><FiInfo /><strong>10E4F</strong> Later revision (2020+)</span><span><FiInfo /><strong>10S4G</strong> Naturally aspirated</span></div> : null}{index === 2 && engineImage ? <Image className={styles.variantDarkImage} src={engineImage} alt="" width={180} height={150} /> : null}</article>; })}
        </div>
        <div className={styles.variantClosing}><FiInfo /><p><strong>Not sure?</strong>{data.closing}</p><a href="#quote-form">Get {engineCode} quotes <FiArrowRight /></a></div>
      </div>
    </section>
  );
}

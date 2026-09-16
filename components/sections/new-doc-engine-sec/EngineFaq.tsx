import Link from "next/link";
import { FiArrowRight, FiHelpCircle, FiSearch } from "react-icons/fi";
import type { EngineFaqSectionData } from "@/types/engine-page";
import styles from "./NewDocEngine.module.css";

type Props = { data: EngineFaqSectionData; engineCode: string };

export default function EngineFaq({ data, engineCode }: Props) {
  return <section className={styles.faqSection} aria-labelledby={`${engineCode.toLowerCase()}-faq-title`}><div className={styles.sectionContainer}><div className={styles.faqHeading}><div><p className={styles.eyebrow}>{data.tag}</p><h2 id={`${engineCode.toLowerCase()}-faq-title`}>{data.title}</h2></div><div className={styles.faqContact}><FiSearch /><span>Still have a question?<small>Get in touch with our team.</small></span><Link href="#quote-form">Contact us <FiArrowRight /></Link></div></div><div className={styles.faqGrid}>{data.items.map((item, index) => <article className={styles.faqCard} key={item.question}><span className={styles.questionNumber}>Q{index + 1}</span><div><h3>{item.question.replace(/-$/, "?")}</h3><p>{item.answer}</p>{item.bullets ? <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}{item.cta ? <Link href="#quote-form">{item.cta} <FiArrowRight /></Link> : null}</div></article>)}</div></div></section>;
}

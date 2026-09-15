import type { Metadata } from "next";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import "./globals.css";

export const metadata: Metadata = {
  title: "MG 10E4E Engine Replacement | Preview",
  description: "Preview of the MG 10E4E engine landing page.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="previewBody">
        <header className="siteHeader">
          <div className="siteHeaderInner">
            <a href="#top" className="siteLogo" aria-label="Engines Market home">
              <Image src="/branding/engine-market-logo-header-tight.png" alt="Engines Market" width={3919} height={763} priority />
            </a>
            <nav className="siteNav" aria-label="Primary navigation">
              <a href="#services">Services <span>⌄</span></a>
              <a href="#prices">Prices <span>⌄</span></a>
              <a href="#brands">Brands <span>⌄</span></a>
              <a href="#knowledge">Knowledge <span>⌄</span></a>
              <a href="#insights">Insights <span>⌄</span></a>
              <a href="#blog">Blog</a>
            </nav>
            <div className="siteActions">
              <a className="sitePhone" href="tel:+442034884649">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.44-1.29a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.64.63A2 2 0 0 1 22 16.92Z" /></svg>
                020 3488 4649
              </a>
              <a className="siteWhatsapp" href="https://wa.me/447311343662" target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /> WhatsApp</a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="siteFooter">
          <div className="siteFooterInner">
            <section className="footerIntro">
              <Image src="/branding/engine-market-logo-header-tight.png" alt="Engines Market" width={3919} height={763} />
              <p>Compare replacement, used and reconditioned engine options from trusted UK specialists.</p>
              <a href="tel:+442034884649">Call 020 3488 4649</a>
              <a href="https://wa.me/447311343662" target="_blank" rel="noreferrer">WhatsApp 07311 343662</a>
            </section>
            <section className="footerLinks" aria-label="Footer navigation">
              <div><h2>Company</h2><a href="#about">About Us</a><a href="#how-it-works">How It Works</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div>
              <div><h2>Services</h2><a href="#replacement">Replacement Engines</a><a href="#used">Used Engines</a><a href="#reconditioned">Reconditioned Engines</a><a href="#fitting">Engine Fitting</a></div>
              <div><h2>Knowledge</h2><a href="#failures">Engine Failures</a><a href="#symptoms">Car Symptoms</a><a href="#guides">Guides &amp; Tools</a><a href="#resources">All Resources</a></div>
              <div><h2>Legal</h2><a href="#privacy">Privacy Policy</a><a href="#terms">Terms &amp; Conditions</a><a href="#cookies">Cookie Policy</a></div>
            </section>
          </div>
          <div className="siteFooterCopyright">Copyright {new Date().getFullYear()} Engines Market. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}

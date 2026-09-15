import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "MG 10E4E Engine Replacement | Preview",
  description: "Preview of the MG 10E4E engine landing page.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="previewNav">
          <div className="previewNavInner">
            <Image src="/branding/engine-market-logo-header-tight.png" alt="Engines Market" width={392} height={76} priority />
            <nav aria-label="Primary navigation">
              <span>Services</span><span>Prices</span><span>Brands</span><span>Knowledge</span><span>Insights</span><span>Blog</span>
            </nav>
            <div className="previewNavActions"><span>020 3488 4649</span><b>WhatsApp</b></div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

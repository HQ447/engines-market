# Navbar and Footer Standardization Report

**Date:** 2026-10-22  
**Project:** Engines Market  
**Purpose:** Identify live authority pages that do not use the main shared navbar and footer before running a Python replacement script.

## Executive summary

The main shared navbar and footer are rendered by the Next.js root layout:

- `app/layout.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`

The affected authority pages are standalone HTML files under `public/`. They do not render the React components from `app/layout.tsx`.

There are **92 live authority/static pages** that need standardization:

| Group | Count | Current implementation |
|---|---:|---|
| Static navigation pages | 61 | Load `public/static-nav.js` and `public/static-nav.css`; these inject a separate navbar and footer that visually and behaviorally differ from the main shared components. |
| Page-specific navigation pages | 31 | Do not load the static navigation assets; they contain their own inline navbar, mobile menu, and footer markup. |
| **Total affected** | **92** | Neither group uses the main shared React navbar/footer. |

The menu data is shared through `lib/navData.ts` and `/api/static-nav`, but the rendered navbar and footer are still separate implementations.

The prepared replacement tool is `scripts/standardize_static_nav_footer.py`. It uses the existing `public/static-nav.js` and `public/static-nav.css` functionality, targets only the 92 files listed below, runs as a dry-run by default, and requires `--apply` before writing changes. With the default settings, backups are stored outside the repository at `C:\Users\hp\Desktop\engines-market-nav-footer-backups\<timestamp>`.

Parity note: standalone HTML cannot directly render the TypeScript/React `Navbar` and `Footer` components. The static implementation therefore provides the equivalent shared layout, styling, links, responsive behavior, dropdown/flyout menus, search, mobile navigation, footer accordions, phone/WhatsApp actions, accessibility attributes, and current-year copyright. It consumes the same navigation data through `/api/static-nav`; it does not alter page content, article logic, schemas, or other scripts.

## Pages using the separate static navbar/footer

These pages correspond to the mobile menu shown in the reported screenshot. Their source files load `static-nav.js`/`static-nav.css` and receive an `em-static-header` and `em-static-footer`.

### About — 6 pages

| Live URL | Source file |
|---|---|
| `/about` | `public/about/about-us.html` |
| `/about/contact` | `public/about/contact.html` |
| `/about/engine-warranty-guide` | `public/about/engine-warranty-guide.html` |
| `/about/how-engines-market-works` | `public/about/how-engines-market-works.html` |
| `/about/supplier-standards` | `public/about/supplier-standards.html` |
| `/about/warranty-claims-guide` | `public/about/warranty-claims-guide.html` |

### Case studies — 20 pages

| Live URL | Source file |
|---|---|
| `/case-studies/audi-a4-timing-chain-failure` | `public/case-studies/audi-a4-timing-chain-failure.html` |
| `/case-studies/audi-a6-oil-consumption` | `public/case-studies/audi-a6-oil-consumption.html` |
| `/case-studies/bmw-320d-engine-replacement` | `public/case-studies/bmw-320d-engine-replacement.html` |
| `/case-studies/bmw-n47-timing-chain-failure` | `public/case-studies/bmw-n47-timing-chain-failure.html` |
| `/case-studies/bmw-n57-engine-replacement` | `public/case-studies/bmw-n57-engine-replacement.html` |
| `/case-studies/ford-ranger-engine-replacement` | `public/case-studies/ford-ranger-engine-replacement.html` |
| `/case-studies/ford-transit-engine-failure` | `public/case-studies/ford-transit-engine-failure.html` |
| `/case-studies/jaguar-ingenium-timing-chain` | `public/case-studies/jaguar-ingenium-timing-chain.html` |
| `/case-studies/jaguar-xf-engine-replacement` | `public/case-studies/jaguar-xf-engine-replacement.html` |
| `/case-studies/land-rover-discovery-crank-failure` | `public/case-studies/land-rover-discovery-crank-failure.html` |
| `/case-studies/mercedes-om651-timing-chain` | `public/case-studies/mercedes-om651-timing-chain.html` |
| `/case-studies/mercedes-sprinter-engine-replacement` | `public/case-studies/mercedes-sprinter-engine-replacement.html` |
| `/case-studies/nissan-navara-engine-failure` | `public/case-studies/nissan-navara-d40-case-study.html` |
| `/case-studies/peugeot-boxer-engine-replacement` | `public/case-studies/peugeot-boxer-engine-replacement.html` |
| `/case-studies/range-rover-evoque-timing-chain` | `public/case-studies/range-rover-evoque-timing-chain.html` |
| `/case-studies/range-rover-sdv6-crankshaft-failure` | `public/case-studies/range-rover-sdv6-crankshaft-failure.html` |
| `/case-studies/toyota-hilux-engine-replacement` | `public/case-studies/toyota-hilux-engine-replacement.html` |
| `/case-studies/vauxhall-vivaro-engine-failure` | `public/case-studies/vauxhall-vivaro-engine-failure.html` |
| `/case-studies/vw-amarok-engine-replacement` | `public/case-studies/vw-amarok-engine-replacement.html` |
| `/case-studies/vw-transporter-engine-rebuild` | `public/case-studies/vw-transporter-engine-rebuild.html` |

### Insights — 5 pages

| Live URL | Source file |
|---|---|
| `/insights/most-reliable-petrol-engines` | `public/insights/most-reliable-petrol-engines.html` |
| `/insights/most-replaced-engines-uk` | `public/insights/most-replaced-engines-uk.html` |
| `/insights/uk-engine-market-report-2026` | `public/insights/uk-engine-market-report-2026.html` |
| `/insights/uk-engine-price-index` | `public/insights/uk-engine-price-index.html` |
| `/insights/uk-engine-replacement-statistics` | `public/insights/uk-engine-replacement-statistics.html` |

### Legal — 1 page

| Live URL | Source file |
|---|---|
| `/legal/complaints-procedure` | `public/legal/complaints-procedure.html` |

### Prices — 5 pages

| Live URL | Source file |
|---|---|
| `/prices/crankshaft-repair-cost` | `public/prices/crankshaft-repair-cost.html` |
| `/prices/dpf-replacement-cost` | `public/prices/dpf-replacement-cost.html` |
| `/prices/timing-chain-replacement-cost` | `public/prices/timing-chain-replacement-cost.html` |
| `/prices/turbo-replacement-cost` | `public/prices/turbo-replacement-cost.html` |
| `/prices/used-engine-cost` | `public/prices/used-engine-cost.html` |

### Services — 6 pages

| Live URL | Source file |
|---|---|
| `/services/engine-diagnostic` | `public/services/engine-diagnostic.html` |
| `/services/engine-fitting` | `public/services/engine-fitting.html` |
| `/services/engine-inspection` | `public/services/engine-inspection.html` |
| `/services/engine-inspection-service` | `public/services/engine-inspection-service.html` |
| `/services/engine-repair` | `public/services/engine-repair.html` |
| `/services/gearbox-replacement` | `public/services/gearbox-replacement.html` |

### Symptoms — 17 pages

| Live URL | Source file |
|---|---|
| `/symptoms/coolant-loss` | `public/symptoms/coolant-loss.html` |
| `/symptoms/coolant-warning-light` | `public/symptoms/coolant-warning-light.html` |
| `/symptoms/dpf-warning-light` | `public/symptoms/dpf-warning-light.html` |
| `/symptoms/engine-knocking-noise` | `public/symptoms/engine-knocking-noise.html` |
| `/symptoms/engine-overheating` | `public/symptoms/engine-overheating.html` |
| `/symptoms/engine-rattling-noise` | `public/symptoms/engine-rattling-noise.html` |
| `/symptoms/engine-stalling` | `public/symptoms/engine-stalling.html` |
| `/symptoms/engine-ticking-noise` | `public/symptoms/engine-ticking-noise.html` |
| `/symptoms/engine-wont-start` | `public/symptoms/engine-wont-start.html` |
| `/symptoms/excessive-oil-consumption` | `public/symptoms/excessive-oil-consumption.html` |
| `/symptoms/exhaust-leak-sound` | `public/symptoms/exhaust-leak-sound.html` |
| `/symptoms/limp-mode` | `public/symptoms/limp-mode.html` |
| `/symptoms/loss-of-power` | `public/symptoms/loss-of-power.html` |
| `/symptoms/metal-shavings-in-oil` | `public/symptoms/metal-shavings-in-oil.html` |
| `/symptoms/oil-warning-light` | `public/symptoms/oil-warning-light.html` |
| `/symptoms/rough-idle` | `public/symptoms/rough-idle.html` |
| `/symptoms/white-smoke` | `public/symptoms/white-smoke.html` |

### Reviews — 1 page

| Live URL | Source file |
|---|---|
| `/reviews` | `public/reviews.html` |

## Pages with page-specific navbar/footer markup

These pages do not load the static navigation assets and contain their own embedded navbar, mobile menu, and footer. They are the highest-risk pages for inconsistent navigation.

### Insights — 5 pages

| Live URL | Source file |
|---|---|
| `/insights/average-engine-replacement-times` | `public/insights/average-engine-replacement-times.html` |
| `/insights/engine-warranty-statistics-uk` | `public/insights/engine-warranty-statistics-uk.html` |
| `/insights/most-common-engine-failures-uk` | `public/insights/most-common-engine-failures-uk.html` |
| `/insights/most-expensive-engine-repairs-uk` | `public/insights/most-expensive-engine-repairs-uk.html` |
| `/insights/most-reliable-diesel-engines` | `public/insights/most-reliable-diesel-engines.html` |

### Legal — 4 pages

| Live URL | Source file |
|---|---|
| `/legal/cookie-policy` | `public/legal/cookie-policy.html` |
| `/legal/data-handlng-policy` | `public/legal/data-handlng-policy.html` |
| `/legal/privacy-policy` | `public/legal/privacy-policy.html` |
| `/legal/terms-and-conditions` | `public/legal/terms-and-conditions.html` |

> Note: `data-handlng-policy.html` contains the existing `handlng` spelling. The Python script should preserve the current route unless URL correction is explicitly included in scope.

### Prices — 10 pages

| Live URL | Source file |
|---|---|
| `/prices/engine-fitting-cost` | `public/prices/engine-fitting-cost.html` |
| `/prices/engine-replacement-cost` | `public/prices/engine-replacement-cost.html` |
| `/prices/garage-labour-rates` | `public/prices/garage-labour-rates.html` |
| `/prices/gearbox-replacement-cost` | `public/prices/gearbox-replacement-cost.html` |
| `/prices/head-gasket-repair-cost` | `public/prices/head-gasket-repair-cost.html` |
| `/prices/injector-replacement-cost` | `public/prices/injector-replacement-cost.html` |
| `/prices/rebuilt-engine-cost` | `public/prices/rebuilt-engine-cost.html` |
| `/prices/reconditioned-engine-cost` | `public/prices/reconditioned-engine-cost.html` |
| `/prices/remanufactured-engine-cost` | `public/prices/remanfactured-engine-cost.html` |
| `/prices/vehicle-recovery-cost` | `public/prices/vehicle-recovery-cost.html` |

### Services — 9 pages

| Live URL | Source file |
|---|---|
| `/services/rebuilt-engines` | `public/services/rebuilt-engines.html` |
| `/services/reconditioned-engines` | `public/services/reconditioned-engines.html` |
| `/services/remanufactured-engines` | `public/services/remanufactured-engines.html` |
| `/services/replacement-engines` | `public/services/replacement-engines.html` |
| `/services/supply-and-fit` | `public/services/supply-and-fit.html` |
| `/services/used-engines` | `public/services/used-engines.html` |
| `/services/vehicle-recovery` | `public/services/vehicle-recovery.html` |
| `/services/gearbox-replacement/automatic` | `public/services/gearbox-replacement/automatic.html` |
| `/services/gearbox-replacement/manual` | `public/services/gearbox-replacement/manual.html` |

### Symptoms — 3 pages

| Live URL | Source file |
|---|---|
| `/symptoms/black-smoke` | `public/symptoms/black-smoke.html` |
| `/symptoms/blue-smoke` | `public/symptoms/blue-smoke.html` |
| `/symptoms/check-engine-light` | `public/symptoms/check-engine-light.html` |

## Pages already using the main shared navbar/footer

These should **not** be modified by the replacement script:

- Brand, model, and variant routes: `/{brand}`, `/{brand}/{model}`, and `/{brand}/{model}/{variant}`
- Compare routes: `/compare/{slug}`
- Failure routes: `/failures/{slug}`
- Hub/app routes such as `/`, `/services`, `/prices`, `/insights`, `/symptoms`, `/case-studies`, `/resources`, `/guides`, `/blog`, `/form`, and `/get-a-quote`

The files under `public/compare/` and `public/failures/` are source/content files, but their live routes are handled by the Next.js app routes. They should not be treated as affected static pages.

## Python replacement-script requirements

The script should:

1. Operate only on the 92 source HTML files listed in this report.
2. Identify the existing primary navbar and footer by structure/class, not by broad text replacement.
3. Preserve breadcrumbs, page-jump navigation, article content, schema, metadata, and other in-page navigation.
4. Replace only the primary navbar and primary footer.
5. Preserve the current URL/file names, including existing spelling anomalies, unless URL corrections are separately approved.
6. Create backups or write a dry-run report before modifying files.
7. Verify that every affected page contains exactly one shared navbar and one shared footer after replacement.
8. Verify that compare, failures, dynamic routes, and already-correct app pages remain unchanged.

## Important implementation note

The React components `Navbar.tsx` and `Footer.tsx` cannot be pasted directly into standalone HTML files and work by themselves. The replacement approach must either:

- migrate these pages into Next.js layouts/routes, or
- replace the static HTML with a static equivalent that exactly mirrors the main shared navbar/footer and is backed by the same navigation data.

The report identifies the pages and safe script scope; it does not make any page changes.

## Authority static page UI grouping audit

**Audit date:** 2026-10-22  
**Scope:** 92 live authority/static HTML pages under `public/about/`, `public/case-studies/`, `public/insights/`, `public/legal/`, `public/prices/`, `public/services/`, `public/symptoms/`, and `public/reviews.html`.  
**Excluded:** `public/compare/` and `public/failures/` source files because their live routes are handled by the Next.js app; `public/get-a-quote.html` because `/get-a-quote` rewrites to the App Router form.

This grouping is based on the existing body presentation: hero treatment, content wrapper, card system, tables/data panels, warning panels, FAQ treatment, and final CTA. It is separate from the shared static navbar/footer audit above. The current 92-page snapshot loads `public/static-nav.css` and `public/static-nav.js`; the groups below describe the page-body UI families.

### Group 1 — About and company editorial pages

#### 1A. Brand/platform story pages — 2 pages

Shared UI: dark brand hero, hero stats, visual/flow illustration, stacked white content cards, FAQ, and dark final CTA.

- **About Us** — `public/about/about-us.html`
- **How Engines Market Works** — `public/about/how-engines-market-works.html`

#### 1B. About/support card pages — 4 pages

Shared UI: dark hero with supporting stats/visual, light editorial content area, information cards or tables, FAQ, and final CTA. The warranty pages use the same overall composition with slightly different section-card naming.

- **Contact** — `public/about/contact.html`
- **Engine Warranty Guide** — `public/about/engine-warranty-guide.html`
- **Supplier Standards** — `public/about/supplier-standards.html`
- **Warranty Claims Guide** — `public/about/warranty-claims-guide.html`

### Group 2 — Case study narrative pages

#### 2A. Failure-to-outcome case study template — 20 pages

Shared UI: narrative dark hero with customer quote and summary stats, alternating soft/dark sections, warning box, timeline panel, price comparison panels, decision cards, outcome section, and final quote CTA.

- **Audi A4 Timing Chain Failure** — `public/case-studies/audi-a4-timing-chain-failure.html`
- **Audi A6 Oil Consumption** — `public/case-studies/audi-a6-oil-consumption.html`
- **BMW 320d Engine Replacement** — `public/case-studies/bmw-320d-engine-replacement.html`
- **BMW N47 Timing Chain Failure** — `public/case-studies/bmw-n47-timing-chain-failure.html`
- **BMW N57 Engine Replacement** — `public/case-studies/bmw-n57-engine-replacement.html`
- **Ford Ranger Engine Replacement** — `public/case-studies/ford-ranger-engine-replacement.html`
- **Ford Transit Engine Failure** — `public/case-studies/ford-transit-engine-failure.html`
- **Jaguar Ingenium Timing Chain Failure** — `public/case-studies/jaguar-ingenium-timing-chain.html`
- **Jaguar XF Engine Replacement** — `public/case-studies/jaguar-xf-engine-replacement.html`
- **Land Rover Discovery Crank Failure** — `public/case-studies/land-rover-discovery-crank-failure.html`
- **Mercedes OM651 Timing Chain Failure** — `public/case-studies/mercedes-om651-timing-chain.html`
- **Mercedes Sprinter Engine Replacement** — `public/case-studies/mercedes-sprinter-engine-replacement.html`
- **Nissan Navara D40 Engine Failure** — `public/case-studies/nissan-navara-d40-case-study.html`
- **Peugeot Boxer Engine Replacement** — `public/case-studies/peugeot-boxer-engine-replacement.html`
- **Range Rover Evoque Timing Chain Failure** — `public/case-studies/range-rover-evoque-timing-chain.html`
- **Range Rover SDV6 Crankshaft Failure** — `public/case-studies/range-rover-sdv6-crankshaft-failure.html`
- **Toyota Hilux Engine Replacement** — `public/case-studies/toyota-hilux-engine-replacement.html`
- **Vauxhall Vivaro Engine Failure** — `public/case-studies/vauxhall-vivaro-engine-failure.html`
- **VW Amarok Engine Replacement** — `public/case-studies/vw-amarok-engine-replacement.html`
- **VW Transporter Engine Rebuild** — `public/case-studies/vw-transporter-engine-rebuild.html`

### Group 3 — Insights and market-data pages

#### 3A. Benchmark/editorial data pages — 3 pages

Shared UI: data-led dark hero, stat/callout blocks, glass-card content sections, FAQ, and final CTA.

- **Average Engine Replacement Times** — `public/insights/average-engine-replacement-times.html`
- **Engine Warranty Statistics UK** — `public/insights/engine-warranty-statistics-uk.html`
- **Most Common Engine Failures UK** — `public/insights/most-common-engine-failures-uk.html`

#### 3B. Ranking and comparison-table pages — 4 pages

Shared UI: data-guide hero, ranking/data tables, decision or featured-ranking cards, FAQ accordion, and final CTA banner.

- **Most Expensive Engine Repairs UK** — `public/insights/most-expensive-engine-repairs-uk.html`
- **Most Reliable Diesel Engines UK** — `public/insights/most-reliable-diesel-engines.html`
- **Most Reliable Petrol Engines UK** — `public/insights/most-reliable-petrol-engines.html`
- **Most Replaced Engines UK** — `public/insights/most-replaced-engines-uk.html`

#### 3C. Market report/dashboard pages — 3 pages

Shared UI: research hero, glass-card dashboard sections, dataset/methodology panels, market context or parameter grids, FAQ, and data-oriented CTA.

- **UK Engine Market Report 2026** — `public/insights/uk-engine-market-report-2026.html`
- **UK Engine Price Index** — `public/insights/uk-engine-price-index.html`
- **UK Engine Replacement Statistics** — `public/insights/uk-engine-replacement-statistics.html`

### Group 4 — Legal and policy pages

#### 4A. Complaints process page — 1 page

Shared UI: process-oriented hero, notice/glass cards, timeline, FAQ, and final CTA.

- **Complaints Procedure** — `public/legal/complaints-procedure.html`

#### 4B. Policy document pages — 4 pages

Shared UI: dedicated legal hero with pattern/art card, stacked glass policy cards, legal notices/tables, and final CTA. `data-handlng-policy.html` retains the existing filename spelling.

- **Cookie Policy** — `public/legal/cookie-policy.html`
- **Data Handling Policy** — `public/legal/data-handlng-policy.html`
- **Privacy Policy** — `public/legal/privacy-policy.html`
- **Terms & Conditions** — `public/legal/terms-and-conditions.html`

### Group 5 — Pricing and repair-cost guides

#### 5A. Repair/decision comparison pages — 2 pages

Shared UI: cost-guide hero, decision/comparison cards, market or cost insight panel, FAQ, and final CTA.

- **Crankshaft Repair Cost** — `public/prices/crankshaft-repair-cost.html`
- **DPF Replacement Cost** — `public/prices/dpf-replacement-cost.html`

#### 5B. Core cost benchmark pages — 3 pages

Shared UI: cost-guide hero, comparison tables with price badges, market card, optional timeline, FAQ accordion, and CTA banner.

- **Engine Fitting Cost** — `public/prices/engine-fitting-cost.html`
- **Engine Replacement Cost** — `public/prices/engine-replacement-cost.html`
- **Garage Labour Rates** — `public/prices/garage-labour-rates.html`

#### 5C. Component price-card guides — 4 pages

Shared UI: section-inner/page-content wrapper, section cards, price/info cards, warning panels, comparison tables, FAQ, and CTA panel.

- **Gearbox Replacement Cost** — `public/prices/gearbox-replacement-cost.html`
- **Head Gasket Repair Cost** — `public/prices/head-gasket-repair-cost.html`
- **Injector Replacement Cost** — `public/prices/injector-replacement-cost.html`
- **Rebuilt Engine Cost** — `public/prices/rebuilt-engine-cost.html`

#### 5D. Reconditioned/remanufactured engine guides — 2 pages

Shared UI: content-section hero, section cards, coloured callouts, specification/stat grids or process timeline, dark market panel, FAQ, and final CTA banner.

- **Reconditioned Engine Cost** — `public/prices/reconditioned-engine-cost.html`
- **Remanufactured Engine Cost** — `public/prices/remanfactured-engine-cost.html`

#### 5E. Technical component cost guides — 3 pages

Shared UI: section-inner/content-wrap wrapper, section cards, feature cards, technical callouts/tables, navy market box, FAQ accordion, and CTA panel.

- **Timing Chain Replacement Cost** — `public/prices/timing-chain-replacement-cost.html`
- **Turbo Replacement Cost** — `public/prices/turbo-replacement-cost.html`
- **Used Engine Cost** — `public/prices/used-engine-cost.html`

#### 5F. Vehicle recovery cost guide — 1 page

Shared UI: content-stack wrapper, section cards, recovery price/table panels, FAQ accordion, and final CTA.

- **Vehicle Recovery Cost** — `public/prices/vehicle-recovery-cost.html`

### Group 6 — Service and solution guides

#### 6A. Diagnostic and fitting service pages — 2 pages

Shared UI: service hero, section-card content stack, pricing/table panel, feature cards, outcome/timeline blocks, FAQ, and service CTA panel.

- **Engine Diagnostics** — `public/services/engine-diagnostic.html`
- **Engine Fitting** — `public/services/engine-fitting.html`

#### 6B. Inspection service pages — 2 pages

Shared UI: service hero, content-card flow, data-source/table panel, FAQ accordion, and final CTA banner.

- **Engine Inspection Service** — `public/services/engine-inspection-service.html`
- **Engine Inspection** — `public/services/engine-inspection.html`

#### 6C. Repair and gearbox decision pages — 2 pages

Shared UI: service hero, content-card flow, decision grid, table/data panels, FAQ accordion, and final CTA banner.

- **Engine Repair** — `public/services/engine-repair.html`
- **Gearbox Replacement** — `public/services/gearbox-replacement.html`

#### 6D. Manual/automatic gearbox variants — 2 pages

Shared UI: gearbox-specific hero, quote/alert cards, scenario decision grid, comparison data, FAQ, and final CTA.

- **Automatic Gearbox Replacement** — `public/services/gearbox-replacement/automatic.html`
- **Manual Gearbox Replacement** — `public/services/gearbox-replacement/manual.html`

#### 6E. Engine supply, condition, and transport service pages — 7 pages

Shared UI: service hero, content-area wrapper, stacked section cards, comparison/data panels, FAQ, and service CTA. Individual pages add condition-specific market, process, or risk panels.

- **Rebuilt Engines** — `public/services/rebuilt-engines.html`
- **Reconditioned Engines** — `public/services/reconditioned-engines.html`
- **Remanufactured Engines** — `public/services/remanufactured-engines.html`
- **Replacement Engines** — `public/services/replacement-engines.html`
- **Supply and Fit** — `public/services/supply-and-fit.html`
- **Used Engines** — `public/services/used-engines.html`
- **Vehicle Recovery** — `public/services/vehicle-recovery.html`

### Group 7 — Symptom and diagnosis pages

#### 7A. Smoke and warning-light deep-insight pages — 3 pages

Shared UI: symptom hero, content-stack wrapper, deep-insight panel, table/price panels, warning/next-step cards, FAQ accordion, and guide CTA.

- **Black Smoke from Exhaust** — `public/symptoms/black-smoke.html`
- **Blue Smoke from Exhaust** — `public/symptoms/blue-smoke.html`
- **Check Engine Light** — `public/symptoms/check-engine-light.html`

#### 7B. Coolant and DPF warning editorial pages — 3 pages

Shared UI: symptom hero, section-stack/content-wrap layout, section cards, amber/green/red price cards or warning callouts, FAQ, and editorial CTA box.

- **Coolant Loss** — `public/symptoms/coolant-loss.html`
- **Coolant Warning Light** — `public/symptoms/coolant-warning-light.html`
- **DPF Warning Light** — `public/symptoms/dpf-warning-light.html`

#### 7C. Timeline/warning diagnosis pages — 3 pages

Shared UI: symptom hero, diagnostic timeline, warning or deep-insight panel, comparison table, FAQ, and next-step CTA.

- **Engine Knocking Noise** — `public/symptoms/engine-knocking-noise.html`
- **Engine Overheating** — `public/symptoms/engine-overheating.html`
- **White Smoke from Exhaust** — `public/symptoms/white-smoke.html`

#### 7D. Alert-led repair decision pages — 5 pages

Shared UI: compact symptom hero, section cards, warning-card emphasis, repair/replace CTA panel, and FAQ list.

- **Engine Rattling Noise** — `public/symptoms/engine-rattling-noise.html`
- **Engine Stalling** — `public/symptoms/engine-stalling.html`
- **Engine Ticking Noise** — `public/symptoms/engine-ticking-noise.html`
- **Engine Won't Start** — `public/symptoms/engine-wont-start.html`
- **Excessive Oil Consumption** — `public/symptoms/excessive-oil-consumption.html`

#### 7E. Editorial symptom guide pages — 6 pages

Shared UI: content-wrap/section-inner layout, editorial section labels and headings, warning cards, CTA panel, and FAQ list.

- **Exhaust Leak Sound** — `public/symptoms/exhaust-leak-sound.html`
- **Limp Mode** — `public/symptoms/limp-mode.html`
- **Engine Loss of Power** — `public/symptoms/loss-of-power.html`
- **Metal Shavings in Oil** — `public/symptoms/metal-shavings-in-oil.html`
- **Oil Warning Light** — `public/symptoms/oil-warning-light.html`
- **Rough Idle** — `public/symptoms/rough-idle.html`

### Group 8 — Reviews and customer proof

#### 8A. Reviews/testimonial landing page — 1 page

Shared UI: brand hero with stats and visual, testimonial/review sections, rating or proof cards, FAQ/content sections, and final CTA. It is closest to the About brand/editorial family but remains a separate page because its body is organized around customer proof rather than platform explanation.

- **Engines Market Reviews** — `public/reviews.html`

## UI grouping summary

| UI family | Pages |
|---|---:|
| About/company editorial | 6 |
| Case study narrative | 20 |
| Insights/market data | 10 |
| Legal/policy | 5 |
| Pricing and repair-cost guides | 15 |
| Service and solution guides | 15 |
| Symptoms/diagnosis | 20 |
| Reviews/customer proof | 1 |
| **Total audited authority/static pages** | **92** |

The strongest reuse opportunities are within the 20 case studies, the 10 insights pages, the 15 service pages, and the 20 symptom pages. The prices section contains the most visual variation and should be treated as several related templates rather than one universal cost-guide layout.

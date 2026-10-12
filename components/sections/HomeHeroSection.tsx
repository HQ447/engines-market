"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import type { HomeHeroData } from "@/lib/homepageData";
import { getEngineLinkForCode, type EngineLinkMap } from "@/lib/engineLinks";
import { carModelsBySeries, carSeries } from "@/data/brands_Models";
import { resolveVariantArtwork } from "@/lib/variantImageAssets";
import imageManifest from "@/lib/image-manifest.json";
import { PiEngine } from "react-icons/pi";
import { GoShield } from "react-icons/go";
import { GoVerified } from "react-icons/go";

type Props = {
  data: HomeHeroData;
  engineLinks?: EngineLinkMap;
};

type TickerItem = {
  brand: string;
  code: string;
  price: string;
};

type EngineCarouselItem = {
  brand: string;
  code: string;
  spec: string;
  price: string;
};

type SearchMode = "registration" | "manual";

type VehicleRegistrationData = {
  registrationNumber: string;
  year: string;
  make: string;
  model: string;
  fuelType: string;
  engineCapacity: string;
  color: string;
  wheelplan: string;
};

const manualMakeOptions = Object.keys(carSeries).sort();
const manualYearOptions = Array.from({ length: 2026 - 1990 + 1 }, (_, index) => String(2026 - index));
const carModelsBySeriesMap = carModelsBySeries as Record<string, string[]>;
const featuredMakeKeys = ["BMW", "Mercedesbenz", "Jaguar", "LandRover", "RangeRover"];
const makeLogoFiles: Record<string, string> = {
  AlfaRomeo: "/prices/img/alfa-romeo-logo-small.webp",
  AstonMartin: "/prices/img/aston-martin-logo-small.webp",
  Audi: "/prices/img/audi-logo-small.webp",
  Bentley: "/prices/img/bentley-logo-small.webp",
  BMW: "/prices/img/bmw-logo-small.webp",
  Cadillac: "/prices/img/cadillac-logo-small.webp",
  Chevrolet: "/prices/img/chevrolet-logo-small.webp",
  Chrysler: "/prices/img/chrysler-logo-small.webp",
  Citroen: "/prices/img/citroen-logo-small.webp",
  Dacia: "/BrandsLogos/dacia-logo-small.webp",
  Daewoo: "/BrandsLogos/daewoo-logo-small.webp.webp",
  Daihatsu: "/prices/img/daihatsu-logo-small.webp",
  Dodge: "/prices/img/dodge-logo-small.webp",
  Ferrari: "/prices/img/ferrari-logo-small.webp",
  Fiat: "/prices/img/fiat-logo-small.webp",
  Ford: "/prices/img/ford-logo-small.webp",
  Genesis: "/BrandsLogos/gensis-logo-small.webp",
  Honda: "/prices/img/honda-logo-small.webp",
  Hyundai: "/prices/img/hyundai-logo-small.webp",
  Isuzu: "/prices/img/isuzu-logo-small.webp",
  Iveco: "/prices/img/iveco-logo-small.webp",
  Jaguar: "/prices/img/jaguar-logo-small.webp",
  Jeep: "/prices/img/jeep-logo-small.webp",
  KIA: "/prices/img/kia-logo-small.webp",
  Lancia: "/BrandsLogos/lancia-logo-small.webp",
  LandRover: "/prices/img/land-rover-logo-small.webp",
  Lexus: "/prices/img/lexus-logo-small.webp",
  Lotus: "/BrandsLogos/lotus-logo-small.webp",
  Mazda: "/prices/img/mazda-logo-small.webp",
  Mercedesbenz: "/prices/img/mercedes-logo-small.webp",
  Mclaren: "/BrandsLogos/mclaren-logo-small.webp",
  MG: "/prices/img/mg-logo-small.webp",
  MINI: "/prices/img/mini-logo-small.webp",
  Mitsubishi: "/prices/img/mitsubishi-logo-small.webp",
  Nissan: "/prices/img/nissan-logo-small.webp",
  Opel: "",
  Peugeot: "/prices/img/peugeot-logo-small.webp",
  Polestar: "/BrandsLogos/polestar-logo-small.webp",
  Porsche: "/prices/img/porsche-logo-small.webp",
  RangeRover: "/prices/img/range-rover-logo-small.webp",
  Renault: "/prices/img/renault-logo-small.webp",
  Rover: "",
  RollsRoyce: "/prices/img/rolls-royce-logo-small.webp",
  Seat: "/prices/img/seat-logo-small.webp",
  Skoda: "/prices/img/skoda-logo-small.webp",
  Smart: "/prices/img/smart-logo-small.webp",
  Ssangyong: "/BrandsLogos/ssangyong-logo-small.webp",
  Subaru: "/prices/img/subaru-logo-small.webp",
  Suzuki: "/prices/img/suzuki-logo-small.webp",
  Toyota: "/prices/img/toyota-logo-small.webp",
  Vauxhall: "/prices/img/vauxhall-logo-small.webp",
  Volkswagen: "/prices/img/volkswagen-logo-small.webp",
  Volvo: "/prices/img/volvo-logo-small.webp",
};
const manualBrandSlugs: Record<string, string> = {
  BMW: "bmw",
  Mercedesbenz: "mercedes-benz",
  Jaguar: "jaguar",
  LandRover: "land-rover",
  RangeRover: "range-rover",
};
const manualImageManifest = imageManifest as Record<string, number>;

function getMakeLabel(make: string) {
  return make === "Mercedesbenz" ? "Mercedes-Benz" : make === "LandRover" ? "Land Rover" : make === "RangeRover" ? "Range Rover" : make;
}

function getMakeLogoPath(make: string) {
  return makeLogoFiles[make] || null;
}

function slugifyManualImageValue(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getManualModelImagePath(make: string, model: string) {
  const brandName = getMakeLabel(make);
  const brandSlug = manualBrandSlugs[make] ?? slugifyManualImageValue(brandName);
  const modelSlug = slugifyManualImageValue(model);
  const variantArtwork = resolveVariantArtwork({
    brandSlug,
    brandName,
    modelSlug,
    modelName: model,
    variantSlug: model,
    variantName: model,
  });

  if (variantArtwork) {
    return variantArtwork;
  }

  const modelWithoutBrand = model
    .replace(new RegExp(`^${brandName.replace(/[.*+?^${}()|[\\]\\]/g, "\\\\$&")}\\s+`, "i"), "")
    .replace(/\s+(diesel|petrol|hybrid|electric|flexfuel).*$/i, "")
    .trim();
  const familyTokens = modelWithoutBrand.split(/\s+/).slice(0, 2).join("-");
  const modelCardCandidates = [
    `/images/brands/${brandSlug}/models/${brandSlug}-${slugifyManualImageValue(modelWithoutBrand)}-model-card.png`,
    `/images/brands/${brandSlug}/models/${brandSlug}-${slugifyManualImageValue(familyTokens)}-model-card.png`,
    `/images/brands/${brandSlug}/models/${brandSlug}-${slugifyManualImageValue(modelWithoutBrand)}-model-card.webp`,
  ];

  return modelCardCandidates.find((candidate) => manualImageManifest[candidate]) ?? null;
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const modelsByMake: Record<string, string[] | Record<string, string[]>> = Object.entries(carSeries).reduce(
  (accumulator, [brand, items]) => {
    const normalizedBrand = normalize(brand);

    if (Array.isArray(items) && items.length > 0 && carModelsBySeriesMap[items[0]]) {
      const seriesMap: Record<string, string[]> = {};

      items.forEach((seriesName) => {
        seriesMap[seriesName] = carModelsBySeriesMap[seriesName] ?? [];
      });

      accumulator[normalizedBrand] = seriesMap;
      return accumulator;
    }

    accumulator[normalizedBrand] = items;
    return accumulator;
  },
  {} as Record<string, string[] | Record<string, string[]>>,
);

const tickerItems: TickerItem[] = [
  { brand: "BMW", code: "N47D20", price: "£2,200" },
  { brand: "Land Rover", code: "306DT", price: "£4,100" },
  { brand: "Mercedes", code: "OM651", price: "£2,800" },
  { brand: "Ford", code: "HHDA", price: "£1,500" },
  { brand: "VW", code: "CAYC", price: "£1,800" },
  { brand: "Jaguar", code: "306PS", price: "£3,400" },
  { brand: "Nissan", code: "K9K", price: "£1,600" },
  { brand: "Renault", code: "M9R", price: "£1,400" },
  { brand: "Toyota", code: "2AD-FTV", price: "£1,800" },
  { brand: "Mitsubishi", code: "4N14", price: "£2,200" },
  { brand: "Peugeot", code: "DW10", price: "£1,400" },
  { brand: "Audi", code: "CAGA", price: "£2,100" },
  { brand: "Honda", code: "N22A", price: "£1,600" },
  { brand: "Kia", code: "D4FB", price: "£1,500" },
  { brand: "Mazda", code: "SH-VPTS", price: "£1,800" },
];

const engineCarouselItems: EngineCarouselItem[] = [
  { brand: "BMW", code: "N47D20", spec: "2.0L Diesel", price: "£2,200" },
  { brand: "Mercedes", code: "OM651", spec: "2.2L Diesel", price: "£2,800" },
  { brand: "Land Rover", code: "306DT", spec: "3.0L Diesel", price: "£4,100" },
  { brand: "Audi", code: "CAGA", spec: "2.0L TDI", price: "£2,000" },
  { brand: "Volkswagen", code: "CAYC", spec: "2.0L TDI", price: "£1,900" },
  { brand: "Ford", code: "HHDA", spec: "1.0L Petrol", price: "£1,500" },
  { brand: "Nissan", code: "K9K", spec: "1.5L Diesel", price: "£1,600" },
  { brand: "Toyota", code: "2AD-FTV", spec: "2.2L Diesel", price: "£1,800" },
];

const bottomBarItems = [
  { icon: "lightning", text: "Instant engine replacement quote - 100% free, no obligation" },
  { icon: "location", text: "Engine replacement near me - UK-wide specialist network" },
  { icon: "pound", text: "Compare reconditioned, rebuilt & used engine prices" },
  { icon: "wrench", text: "Supply & fit available - parts and labour from vetted specialists" },
  { icon: "shield", text: "12-24 month warranty on all replacement engines" },
];

// Map engine codes to their image filenames
function getEngineImagePath(code: string): string {
  const engineMap: Record<string, string> = {
    "N47D20": "/96da5878-45b8-406b-8fc7-32f8a60d5c5c_removalai_preview.webp",
    "OM651": "/194ff4f9-dd13-4c28-b2fc-4307d63ae0ce_removalai_preview.webp",
    "306DT": "/16924a6b-58ec-44d8-9ed5-ccd89f220a22_removalai_preview.webp",
    "CAGA": "/04544090-33c9-4640-8eb7-0aa9041ae6b7_removalai_preview.webp",
    "CAYC": "/d1ba9486-2d7d-4d0a-8b67-a00842d083c6_removalai_preview.webp",
    "HHDA": "/dded14b9-939e-4104-9e75-073a942a5c68_removalai_preview.webp",
    "K9K": "/e0597dc3-6685-4beb-bf5f-8be1626b14a1_removalai_preview.webp",
    "2AD-FTV": "/fac66331-c94d-48e9-983a-7997fd84a619_removalai_preview.webp",
  };
  return `/images/engines/${engineMap[code] || "engine-placeholder.webp"}`;
}

/* ─── Icon Components ─── */

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 flex-none" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function splitInlineDisclaimerText(text: string, trailingWords = 3) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const words = normalized.split(" ").filter(Boolean);

  if (words.length <= trailingWords) {
    return {
      leading: "",
      trailing: normalized,
    };
  }

  return {
    leading: words.slice(0, -trailingWords).join(" "),
    trailing: words.slice(-trailingWords).join(" "),
  };
}

function EngineTickerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="5" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <path d="M3 13H1M21 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 11l1.8-5.4A2 2 0 0 1 8.7 4h6.6a2 2 0 0 1 1.9 1.6L19 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="3" y="11" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 18H3v-2M18.5 18H21v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M7 16V4m0 0L3 8m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EngineCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="10" rx="2" stroke="#15803d" strokeWidth="1.5" />
      <rect x="8" y="5" width="8" height="4" rx="1" stroke="#15803d" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="1.5" fill="#15803d" />
      <circle cx="18" cy="16" r="1.5" fill="#15803d" />
      <path d="M3 13H1M21 13h2" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldStarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 7v5c0 4.8 3.4 9.3 8 10.3C16.6 21.3 20 16.8 20 12V7L12 3z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 8l.9 2.6H16l-2.5 1.9 1 2.5L12 13.5l-2.5 1.5 1-2.5L8 10.6h3.1L12 8z"
        stroke="#15803d"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#15803d" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M13 2L4.5 13.5H11L10 22l9.5-12H13V2z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z" stroke="#15803d" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="2" stroke="#15803d" strokeWidth="1.5" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path d="M8 18h8" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 14h7" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14V9.5C9 7.6 10.6 6 12.5 6 14.4 6 16 7.6 16 9.5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 7v5c0 4.8 3.4 9.3 8 10.3C16.6 21.3 20 16.8 20 12V7L12 3z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BottomBarIcon({ type }: { type: string }) {
  switch (type) {
    case "lightning":
      return <LightningIcon />;
    case "location":
      return <LocationIcon />;
    case "pound":
      return <PoundIcon />;
    case "wrench":
      return <WrenchIcon />;
    case "shield":
      return <ShieldCheckIcon />;
    default:
      return null;
  }
}

/* UK Flag SVG */
function UKFlag() {
  return (
    <svg viewBox="0 0 20 14" className="h-[14px] w-[20px] flex-none rounded-[2px]" aria-hidden="true">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="white" strokeWidth="3" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M10 0 V14 M0 7 H20" stroke="white" strokeWidth="4.5" />
      <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

/* Engine illustration for carousel cards */
function EngineIllustration() {
  return (
    <svg viewBox="0 0 100 72" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Main engine block */}
      <rect x="16" y="22" width="68" height="36" rx="4" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      {/* Cylinder head */}
      <rect x="20" y="13" width="60" height="12" rx="3" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
      {/* Cylinders */}
      <rect x="25" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      <rect x="41" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      <rect x="57" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      <rect x="73" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      {/* Valve cover detail */}
      <rect x="22" y="25" width="56" height="8" rx="2" fill="#c4c9d1" stroke="#9ca3af" strokeWidth="0.8" />
      {/* Intake manifold */}
      <path d="M30 22 Q28 32 36 36" stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Oil filler cap */}
      <circle cx="66" cy="30" r="6" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      <circle cx="66" cy="30" r="3" fill="#6b7280" />
      {/* Alternator */}
      <rect x="74" y="35" width="14" height="12" rx="3" fill="#b0b8c4" stroke="#6b7280" strokeWidth="0.8" />
      <circle cx="81" cy="41" r="4" fill="#6b7280" />
      <circle cx="81" cy="41" r="2" fill="#9ca3af" />
      {/* Drive belt */}
      <path d="M16 38 Q8 38 8 46 Q8 56 16 56" stroke="#374151" strokeWidth="2" fill="none" />
      <circle cx="12" cy="47" r="6" stroke="#374151" strokeWidth="1.5" fill="#e5e7eb" />
      {/* Sump / oil pan */}
      <rect x="22" y="55" width="56" height="6" rx="2" fill="#c4c9d1" stroke="#9ca3af" strokeWidth="0.8" />
      {/* Exhaust ports */}
      <rect x="26" y="58" width="7" height="10" rx="1" fill="#9ca3af" />
      <rect x="45" y="58" width="7" height="10" rx="1" fill="#9ca3af" />
      <rect x="64" y="58" width="7" height="10" rx="1" fill="#9ca3af" />
    </svg>
  );
}

function renderLinkedEngineCodes(codes: string, engineLinks?: EngineLinkMap) {
  return codes.split(/(,\s*|\s*\/\s*|\s*·\s*)/).map((part, index) => {
    if (!part.trim() || /^[,\s/·]+$/.test(part)) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    const href = getEngineLinkForCode(part, engineLinks);

    if (!href) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <Link key={`${part}-${index}`} href={href} className="underline-offset-2 transition hover:text-[#15803d] hover:underline">
        {part}
      </Link>
    );
  });
}

type ManualSelectorKind = "makes" | "models" | "variants" | "years";

function ManualSelectorPanel({
  kind,
  query,
  onQueryChange,
  onClose,
  makeOptions,
  modelOptions,
  variantOptions,
  yearOptions,
  manualMake,
  manualModel,
  manualVariant,
  manualYear,
  onMakeSelect,
  onModelSelect,
  onVariantSelect,
  onYearSelect,
}: {
  kind: ManualSelectorKind;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  makeOptions: string[];
  modelOptions: string[];
  variantOptions: string[];
  yearOptions: string[];
  manualMake: string;
  manualModel: string;
  manualVariant: string;
  manualYear: string;
  onMakeSelect: (make: string) => void;
  onModelSelect: (model: string) => void;
  onVariantSelect: (variant: string) => void;
  onYearSelect: (year: string) => void;
}) {
  const sourceOptions = kind === "makes" ? makeOptions : kind === "models" ? modelOptions : kind === "variants" ? variantOptions : yearOptions;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = sourceOptions.filter((option) => option.toLowerCase().includes(normalizedQuery));
  const title = kind === "makes" ? "Select Your Make" : kind === "models" ? "Select Your Model" : kind === "variants" ? "Select Your Variant" : "Select Your Year";
  const placeholder = kind === "makes" ? "Search brands..." : kind === "models" ? "Search models..." : kind === "variants" ? "Search variants..." : "Search years...";

  return (
    <div className="bg-transparent">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a97aa]">Choose vehicle</div>
          <div className="text-[15px] font-bold leading-tight text-[#102452]">{title}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close selector"
          className="grid h-7 w-7 flex-none place-items-center rounded-full border border-[#d6e0ec] bg-white text-[#52657d] shadow-sm transition hover:border-[#0878ee] hover:text-[#0878ee]"
        >
          <CloseIcon />
        </button>
      </div>

      <label className="relative mt-3 block">
        <span className="sr-only">{placeholder}</span>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a97aa]">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.currentTarget.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-9 w-full rounded-[8px] border border-[#cbd8e7] bg-white pl-9 pr-3 text-[12px] text-[#102452] outline-none placeholder:text-[#8a97aa] focus:border-[#0878ee] focus:ring-2 focus:ring-[#0878ee]/15"
        />
      </label>

      <div className={`mt-3 overflow-y-auto overscroll-contain pr-1 ${kind === "years" ? "max-h-[108px]" : "max-h-[216px]"}`}>
        {filteredOptions.length > 0 ? (
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
            {filteredOptions.map((option, index) => {
              const isMake = kind === "makes";
              const isModel = kind === "models";
              const isVariant = kind === "variants";
              const isSelected = isMake ? manualMake === option : isModel ? manualModel === option : isVariant ? manualVariant === option : manualYear === option;
              const optionImagePath = isMake ? getMakeLogoPath(option) : isModel ? getManualModelImagePath(manualMake, option) : null;

              return (
                <button
                  key={`${kind}-${option}-${index}`}
                  type="button"
                  onClick={() => {
                    if (isMake) onMakeSelect(option);
                    else if (isModel) onModelSelect(option);
                    else if (isVariant) onVariantSelect(option);
                    else onYearSelect(option);
                  }}
                  className={`flex ${isModel || isMake ? "min-h-[72px] flex-col gap-1" : isVariant ? "min-h-[40px]" : "min-h-[30px]"} items-center justify-center rounded-[8px] border px-1 py-1 text-center text-[10px] font-semibold leading-[1.05] transition ${isSelected
                    ? "border-2 border-[#0878ee] bg-[#eaf5ff] text-[#064ea7]"
                    : "border-[#d6e0ec] bg-gradient-to-b from-white to-[#f9fbfd] text-[#102452] hover:border-[#65aefa]"
                    }`}
                >
                  {optionImagePath ? <img src={optionImagePath} alt="" className="h-8 w-full object-contain" /> : isMake ? <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7eef8] text-[13px] text-[#1e3a8a]">{getMakeLabel(option).charAt(0)}</span> : null}
                  <span className={isModel || isVariant ? "line-clamp-2" : "line-clamp-1"}>{isMake ? getMakeLabel(option) : option}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[62px] items-center justify-center rounded-[8px] border border-dashed border-[#cbd8e7] bg-white/65 px-3 text-center text-[11px] font-semibold text-[#8a97aa]">
            No matches found
          </div>
        )}
      </div>
    </div>
  );
}

/* CTA Panel - reused on both mobile and desktop */
function CTAPanel({
  registration,
  onRegistrationChange,
  onSubmit,
  isRegistrationLookupLoading,
  registrationLookupError,
  gdprNote,
}: {
  registration: string;
  onRegistrationChange: (val: string) => void;
  onSubmit: (payload: {
    searchMode: SearchMode;
    regNumber?: string;
    make?: string;
    model?: string;
    variant?: string;
    series?: string;
    year?: string;
    engineCode?: string;
  }) => void | Promise<void>;
  isRegistrationLookupLoading: boolean;
  registrationLookupError: string;
  gdprNote: string;
}) {
  const [searchMode, setSearchMode] = useState<SearchMode>("registration");
  const [manualMake, setManualMake] = useState<string>("BMW");
  const [manualModel, setManualModel] = useState<string>("");
  const [manualVariant, setManualVariant] = useState<string>("");
  const [manualYear, setManualYear] = useState<string>("");
  const [manualEngineCode, setManualEngineCode] = useState("");
  const [expandedSelector, setExpandedSelector] = useState<ManualSelectorKind | null>(null);
  const [selectorQuery, setSelectorQuery] = useState("");

  const { modelOptions, variantsByModel } = useMemo(() => {
    const entry = modelsByMake[normalize(manualMake)];

    if (entry && !Array.isArray(entry)) {
      return {
        modelOptions: Object.keys(entry),
        variantsByModel: entry,
      };
    }

    return {
      modelOptions: (entry as string[]) ?? [],
      variantsByModel: {} as Record<string, string[]>,
    };
  }, [manualMake]);

  useEffect(() => {
    setManualModel("");
    setManualVariant("");
    setManualYear("");
    setExpandedSelector(null);
    setSelectorQuery("");
  }, [manualMake]);

  const visibleMakeOptions = featuredMakeKeys.filter((make) => manualMakeOptions.includes(make));
  const visibleModelOptions = modelOptions.slice(0, 5);
  const variantOptions = variantsByModel[manualModel] ?? [];
  const visibleVariantOptions = variantOptions.slice(0, 5);
  const visibleYearOptions = manualYearOptions.slice(0, 4);
  const isYearSelectionReady = Boolean(manualMake && manualModel && manualVariant);
  const isManualSelectionComplete = Boolean(manualMake && manualModel && manualVariant && manualYear);

  function openSelector(kind: ManualSelectorKind) {
    setSelectorQuery("");
    setExpandedSelector(kind);
  }

  function closeSelector() {
    setSelectorQuery("");
    setExpandedSelector(null);
  }

  function selectMake(make: string) {
    setManualMake(make);
    setManualModel("");
    setManualVariant("");
    setManualYear("");
    closeSelector();
  }

  function selectModel(model: string) {
    setManualModel(model);
    setManualVariant("");
    setManualYear("");
    closeSelector();
  }

  function selectVariant(variant: string) {
    setManualVariant(variant);
    setManualYear("");
    closeSelector();
  }

  function selectYear(year: string) {
    setManualYear(year);
    closeSelector();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchMode === "registration") {
      await onSubmit({
        searchMode,
        regNumber: registration.trim(),
      });
      return;
    }

    if (!isManualSelectionComplete) {
      return;
    }

    await onSubmit({
      searchMode,
      make: manualMake,
      model: manualModel,
      variant: manualVariant,
      year: manualYear,
      engineCode: manualEngineCode.trim().toUpperCase(),
    });
  }

  return (
    <div>
      {/* Toggle buttons */}
      <div className="mb-2 grid w-full grid-cols-2 gap-0 overflow-hidden rounded-[15px] border border-white/70 bg-white/80 p-0 shadow-[0_4px_12px_rgba(10,39,83,0.12)] backdrop-blur-[20px]">
        <button
          type="button"
          onClick={() => {
            setSearchMode("registration");
            closeSelector();
          }}
          aria-pressed={searchMode === "registration"}
          className={`flex min-h-[40px] flex-1 items-center justify-center gap-1 px-1.5 py-2 text-[10px] font-semibold transition-all [&>svg]:h-3 [&>svg]:w-3 sm:min-h-[50px] sm:gap-1.5 sm:rounded-md sm:px-4 sm:py-3 sm:text-[13px] sm:[&>svg]:h-4 sm:[&>svg]:w-4 ${searchMode === "registration"
            ? "border border-white/15 bg-[#061a33]/90 text-white shadow-[0_4px_12px_rgba(6,26,51,0.28)] backdrop-blur-[18px]"
            : "bg-white text-[#0b245a] hover:bg-[#f2f8ff]"
            }`}
        >
          <CarIcon />
          Search by Registration
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchMode("manual");
            closeSelector();
          }}
          aria-pressed={searchMode === "manual"}
          className={`flex min-h-[40px] flex-1 items-center justify-center gap-1 px-1.5 py-2 text-[10px] font-semibold transition-all [&>svg]:h-3 [&>svg]:w-3 sm:min-h-[50px] sm:gap-1.5 sm:rounded-md sm:px-4 sm:py-3 sm:text-[13px] sm:[&>svg]:h-4 sm:[&>svg]:w-4 ${searchMode === "manual"
            ? "border border-white/15 bg-[#061a33]/90 text-white shadow-[0_4px_12px_rgba(6,26,51,0.28)] backdrop-blur-[18px]"
            : "bg-white text-[#0b245a] hover:bg-[#f2f8ff]"
            }`}
        >
          <SwapIcon />
          Search Manually
        </button>
      </div>

      <div className={`text-center ${searchMode === "manual" ? (expandedSelector ? "p-1 sm:p-2" : "p-3 sm:p-4") : "p-2 sm:p-6"}`}>
        {searchMode === "registration" ? (
          <>
            <h3 className="mb-1 text-[18px] font-semibold text-[#0d1b2e] mx-auto">Get Your Free Engine Quotes</h3>
            <p className="mb-4 text-[15px] text-gray-600 mx-auto">Instant comparison from UK-vetted engine specialists</p>
          </>
        ) : null}

        <form onSubmit={handleSubmit} className={searchMode === "manual" ? (expandedSelector ? "mb-0" : "mb-2") : "mb-4"}>
          {searchMode === "registration" ? (
            <div className="relative mx-auto block w-full">
              <div className="flex h-[50px] w-full min-w-0 overflow-hidden rounded-[9px] border-[2px] border-[#102442] bg-[#ffdd00] shadow-[0_6px_0_rgba(0,6,27,0.35)]">
                <div className="flex w-[48px] shrink-0 flex-col items-center justify-center border-r-2 border-[#102442] bg-[#003399] px-1">
                <UKFlag />
                  <span className="mt-0.5 text-[10px] font-extrabold leading-none text-[#ffdd00]">UK</span>
                </div>
                <input
                  type="text"
                  value={registration}
                  onChange={(e) => onRegistrationChange(e.currentTarget.value.toUpperCase())}
                  placeholder="REG HERE"
                  maxLength={8}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent px-3 text-center text-[14px] font-black uppercase tracking-[0.07em] text-[#10151c] outline-none placeholder:text-[#6b7280] placeholder:opacity-100 sm:text-[15px]"
                  style={{ fontFamily: '"Charles Wright", "Arial Black", Arial, sans-serif' }}
                />
              </div>
            </div>
          ) : expandedSelector ? (
            <ManualSelectorPanel
              kind={expandedSelector}
              query={selectorQuery}
              onQueryChange={setSelectorQuery}
              onClose={closeSelector}
              makeOptions={manualMakeOptions}
              modelOptions={modelOptions}
              variantOptions={variantOptions}
              yearOptions={manualYearOptions}
              manualMake={manualMake}
              manualModel={manualModel}
              manualVariant={manualVariant}
              manualYear={manualYear}
              onMakeSelect={selectMake}
              onModelSelect={selectModel}
              onVariantSelect={selectVariant}
              onYearSelect={selectYear}
            />
          ) : (
            <div className="grid gap-2 text-left">
              <div>
                <div className="mb-1 text-[13.5px] font-bold leading-tight text-[#2d567c]">Select Your Make</div>
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                  {visibleMakeOptions.map((make, index) => {
                    const logoPath = getMakeLogoPath(make);
                    const isSelected = manualMake === make;

                    return (
                      <button
                        key={`${make}-${index}`}
                        type="button"
                        onClick={() => {
                          setManualMake(make);
                          setManualModel("");
                        }}
                        className={`flex min-h-[72px] min-w-0 flex-col items-center justify-center gap-1 rounded-[8px] border px-1 py-1 text-center text-[10px] font-semibold leading-[1.05] transition ${isSelected
                          ? "border-2 border-[#0878ee] bg-[#eaf5ff] text-[#064ea7] shadow-[0_0_0_2px_rgba(8,120,238,0.12),0_3px_8px_rgba(8,120,238,0.14)]"
                          : "border-[#d6e0ec] bg-gradient-to-b from-white to-[#f9fbfd] text-[#102452] shadow-[0_2px_5px_rgba(9,42,83,0.07)] hover:-translate-y-px hover:border-[#65aefa]"
                          }`}
                      >
                        {logoPath ? <img src={logoPath} alt="" className="h-7 w-full object-contain" /> : <span className="grid h-7 w-8 place-items-center rounded-full bg-[#e7eef8] text-[13px] text-[#1e3a8a]">{getMakeLabel(make).charAt(0)}</span>}
                        <span className="max-w-full truncate">{getMakeLabel(make)}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => openSelector("makes")}
                    className="flex min-h-[72px] min-w-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#d6e0ec] bg-gradient-to-b from-white to-[#f2f8ff] px-1 py-1 text-center text-[10px] font-bold leading-[1.05] text-[#1e3a8a] shadow-[0_2px_5px_rgba(9,42,83,0.07)]"
                  >
                    <span>View All Brands</span>
                    <ArrowIcon />
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-1 text-[13.5px] font-bold leading-tight text-[#2d567c]">Select Your Model</div>
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                  {visibleModelOptions.length > 0 ? visibleModelOptions.map((model, index) => (
                    (() => {
                      const modelImagePath = getManualModelImagePath(manualMake, model);

                      return (
                        <button
                          key={`${manualMake}-model-${model}-${index}`}
                          type="button"
                          onClick={() => selectModel(model)}
                          className={`flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-[8px] border px-1 py-1 text-center text-[10px] font-semibold leading-[1.05] transition ${manualModel === model
                            ? "border-2 border-[#0878ee] bg-[#eaf5ff] text-[#064ea7]"
                            : "border-[#d6e0ec] bg-gradient-to-b from-white to-[#f9fbfd] text-[#102452] hover:border-[#65aefa]"
                            }`}
                        >
                          {modelImagePath ? <img src={modelImagePath} alt="" className="h-8 w-full object-contain" /> : null}
                          <span className="line-clamp-2">{model}</span>
                        </button>
                      );
                    })()
                  )) : (
                    <button type="button" disabled className="flex min-h-[72px] min-w-0 cursor-default items-center justify-center rounded-[8px] border border-dashed border-[#cbd8e7] bg-white/65 px-2 text-center text-[10px] font-semibold text-[#8a97aa]">
                      Select a make
                    </button>
                  )}
                  {modelOptions.length > 5 ? (
                    <button
                      type="button"
                      onClick={() => openSelector("models")}
                      className="min-h-[72px] rounded-[8px] border border-[#d6e0ec] bg-gradient-to-b from-white to-[#f2f8ff] px-1 py-1 text-center text-[10px] font-bold leading-[1.05] text-[#1e3a8a]"
                    >
                      <span>View All Models</span>
                      <ArrowIcon />
                    </button>
                  ) : null}
                </div>
              </div>

              {manualModel !== "" && variantOptions.length > 0 ? (
                <div>
                  <div className="mb-1 text-[13.5px] font-bold leading-tight text-[#2d567c]">Select Your Variant</div>
                  <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                    {visibleVariantOptions.map((variant, index) => {
                      return (
                        <button
                          key={`${manualMake}-variant-${variant}-${index}`}
                          type="button"
                          onClick={() => selectVariant(variant)}
                          className={`flex min-h-[40px] items-center justify-center rounded-[8px] border px-1 py-1 text-center text-[10px] font-semibold leading-[1.05] transition ${manualVariant === variant
                            ? "border-2 border-[#0878ee] bg-[#eaf5ff] text-[#064ea7]"
                            : "border-[#d6e0ec] bg-gradient-to-b from-white to-[#f9fbfd] text-[#102452] hover:border-[#65aefa]"
                            }`}
                        >
                          <span className="line-clamp-2">{variant}</span>
                        </button>
                      );
                    })}
                    {variantOptions.length > 5 ? (
                      <button
                        type="button"
                        onClick={() => openSelector("variants")}
                        className="min-h-[40px] rounded-[8px] border border-[#d6e0ec] bg-gradient-to-b from-white to-[#f2f8ff] px-1 py-1 text-center text-[10px] font-bold leading-[1.05] text-[#1e3a8a]"
                      >
                        <span>View All Variants</span>
                        <ArrowIcon />
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {isYearSelectionReady ? (
                <div>
                  <div className="mb-1 text-[13.5px] font-bold leading-tight text-[#2d567c]">Select Your Year</div>
                  <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                    {visibleYearOptions.map((year, index) => (
                      <button
                        key={`${year}-${index}`}
                        type="button"
                        onClick={() => setManualYear(year)}
                        className={`min-h-[30px] rounded-[8px] border px-1 py-1 text-center text-[12px] font-bold transition ${manualYear === year
                          ? "border-2 border-[#0878ee] bg-[#eaf5ff] text-[#064ea7]"
                          : "border-[#d6e0ec] bg-gradient-to-b from-white to-[#f9fbfd] text-[#102452] hover:border-[#65aefa]"
                          }`}
                      >
                        {year}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => openSelector("years")}
                      className="min-h-[30px] rounded-[8px] border border-[#d6e0ec] bg-gradient-to-b from-white to-[#f2f8ff] px-1 py-1 text-center text-[10px] font-bold leading-[1.05] text-[#1e3a8a]"
                    >
                      <span>View All Years</span>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              ) : null}

              <label className="grid gap-1 text-left text-[12px] font-bold text-[#2d567c]">
                Engine Code
                <input
                  type="text"
                  value={manualEngineCode}
                  onChange={(e) => setManualEngineCode(e.currentTarget.value.toUpperCase())}
                  placeholder="Enter engine code"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-10 w-full rounded-[8px] border border-[#d6e0ec] bg-white/80 px-3 text-[13px] uppercase text-[#0d1b2e] outline-none shadow-[inset_0_1px_2px_rgba(12,39,77,0.05)] placeholder:normal-case placeholder:text-[#8a97aa] focus:border-[#0878ee] focus:ring-2 focus:ring-[#0878ee]/15"
                />
              </label>
            </div>
          )}
          {expandedSelector ? null : (
            <button
              type="submit"
              disabled={(searchMode === "registration" && isRegistrationLookupLoading) || (searchMode === "manual" && !isManualSelectionComplete)}
              className={`w-full rounded-[8px] bg-[#15803d] px-6 py-[13px] text-[15px] font-bold text-white shadow-[0_4px_18px_rgba(21,128,61,0.3)] transition hover:bg-[#166534] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${searchMode === "manual" ? "mt-2" : "mt-3"}`}
            >
              {searchMode === "registration" && isRegistrationLookupLoading ? "Checking Registration..." : "Get Free Engine Quotes →"}
            </button>
          )}
        </form>

        {searchMode === "registration" && registrationLookupError ? (
          <p className="-mt-1 mb-3 text-center text-[12px] font-semibold text-red-600">
            {registrationLookupError}
          </p>
        ) : null}

        {/* GDPR */}
        {searchMode === "registration" ? (
          <p className="mb-4 flex items-center justify-center gap-1.5 text-center text-[12px] sm:text-[14px] text-gray-500">
            {/* <LockIcon /> */}
            <span>{gdprNote}</span>
          </p>
        ) : null}

        {searchMode === "registration" ? (
                    <div className="grid grid-cols-3 gap-3 border-t border-[rgba(13,27,46,0.08)] pt-4 text-left sm:grid-cols-3 sm:gap-2 sm:text-center">
            
            {/* 1. Engine Codes */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-[6px]">
              <img 
                src="/Home/enginelogo.webp" 
                alt="Engine Codes" 
                className="h-8 w-8 flex-none object-contain" 
              />
              <div className="min-w-0 flex flex-col items-center gap-1 sm:gap-0">
                <div className="text-[18px] font-extrabold leading-none text-[#0d1b2e]">8,000+</div>
                <div className="text-[11px] leading-tight text-[#6b7280]">Engine Codes</div>
              </div>
            </div>

            {/* 2. Car Brands */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-[6px]">
              <img 
                src="/Home/carlogo.webp" 
                alt="Car Brands" 
                className="h-8 w-8 flex-none object-contain" 
              />
              <div className="min-w-0 flex flex-col items-center gap-1 sm:gap-0">
                <div className="text-[18px] font-extrabold leading-none text-[#0d1b2e]">40+</div>
                <div className="text-[11px] leading-tight text-[#6b7280]">Car Brands</div>
              </div>
            </div>

            {/* 3. Free / No Obligation */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-[6px]">
              <img 
                src="/Home/verifiedlogo.webp" 
                alt="Free No Obligation" 
                className="h-8 w-8 flex-none object-contain" 
              />
              <div className="min-w-0 flex flex-col items-center gap-1 sm:gap-0">
                <div className="text-[18px] font-extrabold leading-none text-[#0d1b2e]">100%</div>
                <div className="text-[11px] leading-tight text-[#6b7280] text-center">Free · No Obligation</div>
              </div>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function HomeHeroSection({ data, engineLinks }: Props) {
  const router = useRouter();
  const [registration, setRegistration] = useState("");
  const [isRegistrationLookupLoading, setIsRegistrationLookupLoading] = useState(false);
  const [registrationLookupError, setRegistrationLookupError] = useState("");
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [desktopCarouselOffset, setDesktopCarouselOffset] = useState(0);

  // How many carousel items are visible depends on viewport - use 3 for mobile logic
  const MOBILE_VISIBLE = 3;
  const DESKTOP_VISIBLE = 6;
  const maxOffset = Math.max(0, engineCarouselItems.length - MOBILE_VISIBLE);
  const desktopMaxOffset = Math.max(0, engineCarouselItems.length - DESKTOP_VISIBLE);

  const engineTickerLoop = useMemo(() => [...tickerItems, ...tickerItems], []);
  const bottomTickerLoop = useMemo(() => [...bottomBarItems, ...bottomBarItems], []);

  function appendVehicleParams(queryParams: URLSearchParams, vehicle: VehicleRegistrationData) {
    if (vehicle.registrationNumber) queryParams.append("registrationNumber", vehicle.registrationNumber);
    if (vehicle.year) queryParams.append("year", vehicle.year);
    if (vehicle.make) queryParams.append("make", vehicle.make);
    if (vehicle.model) queryParams.append("model", vehicle.model);
    if (vehicle.fuelType) queryParams.append("fuelType", vehicle.fuelType);
    if (vehicle.engineCapacity) queryParams.append("engineCapacity", vehicle.engineCapacity);
    if (vehicle.color) queryParams.append("color", vehicle.color);
    if (vehicle.wheelplan) queryParams.append("wheelplan", vehicle.wheelplan);
  }

  async function fetchVehicleRegistration(regNumber: string) {
    const response = await fetch(`/api/vehicle-registration?registrationNumber=${encodeURIComponent(regNumber)}`);
    const payload = (await response.json()) as { vehicle?: VehicleRegistrationData; error?: string };

    if (!response.ok || !payload.vehicle) {
      throw new Error(payload.error || "We could not find vehicle details for that registration.");
    }

    return payload.vehicle;
  }

  async function openQuoteCheckout(payload: {
    searchMode: SearchMode;
    regNumber?: string;
    make?: string;
    model?: string;
      variant?: string;
    series?: string;
    year?: string;
    engineCode?: string;
  }) {
    // For manual search, navigate to form page with query parameters
    if (payload.searchMode === "manual") {
      setRegistrationLookupError("");
      const queryParams = new URLSearchParams();
      if (payload.make) queryParams.append("make", payload.make);
      if (payload.model) queryParams.append("model", payload.model);
      if (payload.variant) queryParams.append("variant", payload.variant);
      if (payload.year) queryParams.append("year", payload.year);
      if (payload.engineCode) queryParams.append("engineCode", payload.engineCode);
      queryParams.set("sourceLabel", "home-manual-search");
      queryParams.set("sourcePage", window.location.href);
      queryParams.set("searchMode", "manual");

      router.push(`/form?${queryParams.toString()}`);
      return;
    }

    const regNumber = payload.regNumber?.trim() ?? "";
    if (!regNumber) {
      setRegistrationLookupError("Please enter your registration number.");
      return;
    }

    setIsRegistrationLookupLoading(true);
    setRegistrationLookupError("");

    try {
      const vehicle = await fetchVehicleRegistration(regNumber);
      const queryParams = new URLSearchParams();
      appendVehicleParams(queryParams, vehicle);
      queryParams.set("sourceLabel", "home-registration-search");
      queryParams.set("sourcePage", window.location.href);
      queryParams.set("searchMode", "registration");
      router.push(`/form?${queryParams.toString()}`);
    } catch (error) {
      setRegistrationLookupError(error instanceof Error ? error.message : "Vehicle lookup failed.");
    } finally {
      setIsRegistrationLookupLoading(false);
    }
  }

  const homeSubheadingParts = splitInlineDisclaimerText(data.subheading);
  const homeDisclaimerText =
    "Prices are indicative rebuilt/reconditioned supply-only averages. Actual quotes vary by variant, year and supplier.";

  return (
    <>
      <style>{`
        @keyframes slideLeftMobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideLeftDesktop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mobile-carousel-track {
          animation: slideLeftMobile 30s linear infinite;
        }
        .desktop-carousel-track {
          animation: slideLeftDesktop 40s linear infinite;
        }
      `}</style>
      {/* ─── HERO SECTION ─── */}
      <section
        className="hero-background overflow-hidden pt-8 lg:pt-12"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.78) 30%, rgba(255,255,255,0.64) 58%, rgba(255,255,255,0.54) 100%), url('/images/home/home-hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container className="max-w-[1400px] px-2 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-10 lg:gap-12 lg:pb-10">

            {/* ── LEFT / MAIN COLUMN ── */}
            <div className="flex flex-col lg:col-span-6 lg:justify-center">
              {/* Badge */}
              {/* <span className="mb-4 inline-flex w-fit items-center gap-[6px] rounded-full bg-[#0d1b2e] px-[10px] py-[4px] text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                <span className="h-[6px] w-[6px] rounded-full bg-[#15803d]" />
                <span>{data.tag}</span>
              </span> */}

              {/* Heading */}
              <h1
                className="mb-2 text-center leading-[1.1] tracking-[-0.03em] text-[#0d1b2e] lg:text-left"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="block text-[26px] sm:text-[clamp(28px,5vw,48px)] font-extrabold">{data.headingLead}</span>
                <span className="mt-[2px] block text-[26px] font-extrabold text-[#15803d] sm:text-[clamp(28px,5vw,48px)]">
                  {data.headingAccent}
                </span>
              </h1>

              {/* Green underline - desktop only */}
              <span className="mb-5 hidden h-[3px] w-10 rounded-full bg-[#15803d] lg:block" />

              {/* Subheading */}
              <p
                className="mb-6 text-center text-[16px] leading-[1.6] text-[#6b7280] lg:max-w-[62ch] lg:text-left"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {homeSubheadingParts.leading ? `${homeSubheadingParts.leading} ` : ""}
                <span className="whitespace-nowrap">
                  {homeSubheadingParts.trailing}{" "}
                  <button
                    type="button"
                    onClick={() => setIsDisclaimerOpen((current) => !current)}
                    aria-expanded={isDisclaimerOpen}
                    aria-label="Toggle disclaimer"
                    className="inline-flex h-5 w-5 translate-y-[-1px] items-center justify-center rounded-full border border-black align-middle text-[11px] font-bold leading-none text-black transition focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] focus:ring-offset-2"
                  >
                    !
                  </button>
                </span>
              </p>

              {/* ── MOBILE: CTA Card (appears ABOVE brand rows) ── */}
              {isDisclaimerOpen ? (
                <div
                  className="-mt-4 mb-6 rounded-[16px] border border-[#dbe4ef] bg-white/85 px-4 py-3 text-[11.5px] leading-[1.6] text-[#64748b] shadow-[0_12px_32px_rgba(13,27,46,0.07)] backdrop-blur-sm md:px-5 md:text-[12.5px] lg:max-w-[62ch]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <p>{homeDisclaimerText}</p>
                </div>
              ) : null}

              <div className="mb-5 rounded-[12px] border border-[rgba(13,27,46,0.08)] bg-white p-0 shadow-[0_8px_30px_rgba(13,27,46,0.2)] lg:hidden">
                <CTAPanel
                  registration={registration}
                  onRegistrationChange={setRegistration}
                  onSubmit={openQuoteCheckout}
                  isRegistrationLookupLoading={isRegistrationLookupLoading}
                  registrationLookupError={registrationLookupError}
                  gdprNote={data.gdprNote}
                />
              </div>

              {/* ── MOBILE: "Compare quotes" heading ── */}
              

            </div>

            {/* ── RIGHT COLUMN - Desktop CTA ── */}
            <div className="relative hidden lg:flex lg:flex-col lg:col-span-4 mt-2">
              <div className="overflow-hidden rounded-[18px] border border-white/75 bg-white/55 shadow-[0_14px_30px_rgba(4,30,72,0.23),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[26px] saturate-[155%]">
                <CTAPanel
                  registration={registration}
                  onRegistrationChange={setRegistration}
                  onSubmit={openQuoteCheckout}
                  isRegistrationLookupLoading={isRegistrationLookupLoading}
                  registrationLookupError={registrationLookupError}
                  gdprNote={data.gdprNote}
                />
              </div>

              {/* Desktop engine ticker strip */}
              {/* <div className="mt-4 h-14 overflow-hidden rounded-[10px] border border-[rgba(13,27,46,0.1)] bg-[#f9fafb]">
                <div className="hero-ticker-track h-14">
                  {engineTickerLoop.map((item, index) => (
                    <div
                      key={`desktop-ticker-${item.brand}-${item.code}-${index}`}
                      className="flex h-14 min-w-[90px] flex-none flex-col items-center justify-center border-r border-[rgba(13,27,46,0.1)] px-4"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0d1b2e] text-white">
                        <EngineTickerIcon />
                      </div>
                      <span className="mt-[2px] whitespace-nowrap text-[9px] font-bold tracking-[0.04em] text-[#0d1b2e]">
                        {item.brand} · {item.code}
                      </span>
                      <span className="whitespace-nowrap text-[9px] font-semibold text-[#15803d]">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── ENGINE CAROUSEL ─── */}
           {/* ─── ENGINE CAROUSEL ─── */}
      <section className="border-t border-[rgba(13,27,46,0.08)] bg-gray-50 py-5">
        
        {/* MOBILE SLIDER - Placed OUTSIDE Container to guarantee 0 left/right padding */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="overflow-hidden flex-1">
            <div className="mobile-carousel-track flex">
              {[...engineCarouselItems, ...engineCarouselItems].map((item, index) => (
                <div
                  key={`mobile-carousel-${item.code}-${index}`}
                  className="flex items-center gap-2 p-0 min-w-[33.333%] flex-shrink-0"
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-[6px]">
                    <img
                      src={getEngineImagePath(item.code)}
                      alt={`${item.brand} ${item.code} engine`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[10px] font-bold leading-tight text-[#0d1b2e]">
                      {item.brand}
                    </div>
                    <div className="text-[9px] text-[#6b7280]">
                      {renderLinkedEngineCodes(item.code, engineLinks)}
                    </div>
                    <div className="text-[10px] font-bold text-[#15803d]">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP SLIDER - Kept INSIDE Container for proper centering and padding */}
        <Container className="max-w-[1400px] px-2 sm:px-10">
          <div className="hidden items-center gap-3 lg:flex">
            <div className="overflow-hidden flex-1">
              <div className="desktop-carousel-track flex">
                {[...engineCarouselItems, ...engineCarouselItems].map((item, index) => (
                  <div
                    key={`desktop-carousel-${item.code}-${index}`}
                    className="flex items-center gap-2 p-2 min-w-[16.667%] flex-shrink-0"
                  >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden">
                      <img
                        src={getEngineImagePath(item.code)}
                        alt={`${item.brand} ${item.code} engine`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="whitespace-nowrap text-[13px] font-bold leading-tight text-[#0d1b2e]">
                        {item.brand} <span className="text-[#2563eb]">{renderLinkedEngineCodes(item.code, engineLinks)}</span>
                      </div>
                      <div className="whitespace-nowrap text-[11px] text-[#6b7280]">{item.spec}</div>
                      <div className="text-[10px] font-bold text-[#15803d]">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── MOBILE LIVE BAR ─── */}
      {/* <div className="flex h-10 items-center justify-around border-t border-[rgba(13,27,46,0.1)] bg-[#f9fafb] px-3 lg:hidden">
        <div className="flex items-center gap-[5px] text-[11px] font-bold text-[#15803d]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#15803d]" />
          LIVE
        </div>
        <span className="h-4 w-px bg-[rgba(13,27,46,0.15)]" />
        <span className="text-[11px] font-semibold text-[#0d1b2e]">8,000+ Engine Codes</span>
        <span className="h-4 w-px bg-[rgba(13,27,46,0.15)]" />
        <span className="text-[11px] font-semibold text-[#0d1b2e]">40+ Car Brands</span>
        <span className="h-4 w-px bg-[rgba(13,27,46,0.15)]" />
        <span className="text-[11px] font-semibold text-[#0d1b2e]">100% Free · No Obligation</span>
      </div> */}

      {/* ─── BOTTOM DARK BAR ─── */}
      <div className="bg-[#0d1b2e]">
        {/* Desktop: scrolling ticker */}
        <div className="hidden h-14 items-center overflow-hidden lg:flex">
          <Container className="max-w-[1400px] px-10">
            <div className="hero-ticker-track h-14" style={{ animationDuration: "32s" }}>
              {bottomTickerLoop.map((item, index) => (
                <span
                  key={`desktop-bottom-ticker-${index}`}
                  className="flex h-14 flex-none items-center gap-[10px] border-r border-r-white/10 px-6 text-[12px] leading-[1.4] text-white/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <BottomBarIcon type={item.icon} />
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </Container>
        </div>

        {/* Mobile: scrolling ticker */}
        <div className="flex h-12 items-center overflow-hidden lg:hidden">
          <div className="hero-ticker-track h-12" style={{ animationDuration: "45s" }}>
            {bottomTickerLoop.map((item, index) => (
              <span
                key={`bottom-ticker-${index}`}
                className="flex h-12 flex-none items-center gap-[8px] border-r border-r-white/10 px-5 text-[12px] text-white/80"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <BottomBarIcon type={item.icon} />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

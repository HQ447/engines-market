export type VariantPreviewData = {
  brand: string;
  model: string;
  variant: string;
  engineCode: string;
  images: {
    heroBackground: string;
    vehicle: string;
    brandLogo: string;
    commonProblemsVehicle: string;
    usedEngine: string;
    reconditionedEngine: string;
    rebuiltEngine: string;
    heroEngine: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    trustItems: string[];
    price: { engineName: string; range: string; details: string[] };
    options: Array<{
      title: string;
      description: string;
      image: string;
      href: string;
    }>;
    cta: string;
    tickerItems: string[];
  };
  howItWorks: Array<{
    number: string;
    title: string;
    description: string;
    back: string;
  }>;
  history: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    specs: Array<[string, string]>;
    timeline: Array<{ year: string; text: string }>;
    closing: string;
  };
  engineGuide: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    engineName: string;
    specs: Array<[string, string]>;
    prices: Array<[string, string]>;
    commonFailure: string;
    cta: string;
    closing: string;
  };
  commonProblems: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    vehicleValue: string;
    closingCta: { title: string; description: string; cta: string };
    cards: Array<{
      title: string;
      affected: string;
      mileage: string;
      rootCause: string;
      repairOptions: Array<{
        tier: string;
        dealer: string;
        specialist: string;
      }>;
      recommendation: string;
      cta: string;
    }>;
  };
  faq: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
      icon: "price" | "problems" | "value" | "life" | "compare" | "code";
      highlights?: Array<{ label: string; value: string; detail?: string }>;
      bullets?: string[];
      cta: string;
    }>;
  };
  whyChoose: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    benefits: Array<{
      value: string;
      label: string;
      icon: "network" | "warranty" | "delivery";
    }>;
    cta: string;
    note: string;
  };
};

const imageRoot = "/images/variant-preview/peugeot-207-1-4-hdi";

export const peugeot207HdiPreviewData: VariantPreviewData = {
  brand: "Peugeot",
  model: "207",
  variant: "1.4 HDi",
  engineCode: "8HZ",
  images: {
    heroBackground: `${imageRoot}/hero-background.png`,
    vehicle: `${imageRoot}/peugeot-207.png`,
    brandLogo: `${imageRoot}/peugeot-logo.png`,
    commonProblemsVehicle: `${imageRoot}/common-problems-scene.png`,
    usedEngine: `${imageRoot}/used-engine.png`,
    reconditionedEngine: `${imageRoot}/reconditioned-engine.png`,
    rebuiltEngine: `${imageRoot}/rebuilt-engine.png`,
    heroEngine: `${imageRoot}/engine-cutout.png`,
  },
  hero: {
    eyebrow: "Peugeot 207 1.4 HDi specialists",
    titleLead: "Peugeot 207 1.4 HDi Engine Replacement —",
    titleAccent: "Compare Prices & Get Quotes",
    description:
      "Get quotes today from trusted UK Peugeot 207 1.4 HDi engine specialists. Compare reconditioned, rebuilt and used 8HZ diesel units with supply and fit available and a minimum 12-month warranty.",
    trustItems: [
      "Supply & Fit Available",
      "12-Month Warranty",
      "Nationwide Delivery",
      "100+ Suppliers",
    ],
    price: {
      engineName: "8HZ 1.4 HDi",
      range: "£550 to £1,250",
      details: [
        "Used from £550",
        "Reconditioned from £650",
        "Common codes: 8HZ, 8HR",
      ],
    },
    options: [
      {
        title: "Peugeot 207 1.4 HDi",
        description: "Used Engine — 8HZ",
        image: `${imageRoot}/used-engine-cutout.png`,
        href: "#quote",
      },
      {
        title: "Peugeot 207 1.4 HDi",
        description: "Reconditioned Engine — 8HZ",
        image: `${imageRoot}/engine-cutout.png`,
        href: "#quote",
      },
      {
        title: "Peugeot 207 1.4 HDi",
        description: "Rebuilt Engine — 8HZ",
        image: `${imageRoot}/rebuilt-engine-cutout.png`,
        href: "#quote",
      },
    ],
    cta: "Get Free Peugeot 207 1.4 HDi Engine Quotes",
    tickerItems: [
      "Instant Quotes",
      "No Obligation",
      "100% Free",
      "Reconditioned",
      "Rebuilt",
      "Used",
      "Supply & Fit Available",
      "UK-Wide Network",
    ],
  },
  howItWorks: [
    {
      number: "01",
      title: "Confirm your Peugeot 207 1.4 HDi",
      description:
        "Instantly verify your exact model, engine code (8HZ) and fuel type.",
      back: "EnginesMarket cross-checks the DVLA record against known Peugeot 207 1.4 HDi engine codes so your quote request is accurate before it reaches a supplier — no paperwork, no guesswork, 100% free. Whether you have the 68hp or 70hp 8HZ variant, we match you with the right specialists.",
    },
    {
      number: "02",
      title: "Compare specialist engine quotes",
      description:
        "See used, reconditioned and rebuilt 8HZ options side-by-side.",
      back: "Our UK network of Peugeot 207 1.4 HDi specialists sends you transparent, itemised quotes covering all condition types — no obligation, no hidden fees, just genuine prices for your exact diesel engine code.",
    },
    {
      number: "03",
      title: "Choose your specialist",
      description: "Book supply and fit with a minimum 12-month warranty.",
      back: "Every rebuilt Peugeot 207 1.4 HDi engine comes with a minimum 12‑month unlimited mileage warranty. Choose supply‑only or full supply & fit with nationwide delivery to your chosen garage.",
    },
  ],
  history: {
    eyebrow: "Variant history",
    titleLead: "Peugeot 207 1.4 HDi — Engine History & ",
    titleAccent: "Specs at a Glance",
    description:
      "The Peugeot 207 1.4 HDi (8HZ) was the entry-level diesel engine for the 207 range, offering excellent fuel economy and low running costs. Part of PSA's DV4 family, it was fitted to Active, Access and Sport trims from 2006 until 2012. Its simple 8-valve SOHC design is reliable when maintained, but timing-belt intervals and cooling-system care remain essential.",
    specs: [
      ["Fuel type", "Diesel"],
      ["Engine family", "DV4"],
      ["Engine code", "8HZ (8HR for SW variants)"],
      ["Engine size", "1.4L (1,398cc)"],
      ["Configuration", "Inline 4-cylinder, 8-valve SOHC"],
      ["Power output", "68–70hp (50–52kW)"],
      ["Torque", "160 Nm"],
      ["Injection", "Common-rail direct injection"],
      ["Years produced", "2006–2012"],
    ],
    timeline: [
      {
        year: "2006",
        text: "207 launched with 1.4 HDi (8HZ), 68hp and 5-speed manual gearbox.",
      },
      {
        year: "2007",
        text: "SW estate variant introduced with the same 1.4 HDi engine.",
      },
      {
        year: "2008",
        text: "Power output increased to 70hp with minor ECU refinement.",
      },
      {
        year: "2010",
        text: "Revised EGR valve calibration for emissions compliance.",
      },
      {
        year: "2012",
        text: "1.4 HDi phased out for 1.6 HDi and PureTech alternatives.",
      },
    ],
    closing:
      "Every 8HZ engine fitted to the Peugeot 207 1.4 HDi is covered below, with UK rebuilt pricing and known failure points.",
  },
  engineGuide: {
    eyebrow: "Engine codes & pricing",
    titleLead: "Peugeot 207 1.4 HDi Engine Codes — ",
    titleAccent: "Specifications & Replacement Cost",
    description:
      "Find full technical specifications, compatible trim levels and UK replacement costs for the Peugeot 207 1.4 HDi (8HZ). Compare used, reconditioned and rebuilt engine prices from trusted UK specialists.",
    engineName: "8HZ (DV4TD) — 1.4L HDi (2006–2012)",
    specs: [
      ["Fuel type", "Diesel"],
      ["Engine code", "8HZ (DV4TD)"],
      ["Engine size", "1.4 litre (1,398cc)"],
      ["Power output", "68–70hp (50–52kW)"],
      ["Torque", "160 Nm"],
      ["Configuration", "Inline 4-cylinder, 8-valve SOHC"],
      ["Injection", "Common-rail"],
      ["Years fitted", "2006–2012"],
      ["Compatible trims", "Active, Access, Sport, SW and SW Active"],
    ],
    prices: [
      ["Used", "£550–£900"],
      ["Reconditioned", "£650–£1,000"],
      ["Rebuilt", "£650–£1,250"],
    ],
    commonFailure:
      "Head-gasket failure due to aluminium-block warping under high heat, EGR valve sticking, timing-belt tensioner wear and oil-pump wear are the main replacement drivers.",
    cta: "Get quotes for 8HZ Peugeot 207 1.4 HDi engine replacement",
    closing:
      "Can’t find your exact engine code? Enter your registration above and we’ll confirm the precise unit fitted before connecting you with specialists.",
  },
  commonProblems: {
    eyebrow: "Common problems",
    titleLead: "Peugeot 207 1.4 HDi Engine Problems — Repair",
    titleAccent: "Cost vs Replacement",
    description:
      "The Peugeot 207 1.4 HDi (8HZ) is a robust, economical diesel, but age, high mileage and the emissions system create distinct failure patterns. Head gasket failure, timing-belt tensioner wear and EGR valve sticking are the most common replacement drivers.",
    vehicleValue:
      "A typical Peugeot 207 1.4 HDi is worth £600–£1,800 depending on age, mileage and condition. A rebuilt engine at £650–£1,250 supply-only plus fitting can represent 40–80% of the vehicle’s value, so assess the overall condition before committing.",
    closingCta: {
      title: "Don’t Let Engine Failure Write Off Your Peugeot 207 1.4 HDi",
      description:
        "Whether you’re dealing with head gasket failure, timing belt wear or EGR issues, EngineMarket connects you directly with verified UK Peugeot 207 1.4 HDi specialists who understand these exact failure patterns. Every rebuilt unit includes upgraded components to permanently address the root cause, is bench-tested for performance, and comes with a minimum 12-month unlimited mileage warranty. Skip the main dealer premium — compare transparent supply-and-fit quotes from multiple trusted specialists and get back on the road with confidence.",
      cta: "Compare Peugeot 207 1.4 HDi Engine Replacement Prices Now",
    },
    cards: [
      {
        title: "Head gasket failure",
        affected: "Peugeot 207 1.4 HDi (8HZ, 2006–2012)",
        mileage: "80,000–120,000 miles",
        rootCause:
          "The aluminium block can warp under high thermal load, allowing the head gasket to fail. Watch for coolant loss, white smoke, oil contamination and overheating.",
        repairOptions: [
          {
            tier: "Head gasket & cylinder-head refurbishment",
            dealer: "£900–£1,400",
            specialist: "£500–£800",
          },
          {
            tier: "Rebuilt 8HZ engine replacement",
            dealer: "£2,000–£2,800",
            specialist: "£650–£1,250",
          },
        ],
        recommendation:
          "If coolant loss is caught early, a top-end refurbishment can be cost-effective. Repeated overheating or oil-water mixing makes a rebuilt 8HZ engine the safer long-term choice.",
        cta: "Compare rebuilt 8HZ engine prices",
      },
      {
        title: "Timing belt failure",
        affected: "Peugeot 207 1.4 HDi (8HZ, 2006–2012)",
        mileage: "60,000–80,000 miles",
        rootCause:
          "The timing belt needs replacement at strict intervals. If it snaps, valves can collide with pistons and cause catastrophic engine damage.",
        repairOptions: [
          {
            tier: "Timing belt kit replacement",
            dealer: "£500–£800",
            specialist: "£300–£500",
          },
          {
            tier: "Rebuilt 8HZ engine replacement",
            dealer: "£2,000–£2,800",
            specialist: "£650–£1,250",
          },
        ],
        recommendation:
          "A preventative belt change is significantly cheaper than an engine replacement. If the belt has already snapped, a rebuilt unit may be the practical route.",
        cta: "Find rebuilt 8HZ engines with warranty",
      },
      {
        title: "EGR valve failure",
        affected: "Peugeot 207 1.4 HDi (8HZ, 2006–2012)",
        mileage: "60,000–100,000 miles",
        rootCause:
          "Carbon buildup can stick the EGR valve open or closed, causing loss of power, rough idle, limp mode and increased fuel consumption.",
        repairOptions: [
          { tier: "EGR clean", dealer: "£180–£350", specialist: "£90–£220" },
          {
            tier: "EGR valve replacement",
            dealer: "£450–£650",
            specialist: "£250–£450",
          },
        ],
        recommendation:
          "EGR faults are usually repairable without changing the engine. Consider a replacement only if the fault has caused turbo or internal damage.",
        cta: "Compare 8HZ specialist repair options",
      },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    titleLead: "Peugeot 207 1.4 HDi",
    titleAccent: "Engine Replacement — FAQs",
    description:
      "Quick answers to the most common questions about Peugeot 207 1.4 HDi engine codes, problems, costs and replacement options. Can’t find what you’re looking for? Get in touch.",
    items: [
      {
        question:
          "How much does a Peugeot 207 1.4 HDi engine replacement cost?",
        answer:
          "A rebuilt Peugeot 207 1.4 HDi engine typically costs £650–£1,250 supply-only, depending on supplier and condition. Used units start from £550. Reconditioned units range £650–£1,000. Supply & fit adds £450–£900 labour. The 1.4 HDi is generally cheaper to replace than the 1.6 HDi.",
        icon: "price",
        highlights: [
          { label: "Used 8HZ", value: "£550–£900" },
          { label: "Reconditioned 8HZ", value: "£650–£1,000" },
          { label: "Rebuilt 8HZ", value: "£650–£1,250" },
        ],
        cta: "Get instant quotes for Peugeot 207 1.4 HDi engine replacement from UK specialists",
      },
      {
        question:
          "What are the most common Peugeot 207 1.4 HDi engine problems?",
        answer:
          "The most common Peugeot 207 1.4 HDi (8HZ) engine problems are head gasket failure causing coolant loss and white smoke, timing belt tensioner wear if service intervals are missed, and EGR valve sticking causing loss of power and rough idle. The 1.4 HDi is generally reliable but requires strict maintenance.",
        icon: "problems",
        bullets: [
          "Head gasket failure from aluminium block warping",
          "Timing belt failure if interval missed (80,000 miles / 8 years)",
          "EGR valve carbon buildup from short-journey driving",
        ],
        cta: "Compare rebuilt 8HZ Peugeot 207 1.4 HDi engine prices",
      },
      {
        question: "Is it worth replacing the engine on a Peugeot 207 1.4 HDi?",
        answer:
          "Replacing a Peugeot 207 1.4 HDi engine is worthwhile if the vehicle is otherwise sound and the replacement cost stays below the vehicle’s value. With 207 1.4 HDi values typically £600–£1,800, a rebuilt engine at £650–£1,250 represents a significant investment. For sub-£1,000 examples, a used engine from £550 may be more economical.",
        icon: "value",
        highlights: [
          { label: "Rebuilt 8HZ", value: "£650–£1,250" },
          { label: "Used 8HZ", value: "£550–£900" },
          { label: "Dealer replacement", value: "£2,000–£2,800+" },
        ],
        cta: "Get a tailored Peugeot 207 1.4 HDi engine replacement quote today",
      },
      {
        question: "How long does a Peugeot 207 1.4 HDi engine last?",
        answer:
          "With proper maintenance, the Peugeot 207 1.4 HDi (8HZ) engine typically reaches 120,000–150,000 miles. Strict timing belt intervals (80,000 miles / 8 years), regular oil changes and coolant system maintenance are essential for longevity. The 1.4 HDi is generally durable when serviced correctly.",
        icon: "life",
        bullets: [
          "120,000–150,000 miles achievable with proper maintenance",
          "Timing belt replacement critical at 80,000 miles or 8 years",
          "Regular oil changes with correct 5W-40 specification essential",
        ],
        cta: "Find a reconditioned Peugeot 207 1.4 HDi engine with 12-month warranty",
      },
      {
        question:
          "What’s the difference between Peugeot 207 1.4 HDi and 1.6 HDi engines?",
        answer:
          "The 1.4 HDi (8HZ) is a 1.4-litre 8-valve SOHC diesel producing 68–70hp, while the 1.6 HDi (9HX/9HZ) is a 1.6-litre 16-valve DOHC diesel producing 90–112hp. The 1.4 HDi is simpler, more economical (65+ mpg) and cheaper to replace, but less powerful and more prone to head gasket failure. The 1.6 HDi offers stronger performance but has more complex emissions hardware.",
        icon: "compare",
        highlights: [
          {
            label: "1.4 HDi (8HZ)",
            value: "1.4L, 8-valve, 68–70hp",
            detail: "Simpler design, more economical",
          },
          {
            label: "1.6 HDi (9HX/9HZ)",
            value: "1.6L, 16-valve, 90–112hp",
            detail: "More complex, higher performance",
          },
        ],
        cta: "Compare Peugeot 207 1.4 HDi vs 1.6 HDi engine options",
      },
      {
        question: "How do I find my Peugeot 207 1.4 HDi engine code?",
        answer:
          "Your Peugeot 207 1.4 HDi engine code is 8HZ (DV4TD). It appears on the VIN plate under the bonnet, stamped on the engine block near the timing belt cover, or on your V5C registration document section D.2. Enter your reg above for instant verification.",
        icon: "code",
        bullets: [
          "VIN plate under bonnet shows engine code",
          "V5C section D.2 lists the official engine code",
          "8HZ = 1.4L HDi diesel",
        ],
        cta: "Enter your registration to identify your exact Peugeot 207 1.4 HDi engine code instantly",
      },
    ],
  },
  whyChoose: {
    eyebrow: "Why choose EnginesMarket",
    titleLead: "Compare Peugeot 207 1.4 HDi",
    titleAccent: "Engine Prices Today",
    description:
      "Comparing Peugeot 207 1.4 HDi engine quotes is completely free and carries no obligation. Enter your registration above, tell us your 8HZ engine code, and receive transparent, fixed-price quotes from our vetted UK specialists within hours. Whether you need a used engine for a quick fix or a fully rebuilt 8HZ unit with upgraded head gasket and timing components and a 12-month warranty, we’ll match you with the right supplier for your budget.",
    benefits: [
      {
        value: "50+",
        label: "Peugeot 207 1.4 HDi engines supplied through our network",
        icon: "network",
      },
      {
        value: "12-Month",
        label: "Warranty on every rebuilt 8HZ engine",
        icon: "warranty",
      },
      {
        value: "Nationwide UK",
        label: "delivery — supply & fit available",
        icon: "delivery",
      },
    ],
    cta: "Get Free Peugeot 207 1.4 HDi Engine Quotes",
    note: "Fast. Free. No obligation.",
  },
};

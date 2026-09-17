export type VariantPreviewData = {
  brand: string;
  model: string;
  variant: string;
  engineCode: string;
  images: {
    heroBackground: string;
    vehicle: string;
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
    options: Array<{ title: string; description: string; image: string; href: string }>;
    cta: string;
    tickerItems: string[];
  };
  howItWorks: Array<{ number: string; title: string; description: string; back: string }>;
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
    cards: Array<{
      title: string;
      affected: string;
      mileage: string;
      rootCause: string;
      repairOptions: Array<{ tier: string; dealer: string; specialist: string }>;
      recommendation: string;
      cta: string;
    }>;
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
    trustItems: ["Supply & Fit Available", "12-Month Warranty", "Nationwide Delivery", "100+ Suppliers"],
    price: {
      engineName: "8HZ 1.4 HDi",
      range: "£550 to £1,250",
      details: ["Used from £550", "Reconditioned from £650", "Common codes: 8HZ, 8HR"],
    },
    options: [
      { title: "Peugeot 207 1.4 HDi", description: "Used Engine — 8HZ", image: `${imageRoot}/used-engine-cutout.png`, href: "#quote" },
      { title: "Peugeot 207 1.4 HDi", description: "Reconditioned Engine — 8HZ", image: `${imageRoot}/engine-cutout.png`, href: "#quote" },
      { title: "Peugeot 207 1.4 HDi", description: "Rebuilt Engine — 8HZ", image: `${imageRoot}/rebuilt-engine-cutout.png`, href: "#quote" },
    ],
    cta: "Get Free Peugeot 207 1.4 HDi Engine Quotes",
    tickerItems: ["Instant Quotes", "No Obligation", "100% Free", "Reconditioned", "Rebuilt", "Used", "Supply & Fit Available", "UK-Wide Network"],
  },
  howItWorks: [
    {
      number: "01",
      title: "Confirm your Peugeot 207 1.4 HDi",
      description: "Instantly verify your exact model, engine code (8HZ) and fuel type.",
      back: "We cross-check your vehicle details against known 207 1.4 HDi engine codes before your request reaches a supplier — no paperwork, no guesswork and completely free.",
    },
    {
      number: "02",
      title: "Compare specialist engine quotes",
      description: "See used, reconditioned and rebuilt 8HZ options side-by-side.",
      back: "Receive transparent, itemised options for your exact diesel engine code. Compare condition, price, warranty and fitting support with no obligation.",
    },
    {
      number: "03",
      title: "Choose your specialist",
      description: "Book supply and fit with a minimum 12-month warranty.",
      back: "Choose supply-only or nationwide supply and fit. Rebuilt engines include a minimum 12-month unlimited-mileage warranty for added confidence.",
    },
  ],
  history: {
    eyebrow: "Variant history",
    titleLead: "Peugeot 207 1.4 HDi —",
    titleAccent: "Engine History & Specs at a Glance",
    description:
      "The Peugeot 207 1.4 HDi (8HZ) was the entry-level diesel engine for the 207 range, offering excellent fuel economy and low running costs. Part of PSA's DV4 family, it was fitted to Active, Access and Sport trims from 2006 until 2012. Its simple 8-valve SOHC design is reliable when maintained, but timing-belt intervals and cooling-system care remain essential.",
    specs: [
      ["Fuel type", "Diesel"], ["Engine family", "DV4"], ["Engine code", "8HZ (8HR for SW variants)"], ["Engine size", "1.4L (1,398cc)"], ["Configuration", "Inline 4-cylinder, 8-valve SOHC"], ["Power output", "68–70hp (50–52kW)"], ["Torque", "160 Nm"], ["Injection", "Common-rail direct injection"], ["Years produced", "2006–2012"],
    ],
    timeline: [
      { year: "2006", text: "207 launched with 1.4 HDi (8HZ), 68hp and 5-speed manual gearbox." },
      { year: "2007", text: "SW estate variant introduced with the same 1.4 HDi engine." },
      { year: "2008", text: "Power output increased to 70hp with minor ECU refinement." },
      { year: "2010", text: "Revised EGR valve calibration for emissions compliance." },
      { year: "2012", text: "1.4 HDi phased out for 1.6 HDi and PureTech alternatives." },
    ],
    closing: "Every 8HZ engine fitted to the Peugeot 207 1.4 HDi is covered below, with UK rebuilt pricing and known failure points.",
  },
  engineGuide: {
    eyebrow: "Engine codes & pricing",
    titleLead: "Peugeot 207 1.4 HDi Engine Codes —",
    titleAccent: "Specifications & Replacement Cost",
    description: "Find full technical specifications, compatible trim levels and UK replacement costs for the Peugeot 207 1.4 HDi (8HZ). Compare used, reconditioned and rebuilt engine prices from trusted UK specialists.",
    engineName: "8HZ (DV4TD) — 1.4L HDi (2006–2012)",
    specs: [
      ["Fuel type", "Diesel"], ["Engine code", "8HZ (DV4TD)"], ["Engine size", "1.4 litre (1,398cc)"], ["Power output", "68–70hp (50–52kW)"], ["Torque", "160 Nm"], ["Configuration", "Inline 4-cylinder, 8-valve SOHC"], ["Injection", "Common-rail"], ["Years fitted", "2006–2012"], ["Compatible trims", "Active, Access, Sport, SW and SW Active"],
    ],
    prices: [["Used", "£550–£900"], ["Reconditioned", "£650–£1,000"], ["Rebuilt", "£650–£1,250"]],
    commonFailure: "Head-gasket failure due to aluminium-block warping under high heat, EGR valve sticking, timing-belt tensioner wear and oil-pump wear are the main replacement drivers.",
    cta: "Get quotes for 8HZ Peugeot 207 1.4 HDi engine replacement",
    closing: "Can’t find your exact engine code? Enter your registration above and we’ll confirm the precise unit fitted before connecting you with specialists.",
  },
  commonProblems: {
    eyebrow: "Common problems",
    titleLead: "Peugeot 207 1.4 HDi Engine Problems —",
    titleAccent: "Repair Cost vs Replacement",
    description: "The Peugeot 207 1.4 HDi (8HZ) is a robust, economical diesel, but age, high mileage and the emissions system create distinct failure patterns. Head gasket failure, timing-belt tensioner wear and EGR valve sticking are the most common replacement drivers.",
    vehicleValue: "A typical Peugeot 207 1.4 HDi is worth £600–£1,800 depending on age, mileage and condition. A rebuilt engine at £650–£1,250 supply-only plus fitting can represent 40–80% of the vehicle’s value, so assess the overall condition before committing.",
    cards: [
      {
        title: "Head gasket failure",
        affected: "Peugeot 207 1.4 HDi (8HZ, 2006–2012)",
        mileage: "80,000–120,000 miles",
        rootCause: "The aluminium block can warp under high thermal load, allowing the head gasket to fail. Watch for coolant loss, white smoke, oil contamination and overheating.",
        repairOptions: [{ tier: "Head gasket & cylinder-head refurbishment", dealer: "£900–£1,400", specialist: "£500–£800" }, { tier: "Rebuilt 8HZ engine replacement", dealer: "£2,000–£2,800", specialist: "£650–£1,250" }],
        recommendation: "If coolant loss is caught early, a top-end refurbishment can be cost-effective. Repeated overheating or oil-water mixing makes a rebuilt 8HZ engine the safer long-term choice.",
        cta: "Compare rebuilt 8HZ engine prices",
      },
      {
        title: "Timing belt failure",
        affected: "Peugeot 207 1.4 HDi (8HZ, 2006–2012)",
        mileage: "60,000–80,000 miles",
        rootCause: "The timing belt needs replacement at strict intervals. If it snaps, valves can collide with pistons and cause catastrophic engine damage.",
        repairOptions: [{ tier: "Timing belt kit replacement", dealer: "£500–£800", specialist: "£300–£500" }, { tier: "Rebuilt 8HZ engine replacement", dealer: "£2,000–£2,800", specialist: "£650–£1,250" }],
        recommendation: "A preventative belt change is significantly cheaper than an engine replacement. If the belt has already snapped, a rebuilt unit may be the practical route.",
        cta: "Find rebuilt 8HZ engines with warranty",
      },
      {
        title: "EGR valve failure",
        affected: "Peugeot 207 1.4 HDi (8HZ, 2006–2012)",
        mileage: "60,000–100,000 miles",
        rootCause: "Carbon buildup can stick the EGR valve open or closed, causing loss of power, rough idle, limp mode and increased fuel consumption.",
        repairOptions: [{ tier: "EGR clean", dealer: "£180–£350", specialist: "£90–£220" }, { tier: "EGR valve replacement", dealer: "£450–£650", specialist: "£250–£450" }],
        recommendation: "EGR faults are usually repairable without changing the engine. Consider a replacement only if the fault has caused turbo or internal damage.",
        cta: "Compare 8HZ specialist repair options",
      },
    ],
  },
};

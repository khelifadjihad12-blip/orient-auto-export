import { db } from "./src/lib/db";

async function main() {
  console.log("🌱 Seeding database...");

  // ── Categories ──────────────────────────────────────────────
  const categories = await Promise.all([
    db.category.create({ data: { slug: "sedan", name: "Sedan" } }),
    db.category.create({ data: { slug: "suv", name: "SUV" } }),
    db.category.create({ data: { slug: "mpv", name: "MPV" } }),
    db.category.create({ data: { slug: "pickup", name: "Pickup" } }),
    db.category.create({ data: { slug: "coupe", name: "Coupe" } }),
  ]);
  const [sedan, suv, mpv, pickup, coupe] = categories;

  // ── Brands ──────────────────────────────────────────────────
  const brandsData = [
    {
      slug: "byd",
      name: "BYD",
      country: "China",
      founded: 1995,
      logo: null,
      description:
        "Build Your Dreams — the world's largest manufacturer of new energy vehicles, pioneering Blade Battery technology and vertical supply-chain integration.",
      history:
        "Founded in Shenzhen in 1995 as a battery manufacturer, BYD has grown into a global leader in electrified mobility, delivering passenger cars, commercial fleets and energy storage across more than 90 countries.",
    },
    {
      slug: "geely",
      name: "Geely",
      country: "China",
      founded: 1986,
      description:
        "A privately owned automotive group with a global footprint spanning Volvo Cars, Lotus and Polestar engineering expertise, focused on premium design and electrified platforms.",
      history:
        "Established in 1986, Geely entered the automotive industry in 1997 and has since built a portfolio of respected brands, combining Scandinavian engineering standards with Chinese manufacturing scale.",
    },
    {
      slug: "changan",
      name: "Changan",
      country: "China",
      founded: 1862,
      description:
        "One of China's oldest industrial enterprises and a top-four domestic automaker, with deep R&D centres in Chongqing, Turin, Yokohama and Birmingham.",
      history:
        "Tracing its origins to 1862, Changan is among the most historic automakers in the world, today producing more than two million vehicles annually across ICE, hybrid and electric platforms.",
    },
    {
      slug: "gac",
      name: "GAC",
      country: "China",
      founded: 1997,
      description:
        "Guangzhou Automobile Group — a state-owned manufacturer renowned for quality, joint-venture expertise with Toyota and Honda, and a fast-growing EV sub-brand.",
      history:
        "Headquartered in Guangzhou, GAC Motor has built a reputation for build quality and reliability, exporting to the Middle East, Southeast Asia and Africa.",
    },
    {
      slug: "chery",
      name: "Chery",
      country: "China",
      founded: 1997,
      description:
        "China's leading passenger-vehicle exporter for over two decades, with a strong presence across the Middle East, South America and Africa.",
      history:
        "Since exporting its first vehicle in 2001, Chery has established a global engineering network and consistently ranks among China's top vehicle exporters by volume.",
    },
    {
      slug: "haval",
      name: "Haval",
      country: "China",
      founded: 2013,
      description:
        "Great Wall Motor's specialist SUV brand and the world's largest specialist SUV manufacturer by sales, focused exclusively on sport-utility vehicles.",
      history:
        "Spun off from Great Wall Motors in 2013, Haval has become synonymous with affordable, durable SUVs engineered for demanding global markets.",
    },
    {
      slug: "jetour",
      name: "Jetour",
      country: "China",
      founded: 2018,
      description:
        "A Chery-owned travel-focused brand targeting younger buyers with crossover design, connected technology and competitive pricing.",
      history:
        "Launched in 2018, Jetour has expanded rapidly into export markets with a product line built around crossover and SUV body styles.",
    },
    {
      slug: "mg",
      name: "MG",
      country: "China",
      founded: 1924,
      description:
        "A heritage British marque now owned by SAIC Motor, combining classic branding with modern EV platforms and exceptional export value.",
      history:
        "Originally founded in Oxford in 1924, MG is today one of the fastest-growing automotive brands in Europe, the Middle East and North Africa under SAIC ownership.",
    },
    {
      slug: "dongfeng",
      name: "Dongfeng",
      country: "China",
      founded: 1969,
      description:
        "A central state-owned enterprise and one of China's largest automotive groups, manufacturing passenger cars, commercial vehicles and pickups.",
      history:
        "Headquartered in Wuhan, Dongfeng partners with global manufacturers and operates extensive export programmes across emerging markets.",
    },
    {
      slug: "hongqi",
      name: "Hongqi",
      country: "China",
      founded: 1958,
      description:
        "China's flagship luxury marque, historically reserved for state occasions, now offering premium sedans and SUVs for discerning international buyers.",
      history:
        "Founded in 1958, Hongqi (meaning 'Red Flag') is China's oldest luxury car brand, blending hand-crafted interiors with advanced electrified drivetrains.",
    },
    {
      slug: "zeekr",
      name: "Zeekr",
      country: "China",
      founded: 2021,
      description:
        "Geely's premium electric technology brand, engineered on the Sustainable Experience Architecture for performance-oriented EV buyers.",
      history:
        "Launched in 2021, Zeekr targets the premium EV segment with high-performance powertrains, long-range batteries and minimalist Scandinavian-inspired design.",
    },
  ];
  const brands = await Promise.all(
    brandsData.map((b) => db.brand.create({ data: b }))
  );
  const brandMap = Object.fromEntries(brands.map((b) => [b.slug, b]));

  // ── Vehicles ────────────────────────────────────────────────
  const vehiclesData = [
    {
      slug: "byd-han-ev",
      name: "BYD Han EV",
      brandSlug: "byd",
      categoryId: sedan.id,
      energyType: "EV",
      bodyType: "SEDAN",
      priceUsd: 38500,
      image: "https://sfile.chatglm.cn/images-ppt/f2f9ba0df89d.jpg",
      gallery: "[]",
      excerpt:
        "Flagship electric executive sedan with Blade Battery, 715 km NEDC range and dual-motor all-wheel drive.",
      description:
        "The BYD Han EV is a flagship executive sedan that combines a 715-kilometre NEDC range with the safety of BYD's proprietary Blade Battery. Its dual-motor all-wheel-drive variant delivers 517 horsepower, while the aerodynamic body and premium cabin position it against established European luxury sedans — at a fraction of the landed cost.",
      specs: JSON.stringify({
        engine: "Dual Permanent Magnet Synchronous Motors",
        transmission: "Single-speed reduction gear",
        battery: "85.4 kWh Blade Battery (LFP)",
        range: "715 km (NEDC)",
        horsepower: "517 hp (388 kW)",
        topSpeed: "185 km/h",
        acceleration: "0–100 km/h in 3.9s",
        dimensions: "4995 × 1910 × 1495 mm",
        seating: "5 seats",
        features: [
          "DiLink 15.6-inch rotating touchscreen",
          "DiPilot advanced driver assistance",
          "12-speaker Dynaudio sound system",
          "Ventilated Nappa leather seats",
          "Heat pump thermal management",
        ],
      }),
      featured: true,
    },
    {
      slug: "byd-atto-3",
      name: "BYD Atto 3",
      brandSlug: "byd",
      categoryId: suv.id,
      energyType: "EV",
      bodyType: "SUV",
      priceUsd: 28900,
      image: "https://sfile.chatglm.cn/images-ppt/cf859e0f027d.jpg",
      gallery: "[]",
      excerpt:
        "Compact electric crossover with Blade Battery, 420 km range and a striking 'gym' themed interior.",
      description:
        "The BYD Atto 3 is a compact electric crossover engineered for global markets. With a 60.48 kWh Blade Battery, 420 km of WLTP range and a 150 kW motor, it balances efficiency with everyday practicality. Its distinctive interior and five-star safety credentials make it a compelling entry point into electric mobility.",
      specs: JSON.stringify({
        engine: "Permanent Magnet Synchronous Motor",
        transmission: "Single-speed reduction gear",
        battery: "60.48 kWh Blade Battery (LFP)",
        range: "420 km (WLTP)",
        horsepower: "201 hp (150 kW)",
        topSpeed: "160 km/h",
        acceleration: "0–100 km/h in 7.3s",
        dimensions: "4455 × 1875 × 1615 mm",
        seating: "5 seats",
        features: [
          "15.6-inch rotating touchscreen",
          "Vehicle-to-Load (V2L) output",
          "ADAS with lane-keep assist",
          "5-star Euro NCAP rating",
          "Heat pump system",
        ],
      }),
      featured: true,
    },
    {
      slug: "geely-monjaro",
      name: "Geely Monjaro",
      brandSlug: "geely",
      categoryId: suv.id,
      energyType: "PETROL",
      bodyType: "SUV",
      priceUsd: 31200,
      image: "https://sfile.chatglm.cn/images-ppt/a83cc1b6ae3b.jpg",
      gallery: "[]",
      excerpt:
        "Mid-size SUV sharing Volvo-derived CMA architecture, with mild-hybrid 2.0L powertrain and AWD.",
      description:
        "Developed on the Compact Modular Architecture shared with Volvo, the Geely Monjaro is a premium mid-size SUV pairing a 2.0-litre turbocharged mild-hybrid engine with all-wheel drive. The cabin reflects Scandinavian design discipline, while chassis tuning delivers a refined ride suited to long-distance touring.",
      specs: JSON.stringify({
        engine: "2.0L Turbocharged + 48V Mild Hybrid",
        transmission: "7-speed wet dual-clutch",
        battery: "48V lithium auxiliary",
        range: "850 km (combined cycle)",
        horsepower: "238 hp (175 kW)",
        topSpeed: "215 km/h",
        acceleration: "0–100 km/h in 7.9s",
        dimensions: "4770 × 1895 × 1689 mm",
        seating: "5 seats",
        features: [
          "Bose 10-speaker audio",
          "Triple-screen cockpit",
          "BorgWarner AWD system",
          "Panoramic sunroof",
          "Level 2 driver assistance",
        ],
      }),
      featured: true,
    },
    {
      slug: "chery-tiggo-8-pro",
      name: "Chery Tiggo 8 Pro",
      brandSlug: "chery",
      categoryId: suv.id,
      energyType: "PETROL",
      bodyType: "SUV",
      priceUsd: 24600,
      image: "https://sfile.chatglm.cn/images-ppt/3f8d207f2c88.jpg",
      gallery: "[]",
      excerpt:
        "Seven-seat family SUV with 1.6L turbo, premium triple-screen cabin and exceptional export value.",
      description:
        "The Chery Tiggo 8 Pro is a seven-seat family SUV engineered for export markets that demand space, comfort and value. A 1.6-litre turbocharged engine delivers 194 horsepower, while the triple-display dashboard and quilted leather upholstery create a premium ambience well beyond its price point.",
      specs: JSON.stringify({
        engine: "1.6L Turbocharged TGDI",
        transmission: "7-speed wet dual-clutch",
        battery: "12V",
        range: "780 km (combined cycle)",
        horsepower: "194 hp (145 kW)",
        topSpeed: "200 km/h",
        acceleration: "0–100 km/h in 9.2s",
        dimensions: "4745 × 1860 × 1745 mm",
        seating: "7 seats",
        features: [
          "24.6-inch dual curved display",
          "Sony 8-speaker audio",
          "Panoramic sunroof",
          "Dual-zone climate",
          "360° surround camera",
        ],
      }),
      featured: true,
    },
    {
      slug: "gac-gs8",
      name: "GAC GS8",
      brandSlug: "gac",
      categoryId: suv.id,
      energyType: "HYBRID",
      bodyType: "SUV",
      priceUsd: 33800,
      image: "https://sfile.chatglm.cn/images-ppt/fbf0d0269062.jpg",
      gallery: "[]",
      excerpt:
        "Full-size 7-seat hybrid SUV with 2.0L THS hybrid system, Toyota-derived technology and commanding presence.",
      description:
        "The GAC GS8 pairs a 2.0-litre engine with the fourth-generation Toyota Hybrid System (THS) to deliver refined performance and fuel economy in a full-size seven-seat package. Its commanding stance and premium cabin make it an ideal flagship for fleet operators and large families alike.",
      specs: JSON.stringify({
        engine: "2.0L Turbo + THS Hybrid",
        transmission: "E-CVT planetary",
        battery: "NiMH hybrid battery",
        range: "1050 km (combined)",
        horsepower: "248 hp (combined)",
        topSpeed: "190 km/h",
        acceleration: "0–100 km/h in 8.5s",
        dimensions: "4980 × 1950 × 1780 mm",
        seating: "7 seats",
        features: [
          "14.6-inch centre display",
          "Adaptive air suspension (top trim)",
          "Toyota Hybrid System technology",
          "Three-zone climate",
          "Alcantara headliner",
        ],
      }),
      featured: true,
    },
    {
      slug: "zeekr-001",
      name: "Zeekr 001",
      brandSlug: "zeekr",
      categoryId: coupe.id,
      energyType: "EV",
      bodyType: "COUPE",
      priceUsd: 47200,
      image: "https://sfile.chatglm.cn/images-ppt/db1983ffbba4.jpg",
      gallery: "[]",
      excerpt:
        "Luxury electric shooting brake on the SEA platform — 544 hp, 1032 km range and a 0–100 of 3.8s.",
      description:
        "The Zeekr 001 is a premium electric shooting brake built on Geely's Sustainable Experience Architecture. With up to 544 horsepower, all-wheel drive and a long-range battery option delivering over 1,000 km CLTC, it redefines the grand-tourer segment for the electric era. The cabin blends sustainable materials with performance-oriented ergonomics.",
      specs: JSON.stringify({
        engine: "Dual Permanent Magnet Motors (AWD)",
        transmission: "Single-speed reduction gear",
        battery: "100 kWh Qilin (CATL)",
        range: "1032 km (CLTC, long-range)",
        horsepower: "544 hp (400 kW)",
        topSpeed: "200 km/h",
        acceleration: "0–100 km/h in 3.8s",
        dimensions: "4970 × 1999 × 1560 mm",
        seating: "5 seats",
        features: [
          "15.05-inch OLED centre display",
          "Yamaha 28-speaker audio",
          "Adaptive air suspension",
          "Race-track mode",
          "800V high-voltage architecture",
        ],
      }),
      featured: true,
    },
    {
      slug: "hongqi-h9",
      name: "Hongqi H9",
      brandSlug: "hongqi",
      categoryId: sedan.id,
      energyType: "PETROL",
      bodyType: "SEDAN",
      priceUsd: 52500,
      image: "https://sfile.chatglm.cn/images-ppt/2de1abd6dc2b.jpg",
      gallery: "[]",
      excerpt:
        "Flagship luxury saloon with supercharged 3.0L V6, rear-seat executive cabin and hand-finished detail.",
      description:
        "The Hongqi H9 is China's flagship luxury saloon, blending a supercharged 3.0-litre V6 with a chauffeur-grade rear cabin. Hand-finished wood, quilted leather and an air-sprung chassis deliver a limousine experience that rivals established European marques — at a distinctly competitive landed price.",
      specs: JSON.stringify({
        engine: "3.0L Supercharged V6",
        transmission: "7-speed wet dual-clutch",
        battery: "12V",
        range: "720 km (combined cycle)",
        horsepower: "272 hp (208 kW)",
        topSpeed: "245 km/h",
        acceleration: "0–100 km/h in 7.1s",
        dimensions: "5137 × 1904 × 1493 mm",
        seating: "5 seats",
        features: [
          "Air suspension with CDC",
          "Rear executive reclining seats",
          "Bose 12-speaker audio",
          "Quad-zone climate",
          "Moonlight welcome lighting",
        ],
      }),
      featured: true,
    },
    {
      slug: "haval-h6",
      name: "Haval H6",
      brandSlug: "haval",
      categoryId: suv.id,
      energyType: "HYBRID",
      bodyType: "SUV",
      priceUsd: 21900,
      image: "https://sfile.chatglm.cn/images-ppt/66cf8f5e59d3.jpg",
      gallery: "[]",
      excerpt:
        "Best-selling Chinese SUV globally, now with HEV powertrain, 1100 km range and proven durability.",
      description:
        "The Haval H6 is the best-selling Chinese SUV of all time and a fixture of export fleets. The hybrid variant combines a 1.5-litre engine with a dedicated hybrid transmission for exceptional fuel economy and a combined range exceeding 1,100 kilometres — ideal for markets with long intercity distances.",
      specs: JSON.stringify({
        engine: "1.5L + Dedicated Hybrid Transmission",
        transmission: "DHT 2-speed hybrid",
        battery: "Lithium-ion HEV pack",
        range: "1100 km (combined)",
        horsepower: "243 hp (combined)",
        topSpeed: "190 km/h",
        acceleration: "0–100 km/h in 7.6s",
        dimensions: "4653 × 1886 × 1730 mm",
        seating: "5 seats",
        features: [
          "10.25 + 12.3-inch dual display",
          "Infinity audio system",
          "Level 2 driver assistance",
          "Wireless phone charging",
          "Panoramic sunroof",
        ],
      }),
      featured: false,
    },
    {
      slug: "jetour-dashing",
      name: "Jetour Dashing",
      brandSlug: "jetour",
      categoryId: suv.id,
      energyType: "PETROL",
      bodyType: "SUV",
      priceUsd: 18900,
      image: "https://sfile.chatglm.cn/images-ppt/2ddf9e28ffce.jpg",
      gallery: "[]",
      excerpt:
        "Youth-oriented crossover with bold styling, 1.5L turbo and a fully digital connected cockpit.",
      description:
        "The Jetour Dashing is a bold compact crossover aimed at younger buyers. A 1.5-litre turbocharged engine delivers 156 horsepower, while the angular design, dual-screen cockpit and connected services give it a distinctly modern character at an aggressive price point.",
      specs: JSON.stringify({
        engine: "1.5L Turbocharged TGDI",
        transmission: "6-speed wet dual-clutch",
        battery: "12V",
        range: "820 km (combined cycle)",
        horsepower: "156 hp (115 kW)",
        topSpeed: "185 km/h",
        acceleration: "0–100 km/h in 9.3s",
        dimensions: "4590 × 1900 × 1685 mm",
        seating: "5 seats",
        features: [
          "Dual 10.25-inch displays",
          "AI voice assistant",
          "Sport seats with red stitching",
          "Wireless CarPlay / Android Auto",
          "360° camera",
        ],
      }),
      featured: false,
    },
    {
      slug: "mg-4-ev",
      name: "MG 4 EV",
      brandSlug: "mg",
      categoryId: coupe.id,
      energyType: "EV",
      bodyType: "COUPE",
      priceUsd: 26500,
      image: "https://sfile.chatglm.cn/images-ppt/543cea326ce6.png",
      gallery: "[]",
      excerpt:
        "Rear-wheel-drive electric hatchback on MSP platform — 520 km range and 50:50 weight distribution.",
      description:
        "The MG 4 EV is a rear-wheel-drive electric hatchback built on SAIC's Modular Scalable Platform. With up to 520 km of WLTP range, 50:50 weight distribution and sharp rear-drive dynamics, it has rapidly become one of Europe and the Middle East's best-value electric vehicles.",
      specs: JSON.stringify({
        engine: "Rear Permanent Magnet Motor",
        transmission: "Single-speed reduction gear",
        battery: "77 kWh lithium-ion",
        range: "520 km (WLTP)",
        horsepower: "243 hp (180 kW)",
        topSpeed: "180 km/h",
        acceleration: "0–100 km/h in 6.5s",
        dimensions: "4287 × 1836 × 1516 mm",
        seating: "5 seats",
        features: [
          "10.25-inch digital cockpit",
          "Vehicle-to-Load (V2L)",
          "MG Pilot advanced driver assistance",
          "Rear-wheel drive",
          "Wireless smartphone charging",
        ],
      }),
      featured: false,
    },
    {
      slug: "changan-cs75-plus",
      name: "Changan CS75 Plus",
      brandSlug: "changan",
      categoryId: suv.id,
      energyType: "PETROL",
      bodyType: "SUV",
      priceUsd: 20300,
      image: "https://sfile.chatglm.cn/images-ppt/d66868b5cbb7.jpg",
      gallery: "[]",
      excerpt:
        "Best-selling compact SUV with 1.5L turbo, Blue Core powertrain and a tech-forward cabin.",
      description:
        "The Changan CS75 Plus is a perennial best-seller in China's compact SUV segment, powered by the Blue Core 1.5-litre turbocharged engine. Its tech-forward cabin, generous equipment list and proven reliability make it a favourite among value-conscious export buyers.",
      specs: JSON.stringify({
        engine: "1.5L Blue Core Turbo TGDI",
        transmission: "8-speed automatic",
        battery: "12V",
        range: "810 km (combined cycle)",
        horsepower: "188 hp (138 kW)",
        topSpeed: "200 km/h",
        acceleration: "0–100 km/h in 9.0s",
        dimensions: "4690 × 1865 × 1710 mm",
        seating: "5 seats",
        features: [
          "Dual 12.3-inch displays",
          "Panoramic sunroof",
          "Adaptive cruise control",
          "Wireless charging",
          "Ambient 64-colour lighting",
        ],
      }),
      featured: false,
    },
    {
      slug: "dongfeng-rich-6-ev",
      name: "Dongfeng Rich 6 EV",
      brandSlug: "dongfeng",
      categoryId: pickup.id,
      energyType: "EV",
      bodyType: "PICKUP",
      priceUsd: 29800,
      image: "https://sfile.chatglm.cn/images-ppt/fbf0d0269062.jpg",
      gallery: "[]",
      excerpt:
        "Electric pickup with 1-tonne payload, 4WD option and 400 km range for commercial fleets.",
      description:
        "The Dongfeng Rich 6 EV is an electric pickup engineered for commercial fleets and infrastructure projects. With a one-tonne payload, optional four-wheel drive and a 400-kilometre range, it offers a low operating-cost alternative to diesel work trucks across agriculture, construction and utilities.",
      specs: JSON.stringify({
        engine: "Permanent Magnet Synchronous Motor",
        transmission: "Single-speed reduction gear",
        battery: "68 kWh LFP",
        range: "400 km (NEDC)",
        horsepower: "161 hp (120 kW)",
        topSpeed: "120 km/h",
        acceleration: "0–100 km/h in 12s",
        dimensions: "5285 × 1860 × 1780 mm",
        seating: "5 seats",
        features: [
          "1,020 kg payload",
          "Optional 4WD",
          "Vehicle-to-Load output",
          "Reinforced cargo bed",
          "Fleet telematics ready",
        ],
      }),
      featured: false,
    },
  ];

  for (const v of vehiclesData) {
    await db.vehicle.create({
      data: {
        slug: v.slug,
        name: v.name,
        brandId: brandMap[v.brandSlug].id,
        categoryId: v.categoryId,
        energyType: v.energyType,
        bodyType: v.bodyType,
        priceUsd: v.priceUsd,
        image: v.image,
        gallery: v.gallery,
        excerpt: v.excerpt,
        description: v.description,
        specs: v.specs,
        featured: v.featured,
        published: true,
      },
    });
  }
  console.log(`  ✓ ${vehiclesData.length} vehicles`);

  // ── Shipping Routes ─────────────────────────────────────────
  const routes = [
    {
      originPort: "Shanghai",
      destinationPort: "Djendjen",
      destinationCountry: "Algeria",
      transitDays: 28,
      incoterms: ["FOB", "CIF"],
      frequency: "Bi-weekly",
      notes: "Primary route for consignees in eastern Algeria; berth at Djendjen avoids Algiers congestion.",
    },
    {
      originPort: "Shanghai",
      destinationPort: "Algiers",
      destinationCountry: "Algeria",
      transitDays: 30,
      incoterms: ["FOB", "CIF"],
      frequency: "Weekly",
      notes: "Direct mainline service to the Port of Algiers; best for consignees in the north-central region.",
    },
    {
      originPort: "Shenzhen",
      destinationPort: "Djendjen",
      destinationCountry: "Algeria",
      transitDays: 32,
      incoterms: ["FOB", "CIF"],
      frequency: "Monthly",
      notes: "Suitable for southern China factory origins; consolidates at Yantian terminal.",
    },
    {
      originPort: "Nansha",
      destinationPort: "Algiers",
      destinationCountry: "Algeria",
      transitDays: 33,
      incoterms: ["FOB", "CIF"],
      frequency: "Monthly",
      notes: "Preferred for Guangzhou-area OEMs; roll-on/roll-off and container options available.",
    },
    {
      originPort: "Ningbo",
      destinationPort: "Djendjen",
      destinationCountry: "Algeria",
      transitDays: 30,
      incoterms: ["FOB", "CIF"],
      frequency: "Bi-weekly",
      notes: "Strong service for Zhejiang-based brands; competitive freight rates.",
    },
    {
      originPort: "Shanghai",
      destinationPort: "Tangier Med",
      destinationCountry: "Morocco",
      transitDays: 26,
      incoterms: ["FOB", "CIF"],
      frequency: "Weekly",
      notes: "Transhipment hub for North and West Africa; onward trucking to Algeria available.",
    },
  ];
  for (const r of routes) {
    await db.shippingRoute.create({
      data: {
        originPort: r.originPort,
        originCountry: "China",
        destinationPort: r.destinationPort,
        destinationCountry: r.destinationCountry,
        transitDays: r.transitDays,
        incoterms: JSON.stringify(r.incoterms),
        frequency: r.frequency,
        notes: r.notes,
      },
    });
  }
  console.log(`  ✓ ${routes.length} shipping routes`);

  // ── Testimonials ────────────────────────────────────────────
  const testimonials = [
    {
      name: "Karim Belkacem",
      company: "Atlas Motors Distribution",
      country: "Algeria",
      rating: 5,
      quote:
        "Orient Auto Export handled our 40-unit BYD order end to end — from proforma invoice to customs clearance at Djendjen. The documentation was flawless and the lead time matched the quote exactly.",
    },
    {
      name: "Yacine Brahimi",
      company: "Sahara Fleet Solutions",
      country: "Algeria",
      rating: 5,
      quote:
        "As a fleet operator, transparency on Incoterms and shipping costs matters more than anything. The CIF quotation we received left nothing to interpretation. We have since placed three repeat orders.",
    },
    {
      name: "Mohamed Larbi",
      company: "Maghreb Auto Imports",
      country: "Tunisia",
      rating: 5,
      quote:
        "Their team understands North African import regulations inside out. They flagged a documentation issue before it became a customs problem, saving us weeks at the port.",
    },
    {
      name: "Amine Khelifi",
      company: "Individual Buyer",
      country: "Algeria",
      rating: 5,
      quote:
        "I was nervous about importing a single vehicle privately, but the step-by-step guidance and the secure payment structure gave me complete confidence. The Zeekr arrived exactly as photographed.",
    },
    {
      name: "Fatima Zohra",
      company: "Oran EV Rentals",
      country: "Algeria",
      rating: 5,
      quote:
        "We built our rental fleet entirely with Orient Auto Export. Their after-sales support on spare parts and warranty documentation has been exceptional throughout.",
    },
  ];
  for (const t of testimonials) {
    await db.testimonial.create({ data: t });
  }
  console.log(`  ✓ ${testimonials.length} testimonials`);

  // ── FAQs ────────────────────────────────────────────────────
  const faqs = [
    {
      category: "General",
      question: "What does Orient Auto Export do?",
      answer:
        "Orient Auto Export is a Hong Kong registered automobile trading company specialising in the export of brand-new Chinese vehicles — electric, hybrid and petrol — to Algeria and the wider North African region. We act as the single counterparty between Chinese manufacturers and overseas buyers, managing sourcing, quality inspection, documentation, shipping and customs.",
      order: 1,
    },
    {
      category: "General",
      question: "Are the vehicles brand-new and original?",
      answer:
        "Yes. Every vehicle we supply is sourced directly from the manufacturer or an authorised distributor and is delivered with the original manufacturer certificate of origin, invoice and warranty documentation. We do not trade in used or reconditioned vehicles.",
      order: 2,
    },
    {
      category: "Import",
      question: "What documents are required to import a vehicle into Algeria?",
      answer:
        "Standard documentation typically includes the manufacturer's invoice, certificate of origin, bill of lading, packing list, insurance certificate and the relevant import authorisation issued by the Algerian authorities. We prepare and verify the full export documentation pack, though final import clearance and any duties remain the responsibility of the consignee in line with local regulations.",
      order: 3,
    },
    {
      category: "Import",
      question: "How long does the full import process take?",
      answer:
        "From order confirmation to arrival at port, the typical timeline is 6 to 10 weeks. This comprises 2 to 4 weeks for production and pre-shipment inspection, 4 to 5 weeks for ocean freight from China to Algeria, plus customs and delivery depending on the consignee's arrangements.",
      order: 4,
    },
    {
      category: "Payment",
      question: "Which payment methods do you accept?",
      answer:
        "We support international telegraphic transfer (T/T) and documentary letters of credit (L/C) issued by verified banks. Payment terms are structured in stages — typically a deposit with the proforma invoice and the balance against shipping documents — and are confirmed in writing on every quotation.",
      order: 5,
    },
    {
      category: "Payment",
      question: "Is my payment protected?",
      answer:
        "All transactions are conducted between verified bank accounts in the name of the Hong Kong registered company. For letters of credit, funds are released only against compliant shipping documents reviewed by the issuing and advising banks. We never request payment to personal or unverified accounts.",
      order: 6,
    },
    {
      category: "Shipping",
      question: "Which Incoterms do you offer?",
      answer:
        "We quote under FOB (Free On Board) for buyers who manage their own freight, and CIF (Cost, Insurance and Freight) for buyers who prefer a delivered-to-port price. Both options are itemised transparently on every quotation so the total landed cost is clear before you commit.",
      order: 7,
    },
    {
      category: "Shipping",
      question: "Which Chinese ports do you ship from?",
      answer:
        "Our primary departure ports are Shanghai, Shenzhen (Yantian), Nansha and Ningbo. The most suitable port depends on the manufacturing origin of the vehicle and the destination port in Algeria — typically Djendjen or Algiers.",
      order: 8,
    },
    {
      category: "Compliance",
      question: "How do you ensure trade compliance and AML/KYC standards?",
      answer:
        "As a Hong Kong registered entity we operate under applicable trade, sanctions and anti-money-laundering regulations. We perform customer due diligence on all counterparties, screen transactions against published sanctions lists and retain documentation in line with record-keeping requirements. Specific banking and customs outcomes remain subject to the policies of the relevant institutions.",
      order: 9,
    },
    {
      category: "Compliance",
      question: "Do you provide a warranty on exported vehicles?",
      answer:
        "Vehicles are supplied with the original manufacturer warranty as applicable in the destination market. We facilitate warranty registration and provide the supporting documentation, though warranty execution is governed by the manufacturer's terms and the local service network.",
      order: 10,
    },
  ];
  for (const f of faqs) {
    await db.fAQ.create({ data: f });
  }
  console.log(`  ✓ ${faqs.length} FAQs`);

  // ── Articles ────────────────────────────────────────────────
  const articles = [
    {
      slug: "guide-importing-chinese-vehicles-algeria",
      title: "The Complete Guide to Importing Chinese Vehicles into Algeria in 2025",
      excerpt:
        "A practical walkthrough of every stage — from selecting the right model and confirming a proforma invoice to navigating Algerian customs and registering your vehicle.",
      content:
        "Importing a brand-new Chinese vehicle into Algeria is a structured process that rewards preparation. This guide covers brand selection, the role of Incoterms, the documentation pack required at Djendjen and Algiers, and how to budget for the full landed cost — not just the factory price.",
      category: "Guides",
      tags: JSON.stringify(["Algeria", "Import", "Guide"]),
      coverImage: "/images/hero.png",
    },
    {
      slug: "ev-vs-hybrid-north-africa",
      title: "Electric vs Hybrid: Which Powertrain Makes Sense for North Africa?",
      excerpt:
        "Charging infrastructure, fuel prices and duty structures all influence the real-world economics of EV versus hybrid ownership across the Maghreb.",
      content:
        "The choice between a battery-electric vehicle and a hybrid depends on far more than range. We compare the total cost of ownership, charging availability, and resale value across Algeria, Tunisia and Morocco to help buyers make an informed decision.",
      category: "Vehicle Reviews",
      tags: JSON.stringify(["EV", "Hybrid", "North Africa"]),
      coverImage: "/images/vehicle-byd-han.png",
    },
    {
      slug: "understanding-incoterms-fob-cif",
      title: "Understanding Incoterms: FOB vs CIF for Vehicle Imports",
      excerpt:
        "The difference between FOB and CIF can shift your landed cost by thousands of dollars. Here is what each term really covers.",
      content:
        "Incoterms define who pays for what in an international shipment. We break down the responsibilities, cost components and risk transfer points for FOB and CIF — and explain when each is the smarter choice for a North African importer.",
      category: "Import Regulations",
      tags: JSON.stringify(["Incoterms", "Shipping", "Trade"]),
      coverImage: "/images/shipping-port.png",
    },
    {
      slug: "byd-blade-battery-explained",
      title: "BYD Blade Battery: Why LFP Chemistry Matters for Hot Climates",
      excerpt:
        "The Blade Battery's lithium iron phosphate chemistry offers thermal stability that is particularly relevant for vehicles operating in high-temperature regions.",
      content:
        "Heat is one of the most demanding factors for an EV battery. We examine why BYD's LFP Blade Battery architecture is well suited to North African operating conditions, and what it means for longevity and safety.",
      category: "Vehicle Reviews",
      tags: JSON.stringify(["BYD", "Battery", "EV"]),
      coverImage: "/images/vehicle-byd-atto3.png",
    },
    {
      slug: "shipping-routes-china-algeria",
      title: "Shanghai to Djendjen: Inside the China–Algeria Shipping Corridor",
      excerpt:
        "A look at the main ocean-freight routes, transit times and port considerations when shipping vehicles from China to Algeria.",
      content:
        "The China–Algeria shipping corridor is served by several mainline services. We compare the practical trade-offs of arriving at Djendjen versus Algiers, and how port choice affects customs clearance speed.",
      category: "News",
      tags: JSON.stringify(["Shipping", "Ports", "Logistics"]),
      coverImage: "/images/shipping-port.png",
    },
    {
      slug: "hong-kong-trading-company-advantages",
      title: "Why a Hong Kong Trading Company Adds Value to Your Import",
      excerpt:
        "From a transparent legal framework to internationally recognised banking, Hong Kong incorporation brings tangible benefits to cross-border vehicle trade.",
      content:
        "Partnering with a Hong Kong registered trading company offers buyers a layer of legal and financial transparency. We explain how this structure supports secure payments, dispute resolution and credible corporate governance.",
      category: "Import Regulations",
      tags: JSON.stringify(["Hong Kong", "Compliance", "Trade"]),
      coverImage: "/images/og-cover.png",
    },
  ];
  for (const a of articles) {
    await db.article.create({ data: a });
  }
  console.log(`  ✓ ${articles.length} articles`);

  // ── Admin user (demo) ───────────────────────────────────────
  await db.user.upsert({
    where: { email: "admin@orientautoexport.com" },
    update: {},
    create: {
      email: "admin@orientautoexport.com",
      name: "Platform Administrator",
      role: "ADMIN",
    },
  });
  console.log("  ✓ admin user");

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

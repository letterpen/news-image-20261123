// stories.ts — the day's news, researched from live reporting on Monday
// 23 November 2026 (morning WIB). Every story carries its source and a
// CONFIRMED / REPORTED tag. Only events that happened or were first reported
// on 23 November 2026 in some time zone, or that head the 23 Nov news cycle.

export interface Hero {
  n: number;
  kicker: string; // region + topic, shown above the scene
  label: string; // big in-scene banner headline (one line, short)
  headline: string; // second headline line under the scene
  summary: string;
  source: string;
  tag: string;
}

export interface Mid {
  n: number;
  banner: string; // red banner label, short category word
  headline: string;
  summary: string;
  source: string;
  tag: string;
}

export interface Brief {
  n: number;
  text: string;
  source: string;
}

export const HEROES: Hero[] = [
  {
    n: 1,
    kicker: "CLIMATE - ANTALYA, TURKIYE",
    label: "COP31 COLLAPSES",
    headline: "NO DEAL ON FOSSIL FUELS",
    summary:
      "TWO WEEKS OF TALKS END WITH NO PACT. THE EU AND UK REJECT A TEXT WITH NO FOSSIL FUELS. LONGEST COP EVER.",
    source: "CNN + AP + THE TIMES",
    tag: "CONFIRMED",
  },
  {
    n: 2,
    kicker: "WAR - THE GULF",
    label: "GULF WAR GROWS",
    headline: "HOUTHIS HIT SAUDI REFINERY",
    summary:
      "HOUTHIS CLAIM STRIKES ON THE RABIGH REFINERY AND A RIYADH RADAR. IRAN HITS BAHRAIN, WOUNDING 2.",
    source: "AFP + INDIAN EXPRESS",
    tag: "CONFIRMED",
  },
  {
    n: 3,
    kicker: "POLITICS - WASHINGTON",
    label: "DEMS WIN 258",
    headline: "BIGGEST HOUSE MAJORITY SINCE 1992",
    summary:
      "AP CALLS N. CAROLINA FOR HUBBARD OVER FOXX. DEMOCRATS GAIN 44 SEATS. JEFFRIES SET TO BE SPEAKER.",
    source: "AP + REUTERS",
    tag: "CONFIRMED",
  },
];

export const MIDS: Mid[] = [
  {
    n: 4, banner: "SPORT", headline: "LIVERPOOL 4-0 UNITED",
    summary: "POCHETTINO'S DEBUT IN RUINS. YORO OFF AFTER 8 MINUTES.",
    source: "REUTERS", tag: "CONFIRMED",
  },
  {
    n: 5, banner: "DISASTER", headline: "FACTORY FIRE",
    summary: "3 DEAD, 36+ MISSING. 24 BODY BAGS FOUND. SEARCH BACK AT 7AM.",
    source: "AP", tag: "CONFIRMED",
  },
  {
    n: 6, banner: "DIPLOMACY", headline: "NEPAL PM IN DELHI",
    summary: "TALKS ON ENERGY, ROADS AND TECH ON A TWO-DAY STATE VISIT.",
    source: "OBSERVER", tag: "REPORTED",
  },
  {
    n: 7, banner: "EDUCATION", headline: "MINISTER QUITS",
    summary: "EDUCATION CHIEF RESIGNS OVER AI EXAM CHEATING.",
    source: "KIMKJ", tag: "REPORTED",
  },
  {
    n: 8, banner: "POLITICS", headline: "ISRAEL TALKS FAIL",
    summary: "NO DEAL ON FORMING A GOVERNMENT AFTER TALKS END.",
    source: "THE HINDU", tag: "CONFIRMED",
  },
  {
    n: 9, banner: "WAR", headline: "SHIP STILL BURNING",
    summary: "CARGO SHIP ABLAZE OFF FINLAND AFTER AN ATTACK.",
    source: "AFP", tag: "REPORTED",
  },
  {
    n: 10, banner: "WAR", headline: "14 MISSING IN KYIV",
    summary: "DRONE HITS A BUILDING. AT LEAST 14 UNACCOUNTED FOR.",
    source: "AFP", tag: "CONFIRMED",
  },
  {
    n: 11, banner: "PROTEST", headline: "LISBON MARCHES",
    summary: "THOUSANDS MARCH AS LIVING COSTS FUEL ANGER.",
    source: "JAGRAN", tag: "REPORTED",
  },
  {
    n: 12, banner: "AFRICA", headline: "24 DEAD IN S. SUDAN",
    summary: "FRESH VIOLENCE IN JUBA LEAVES 24 CIVILIANS DEAD.",
    source: "AFP", tag: "CONFIRMED",
  },
  {
    n: 13, banner: "AFRICA", headline: "DRONES HIT KHARTOUM",
    summary: "STRIKES HIT HOMES AND A UN BUILDING IN THE CAPITAL.",
    source: "AFP", tag: "CONFIRMED",
  },
];

export const BRIEFS: Brief[] = [
  { n: 14, text: "ICE DETAIN FATHER AND DAUGHTER AT SEATTLE AIRPORT", source: "THE HINDU" },
  { n: 15, text: "CHESS: SINDAROV TAKES WHITE FOR GAME 1 ON TUESDAY IN GENEVA", source: "CHESS.COM" },
  { n: 16, text: "INDIA POST RECORD 720/9D IN WELLINGTON TEST", source: "OBSERVER VOICE" },
  { n: 17, text: "TATA STEEL SELLS TUBES ARM IN RS 28,000 CRORE DEAL", source: "OBSERVER VOICE" },
  { n: 18, text: "MYANMAR JUNTA CALLS ASEAN DECISION 'UNFAIR'", source: "JAGRAN JOSH" },
  { n: 19, text: "35 FULANIS KILLED IN REVENGE ATTACKS IN NIGERIA", source: "AFP" },
  { n: 20, text: "WHO CHIEF PLEADS FOR PEACE IN EBOLA-HIT DR CONGO AREA", source: "AFP" },
  { n: 21, text: "NATIONS TO KEEP TALKING ON LETHAL AI WEAPONS AT THE UN", source: "SALONVISION" },
  { n: 22, text: "OPENROUTER EXPELS 3 PROVIDERS, STRIPS 125 ENDPOINTS", source: "KIMKJ" },
  { n: 23, text: "US SEEKS ANSWERS ON NVIDIA CHIP SALES TO CHINA", source: "ARAB NEWS" },
  { n: 24, text: "PAKISTAN FM SEEKS INDIA'S INVITE FOR INDUS TALKS", source: "NEW INDIAN EXPRESS" },
  { n: 25, text: "UKMTO REPORTS TANKER INCIDENT WITH MILITARY FORCES OFF OMAN", source: "ARAB NEWS" },
  { n: 27, text: "RESTORED OKINAWA CASTLE TO REOPEN WITH NEW FIRE SAFETY", source: "NIKKEI ASIA" },
  { n: 28, text: "HELLO KITTY OWNER SANRIO BETS ON GAMES TO GROW ABROAD", source: "NIKKEI ASIA" },
  { n: 29, text: "BOLSONARO 'STABLE' IN INTENSIVE CARE, SAY DOCTORS", source: "AFP" },
  { n: 30, text: "POLAND SAYS THREE RUSSIAN MISSILES HIT ON FRIDAY", source: "AFP" },
  { n: 31, text: "RAJYA SABHA MP WADKUTE DIES OF CARDIAC ARREST IN DELHI", source: "JAGRAN JOSH" },
  { n: 32, text: "9 PILGRIMS KILLED AS VEHICLE HITS TRUCK IN KOTA, RAJASTHAN", source: "JAGRAN JOSH" },
  { n: 35, text: "UN URGES PROBE INTO BENGHAZI ATTACKS, WARNS LIBYA", source: "TRENDMONEY" },
  { n: 36, text: "JAPAN AGENCY BACKS US METAL RECYCLING STARTUP", source: "NIKKEI ASIA" },
  { n: 37, text: "MINISTER CALLS SETTLER VIOLENCE 'JEWISH TERRORISM'", source: "SALONVISION" },
  { n: 38, text: "ALBANESE: COP31 FAILURE A SIGN OF 'DIFFICULT GEOPOLITICAL TIMES'", source: "AFP" },
];

export const TOTAL_STORIES = HEROES.length + MIDS.length + BRIEFS.length; // 38

export const STATS: Array<{ big: string; label: string }> = [
  { big: "258", label: "BIGGEST DEM HOUSE WIN SINCE 1992" },
  { big: "194", label: "NATIONS AT COP31: NO DEAL" },
  { big: "4-0", label: "LIVERPOOL ROUT UNITED AT ANFIELD" },
  { big: "36+", label: "MISSING IN BANTEN FACTORY FIRE" },
  { big: "24", label: "CIVILIANS KILLED IN SOUTH SUDAN" },
  { big: "2", label: "WOUNDED IN IRAN STRIKE ON BAHRAIN" },
];

export const REGIONS: Array<{ name: string; color: number }> = [
  { name: "NORTH AMERICA", color: 0x1f4e79 },
  { name: "SOUTH AMERICA", color: 0x2e7d32 },
  { name: "EUROPE", color: 0x6a1b9a },
  { name: "AFRICA", color: 0xbf6a00 },
  { name: "MIDDLE EAST", color: 0xc8102e },
  { name: "SOUTH ASIA", color: 0x0e5a5a },
  { name: "EAST ASIA", color: 0x8d1a1a },
  { name: "SE ASIA", color: 0x3f6b2a },
  { name: "OCEANIA", color: 0x005f73 },
];

export const DATE_CHECK_LEFT =
  "N. KOREA'S KIM - 'CHAPO ISIDRO' HELD (21 NOV) - CALIFORNIA SHOOTING (21 NOV)";
export const DATE_CHECK_NEXT =
  "FIDE GAME 1 - TUESDAY 24 NOV - COP31 FOLLOW-UP DATE - US RESPONSE TO GULF STRIKES";

// Map pins: story number -> [lon, lat]
export const PINS: Array<{ n: number; lon: number; lat: number }> = [
  { n: 1, lon: 30.7, lat: 36.9 },   // Antalya
  { n: 2, lon: 44.0, lat: 25.0 },   // Saudi / Bahrain
  { n: 3, lon: -77.0, lat: 38.9 },  // Washington
  { n: 4, lon: -3.0, lat: 53.4 },   // Liverpool
  { n: 5, lon: 106.1, lat: -6.1 },  // Serang, Banten
  { n: 6, lon: 77.2, lat: 28.6 },   // Delhi
  { n: 7, lon: 127.0, lat: 37.5 },  // Seoul
  { n: 9, lon: 20.0, lat: 61.0 },   // Gulf of Finland (offset west so the pin clears Kyiv)
  { n: 10, lon: 30.5, lat: 50.4 },  // Kyiv
  { n: 11, lon: -9.1, lat: 38.7 },  // Lisbon
  { n: 12, lon: 31.6, lat: 4.9 },   // Juba
  { n: 13, lon: 32.5, lat: 15.6 },  // Khartoum
  { n: 38, lon: 149.1, lat: -35.3 },// Canberra
];

export type StatKey = "pac" | "sho" | "pas" | "dri" | "def" | "phy";
export type Stats = Record<StatKey, number>;
export type Profile = Record<StatKey, number>;

export type Finish = "bronze" | "silver" | "gold" | "totw" | "toty" | "icon" | "founder";
export type Position = "ST" | "RW" | "CAM" | "CM" | "CDM" | "CB";
export type Family = "Forward" | "Playmaker" | "Anchor";

export interface Signals {
  login: string;
  name: string;
  avatarUrl: string;
  location: string | null;
  followers: number;
  account_age_years: number;
  public_repos: number;
  total_stars_owned: number;
  max_repo_stars: number;
  languages: number; // count of distinct primary languages
  // Primary languages ranked by repo count (desc); rankedLanguages[0] is the
  // most-used. Optional so hand-authored sample Signals stay valid.
  rankedLanguages?: string[];
  topLanguage?: string | null;
  recent_contributions: number;
  active_days_recent: number;
  active_years: number;
  total_contributions_lifetime: number;
  prs_to_others: number;
  reviews: number;
  issues_closed: number;
  recent_commits: number;
  recent_spike: boolean;
}

export type WorkRateLevel = "High" | "Med" | "Low";

/** One-word read of recent activity cadence (see CADENCE in copy/ui). */
export type CadenceStyle =
  | "Explosive"
  | "Relentless"
  | "Controlled"
  | "Clinical"
  | "Industrious"
  | "Measured";

export interface Playstyle {
  name: string;
  icon: string; // lucide icon key, resolved in the UI (keeps core framework-agnostic)
  plus: boolean; // elite "PlayStyle+" tier
  reason: string; // short, plain why-it-was-given (tooltip)
}

export interface Metric {
  label: string;
  value: number; // real GitHub count
  unit?: string; // optional noun for the raw value, e.g. "stars"
  score: number; // 0–99 normalization of value
}

export interface Report {
  skillMoves: number; // 1–5
  weakFoot: number; // 1–5
  workRate: { attack: WorkRateLevel; defense: WorkRateLevel };
  style: CadenceStyle;
  // short, plain explanations for the always-shown attributes (tooltips)
  reasons: { skillMoves: string; weakFoot: string; workRate: string; style: string };
  playstyles: Playstyle[];
  metrics: Metric[];
}

export interface Archetype {
  name: string;
  blurb: string;
}

/** Optional product overlay (e.g. GitFut founder credit). Injected via BuildCardOptions. */
export interface FounderMeta {
  art: string; // root-relative card PNG, e.g. "/cards/founder-red.png"
  accent: string; // hex; drives the badge, pill, glow and OG accent
  ink?: string; // optional card text color override (defaults to near-white)
  label: string; // badge/pill text, e.g. "GITFUT"
  tagline: string; // tooltip + flavor, e.g. "Founder of GitFut"
}

export interface LanguageLogo {
  name: string;
  slug: string;
}

/**
 * Product enrichments for {@link buildCard}. Pure ranking never needs these;
 * hosts like Gitwork pass country, logos, and founder overrides.
 */
export interface BuildCardOptions {
  /** ISO country code / asset key; default "". */
  country?: string;
  /** Catalog logo for the top language; default null. */
  languageLogo?: LanguageLogo | null;
  /** Lowercase login → founder meta. */
  founders?: Record<string, FounderMeta>;
  /** Lowercase login → forced overall (used with founders). */
  founderOverall?: Record<string, number>;
}

export interface Card {
  login: string;
  name: string;
  avatarUrl: string;
  // country & club are asset keys (e.g. public/badges/...), defaulted now and
  // meant to be user-editable later.
  country: string;
  club: string;
  stats: Stats;
  position: Position;
  family: Family;
  baseOVR: number;
  overall: number;
  finish: Finish;
  finishLabel: string;
  archetype: string;
  archetypeBlurb: string;
  legacy: { L: number };
  // Most-used language (by repo count) and its resolved catalog logo. topLanguage
  // is their true #1 even when it has no logo; languageLogo is the first ranked
  // language that does (the fallback walk), or null if none are in the catalog.
  // Both optional so previously serialized cards (localStorage) stay valid.
  topLanguage?: string | null;
  /** Primary languages by repo count (desc); used for soft language filters. */
  rankedLanguages?: string[];
  languageLogo?: LanguageLogo | null;
  // Set only when BuildCardOptions.founders matches - bespoke art/accent metadata.
  founder?: FounderMeta;
  report: Report;
}

import type { Family, StatKey, Stats } from "../types";

export const STATS: StatKey[] = ["pac", "sho", "pas", "dri", "def", "phy"];

/** Attacking/technical four - pulled toward their group mean after the spike. */
export const ATTACK_STATS: StatKey[] = ["pac", "sho", "pas", "dri"];

/**
 * Core formula knobs. Exported as `K` from the package root for Gitwork compat.
 * Shape matches the historical GitFut tuning object.
 */
export const K = {
  magnitude: { w1: 0.5, w2: 0.4, w3: 0.5, w4: 0.08, b: -2.8, lo: 48, hi: 82 },
  tension: {
    alpha: 0.7,
    pairs: [
      ["sho", "def"],
      ["dri", "phy"],
      ["pac", "def"],
    ] as [StatKey, StatKey][],
  },
  spike: { base: 8, cohesion: 0.6 },
  legacy: { a: 1.0, b: 0.7, c: 0.3, d: 0.3, e: 0.3, f: 6.0, activeCap: 15, bonusMax: 11 },
  ovrCap: 88,
  finish: { iconMin: 90, totyMin: 85, totyLegacy: 0.5, goldMin: 75, silverMin: 65 },
  iconAllowlist: ["torvalds"],
};

/** Coefficients for §2 raw stat estimates (before shaping). */
export const RAW_STAT_COEFF = {
  pac: { base: 36, contrib: 12 },
  sho: { base: 36, stars: 13, maxStars: 5 },
  pas: { base: 40, prs: 12, followers: 9 },
  dri: { base: 58, langSqrt: 7 },
  def: { base: 40, stewardship: 14 },
  phy: { base: 40, lifetime: 9, activeYears: 2.2, activeYearsCap: 12 },
} as const;

export const WEIGHTS: Record<Family, Stats> = {
  Forward: { pac: 0.2, sho: 0.3, pas: 0.1, dri: 0.2, def: 0.05, phy: 0.15 },
  Playmaker: { pac: 0.1, sho: 0.15, pas: 0.3, dri: 0.25, def: 0.1, phy: 0.1 },
  Anchor: { pac: 0.1, sho: 0.05, pas: 0.15, dri: 0.1, def: 0.4, phy: 0.2 },
};

/** Skill-moves (tech range) language bands: highest minLanguages that fits wins. */
export const SKILL_MOVE_BANDS: { minLanguages: number; value: number }[] = [
  { minLanguages: 10, value: 5 },
  { minLanguages: 7, value: 4 },
  { minLanguages: 4, value: 3 },
  { minLanguages: 2, value: 2 },
  { minLanguages: 0, value: 1 },
];

export const SKILL_MOVE_REPO_BONUS = { minRepos: 40 } as const;

/** Weak-foot bands on the average of the three lowest stats. */
export const WEAK_FOOT_BANDS: { minWeakSide: number; value: number }[] = [
  { minWeakSide: 72, value: 5 },
  { minWeakSide: 63, value: 4 },
  { minWeakSide: 54, value: 3 },
  { minWeakSide: 45, value: 2 },
  { minWeakSide: 0, value: 1 },
];

export const WORK_RATE_THRESHOLDS = { high: 68, med: 50 } as const;

export const PLAYSTYLE_MAX_SHOWN = 8;

import type { StatKey } from "../types";

/**
 * Shared recruiter-facing meaning for each card stat.
 * Abbreviations (PAC/SHO/…) stay on the card; copy leads with what the number means in practice.
 */
export type StatMeaning = {
  abbr: string;
  /** Plain hiring label (what a recruiter should think of). */
  name: string;
  /** One line: what the signal measures in real GitHub terms. */
  meaning: string;
};

export const STAT_MEANINGS: Record<StatKey, StatMeaning> = {
  pac: {
    abbr: "PAC",
    name: "Activity",
    meaning: "How much they shipped in the last year: commits, pull requests, reviews, and issues.",
  },
  sho: {
    abbr: "SHO",
    name: "Impact",
    meaning: "Stars earned on their repos, plus how big their single strongest project is.",
  },
  pas: {
    abbr: "PAS",
    name: "Collaboration",
    meaning: "Pull requests into other people's repos, plus follower reach.",
  },
  dri: {
    abbr: "DRI",
    name: "Range",
    meaning: "How many languages they work in. Breadth helps; each extra language past the core set counts for less.",
  },
  def: {
    abbr: "DEF",
    name: "Stewardship",
    meaning: "Code reviews written and issues closed (maintenance and care of codebases).",
  },
  phy: {
    abbr: "PHY",
    name: "Longevity",
    meaning: "Lifetime contributions across their active years on GitHub.",
  },
};

/** Ordered list matching the card's six stats. */
export const STAT_MEANING_LIST: StatMeaning[] = [
  STAT_MEANINGS.pac,
  STAT_MEANINGS.sho,
  STAT_MEANINGS.pas,
  STAT_MEANINGS.dri,
  STAT_MEANINGS.def,
  STAT_MEANINGS.phy,
];

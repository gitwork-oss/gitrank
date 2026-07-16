import type { CadenceStyle, Finish, StatKey, WorkRateLevel } from "../types";

/** Short stat abbreviations shown on the card. */
export const STAT_LABELS: Record<StatKey, string> = {
  pac: "PAC",
  sho: "SHO",
  pas: "PAS",
  dri: "DRI",
  def: "DEF",
  phy: "PHY",
};

export const FINISH_LABELS: Record<Finish, string> = {
  bronze: "BRONZE",
  silver: "SILVER",
  gold: "GOLD",
  totw: "IN-FORM",
  toty: "TOTY",
  icon: "ICON",
  founder: "GITFUT",
};

export const WORK_RATE = {
  high: "High",
  med: "Med",
  low: "Low",
} as const satisfies Record<string, WorkRateLevel>;

export const METRIC_LABELS = {
  commits: "Commits",
  starsEarned: "Stars earned",
  topRepoReach: "Top repo reach",
  pullRequests: "Pull requests",
  followers: "Followers",
  languages: "Languages",
  issues: "Issues",
  codeReviews: "Code reviews",
  contributions: "Contributions",
} as const;

export const CLUB = {
  legends: "legends",
  neutral: "neutral",
} as const;

/** Cadence ids → card label (reason copy lives in cadence.ts). */
export const CADENCE = {
  explosive: "Explosive",
  relentless: "Relentless",
  controlled: "Controlled",
  clinical: "Clinical",
  industrious: "Industrious",
  measured: "Measured",
} as const satisfies Record<string, CadenceStyle>;

export type CadenceId = keyof typeof CADENCE;

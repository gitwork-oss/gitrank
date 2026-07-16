import { TRAIT_COPY, WORK_RATE } from "../copy";
import {
  SKILL_MOVE_BANDS,
  SKILL_MOVE_REPO_BONUS,
  STATS,
  WEAK_FOOT_BANDS,
  WORK_RATE_THRESHOLDS,
} from "../config/tuning";
import type { Signals, Stats, WorkRateLevel } from "../types";

function bandValue(sortedBands: { min: number; value: number }[], score: number): number {
  for (const band of sortedBands) {
    if (score >= band.min) return band.value;
  }
  return sortedBands[sortedBands.length - 1]?.value ?? 1;
}

/** Tech range (1–5) = language diversity, +1 for broad public output. */
export function deriveSkillMoves(s: Signals): { value: number; reason: string } {
  const bands = SKILL_MOVE_BANDS.map((b) => ({ min: b.minLanguages, value: b.value }));
  let value = bandValue(bands, s.languages);
  const bonus = s.public_repos >= SKILL_MOVE_REPO_BONUS.minRepos && value < 5;
  if (bonus) value += 1;
  return {
    value,
    reason: TRAIT_COPY.skillMoves(s.languages, bonus ? s.public_repos : null),
  };
}

/** Balance (1–5) from the average of the three weakest stats. */
export function deriveWeakFoot(stats: Stats): { value: number; reason: string } {
  const sorted = STATS.map((k) => stats[k]).sort((a, b) => a - b);
  const weakSide = Math.round((sorted[0] + sorted[1] + sorted[2]) / 3);
  const bands = WEAK_FOOT_BANDS.map((b) => ({ min: b.minWeakSide, value: b.value }));
  const value = bandValue(bands, weakSide);
  return {
    value,
    reason: TRAIT_COPY.weakFoot(weakSide),
  };
}

const rate = (v: number): WorkRateLevel =>
  v >= WORK_RATE_THRESHOLDS.high
    ? WORK_RATE.high
    : v >= WORK_RATE_THRESHOLDS.med
      ? WORK_RATE.med
      : WORK_RATE.low;

/** Output mix: shipping = activity + impact (PAC/SHO), care = stewardship (DEF). */
export function deriveWorkRate(stats: Stats): {
  attack: WorkRateLevel;
  defense: WorkRateLevel;
  reason: string;
} {
  const attack = rate(Math.round((stats.pac + stats.sho) / 2));
  const defense = rate(stats.def);
  return {
    attack,
    defense,
    reason: TRAIT_COPY.workRate(attack, defense),
  };
}

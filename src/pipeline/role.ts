import { K, STATS, WEIGHTS } from "../config/tuning";
import { clamp } from "../math";
import type { Card, Family, Position, Stats } from "../types";

/** Map display positions onto the family that owns their OVR weights. */
export const FAMILY_FOR_POSITION: Record<Position, Family> = {
  ST: "Forward",
  RW: "Forward",
  CAM: "Playmaker",
  CM: "Playmaker",
  CDM: "Anchor",
  CB: "Anchor",
};

type FamilyScore = { family: Family; score: number };

const FAMILY_SCORE: { family: Family; scoreOf: (st: Stats) => number }[] = [
  { family: "Forward", scoreOf: (st) => st.sho + st.pac },
  { family: "Playmaker", scoreOf: (st) => st.pas + st.dri },
  { family: "Anchor", scoreOf: (st) => st.def + st.phy },
];

const POSITION_FOR_FAMILY: Record<Family, (st: Stats) => Position> = {
  Forward: (st) => (st.pac > st.sho ? "RW" : "ST"),
  Playmaker: (st) => (st.pas > st.dri ? "CM" : "CAM"),
  Anchor: (st) => (st.def > st.phy ? "CB" : "CDM"),
};

export function positionFromShape(st: Stats): { position: Position; family: Family } {
  const ranked: FamilyScore[] = FAMILY_SCORE.map(({ family, scoreOf }) => ({
    family,
    score: scoreOf(st),
  })).sort((a, b) => b.score - a.score);
  const family = ranked[0].family;
  return { position: POSITION_FOR_FAMILY[family](st), family };
}

/** §3.6 - position-weighted, never a flat mean; stats alone cap at 88. */
export function weightedOVR(stats: Stats, family: Family): number {
  const w = WEIGHTS[family];
  const ovr = STATS.reduce((s, k) => s + stats[k] * w[k], 0);
  return Math.min(Math.round(ovr), K.ovrCap);
}

function isFamily(at: Position | Family): at is Family {
  return at === "Forward" || at === "Playmaker" || at === "Anchor";
}

/**
 * Hypothetical overall if this card were scored under another role's weights.
 * Stats stay fixed; only the weight vector changes (out-of-position feel).
 */
export function ovrAt(card: Card, at: Position | Family): number {
  const family = isFamily(at) ? at : FAMILY_FOR_POSITION[at];
  const base = weightedOVR(card.stats, family);
  if (card.founder) return card.overall;
  const legacyBonus = card.overall - card.baseOVR;
  return clamp(base + legacyBonus, 1, 99);
}

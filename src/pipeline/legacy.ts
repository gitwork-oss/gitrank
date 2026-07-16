import { K } from "../config/tuning";
import { lg, sigmoid } from "../math";
import type { Signals } from "../types";

/** §4 - the 88→99 range is bought with years and sustained influence. */
export function legacyScore(s: Signals): number {
  const { a, b, c, d, e, f, activeCap } = K.legacy;
  const z =
    a * Math.log(s.account_age_years + 1) +
    b * Math.min(s.active_years, activeCap) +
    c * lg(s.followers) +
    d * lg(s.total_stars_owned) +
    e * lg(s.max_repo_stars) -
    f;
  return sigmoid(z);
}

export function overallFromBaseAndLegacy(baseOVR: number, L: number): number {
  const { bonusMax } = K.legacy;
  return Math.max(1, Math.min(99, baseOVR + Math.round(bonusMax * L)));
}

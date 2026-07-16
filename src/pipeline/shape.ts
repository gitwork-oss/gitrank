import { ATTACK_STATS, K, STATS } from "../config/tuning";
import { clamp, lerp, lg, mean, sigmoid } from "../math";
import type { Profile, Signals, Stats } from "../types";

const vals = (s: Profile) => STATS.map((k) => s[k]);

/** §3.1 - magnitude → gravity-well center the stats sit around. */
export function center(s: Signals): number {
  const { w1, w2, w3, w4, b, lo, hi } = K.magnitude;
  const M = sigmoid(
    w1 * lg(s.total_stars_owned) +
      w2 * lg(s.followers) +
      w3 * lg(s.total_contributions_lifetime) +
      w4 * s.account_age_years +
      b,
  );
  return lerp(lo, hi, M);
}

/** §3.2 - z-score of their own six. */
export function zscore(raw: Stats): Profile {
  const v = vals(raw);
  const m = mean(v);
  const sd = Math.sqrt(mean(v.map((x) => (x - m) ** 2))) || 1;
  const p = {} as Profile;
  STATS.forEach((k, i) => {
    p[k] = (v[i] - m) / sd;
  });
  return p;
}

/** §3.3 - penalise antagonist pairs so nobody is elite at everything. */
export function applyTension(p: Profile): Profile {
  const out = { ...p };
  for (const [a, b] of K.tension.pairs) {
    const overlap = Math.max(0, Math.min(out[a], out[b]));
    const weaker = out[a] <= out[b] ? a : b;
    out[weaker] -= K.tension.alpha * overlap;
  }
  return out;
}

/** §3.4–3.5 - spike around center + attacking cohesion. */
export function spike(p: Profile, c: number): Stats {
  const v = vals(p);
  const lop = clamp((Math.max(...v) - Math.min(...v)) / 4, 0, 1);
  const spread = K.spike.base * (1 + lop);
  const m = mean(v);
  const raw = {} as Stats;
  STATS.forEach((k) => {
    raw[k] = c + spread * (p[k] - m);
  });
  const am = mean(ATTACK_STATS.map((k) => raw[k]));
  ATTACK_STATS.forEach((k) => {
    raw[k] = am + K.spike.cohesion * (raw[k] - am);
  });
  const stats = {} as Stats;
  STATS.forEach((k) => {
    stats[k] = clamp(Math.round(raw[k]), 1, 99);
  });
  return stats;
}

/** Full shape stage: raw → center → zscore → tension → spike. */
export function shapeStats(raw: Stats, signals: Signals): Stats {
  return spike(applyTension(zscore(raw)), center(signals));
}

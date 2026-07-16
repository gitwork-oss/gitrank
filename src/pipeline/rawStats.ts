import { RAW_STAT_COEFF, STATS } from "../config/tuning";
import { clamp, lg } from "../math";
import type { Signals, Stats } from "../types";

/** §2 - raw estimates, tuned so the six land on a comparable scale. */
export function rawStats(s: Signals): Stats {
  const c = RAW_STAT_COEFF;
  const o: Stats = {
    pac: c.pac.base + c.pac.contrib * lg(s.recent_contributions),
    sho: c.sho.base + c.sho.stars * lg(s.total_stars_owned) + c.sho.maxStars * lg(s.max_repo_stars),
    pas: c.pas.base + c.pas.prs * lg(s.prs_to_others) + c.pas.followers * lg(s.followers),
    // DRI = genuine range, square-root scaled so breadth has diminishing returns.
    dri: c.dri.base + c.dri.langSqrt * Math.sqrt(s.languages),
    def: c.def.base + c.def.stewardship * lg(s.reviews + s.issues_closed),
    phy:
      c.phy.base +
      c.phy.lifetime * lg(s.total_contributions_lifetime) +
      c.phy.activeYears * Math.min(s.active_years, c.phy.activeYearsCap),
  };
  for (const k of STATS) o[k] = clamp(Math.round(o[k]), 1, 99);
  return o;
}

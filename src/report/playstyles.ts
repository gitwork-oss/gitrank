import { PLAYSTYLE_COPY, type PlaystyleId, playstyleReason } from "../copy/playstyles";
import { PLAYSTYLE_MAX_SHOWN } from "../config/tuning";
import type { Playstyle, Signals } from "../types";

interface PlaystyleRule {
  id: PlaystyleId;
  value: (s: Signals) => number;
  base: number;
  plus: number;
}

/** Thresholds only - names/nouns/icons live in `copy/playstyles`. */
const CATALOG: PlaystyleRule[] = [
  { id: "starMagnet", value: (s) => s.total_stars_owned, base: 500, plus: 20_000 },
  { id: "viralHit", value: (s) => s.max_repo_stars, base: 1_000, plus: 20_000 },
  { id: "workhorse", value: (s) => s.active_days_recent, base: 120, plus: 250 },
  { id: "rapidFire", value: (s) => s.recent_contributions, base: 500, plus: 2_500 },
  { id: "marathoner", value: (s) => s.total_contributions_lifetime, base: 3_000, plus: 25_000 },
  { id: "maintainer", value: (s) => s.reviews + s.issues_closed, base: 30, plus: 300 },
  { id: "connector", value: (s) => s.prs_to_others, base: 30, plus: 400 },
  { id: "magnetic", value: (s) => s.followers, base: 200, plus: 20_000 },
  { id: "polyglot", value: (s) => s.languages, base: 5, plus: 9 },
  { id: "prolific", value: (s) => s.public_repos, base: 30, plus: 150 },
  { id: "veteran", value: (s) => s.account_age_years, base: 5, plus: 12 },
];

export function derivePlaystyles(s: Signals): Playstyle[] {
  return CATALOG.map((rule) => ({ rule, val: rule.value(s) }))
    .filter(({ rule, val }) => val >= rule.base)
    .sort((a, b) => {
      const ap = a.val >= a.rule.plus;
      const bp = b.val >= b.rule.plus;
      if (ap !== bp) return ap ? -1 : 1;
      return b.val / b.rule.base - a.val / a.rule.base;
    })
    .slice(0, PLAYSTYLE_MAX_SHOWN)
    .map(({ rule, val }) => {
      const copy = PLAYSTYLE_COPY[rule.id];
      const plus = val >= rule.plus;
      return {
        name: copy.name,
        icon: copy.icon,
        plus,
        reason: playstyleReason(copy.noun, val, plus),
      };
    });
}

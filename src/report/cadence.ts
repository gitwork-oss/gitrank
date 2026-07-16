import { type CadenceId, cadenceLabel, cadenceReason } from "../copy";
import type { CadenceStyle, Signals } from "../types";

/** First matching id wins - order is part of the product definition. */
const CADENCE_MATCHERS: { id: CadenceId; match: (s: Signals) => boolean }[] = [
  { id: "explosive", match: (s) => s.recent_spike },
  {
    id: "relentless",
    match: (s) => s.active_days_recent >= 200 && s.recent_contributions >= 800,
  },
  {
    id: "controlled",
    match: (s) => s.account_age_years >= 6 && s.active_years >= 5,
  },
  {
    id: "clinical",
    match: (s) => s.max_repo_stars >= 5000 && s.recent_contributions < 200,
  },
  {
    id: "industrious",
    match: (s) => s.recent_contributions >= 300,
  },
];

const CADENCE_FALLBACK_ID: CadenceId = "measured";

/** Resolved catalog for inspection / shims (style + reason from copy). */
export const CADENCE_RULES: {
  style: CadenceStyle;
  reason: string;
  match: (s: Signals) => boolean;
}[] = CADENCE_MATCHERS.map(({ id, match }) => ({
  style: cadenceLabel(id),
  reason: cadenceReason(id),
  match,
}));

/** Cadence: a one-word read of the recent activity pattern. */
export function deriveStyle(s: Signals): { value: CadenceStyle; reason: string } {
  for (const { id, match } of CADENCE_MATCHERS) {
    if (match(s)) {
      return { value: cadenceLabel(id), reason: cadenceReason(id) };
    }
  }
  return {
    value: cadenceLabel(CADENCE_FALLBACK_ID),
    reason: cadenceReason(CADENCE_FALLBACK_ID),
  };
}

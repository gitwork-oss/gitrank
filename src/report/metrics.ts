import { METRIC_LABELS } from "../copy";

import { score99 } from "../math";
import type { Metric, Signals } from "../types";

interface MetricDef {
  label: string;
  unit: string;
  ref: number;
  value: (s: Signals) => number;
}

const CORE_METRICS: MetricDef[] = [
  { label: METRIC_LABELS.commits, unit: "commits", ref: 3_000, value: (s) => s.recent_commits },
  { label: METRIC_LABELS.starsEarned, unit: "stars", ref: 200_000, value: (s) => s.total_stars_owned },
  { label: METRIC_LABELS.topRepoReach, unit: "stars", ref: 150_000, value: (s) => s.max_repo_stars },
  { label: METRIC_LABELS.pullRequests, unit: "PRs", ref: 2_000, value: (s) => s.prs_to_others },
  { label: METRIC_LABELS.followers, unit: "followers", ref: 100_000, value: (s) => s.followers },
  { label: METRIC_LABELS.languages, unit: "languages", ref: 15, value: (s) => s.languages },
  { label: METRIC_LABELS.issues, unit: "issues", ref: 1_500, value: (s) => s.issues_closed },
  { label: METRIC_LABELS.codeReviews, unit: "reviews", ref: 2_000, value: (s) => s.reviews },
  {
    label: METRIC_LABELS.contributions,
    unit: "contributions",
    ref: 50_000,
    value: (s) => s.total_contributions_lifetime,
  },
];

const OPTIONAL_METRICS: MetricDef[] = [
  { label: "Account age", unit: "yrs", ref: 15, value: (s) => Math.round(s.account_age_years) },
  { label: "Active days", unit: "days", ref: 365, value: (s) => s.active_days_recent },
  { label: "Repositories", unit: "repos", ref: 200, value: (s) => s.public_repos },
  { label: "Active years", unit: "yrs", ref: 15, value: (s) => s.active_years },
];

const toMetric = (def: MetricDef, s: Signals): Metric => {
  const value = def.value(s);
  return { label: def.label, value, unit: def.unit, score: score99(value, def.ref) };
};

export function deriveMetrics(s: Signals): Metric[] {
  const core = CORE_METRICS.map((d) => toMetric(d, s));
  const shown = core.filter((m) => m.value > 0);
  const fillerCount = Math.max(0, core.length - shown.length - 1);
  const fillers = OPTIONAL_METRICS.map((d) => toMetric(d, s))
    .filter((m) => m.value > 0)
    .slice(0, fillerCount);
  return [...shown, ...fillers];
}

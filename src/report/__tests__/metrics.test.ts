import { describe, expect, it } from "vitest";
import { METRIC_LABELS } from "../../copy";
import { baseSignals } from "../../testing/signals";
import { deriveMetrics } from "../metrics";

describe("deriveMetrics", () => {
  it("shows non-zero core bars", () => {
    const metrics = deriveMetrics(baseSignals());
    const labels = metrics.map((m) => m.label);
    expect(labels).toContain(METRIC_LABELS.commits);
    expect(labels).toContain(METRIC_LABELS.languages);
    expect(metrics.every((m) => m.value > 0)).toBe(true);
  });

  it("hides zeroed core metrics and fills with optional ones", () => {
    const metrics = deriveMetrics(
      baseSignals({
        recent_commits: 0,
        total_stars_owned: 0,
        max_repo_stars: 0,
        prs_to_others: 0,
        followers: 0,
        languages: 0,
        issues_closed: 0,
        reviews: 0,
        total_contributions_lifetime: 0,
        account_age_years: 4,
        active_days_recent: 40,
        public_repos: 12,
        active_years: 3,
      }),
    );
    const labels = metrics.map((m) => m.label);
    expect(labels).not.toContain(METRIC_LABELS.commits);
    expect(labels.some((l) => ["Account age", "Active days", "Repositories", "Active years"].includes(l))).toBe(
      true,
    );
  });
});

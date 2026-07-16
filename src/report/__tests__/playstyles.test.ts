import { describe, expect, it } from "vitest";
import { PLAYSTYLE_MAX_SHOWN } from "../../config/tuning";
import { baseSignals } from "../../__tests__/fixtures/signals";
import { derivePlaystyles } from "../playstyles";

describe("derivePlaystyles", () => {
  it("includes styles that clear their base threshold", () => {
    const styles = derivePlaystyles(
      baseSignals({
        total_stars_owned: 600,
        languages: 6,
        account_age_years: 6,
      }),
    );
    const names = styles.map((s) => s.name);
    expect(names).toContain("Star Magnet");
    expect(names).toContain("Polyglot");
    expect(names).toContain("Veteran");
  });

  it("marks plus when value clears the elite bar", () => {
    const styles = derivePlaystyles(
      baseSignals({
        total_stars_owned: 25_000,
        max_repo_stars: 100,
      }),
    );
    const star = styles.find((s) => s.name === "Star Magnet");
    expect(star?.plus).toBe(true);
    expect(star?.reason).toMatch(/top tier/);
  });

  it("caps the list at PLAYSTYLE_MAX_SHOWN", () => {
    const styles = derivePlaystyles(
      baseSignals({
        total_stars_owned: 30_000,
        max_repo_stars: 25_000,
        active_days_recent: 300,
        recent_contributions: 5_000,
        total_contributions_lifetime: 40_000,
        reviews: 400,
        issues_closed: 100,
        prs_to_others: 500,
        followers: 25_000,
        languages: 12,
        public_repos: 200,
        account_age_years: 15,
      }),
    );
    expect(styles.length).toBeLessThanOrEqual(PLAYSTYLE_MAX_SHOWN);
  });
});

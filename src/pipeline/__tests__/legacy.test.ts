import { describe, expect, it } from "vitest";
import { baseSignals } from "../../testing/signals";
import { legacyScore, overallFromBaseAndLegacy } from "../legacy";

describe("legacy", () => {
  it("scores between 0 and 1", () => {
    const L = legacyScore(baseSignals({ account_age_years: 8, active_years: 6 }));
    expect(L).toBeGreaterThan(0);
    expect(L).toBeLessThan(1);
  });

  it("grows with age and influence", () => {
    const young = legacyScore(
      baseSignals({ account_age_years: 1, active_years: 1, followers: 5, total_stars_owned: 5 }),
    );
    const veteran = legacyScore(
      baseSignals({
        account_age_years: 12,
        active_years: 10,
        followers: 50_000,
        total_stars_owned: 80_000,
        max_repo_stars: 40_000,
      }),
    );
    expect(veteran).toBeGreaterThan(young);
  });

  it("overallFromBaseAndLegacy stays in 1–99", () => {
    expect(overallFromBaseAndLegacy(88, 1)).toBeLessThanOrEqual(99);
    expect(overallFromBaseAndLegacy(40, 0)).toBe(40);
    expect(overallFromBaseAndLegacy(1, 0)).toBe(1);
  });
});

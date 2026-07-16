import { describe, expect, it } from "vitest";
import { baseSignals } from "../../__tests__/fixtures/signals";
import { CADENCE_REASONS } from "../../copy/cadence";
import { deriveStyle } from "../cadence";

describe("deriveStyle", () => {
  it("returns Explosive on a recent spike (first rule)", () => {
    const style = deriveStyle(baseSignals({ recent_spike: true }));
    expect(style.value).toBe("Explosive");
    expect(style.reason).toBe(CADENCE_REASONS.explosive);
  });

  it("returns Relentless for high active days and volume", () => {
    const style = deriveStyle(
      baseSignals({
        recent_spike: false,
        active_days_recent: 220,
        recent_contributions: 900,
      }),
    );
    expect(style.value).toBe("Relentless");
  });

  it("returns Measured as the fallback", () => {
    const style = deriveStyle(
      baseSignals({
        recent_spike: false,
        recent_contributions: 50,
        active_days_recent: 20,
        account_age_years: 2,
        active_years: 2,
        max_repo_stars: 10,
      }),
    );
    expect(style.value).toBe("Measured");
    expect(style.reason).toBe(CADENCE_REASONS.measured);
  });

  it("returns Industrious for steady year volume without earlier matches", () => {
    const style = deriveStyle(
      baseSignals({
        recent_spike: false,
        recent_contributions: 350,
        active_days_recent: 80,
        account_age_years: 3,
        active_years: 2,
        max_repo_stars: 100,
      }),
    );
    expect(style.value).toBe("Industrious");
  });
});

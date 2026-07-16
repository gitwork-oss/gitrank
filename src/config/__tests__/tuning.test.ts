import { describe, expect, it } from "vitest";
import { K, PLAYSTYLE_MAX_SHOWN, STATS, WEIGHTS } from "../tuning";

describe("tuning", () => {
  it("defines six stats and family weights that sum to 1", () => {
    expect(STATS).toHaveLength(6);
    for (const family of Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]) {
      const sum = STATS.reduce((s, k) => s + WEIGHTS[family][k], 0);
      expect(sum).toBeCloseTo(1, 5);
    }
  });

  it("keeps finish thresholds ordered", () => {
    expect(K.finish.silverMin).toBeLessThan(K.finish.goldMin);
    expect(K.finish.goldMin).toBeLessThan(K.finish.totyMin);
    expect(K.finish.totyMin).toBeLessThan(K.finish.iconMin);
    expect(PLAYSTYLE_MAX_SHOWN).toBeGreaterThan(0);
  });
});

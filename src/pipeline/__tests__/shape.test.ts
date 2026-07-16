import { describe, expect, it } from "vitest";
import { STATS } from "../../config/tuning";
import { baseSignals } from "../../testing/signals";
import { rawStats } from "../rawStats";
import { applyTension, center, shapeStats, zscore } from "../shape";

describe("shape", () => {
  it("center sits between magnitude lo/hi", () => {
    const c = center(baseSignals({ total_stars_owned: 1000, followers: 500 }));
    expect(c).toBeGreaterThanOrEqual(48);
    expect(c).toBeLessThanOrEqual(82);
  });

  it("zscore recenters the six around zero mean", () => {
    const z = zscore(rawStats(baseSignals()));
    const mean = STATS.reduce((s, k) => s + z[k], 0) / STATS.length;
    expect(mean).toBeCloseTo(0, 5);
  });

  it("applyTension reduces the weaker of antagonist pairs", () => {
    const p = { pac: 2, sho: 2, pas: 0, dri: 2, def: 2, phy: 0 };
    const out = applyTension(p);
    expect(out.sho).toBeLessThan(p.sho);
  });

  it("shapeStats returns clamped 1–99 stats", () => {
    const shaped = shapeStats(rawStats(baseSignals()), baseSignals());
    for (const k of STATS) {
      expect(shaped[k]).toBeGreaterThanOrEqual(1);
      expect(shaped[k]).toBeLessThanOrEqual(99);
    }
  });
});

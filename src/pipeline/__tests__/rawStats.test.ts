import { describe, expect, it } from "vitest";
import { STATS } from "../../config/tuning";
import { baseSignals } from "../../testing/signals";
import { rawStats } from "../rawStats";

describe("rawStats", () => {
  it("returns six stats clamped to 1–99", () => {
    const st = rawStats(baseSignals());
    expect(Object.keys(st).sort()).toEqual([...STATS].sort());
    for (const k of STATS) {
      expect(st[k]).toBeGreaterThanOrEqual(1);
      expect(st[k]).toBeLessThanOrEqual(99);
    }
  });

  it("rises when contribution and star signals rise", () => {
    const low = rawStats(baseSignals({ recent_contributions: 10, total_stars_owned: 5 }));
    const high = rawStats(
      baseSignals({ recent_contributions: 10_000, total_stars_owned: 50_000 }),
    );
    expect(high.pac).toBeGreaterThan(low.pac);
    expect(high.sho).toBeGreaterThan(low.sho);
  });
});

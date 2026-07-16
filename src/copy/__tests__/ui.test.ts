import { describe, expect, it } from "vitest";
import { CADENCE, FINISH_LABELS, METRIC_LABELS, STAT_LABELS, WORK_RATE } from "../ui";

describe("ui", () => {
  it("exposes stable UI label catalogs", () => {
    expect(STAT_LABELS.sho).toBe("SHO");
    expect(FINISH_LABELS.icon).toBe("ICON");
    expect(WORK_RATE.high).toBe("High");
    expect(CADENCE.measured).toBe("Measured");
    expect(METRIC_LABELS.commits).toBe("Commits");
  });
});

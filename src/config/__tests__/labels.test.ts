import { describe, expect, it } from "vitest";
import { CADENCE, FINISH_LABELS, STAT_LABELS } from "../labels";

describe("labels", () => {
  it("re-exports finish and cadence display strings", () => {
    expect(FINISH_LABELS.founder).toBe("GITFUT");
    expect(STAT_LABELS.pac).toBe("PAC");
    expect(CADENCE.explosive).toBe("Explosive");
  });
});

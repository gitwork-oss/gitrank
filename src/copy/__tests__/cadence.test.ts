import { describe, expect, it } from "vitest";
import { CADENCE_REASONS, cadenceLabel, cadenceReason } from "../cadence";

describe("cadence copy", () => {
  it("resolves label and reason by id", () => {
    expect(cadenceLabel("explosive")).toBe("Explosive");
    expect(cadenceReason("explosive")).toBe(CADENCE_REASONS.explosive);
    expect(Object.keys(CADENCE_REASONS)).toContain("measured");
  });
});

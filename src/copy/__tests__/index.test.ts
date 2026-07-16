import { describe, expect, it } from "vitest";
import { ARCHETYPES, CADENCE, CADENCE_REASONS, PLAYSTYLE_COPY, STAT_MEANINGS } from "../index";

describe("copy index", () => {
  it("re-exports catalogs from a single entry", () => {
    expect(CADENCE.clinical).toBe("Clinical");
    expect(CADENCE_REASONS.controlled).toBeTruthy();
    expect(ARCHETYPES.mezzala.name).toBe("Mezzala");
    expect(PLAYSTYLE_COPY.veteran.noun).toMatch(/years/);
    expect(STAT_MEANINGS.def.abbr).toBe("DEF");
  });
});

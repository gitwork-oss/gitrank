import { describe, expect, it } from "vitest";
import { STAT_MEANING_LIST, STAT_MEANINGS } from "../statMeanings";

describe("statMeanings", () => {
  it("re-exports meanings for all six stats", () => {
    expect(Object.keys(STAT_MEANINGS).sort()).toEqual(
      ["def", "dri", "pac", "pas", "phy", "sho"].sort(),
    );
    expect(STAT_MEANING_LIST).toHaveLength(6);
    expect(STAT_MEANING_LIST[0].abbr).toBe("PAC");
  });
});

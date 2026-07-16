import { describe, expect, it } from "vitest";
import { STAT_MEANING_LIST, STAT_MEANINGS } from "../statMeanings";

describe("statMeanings copy", () => {
  it("pairs abbreviations with hiring meanings", () => {
    expect(STAT_MEANINGS.pac.name).toBe("Activity");
    expect(STAT_MEANING_LIST.map((m) => m.abbr)).toEqual([
      "PAC",
      "SHO",
      "PAS",
      "DRI",
      "DEF",
      "PHY",
    ]);
  });
});

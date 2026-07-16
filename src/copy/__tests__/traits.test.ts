import { describe, expect, it } from "vitest";
import { TRAIT_COPY } from "../traits";

describe("traits copy", () => {
  it("formats skill-move and work-rate reasons", () => {
    expect(TRAIT_COPY.skillMoves(2, null)).toMatch(/2 languages/);
    expect(TRAIT_COPY.skillMoves(1, 40)).toMatch(/across/);
    expect(TRAIT_COPY.weakFoot(60)).toMatch(/60\/99/);
    expect(TRAIT_COPY.workRate("High", "Med")).toMatch(/Shipping High/);
  });
});

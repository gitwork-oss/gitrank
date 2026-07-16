import { describe, expect, it } from "vitest";
import { PLAYSTYLE_COPY, playstyleReason } from "../playstyles";

describe("playstyles copy", () => {
  it("has name, icon, and noun for each id", () => {
    expect(PLAYSTYLE_COPY.starMagnet.name).toBe("Star Magnet");
    expect(PLAYSTYLE_COPY.starMagnet.icon).toBe("star");
    expect(playstyleReason("stars earned", 500, false)).toBe("500 stars earned.");
    expect(playstyleReason("stars earned", 20_000, true)).toMatch(/top tier/);
  });
});

import { describe, expect, it } from "vitest";
import { baseSignals } from "../../__tests__/fixtures/signals";
import { deriveSkillMoves, deriveWeakFoot, deriveWorkRate } from "../traits";
import type { Stats } from "../../types";

describe("deriveSkillMoves", () => {
  it("bands by language count", () => {
    expect(deriveSkillMoves(baseSignals({ languages: 1, public_repos: 5 })).value).toBe(1);
    expect(deriveSkillMoves(baseSignals({ languages: 4, public_repos: 5 })).value).toBe(3);
    expect(deriveSkillMoves(baseSignals({ languages: 10, public_repos: 5 })).value).toBe(5);
  });

  it("adds a repo bonus when under the language cap", () => {
    const withBonus = deriveSkillMoves(baseSignals({ languages: 4, public_repos: 40 }));
    expect(withBonus.value).toBe(4);
    expect(withBonus.reason).toMatch(/across/);
  });
});

describe("deriveWeakFoot", () => {
  it("scores from the average of the three weakest stats", () => {
    const balanced: Stats = { pac: 70, sho: 70, pas: 70, dri: 70, def: 70, phy: 70 };
    expect(deriveWeakFoot(balanced).value).toBe(4);

    const soft: Stats = { pac: 80, sho: 80, pas: 80, dri: 30, def: 30, phy: 30 };
    expect(deriveWeakFoot(soft).value).toBe(1);
  });
});

describe("deriveWorkRate", () => {
  it("maps shipping and care to High / Med / Low", () => {
    const high = deriveWorkRate({
      pac: 80,
      sho: 80,
      pas: 50,
      dri: 50,
      def: 70,
      phy: 50,
    });
    expect(high.attack).toBe("High");
    expect(high.defense).toBe("High");

    const med = deriveWorkRate({
      pac: 55,
      sho: 55,
      pas: 50,
      dri: 50,
      def: 55,
      phy: 50,
    });
    expect(med.attack).toBe("Med");
    expect(med.defense).toBe("Med");

    const low = deriveWorkRate({
      pac: 40,
      sho: 40,
      pas: 40,
      dri: 40,
      def: 40,
      phy: 40,
    });
    expect(low.attack).toBe("Low");
    expect(low.defense).toBe("Low");
  });
});

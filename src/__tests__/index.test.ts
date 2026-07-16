import { describe, expect, it } from "vitest";
import * as gitrank from "../index";
import { baseSignals } from "../testing/signals";

describe("index", () => {
  it("exports the public scoring surface", () => {
    expect(typeof gitrank.buildCard).toBe("function");
    expect(typeof gitrank.pickFinish).toBe("function");
    expect(typeof gitrank.ovrAt).toBe("function");
    expect(gitrank.STATS).toEqual(["pac", "sho", "pas", "dri", "def", "phy"]);
  });

  it("buildCard from the package entry returns a card", () => {
    const card = gitrank.buildCard(baseSignals());
    expect(card.login).toBe("pure-dev");
    expect(card.overall).toBeGreaterThanOrEqual(1);
  });
});

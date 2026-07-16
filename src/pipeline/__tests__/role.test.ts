import { describe, expect, it } from "vitest";
import { buildCard } from "../../buildCard";
import { baseSignals } from "../../testing/signals";
import { ovrAt } from "../role";

describe("ovrAt", () => {
  it("matches natural overall at the card's own family", () => {
    const card = buildCard(
      baseSignals({
        login: "fwd",
        recent_contributions: 8000,
        recent_commits: 8000,
        total_stars_owned: 200,
      }),
    );
    expect(card.family).toBe("Forward");
    expect(ovrAt(card, card.position)).toBe(card.overall);
    expect(ovrAt(card, card.family)).toBe(card.overall);
  });

  it("drops a Forward when scored as Anchor (ST on CB)", () => {
    const card = buildCard(
      baseSignals({
        login: "striker",
        recent_contributions: 8000,
        recent_commits: 8000,
        total_stars_owned: 5000,
        max_repo_stars: 2000,
      }),
    );
    expect(card.family).toBe("Forward");
    expect(ovrAt(card, "CB")).toBeLessThan(card.overall);
    expect(ovrAt(card, "CDM")).toBe(ovrAt(card, "CB"));
  });

  it("treats ST and RW as the same Forward weights", () => {
    const card = buildCard(
      baseSignals({
        login: "winger",
        recent_contributions: 8000,
        recent_commits: 8000,
      }),
    );
    expect(ovrAt(card, "ST")).toBe(ovrAt(card, "RW"));
  });
});

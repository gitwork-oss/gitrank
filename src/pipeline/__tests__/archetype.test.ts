import { describe, expect, it } from "vitest";
import { archetypeFromShape } from "../archetype";
import type { Stats } from "../../types";

const stats = (partial: Partial<Stats>): Stats => ({
  pac: 50,
  sho: 50,
  pas: 50,
  dri: 50,
  def: 50,
  phy: 50,
  ...partial,
});

describe("archetypeFromShape", () => {
  it("picks Galáctico for icon finish", () => {
    const a = archetypeFromShape(stats({ sho: 90, pac: 80 }), "icon");
    expect(a.name).toBe("Galáctico");
  });

  it("picks Poacher for sho-dominant with soft def/pas", () => {
    const a = archetypeFromShape(
      stats({ sho: 90, pac: 70, pas: 50, dri: 60, def: 40, phy: 55 }),
      "gold",
    );
    expect(a.name).toBe("Poacher");
  });

  it("picks Fantasista when dri leads", () => {
    const a = archetypeFromShape(
      stats({ dri: 88, pas: 70, sho: 60, pac: 65, def: 50, phy: 55 }),
      "gold",
    );
    expect(a.name).toBe("Fantasista");
  });

  it("falls back to Mezzala when no sharper rule matches", () => {
    const a = archetypeFromShape(
      stats({ phy: 80, pac: 78, sho: 60, pas: 55, dri: 58, def: 50 }),
      "gold",
    );
    expect(a.name).toBe("Mezzala");
  });
});

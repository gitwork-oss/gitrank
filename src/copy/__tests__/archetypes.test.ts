import { describe, expect, it } from "vitest";
import { ARCHETYPE_COPY, archetypeCopy } from "../archetypes";

describe("archetypes copy", () => {
  it("looks up name and blurb by id", () => {
    expect(archetypeCopy("poacher").name).toBe("Poacher");
    expect(ARCHETYPE_COPY.galactico.blurb).toMatch(/hall-of-fame/i);
  });
});

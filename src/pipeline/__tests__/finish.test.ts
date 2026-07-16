import { describe, expect, it } from "vitest";
import { pickFinish } from "../finish";

describe("pickFinish", () => {
  it("returns bronze below silver floor", () => {
    expect(
      pickFinish({ overall: 64, legacy: 0, recentSpike: false, login: "dev" }),
    ).toBe("bronze");
  });

  it("returns silver then gold by overall", () => {
    expect(
      pickFinish({ overall: 65, legacy: 0, recentSpike: false, login: "dev" }),
    ).toBe("silver");
    expect(
      pickFinish({ overall: 75, legacy: 0, recentSpike: false, login: "dev" }),
    ).toBe("gold");
  });

  it("returns totw for a recent spike at silver+", () => {
    expect(
      pickFinish({ overall: 70, legacy: 0, recentSpike: true, login: "dev" }),
    ).toBe("totw");
  });

  it("returns toty when overall and legacy clear the bar", () => {
    expect(
      pickFinish({ overall: 85, legacy: 0.5, recentSpike: false, login: "dev" }),
    ).toBe("toty");
  });

  it("returns icon for high overall or allowlisted login", () => {
    expect(
      pickFinish({ overall: 90, legacy: 1, recentSpike: false, login: "dev" }),
    ).toBe("icon");
    expect(
      pickFinish({ overall: 50, legacy: 0, recentSpike: false, login: "torvalds" }),
    ).toBe("icon");
  });

  it("prefers icon over toty when both could apply", () => {
    expect(
      pickFinish({ overall: 92, legacy: 1, recentSpike: false, login: "dev" }),
    ).toBe("icon");
  });
});

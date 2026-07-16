import { describe, expect, it } from "vitest";
import { clamp, lg, score99 } from "../math";

describe("clamp", () => {
  it("bounds values to [lo, hi]", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });
});

describe("lg", () => {
  it("is log10 of (x+1) and floors at 0", () => {
    expect(lg(0)).toBe(0);
    expect(lg(-5)).toBe(0);
    expect(lg(9)).toBeCloseTo(1, 5);
  });
});

describe("score99", () => {
  it("maps zero to 0", () => {
    expect(score99(0, 1000)).toBe(0);
  });

  it("maps values below the elite ref into 1–98", () => {
    const s = score99(10, 1000);
    expect(s).toBeGreaterThanOrEqual(1);
    expect(s).toBeLessThan(99);
  });

  it("caps at 99 when value meets or exceeds the ref scale", () => {
    expect(score99(1000, 1000)).toBe(99);
    expect(score99(1_000_000, 1000)).toBe(99);
  });
});

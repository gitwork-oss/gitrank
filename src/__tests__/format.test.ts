import { describe, expect, it } from "vitest";
import { formatCount } from "../format";

describe("formatCount", () => {
  it("keeps small integers as strings", () => {
    expect(formatCount(42)).toBe("42");
    expect(formatCount(999)).toBe("999");
  });

  it("formats thousands with a k suffix", () => {
    expect(formatCount(1000)).toBe("1k");
    expect(formatCount(1240)).toBe("1.2k");
    expect(formatCount(248_723)).toBe("249k");
  });
});

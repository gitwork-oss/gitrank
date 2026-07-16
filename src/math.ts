/** Shared numeric helpers for the scoring pipeline. */

export const lg = (x: number) => Math.log10(Math.max(0, x) + 1);
export const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));
export const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;

/** Map a real count to 0–99 via log scale against an elite reference. */
export const score99 = (value: number, ref: number) =>
  value <= 0 ? 0 : clamp(Math.round(99 * (lg(value) / lg(ref))), 1, 99);

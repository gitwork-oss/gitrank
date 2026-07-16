import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildCard } from "../buildCard";
import { baseSignals } from "../testing/signals";

const SRC = join(import.meta.dirname, "..");

function walkTs(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name === "__tests__" || name.name === "testing" || name.name === "node_modules")
      continue;
    const path = join(dir, name.name);
    if (name.isDirectory()) out.push(...walkTs(path));
    else if (name.name.endsWith(".ts")) out.push(path);
  }
  return out;
}

describe("gitrank package boundary", () => {
  it("has no next / react / redis / github client imports", () => {
    const banned =
      /from\s+["'](next|react|react-dom|ioredis|redis|server-only|@\/lib\/github\/client)/;
    for (const file of walkTs(SRC)) {
      const src = readFileSync(file, "utf8");
      expect(src, file).not.toMatch(banned);
    }
  });
});

describe("buildCard", () => {
  it("scores without host enrichments", () => {
    const card = buildCard(baseSignals());
    expect(card.country).toBe("");
    expect(card.languageLogo).toBeNull();
    expect(card.founder).toBeUndefined();
    expect(card.overall).toBeGreaterThanOrEqual(1);
    expect(card.overall).toBeLessThanOrEqual(99);
    expect(card.stats.pac).toBeGreaterThanOrEqual(1);
  });

  it("accepts optional enrichments", () => {
    const card = buildCard(baseSignals(), {
      country: "bw",
      languageLogo: { name: "TypeScript", slug: "typescript-original" },
    });
    expect(card.country).toBe("bw");
    expect(card.languageLogo?.slug).toBe("typescript-original");
  });

  it("applies founder options when the login matches", () => {
    const card = buildCard(baseSignals({ login: "Ada" }), {
      founders: {
        ada: {
          art: "/cards/founder-red.png",
          accent: "#ff2f45",
          label: "GITFUT",
          tagline: "Founder of GitFut",
        },
      },
      founderOverall: { ada: 93 },
    });
    expect(card.finish).toBe("founder");
    expect(card.overall).toBe(93);
    expect(card.founder?.art).toContain("founder-red");
    expect(card.archetype).toBe("Founder");
  });
});

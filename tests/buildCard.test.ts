import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildCard, type Signals } from "../src/index";

const SRC = join(import.meta.dirname, "../src");

function walkTs(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
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
  const signals: Signals = {
    login: "pure-dev",
    name: "Pure Dev",
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    location: "Gaborone",
    followers: 50,
    account_age_years: 3,
    public_repos: 20,
    total_stars_owned: 100,
    max_repo_stars: 40,
    languages: 5,
    rankedLanguages: ["TypeScript"],
    topLanguage: "TypeScript",
    recent_contributions: 300,
    active_days_recent: 100,
    active_years: 3,
    total_contributions_lifetime: 1500,
    prs_to_others: 5,
    reviews: 3,
    issues_closed: 4,
    recent_commits: 280,
    recent_spike: false,
  };

  it("scores without host enrichments", () => {
    const card = buildCard(signals);
    expect(card.country).toBe("");
    expect(card.languageLogo).toBeNull();
    expect(card.founder).toBeUndefined();
    expect(card.overall).toBeGreaterThanOrEqual(1);
    expect(card.overall).toBeLessThanOrEqual(99);
    expect(card.stats.pac).toBeGreaterThanOrEqual(1);
  });

  it("accepts optional enrichments", () => {
    const card = buildCard(signals, {
      country: "bw",
      languageLogo: { name: "TypeScript", slug: "typescript-original" },
    });
    expect(card.country).toBe("bw");
    expect(card.languageLogo?.slug).toBe("typescript-original");
  });
});

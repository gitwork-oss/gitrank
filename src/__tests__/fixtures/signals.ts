import type { Signals } from "../../types";

/** Modest public-profile fixture; override fields per suite. */
export function baseSignals(overrides: Partial<Signals> = {}): Signals {
  return {
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
    ...overrides,
  };
}

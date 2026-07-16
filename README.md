# Gitrank

Transparent ranking for public GitHub activity: **Signals → six-stat card + OVR**.

No GitHub API client. No Redis. No UI. Feed it numbers derived from public profile data; get a scored card you can inspect and reproduce.

Public repo: [github.com/gitwork-oss/gitrank](https://github.com/gitwork-oss/gitrank)

Used in production by [Gitwork](https://github.com/darula-hpp/gitwork).

## Credit

Gitrank is forked from [GitFut](https://github.com/younesfdj/gitfut) (MIT). The scoring engine - six stats, OVR, finishes, and archetypes - started there; this package extracts that core so maintainers can read and run how public GitHub activity is ranked.

## Install

```bash
git clone https://github.com/gitwork-oss/gitrank.git
cd gitrank
npm install
```

Import from source (TypeScript):

```ts
import { buildCard, type Signals } from "gitrank";
// or: import { buildCard } from "./src/index.ts";
```

## Input: `Signals`

Public activity only - the same fields a host can extract from a GitHub profile:

| Field | Meaning |
|--------|---------|
| `recent_contributions` / `recent_commits` | Shipping in the last year |
| `total_stars_owned` / `max_repo_stars` | Impact / biggest hit |
| `prs_to_others` / `followers` | Collaboration + reach |
| `languages` / `rankedLanguages` | Tech range |
| `reviews` / `issues_closed` | Stewardship |
| `total_contributions_lifetime` / `active_years` / `account_age_years` | Longevity |
| `recent_spike` | Unusual recent burst (in-form finish) |

## Architecture

`buildCard` is a thin orchestrator. Each stage is a pure module:

```
Signals
  → pipeline/rawStats.ts     map signals → six raw stats
  → pipeline/shape.ts        center, z-score, tension, spike
  → pipeline/role.ts         family / position / weighted OVR
  → pipeline/legacy.ts       years + influence bonus toward 99
  → pipeline/finish.ts       first-match finish rules (bronze→icon)
  → pipeline/archetype.ts    first-match archetype catalog
  → report/*                 cadence, traits, metrics, playstyles
  → Card
```

Config and copy live separately from logic:

- `config/tuning.ts` - formula knobs (`K`), weights, band thresholds
- `copy/*` - all recruiter-facing strings (labels, cadence reasons, archetypes, traits, playstyles, stat meanings)

Logic modules match on **stable ids** and look up copy - e.g. cadence rules are `{ id, match }`, not inline sentences. Cadence, finish, and archetype use **ordered rule catalogs** (first match wins). Shared numeric helpers are in `math.ts`.

Football abbreviations (PAC, SHO, …) are metaphors for hiring signals - see `STAT_MEANINGS` in `copy/statMeanings.ts`.

## Example

```ts
import { buildCard, type Signals } from "gitrank";

const signals: Signals = {
  login: "example",
  name: "Example Dev",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  location: null,
  followers: 120,
  account_age_years: 6,
  public_repos: 40,
  total_stars_owned: 800,
  max_repo_stars: 400,
  languages: 5,
  rankedLanguages: ["TypeScript", "Go"],
  topLanguage: "TypeScript",
  recent_contributions: 600,
  active_days_recent: 140,
  active_years: 5,
  total_contributions_lifetime: 4000,
  prs_to_others: 40,
  reviews: 25,
  issues_closed: 15,
  recent_commits: 550,
  recent_spike: false,
};

const card = buildCard(signals);
console.log(card.overall, card.position, card.stats);
// e.g. 78 CAM { pac: 72, sho: 70, pas: 81, dri: 76, def: 64, phy: 74 }
```

Optional host enrichments (country, language logo, founder overrides) go in the second argument - see `BuildCardOptions`. Pure OSS usage can omit them.

## Non-goals

- Fetching GitHub (bring your own profile → signals adapter)
- Private repo data
- Lineups, UI, or marketplace product logic

## Tests

Each source directory has a `__tests__/` folder. Test files mirror the module name (`finish.ts` → `__tests__/finish.test.ts`).

```bash
npm test
# from the Gitwork monorepo root:
# npm run test:gitrank
```


## License

MIT - derived from [GitFut](https://github.com/younesfdj/gitfut) (MIT).

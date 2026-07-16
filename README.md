# Gitrank

Transparent ranking for public GitHub activity: **Signals → six-stat card + overall (OVR)**.

Gitrank is a pure TypeScript library. It does not call GitHub, touch Redis, or render UI. You supply numbers derived from a public profile; it returns a scored card you can audit, fork, and tune.

Part of [gitwork-oss](https://github.com/gitwork-oss).

## Why it exists

Opaque “developer scores” are hard to trust. Gitrank keeps the formula in the open:

- Thresholds and weights live in plain files
- Recruiter-facing copy is separated from match logic
- Rule order (finish, cadence, archetype) is explicit and testable

If a band or a blurb feels wrong, open a PR against the file that defines it.

## Credit

Forked from [GitFut](https://github.com/younesfdj/gitfut) by Younes Ferradji and contributors (MIT). The six-stat card, OVR, finishes, and archetypes started there. This package extracts that scoring core so it can be read and reused on its own.

## Install

```bash
git clone https://github.com/gitwork-oss/gitrank.git
cd gitrank
npm install
```

Import from source (TypeScript / ESM):

```ts
import { buildCard, type Signals } from "gitrank";
// or relative: import { buildCard } from "./src/index.ts";
```

There is no published npm build step yet - consume the TypeScript entry at `src/index.ts`.

## Quick start

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
console.log(card.overall, card.position, card.finish, card.stats);
// e.g. 78 CAM gold { pac: 72, sho: 70, pas: 81, dri: 76, def: 64, phy: 74 }
```

Optional host enrichments go in the second argument (`BuildCardOptions`): country code, language logo, founder overrides. Pure ranking can omit them.

## Input: `Signals`

Public activity only. Your host maps a GitHub profile (or any equivalent source) into this shape:

| Field | Meaning |
|--------|---------|
| `login`, `name`, `avatarUrl`, `location` | Identity / display |
| `followers`, `public_repos` | Reach and surface area |
| `recent_contributions`, `recent_commits`, `active_days_recent` | Shipping in the last year |
| `total_stars_owned`, `max_repo_stars` | Impact / biggest public hit |
| `prs_to_others` | Collaboration into other people's repos |
| `languages`, `rankedLanguages`, `topLanguage` | Tech range |
| `reviews`, `issues_closed` | Stewardship |
| `total_contributions_lifetime`, `active_years`, `account_age_years` | Longevity |
| `recent_spike` | Unusual recent burst (feeds in-form finish) |

Gitrank never fetches these - bring your own adapter.

## Output: `Card`

`buildCard` returns a card roughly shaped as:

| Area | Fields |
|------|--------|
| Identity | `login`, `name`, `avatarUrl`, `country`, `club` |
| Scores | `stats` (PAC/SHO/PAS/DRI/DEF/PHY), `baseOVR`, `overall` |
| Role | `position` (ST, RW, CAM, …), `family` (Forward / Playmaker / Anchor) |
| Tier | `finish`, `finishLabel` (bronze → icon, plus optional founder) |
| Flavor | `archetype`, `archetypeBlurb`, language fields |
| Report | `report.style`, skill moves, weak foot, work rate, playstyles, metrics, reasons |

Football abbreviations are metaphors for hiring signals. Plain-English meanings live in `copy/statMeanings.ts` (`STAT_MEANINGS`).

| Abbr | Hiring read |
|------|-------------|
| PAC | Activity (recent shipping) |
| SHO | Impact (stars / biggest repo) |
| PAS | Collaboration (PRs to others + followers) |
| DRI | Range (languages) |
| DEF | Stewardship (reviews + issues) |
| PHY | Longevity (lifetime volume + years) |

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

### Config vs copy vs logic

| Layer | Path | Role |
|-------|------|------|
| Tuning | `config/tuning.ts` | Formula knobs (`K`), weights, skill/weak-foot bands |
| Labels | `copy/ui.ts` (via `config/labels.ts` re-export) | Short display strings |
| Copy | `copy/*` | Cadence reasons, archetypes, playstyle names, trait templates, stat meanings |
| Logic | `pipeline/*`, `report/*` | Matchers on **stable ids**; look up copy by id |

Example: cadence rules are `{ id, match }`, not inline sentences. Finish, cadence, and archetype catalogs are **ordered** (first match wins). Shared numeric helpers are in `math.ts`.

### Layout

```
src/
  buildCard.ts          orchestrator
  index.ts              public exports
  math.ts / format.ts
  types.ts
  config/               tuning (+ labels re-export)
  copy/                 all recruiter-facing strings
  pipeline/             scoring stages
  report/               cadence, traits, metrics, playstyles
  testing/              shared test fixtures (not shipped as API)
  **/__tests__/         Vitest: each file mirrors its module name
```

## Contributing

Useful PR surfaces:

- **Numbers** - `config/tuning.ts` (weights, finish floors, playstyle bases)
- **Wording** - `copy/*` (reasons, blurbs, labels)
- **Rule order** - `pipeline/finish.ts`, `pipeline/archetype.ts`, `report/cadence.ts`
- **Tests** - add or extend `src/<area>/__tests__/<module>.test.ts`

Keep logic free of product UI, Next.js, Redis, and GitHub clients.

## Tests

Each source directory has a `__tests__/` folder. Test files mirror the module name (`finish.ts` → `__tests__/finish.test.ts`).

```bash
npm test
```

## Non-goals

- Fetching GitHub (bring your own profile → signals adapter)
- Private repo data
- Lineups, marketplace, or product UI

## Related

- [GitFut](https://github.com/younesfdj/gitfut) - original scoring inspiration
- [osscv](https://github.com/gitwork-oss/osscv) - auditable Open Source CVs (sibling under gitwork-oss)

## License

MIT - derived from [GitFut](https://github.com/younesfdj/gitfut) (MIT).

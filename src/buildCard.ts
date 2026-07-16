// Scoring core forked from GitFut - https://github.com/younesfdj/gitfut (MIT).
import { ARCHETYPES, CLUB, FINISH_LABELS } from "./copy";
import { archetypeFromShape } from "./pipeline/archetype";

import { pickFinish } from "./pipeline/finish";
import { legacyScore, overallFromBaseAndLegacy } from "./pipeline/legacy";
import { rawStats } from "./pipeline/rawStats";
import { positionFromShape, weightedOVR } from "./pipeline/role";
import { shapeStats } from "./pipeline/shape";
import { deriveStyle } from "./report/cadence";
import { deriveMetrics } from "./report/metrics";
import { derivePlaystyles } from "./report/playstyles";
import { deriveSkillMoves, deriveWeakFoot, deriveWorkRate } from "./report/traits";
import type { BuildCardOptions, Card, Finish, Signals } from "./types";

/**
 * Score public GitHub {@link Signals} into a six-stat card + OVR.
 * Pipeline: raw → shape → role → legacy/finish/archetype → report.
 */
export function buildCard(s: Signals, options: BuildCardOptions = {}): Card {
  const stats = shapeStats(rawStats(s), s);
  const { position, family } = positionFromShape(stats);
  const baseOVR = weightedOVR(stats, family);
  const L = legacyScore(s);

  const loginKey = s.login.toLowerCase();
  const founders = options.founders ?? {};
  const founderOverall = options.founderOverall ?? {};
  const founder = founders[loginKey];

  const naturalOverall = overallFromBaseAndLegacy(baseOVR, L);
  const overall = founder ? (founderOverall[loginKey] ?? naturalOverall) : naturalOverall;
  const finish: Finish = founder
    ? "founder"
    : pickFinish({
        overall,
        legacy: L,
        recentSpike: s.recent_spike,
        login: s.login,
      });
  const archetype = founder ? ARCHETYPES.founder : archetypeFromShape(stats, finish);

  const skill = deriveSkillMoves(s);
  const weak = deriveWeakFoot(stats);
  const work = deriveWorkRate(stats);
  const style = deriveStyle(s);

  return {
    login: s.login,
    name: s.name,
    avatarUrl: s.avatarUrl,
    country: options.country ?? "",
    club: finish === "icon" ? CLUB.legends : CLUB.neutral,
    stats,
    position,
    family,
    baseOVR,
    overall,
    finish,
    finishLabel: FINISH_LABELS[finish],
    archetype: archetype.name,
    archetypeBlurb: archetype.blurb,
    topLanguage: s.topLanguage ?? null,
    rankedLanguages: s.rankedLanguages ?? [],
    languageLogo: options.languageLogo ?? null,
    ...(founder ? { founder } : null),
    legacy: { L },
    report: {
      skillMoves: skill.value,
      weakFoot: weak.value,
      workRate: { attack: work.attack, defense: work.defense },
      style: style.value,
      reasons: {
        skillMoves: skill.reason,
        weakFoot: weak.reason,
        workRate: work.reason,
        style: style.reason,
      },
      playstyles: derivePlaystyles(s),
      metrics: deriveMetrics(s),
    },
  };
}

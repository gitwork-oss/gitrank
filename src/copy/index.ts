/**
 * Human-readable strings for Gitrank.
 * Logic modules should import keys/ids and look up copy here - never hardcode
 * recruiter-facing sentences next to match predicates.
 */
export { CADENCE, CLUB, FINISH_LABELS, METRIC_LABELS, STAT_LABELS, WORK_RATE } from "./ui";
export type { CadenceId } from "./ui";

export { CADENCE_REASONS, cadenceLabel, cadenceReason } from "./cadence";

export { ARCHETYPE_COPY, ARCHETYPES, archetypeCopy } from "./archetypes";
export type { ArchetypeId } from "./archetypes";

export { TRAIT_COPY } from "./traits";

export { PLAYSTYLE_COPY, playstyleReason } from "./playstyles";
export type { PlaystyleId } from "./playstyles";

export type { StatMeaning } from "./statMeanings";
export { STAT_MEANING_LIST, STAT_MEANINGS } from "./statMeanings";

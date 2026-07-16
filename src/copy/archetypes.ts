import type { Archetype } from "../types";

/** Archetype display copy keyed by stable id - no match logic here. */
export const ARCHETYPE_COPY = {
  galactico: {
    name: "Galáctico",
    blurb: "hall-of-fame maintainer, high and balanced, earned over years",
  },
  poacher: {
    name: "Poacher",
    blurb: "one viral repo, clinical, a pure star-magnet finisher",
  },
  regista: {
    name: "Regista",
    blurb: "deep playmaker, coordinates from the back with cross-repo PRs and reviews",
  },
  libero: {
    name: "Libero",
    blurb: "ball-playing sweeper, a reviewer who also builds, keeping the codebase clean",
  },
  fantasista: {
    name: "Fantasista",
    blurb: "the magician, a polyglot working across many stacks",
  },
  targetMan: {
    name: "Target Man",
    blurb: "a prolific shipper whose output lands",
  },
  mezzala: {
    name: "Mezzala",
    blurb: "the engine, a relentless box-to-box daily-driver",
  },
  founder: {
    name: "Founder",
    blurb: "founded GitFut, the open-source scoring this scout is forked from",
  },

} as const satisfies Record<string, Archetype>;

export type ArchetypeId = keyof typeof ARCHETYPE_COPY;

/** Compat alias - same objects as ARCHETYPE_COPY. */
export const ARCHETYPES = ARCHETYPE_COPY;

export function archetypeCopy(id: ArchetypeId): Archetype {
  return ARCHETYPE_COPY[id];
}

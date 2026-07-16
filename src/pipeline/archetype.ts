import { ARCHETYPE_COPY, type ArchetypeId, archetypeCopy } from "../copy/archetypes";
import { STATS } from "../config/tuning";
import type { Archetype, Finish, StatKey, Stats } from "../types";

/** Re-export copy catalog for consumers that import ARCHETYPES from here. */
export { ARCHETYPE_COPY as ARCHETYPES };

type ShapeCtx = {
  stats: Stats;
  finish: Finish;
  top: StatKey[];
  peak: number;
  top2: StatKey[];
};

const hasPair = (ctx: ShapeCtx, a: StatKey, b: StatKey) =>
  ctx.top2.includes(a) && ctx.top2.includes(b);

/** First matching id wins - mirrors historical GitFut priority. Copy is in `copy/archetypes`. */
const ARCHETYPE_RULES: { id: ArchetypeId; match: (ctx: ShapeCtx) => boolean }[] = [
  { id: "galactico", match: (ctx) => ctx.finish === "icon" },
  {
    id: "poacher",
    match: (ctx) =>
      ctx.top[0] === "sho" && ctx.stats.def < ctx.peak - 18 && ctx.stats.pas < ctx.peak - 12,
  },
  { id: "regista", match: (ctx) => ctx.top[0] === "pas" && ctx.top2.includes("def") },
  { id: "libero", match: (ctx) => ctx.top[0] === "def" && ctx.top2.includes("pas") },
  { id: "fantasista", match: (ctx) => ctx.top[0] === "dri" },
  { id: "targetMan", match: (ctx) => hasPair(ctx, "phy", "sho") },
  {
    id: "mezzala",
    match: (ctx) => hasPair(ctx, "phy", "pac") || hasPair(ctx, "pac", "dri"),
  },
  { id: "libero", match: (ctx) => ctx.top[0] === "def" },
  { id: "poacher", match: (ctx) => ctx.top[0] === "sho" },
];

export function archetypeFromShape(st: Stats, finish: Finish): Archetype {
  const top = [...STATS].sort((a, b) => st[b] - st[a]);
  const ctx: ShapeCtx = {
    stats: st,
    finish,
    top,
    peak: st[top[0]],
    top2: top.slice(0, 2),
  };
  for (const rule of ARCHETYPE_RULES) {
    if (rule.match(ctx)) return archetypeCopy(rule.id);
  }
  return ARCHETYPE_COPY.mezzala;
}

import { K } from "../config/tuning";
import type { Finish } from "../types";

export type FinishContext = {
  overall: number;
  legacy: number;
  recentSpike: boolean;
  login: string;
};

type FinishRule = {
  finish: Finish;
  match: (ctx: FinishContext) => boolean;
};

/** First matching rule wins - order is part of the product definition. */
const FINISH_RULES: FinishRule[] = [
  {
    finish: "icon",
    match: ({ login, overall }) =>
      K.iconAllowlist.includes(login) || overall >= K.finish.iconMin,
  },
  {
    finish: "toty",
    match: ({ overall, legacy }) =>
      overall >= K.finish.totyMin && legacy >= K.finish.totyLegacy,
  },
  {
    finish: "totw",
    match: ({ recentSpike, overall }) =>
      recentSpike && overall >= K.finish.silverMin,
  },
  {
    finish: "gold",
    match: ({ overall }) => overall >= K.finish.goldMin,
  },
  {
    finish: "silver",
    match: ({ overall }) => overall >= K.finish.silverMin,
  },
];

export function pickFinish(ctx: FinishContext): Finish {
  for (const rule of FINISH_RULES) {
    if (rule.match(ctx)) return rule.finish;
  }
  return "bronze";
}

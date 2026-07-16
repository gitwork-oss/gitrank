import { formatCount } from "../format";
import type { WorkRateLevel } from "../types";

/** Reason templates for report traits - formatting only, no scoring. */
export const TRAIT_COPY = {
  skillMoves: (languages: number, bonusRepos: number | null) => {
    const langBit = `${languages} language${languages === 1 ? "" : "s"} on their public profile`;
    const repoBit =
      bonusRepos != null ? ` across ${formatCount(bonusRepos)} repos` : "";
    return `${langBit}${repoBit}.`;
  },
  weakFoot: (weakSideAvg: number) =>
    `Their three weakest scores average ${weakSideAvg}/99. Higher means fewer soft spots.`,
  workRate: (attack: WorkRateLevel, defense: WorkRateLevel) =>
    `Shipping ${attack} from recent activity and impact; care ${defense} from reviews and issues.`,
} as const;

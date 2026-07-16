import { CADENCE, type CadenceId } from "./ui";

/** Tooltip / report reasons for each cadence - no logic here. */
export const CADENCE_REASONS: Record<CadenceId, string> = {
  explosive: "A recent burst well above their usual volume.",
  relentless: "Active on most days, all year round.",
  controlled: "A long, steady track record.",
  clinical: "One big public hit, quieter lately.",
  industrious: "Steadily active this year.",
  measured: "Light recent public activity.",
};

export function cadenceLabel(id: CadenceId) {
  return CADENCE[id];
}

export function cadenceReason(id: CadenceId) {
  return CADENCE_REASONS[id];
}

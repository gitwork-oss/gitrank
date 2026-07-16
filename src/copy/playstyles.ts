import { formatCount } from "../format";

export type PlaystyleId =
  | "starMagnet"
  | "viralHit"
  | "workhorse"
  | "rapidFire"
  | "marathoner"
  | "maintainer"
  | "connector"
  | "magnetic"
  | "polyglot"
  | "prolific"
  | "veteran";

/** Display strings + lucide icon keys for playstyles. */
export const PLAYSTYLE_COPY: Record<
  PlaystyleId,
  { name: string; icon: string; noun: string }
> = {
  starMagnet: { name: "Star Magnet", icon: "star", noun: "stars earned" },
  viralHit: { name: "Viral Hit", icon: "flame", noun: "stars on one repo" },
  workhorse: { name: "Workhorse", icon: "zap", noun: "active days this year" },
  rapidFire: { name: "Rapid Fire", icon: "fast-forward", noun: "contributions this year" },
  marathoner: { name: "Marathoner", icon: "infinity", noun: "lifetime contributions" },
  maintainer: { name: "Maintainer", icon: "shield", noun: "reviews & issues" },
  connector: { name: "Connector", icon: "git-pull-request", noun: "pull requests" },
  magnetic: { name: "Magnetic", icon: "users", noun: "followers" },
  polyglot: { name: "Polyglot", icon: "languages", noun: "languages" },
  prolific: { name: "Prolific", icon: "folder-git", noun: "public repos" },
  veteran: { name: "Veteran", icon: "clock", noun: "years on GitHub" },
};

export function playstyleReason(noun: string, value: number, plus: boolean): string {
  return `${formatCount(value)} ${noun}${plus ? ", top tier for this signal" : ""}.`;
}

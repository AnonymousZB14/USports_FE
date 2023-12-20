import { atom } from "recoil";

export const DarkModeState = atom({
  key: "darkmodeState",
  default: false,
});
export const WitingMode = atom({
  key: "writingmodeState",
  default: false,
});

import { atom } from "recoil";

export const RecordsState = atom({
  key: "recordsState",
  default: [{ recordId: 0, imageAddress: "https://via.placeholder.com/200" }],
});

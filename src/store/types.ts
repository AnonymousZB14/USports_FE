import { atom } from 'recoil'

export const SportsList = atom({
  key: 'sportsList',
  default: [{sportsId:0,sportsName:''}],
})
export const SportsLevelList = atom({
  key: 'sportsLevelList',
  default: [],
})
export const RegionList = atom({
  key: 'regionList',
  default: [],
})

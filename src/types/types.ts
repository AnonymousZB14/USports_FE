import { Recruit } from '@/components/recruits'
export interface AddressType {
  address: string
  postCode: string
  additional: string
  type?: 'button' | 'submit' | 'reset'
}
export interface UserProfile {
  id: number
  name: string
  profileImage: string
}
export interface User {
  id: string
  nickname: string
  profileImage: string
}
export type Record = {
  accountName: string
  countComment: number
  imageAddressList: string[]
  memberId: number
  recordContent: string
  recordId: number
  registeredAt: Date
  sportsId: number
  updatedAt: Date
}
export type Records = Record[]

export interface FilterDialogProps {
  onApplyFilter: (filter: string) => void
  onClose: () => void
  options: string[]
  selectedFilterName: string
}

export interface Notification {
  createdAt: string
  entityType: string
  memberId: number
  message: string
  notificationId: number
  readAt: string
  targetEntityId: number
  type: string
  url: string
}

export interface Post {
  postId: number
  User: User
  content: string
  createdAt: Date
  Images: []
}

export interface ProfileUserType {
  memberProfile: {
    accountName: string
    email: string
    interestSportsList: string[]
    mannerScore: number
    memberId: number
    name: string
    plusAlpha: number
    profileImage: string
  }
  sportsSkills: [
    {
      sportsGrade: string
      sportsName: string
      sportsSkillId: number
    },
  ]
}

// OptionProps
export interface SportsLevel {
  sportsGrade: string
  description: string
}

export interface SportsItem {
  sportsId: number
  sportsName: string
}

export interface OptionProps {
  genderList: string[]
  regionList: string[]
  sportsLevelList: SportsLevel[]
  sportsList: SportsItem[]
}

// Recruit 모집글 작성
export interface Recruit {
  address: string
  content: string
  cost: number
  gender: string
  gradeFrom: string
  gradeTo: string
  meetingDate: string
  placeName: string
  postCode: string
  recruitCount: number
  region: string
  sportsId: number
  title: string
}

// Recruit 상세 페이지
export interface recruitItemProps {
  title: string
  content: string
  cost: number
  gender: string
  gradeFrom: number
  gradeTo: number
  lat: number
  lnt: number
  memberAccountName: string
  participantSportsSkillAverage: string
  meetingDate: string
  recruitId: number
  memberId: number
  placeName: string
  recruitCount: number
  recruitStatus: string
  region: string
  registeredAt: string
  sportsName: string
  streetNameAddr: string
  streetNumberAddr: string
  updatedAt: string
}

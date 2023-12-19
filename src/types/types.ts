export interface UserDetailInfo {
  accountName: string
  activeRegion?: string
  birthDate?: Date
  email?: string
  evaluationCount?: number
  gender?: string
  kindnessScore?: number
  passionScore?: number
  mannerScore?: number
  role?: string
  password?: string
  memberId?: number
  interestedSports?: number[]
  name?: string
  phoneNumber?: string
  profileContent?: string
  profileImage?: string
  teamworkScore?: number
  updatedAt?: Date
  username?: string
  profileOpen?: string
  tokenDto: {
    accessToken: string
    refreshToken: string
    tokenType: string
  }
}

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
export interface RecordDetailComment {
  accountName: string
  commentId: number
  content: string
  memberId: number
  name: string
  parentId: number
  profileImage: string
  recordId: number
  registerAt: Date
  updatedAt: Date
}
export interface RecordDetail {
  accountName: string
  commentList: RecordDetailComment[]
  countComment: number
  imageAddressList: string[]
  memberId: number
  name: string
  profileImage: string
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
  memberInfo: {
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

export interface optionProps {
  genderList: string[]
  regionList: string[]
  sportsLevelList: string[]
  sportsList: string[]
}

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
export interface HomeRecord {
  currentPage: number
  list: HomeRecordListItem[]
}
export interface HomeRecordListItem {
  accountName: string
  commentList: [
    {
      accountName: string
      commentId: number
      content: string
      memberId: number
      name: string
      parentId: number
      profileImage: string
      recordId: number
      registerAt: Date
      updatedAt: Date
    },
  ]
  countComment: number
  imageAddressList: string[]
  memberId: number
  name: string
  profileImage: string
  recordContent: string
  recordId: number
  registeredAt: Date
  sportsId: number
  updatedAt: Date
}

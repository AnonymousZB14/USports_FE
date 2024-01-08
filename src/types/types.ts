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
  currentUserLikes: boolean
  countRecordLike: number
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
  createdAt: Date
  entityType: string
  memberId: number
  message: string
  notificationId: number
  readAt: Date
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
  followStatus: string | null
  memberInfo: {
    profileOpen: boolean
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

export type SportsList = { sportsId: number; sportsName: string }[]
export type LevelList = { sportsGrade: string; description: string }[]
export interface ExploreData {
  currentPage: number
  totalPages: number
  list: recruitItemProps[]
  totalElement: number
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
  memberAccountName?: string
  participantSportsSkillAverage?: string
  meetingDate: string
  recruitId: number
  memberId: number
  placeName: string
  recruitCount: number
  recruitStatus: string
  region: string
  registeredAt: string
  sportsName?: string
  sportsId: number
  streetNameAddr: string
  streetNumberAddr: string
  updatedAt: string
}
export interface HomeRecord {
  currentPage: number
  list: HomeRecordListItem[]
  totalPages: number
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
  countRecordLike: number
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

export interface MypageData {
  memberProfile: {
    accountName: string
    email: string
    interestSportsList: {
      sportsId: number
      sportsName: string
    }[]
    mannerScore: number
    memberId: number
    name: string
    profileImage: string
  }
  myRecruitList: {
    gender: string
    recruitId: number
    sportsName: string
    status: string
    title: string
  }[]

  participateList: {
    recruitId: number
    recruitTile: string
    sportsName: string
    status: string
  }[]

  recruitAndParticipants: {
    memberList: [
      {
        accountName: string
        accountNonExpired: boolean
        accountNonLocked: boolean
        activeRegion: string
        attributes: {}
        authorities: {
          authority: string
        }[]

        birthDate: Date
        credentialsNonExpired: boolean
        email: string
        emailAuthAt: Date
        enabled: boolean
        evaluationCount: number
        gender: string
        kindnessScore: number
        loginBy: string
        mannerScore: number
        memberId: number
        name: string
        passionScore: number
        password: string
        penaltyCount: number
        phoneNumber: string
        profileImage: string
        profileOpen: boolean
        registeredAt: Date
        role: string
        teamworkScore: number
        updatedAt: Date
        username: string
      },
    ]
    recruit: {
      content: string
      cost: number
      gender: string
      gradeFrom: string
      gradeTo: string
      lat: string
      lnt: string
      meetingDate: Date
      memberId: number
      placeName: string
      recruitCount: number
      recruitId: number
      recruitStatus: string
      region: string
      registeredAt: Date
      sportsName: string
      streetNameAddr: string
      streetNumberAddr: string
      title: string
      updatedAt: Date
    }
  }[]

  sportsSkills: [
    {
      sportsGrade: 'AMATEUR_1'
      sportsName: string
      sportsSkillId: number
    },
  ]
}

export interface RecruitApplicants {
  acceptedList: AcceptedList[]
  currentCount: number
  ingList: IngList[]
  status: string
  totalCount: number
}
export interface AcceptedList {
  accountName: string
  gender: string
  memberId: number
  sportsSkill: string
  status: string
}
export interface IngList {
  accountName: string
  gender: string
  memberId: number
  sportsSkill: string
  status: string
}

export type Rooms = Room[]
export interface Room {
  chatRoomId: number
  chatRoomName: string
  lastReadChatId: string
  memberId: number
  partakeId: number
  recruitId: number
  unreadChatCount: number
}

import { atom } from 'recoil'
const token = localStorage.getItem('usportsAccessToekn')
export const UserState = atom({
  key: 'userState',
  default: {
    id: '0',
    name: '',
    email: '',
    profileImage: 'https://via.placeholder.com/200',
    accessToken: token || '',
  },
})
export const UserDetailState = atom({
  key: 'userDetailState',
  default: {
    accountName: '',
    activeRegion: '',
    birthDate: '000-00-00',
    email: '',
    evaluationCount: 0,
    gender: '',
    kindnessScore: 0,
    mannerScore: 0,
    passionScore: 0,
    role: '',
    password: '',
    memberId: 0,
    interestedSports: [0],
    name: '',
    phoneNumber: '',
    profileContent: '',
    profileImage: '',
    teamworkScore: 0,
    updatedAt: '000-00-00',
    username: '',
    profileOpen: '',
    tokenDto: {
      accessToken: '',
      refreshToken: '',
      tokenType: '',
    },
  },
})

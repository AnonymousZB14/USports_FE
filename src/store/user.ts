import { atom } from 'recoil'
export const UserState = atom({
  key: 'userState',
  default: {
    id: '0',
    name: '',
    email: '',
    profileImage: 'https://via.placeholder.com/200',
    accessToken: '',
  },
})
export const UserDetailState = atom({
  key: 'userDetailState',
  default: {
    accountName: '',
    activeRegion: '',
    attributes: {},
    authorities: [
      {
        authority: '',
      },
    ],
    birthDate: '',
    email: '',
    emailAuthAt: '2023-12-18T09:39:45.148Z',
    enabled: true,
    evaluationCount: 0,
    gender: '',
    kindnessScore: 0,
    loginBy: '',
    mannerScore: 0,
    memberId: 0,
    name: '',
    passionScore: 0,
    password: '',
    phoneNumber: '',
    profileImage: '',
    profileOpen: true,
    registeredAt: '2023-12-18T09:39:45.148Z',
    role: 'U',
    teamworkScore: 0,
    updatedAt: '2023-12-18T09:39:45.148Z',
    username: '',
    interestedSportsList: [{
      sportsId: 0,
      sportsName: '',
    }],

    /*     tokenDto: {
      accessToken: '',
      refreshToken: '',
      tokenType: '',
    }, */
  },
})
export const UserTokenState = atom({
  key: 'userTokenState',
  default: {
    accessToken: '',
    refreshToken: '',
    tokenType: '',
  },
})

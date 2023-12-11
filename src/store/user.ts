import { atom } from 'recoil'

export const UserState = atom({
  key: 'userState',
  default: {
    id: '0',
    name: '',
    email: '',
    profileImage: 'https://via.placeholder.com/200',
  },
})

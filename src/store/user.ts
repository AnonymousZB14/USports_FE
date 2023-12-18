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
/* export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
  // effects_UNSTABLE: [persistAtom],
}) */

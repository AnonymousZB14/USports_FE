import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import axios from 'axios'
import { onLoginSuccess } from './func/authServices'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/createAccount',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials)
        const authResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/member/login`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials?.password,
            }),
          },
        )
        const { user } = await authResponse.data
        const { tokenDto } = user
        console.log('User from server:', user, tokenDto)
        axios.defaults.headers.common.Authorization = `Bearer ${tokenDto}`
        if (authResponse.status === 401) {
          console.log('로그인 에러')
          throw new Error('로그인 실패')
        } else {
          const { user } = await authResponse.data
          console.log('User from server:', user)
          return {
            id: 1, // 임시
            email: user.tokenDto,
            name: user.email,
            image: user.image,
            ...user,
          }
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log('auth.ts jwt', token)
      token.accessToken = user?.email
      return token
    },
    session({ session, newSession, user }) {
      console.log('auth.ts session', session, newSession, user)

      return session
    },
  },
  events: {
    signOut(data) {
      console.log(
        'auth.ts events signout',
        'session' in data && data.session,
        'token' in data && data.token,
      )
      if ('session' in data) {
        data.session = null
      }
      if ('token' in data) {
        data.token = null
      }
    },
    session(data) {
      console.log(
        'auth.ts events session',
        'session' in data && data.session,
        'token' in data && data.token,
      )
    },
  },
})

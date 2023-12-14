import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import axios from 'axios'
import { NextResponse } from 'next/server'
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
        const user = await authResponse.data
        console.log('User from server:', user)
        if (authResponse.status === 401) {
          console.log('에러에러에러 없는 유저다')
          throw new Error('로그인 실패')
        } else {
          const { tokenDto: user } = await authResponse.data

          console.log('User from server:', user)
          // return user
          return {
            id: 1,
            email: user.accessToken,
            name: user.refreshToken,
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
      session.user?.email
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

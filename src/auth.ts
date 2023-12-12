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
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials)
        const authResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/api/login`,
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
        return {
          id: user.id,
          email: user?.email,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token }) {
      console.log('auth.ts jwt', token)
      token.userId = token.test = 'test'
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

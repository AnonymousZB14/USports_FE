import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import cookie from 'cookie'
import axios from 'axios'
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
        const authResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/api/login`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credentials?.username,
              password: credentials?.password,
            }),
          },
        )

        const user = await authResponse.data

        console.log('User from server:', user)
        return {
          ...user,
        }
      },
      credentials: undefined,
    }),
  ],
})

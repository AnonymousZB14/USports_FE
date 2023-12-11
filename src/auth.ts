import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
      async authorize(credentials: Record<any, any>, req: any) {
        console.log(credentials)
        const authResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/api/login`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credentials.id,
              password: credentials?.password,
            }),
          },
        )
        const user = await authResponse.data
        console.log('User from server:', user)
        return {
          email: { email: user.email, id: user.id },
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
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

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import cookie from 'cookie'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    newUser: '/createAccount',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token }) {
      console.log('auth.ts jwt', token)
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
      // if ('session' in data) {
      //   data.session = null;
      // }
      // if ('token' in data) {
      //   data.token = null;
      // }
    },
    session(data) {
      console.log(
        'auth.ts events session',
        'session' in data && data.session,
        'token' in data && data.token,
      )
    },
  },
  providers: [
    CredentialsProvider({    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })
        let setCookie = authResponse.headers.get('Set-Cookie')
        console.log('set-cookie', setCookie)
        if (setCookie) {
          const parsed = cookie.parse(setCookie)
          cookies().set('connect.sid', parsed['connect.sid'], parsed) // 브라우저에 쿠키를 심어주는 것
        }
        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log('user', user)
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ],
})

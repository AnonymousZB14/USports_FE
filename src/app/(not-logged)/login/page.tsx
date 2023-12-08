import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="loginP notLoggedP centered">
      <h2>
        Log into USports
      </h2>
      <form>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <input type="submit" value="Log in" />
      </form>
      <div className="linkWrap">
        <Link href={'/findPassword'}>Find Password</Link>
        <Link href={'/createAccount'}>Create Account</Link>
      </div>
      <hr />
      <div className="kakaoLogBtn"></div>
    </div>
  )
}

export default page

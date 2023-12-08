'use client'
import Link from 'next/link'
import React, { FormEventHandler, useLayoutEffect, useState } from 'react'

const page = () => {

  const [sendingEmailSuccess, setSendingEmailSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
    } catch (error) {
      // setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  useLayoutEffect(() => {}, [])
  return (
    <div className="findPwdP notLoggedP centered">
      <h2>Find Password</h2>
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
            type="tel"
            name="phoneNum"
            id="phoneNum"
            placeholder="phone Number"
            required
          />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
          />
        </div>
        <input
          type="submit"
          value={
            sendingEmailSuccess
              ? "Check your Email !"
              : isLoading
              ? "Sending..."
              : "Send"
          }
        />
      </form>
      <div className="linkWrap">
        <Link href={'/login'}>Back to Login </Link>
      </div>
    </div>
  )
}

export default page

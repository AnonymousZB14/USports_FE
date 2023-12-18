'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import axios from 'axios'

export default async (prevState: any, formData: FormData) => {
  if (
    !formData.get('accountName') ||
    !(formData.get('accountName') as string)?.trim()
  ) {
    return { message: 'no_accountName' }
  }
  /*   if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return { message: 'no_name' }
  } */
  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' }
  }
  /*   if (!formData.get('image')) {
    return { message: 'no_image' }
  } */

  let shouldRedirect = false
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/register`,
      {
        method: 'post',
        body: formData,
        credentials: 'include',
      },
    )
    console.log(response.status)
    console.log(formData)
    // console.log(await response.data)
    /*     if (response.status === 403) {
      return { message: 'user_exists' }
    } */
    // console.log(await response.data)
    // shouldRedirect = true
    /*     await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false,
    }) */
  } catch (err) {
    console.error(err)
    return { message: null }
  }

  /*   if (shouldRedirect) {
    redirect('/home') // try/catch문 안에서 X
  } */
  // return { message: 'success' }
}

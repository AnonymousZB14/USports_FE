// GET USER RECORD API (MOCK)

export const getUsersRecords = async (accountName?: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${accountName}-records`,
    {
      next: { revalidate: 10 },
    },
  )
  if (!res.ok) {
    throw new Error('Failed to fetch user data!')
  }
  return res.json()
}

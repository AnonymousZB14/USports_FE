// type Props = { pageParam?: number }
export async function getPostFollowings() {
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_BACKEND_URL}/home?`,
    // `${process.env.NEXT_PUBLIC_BACKEND_URL}/home?page=1`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postFollowings`,
    {
      next: {
        tags: ['records', 'followings'],
      },
      // cache: 'no-store',
    },
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

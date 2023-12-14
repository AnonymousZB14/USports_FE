import LocalStorage from '@/func/localstrage'
type Props = { pageParam?: number }
export async function getPostFollowings({ pageParam }: Props) {
  const TOKEN = LocalStorage.getItem('usports_token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postFollowings?page=${pageParam}`,
    {
      next: {
        tags: ['records', 'followings'],
      },
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

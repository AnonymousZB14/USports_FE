'use client'
import { WitingMode } from '@/store/mode'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

export const WritingPageListWrap = () => {
  const onClickHandler = () => {
    setMode(false)
  }
  const [mode, setMode] = useRecoilState(WitingMode)
  if (!mode) return null
  return (
    <div className="writingPageList">
      <div>
        <ul className="menu menu-lg bg-base-200 rounded-box">
          <li>
            <Link href={'/recruit'} onClick={onClickHandler}>
              모집글 작성하기 ✏️
            </Link>
          </li>
          <li>
            <Link href={'/record'} onClick={onClickHandler}>
              기록글 작성하기 🙌🏻
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

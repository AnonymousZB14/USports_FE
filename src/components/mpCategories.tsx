import Link from 'next/link'
import React from 'react'

const MpCategories = ({
  activeCate,
  activeSec,
}: {
  activeCate: string
  activeSec: string
}) => {
  const categories = [
    { title: '평가하기', href: '#mp1' },
    { title: '신청현황', href: '#mp2' },
    { title: '모집관리', href: '#mp3' },
    { title: '정보수정', href: '#mp4' },
  ]
  const LinkOnClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!((e.target as HTMLAnchorElement).nodeName === 'A')) return
    const target = e.target as HTMLAnchorElement
    if (!document) return
    const location = (document?.querySelector(target.hash) as HTMLElement)
      .offsetTop
    const mypageSec = document?.querySelector('.mypageWrap') as HTMLDivElement
    console.dir(mypageSec.scrollTo)
    mypageSec.scrollTo({ top: 1000 })
  }
  return (
    <ul className="mpCategories">
      {categories.map((category, idx) => {
        return (
          <li
            key={idx}
            className={category.title === activeCate ? 'active' : ''}
          >
            <Link onClick={LinkOnClickHandler} href={category.href}>
              {category.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MpCategories

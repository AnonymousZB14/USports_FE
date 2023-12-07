'use client'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect } from 'react'

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
  const LinkOnClickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    if ((e.target as HTMLAnchorElement).nodeName !== 'A') return
    const location = (
      document.querySelector(
        (e.target as HTMLAnchorElement).dataset.href + '',
      ) as HTMLElement
    ).offsetTop
    const $main = document.querySelector('main')
    if (!$main) return
    $main.scrollTo({
      top: location - window.innerHeight / 3,
      behavior: 'smooth',
    })
  }
  return (
    <ul className="mpCategories" onClick={LinkOnClickHandler}>
      {categories.map((category, idx) => {
        return (
          <li
            key={idx}
            className={category.title === activeCate ? 'active' : ''}
          >
            <Link
              href={'#none'}
              data-href={category.href}
              onClick={(e) => e.preventDefault()}
            >
              {category.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MpCategories

'use client'
import CateUl from '@/components/cateUl'
import Feed from '@/components/feed'
import { scrollHandler } from '@/func/scrollEvent'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import FollowFeed from '../home/_component/followFeed'

export default function Home() {
  const [number, setNum] = useState(0)
  const homeRef = useRef(null)
  useLayoutEffect(() => {
    if (homeRef.current === null) return
    scrollHandler(homeRef.current)
  }, [homeRef])
  const divRef = useRef<HTMLDivElement | null>(null)
  const cateOnclick = (e: React.MouseEvent<HTMLUListElement>) => {
    const num = [...e.currentTarget.children].indexOf(e.target as HTMLLIElement)
    setNum(num)
  }
  useEffect(() => {
    ;[...(divRef.current as HTMLDivElement).children].forEach((div, idx) => {
      idx === number
        ? div.classList.add('active')
        : div.classList.remove('active')
    })
  }, [number])
  return (
    <section ref={homeRef} className="padding0 home_section">
      <div className="top_section">
        <CateUl onClick={cateOnclick} categories={['For You', 'Following']} />
      </div>
      <div className="tab_contents" ref={divRef}>
        <div className="recommend">{/* <Feed /> */}</div>
        <div className="following">
          <FollowFeed />
        </div>
      </div>
    </section>
  )
}



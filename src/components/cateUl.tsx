'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRef } from 'react'
type cateUlProp = {
  categories: string[]
  onClick?: (e: React.MouseEvent<HTMLUListElement>) => void
}
const CateUl = ({ categories, onClick }: cateUlProp) => {
  const [positionX, setPosX] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)
  const cateUlRef = useRef<HTMLUListElement>(null)
  const ClickborderAni = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!spanRef.current) return
    setPosX(
      (e.target as HTMLLIElement).offsetLeft +
        (e.target as HTMLLIElement).offsetWidth * 0.5,
    )
  }
  useLayoutEffect(() => {
    if (!(cateUlRef.current && cateUlRef.current.firstElementChild)) return
    setPosX(cateUlRef.current.firstElementChild.clientWidth * 0.5)
  }, [])
  useEffect(() => {
    if (!spanRef.current) return
    spanRef.current.style.setProperty('left', positionX + 'px')
  }, [positionX])
  return (
    <div className="cate">
      <ul ref={cateUlRef} onClick={onClick}>
        {categories.map((category, idx) => (
          <li key={idx} onClick={ClickborderAni}>
            {category}
          </li>
        ))}
      </ul>
      <span ref={spanRef} className="border"></span>
    </div>
  )
}

export default CateUl

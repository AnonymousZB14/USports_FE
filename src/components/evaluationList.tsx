'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'
const EvaluationList = () => {
  return (
    <ul className="evaluationList">
      <EvaluationItem />
      <EvaluationItem />
      <EvaluationItem />
    </ul>
  )
}

export const EvaluationItem = () => {
  const [showList, setShowList] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    console.log(showList)
    btnRef.current?.classList.toggle('active')
    if (showList) {
      listRef.current?.classList.add('show')
    } else {
      listRef.current?.classList.remove('show')
    }
  }, [showList])
  return (
    <li>
      <div className="evitemCont">
        <div className="sportsBadge">축구</div>
        <div className="cont">
          <div className="title">
            <p>안양 평촌 칼라힐</p>
          </div>
          <div className="sub">
            <p className="subCon">21:00</p>
            <p className="conditions">
              <span>남녀모두</span>
              <span>모든 레벨</span>
            </p>
          </div>
        </div>
        <Link href="/profile">평가하기</Link>
        <button
          ref={btnRef}
          className="toggleBtn"
          onClick={() => {
            setShowList(!showList)
          }}
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div className="evitemList" ref={listRef}>
        <ul>
          <li>
            <p>{'NaraLee'}</p>
            <span>{`@${'nar***'}`}</span>
          </li>
          <li>
            <p>{'NaraLee'}</p>
            <span>{`@${'nar***'}`}</span>
          </li>
          <li>
            <p>{'NaraLee'}</p>
            <span>{`(@${'nar***'})`}</span>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default EvaluationList

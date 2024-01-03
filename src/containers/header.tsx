'use client'
import Avatar from '@/components/avatar'
import Link from 'next/link'
import React, { useLayoutEffect } from 'react'
import LogoutBtn from '@/components/logoutBtn'
import ModeToggle from '@/components/modeToggle'
import MypageBtn from '@/components/mypageBtn'
import { GoHomeFill } from 'react-icons/go'
import { FaUserAlt } from 'react-icons/fa'
import { MdExplore } from 'react-icons/md'
import { IoMail, IoNotifications } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import WritingBtn from '@/components/writingBtn'
import { cookies } from 'next/headers'
import RoleChange from '@/components/roleChange'
import UserProfile from '@/components/user_profile'
import { HamBtn } from '@/components/hambtn'
import { useRecoilState } from 'recoil'
import { OpenHeader } from '@/store/mode'
import { usePathname } from 'next/navigation'
const Header = () => {
  const [openMode, setOpenmode] = useRecoilState(OpenHeader)
  const pathname = usePathname()
  useLayoutEffect(() => {
    setOpenmode((prev) => {
      return prev === true && false
    })
  }, [pathname])
  const navList = [
    {
      href: '/',
      title: 'home',
      icon: <GoHomeFill />,
    },
    {
      href: '/explore',
      title: 'Explore',
      icon: <MdExplore />,
    },
    {
      href: '/notifications',
      title: 'Notifications',
      icon: <IoNotifications />,
    },
    {
      href: '/messages',
      title: 'Messages',
      icon: <IoMail />,
    },
    {
      href: '/profile',
      title: 'Profile',
      icon: <FaUserAlt />,
    },
    {
      href: '/mypage',
      title: 'Mypage',
      icon: <IoMdSettings />,
    },
  ]
  return (
    <>
      <header id="header" className={openMode === true ? 'block' : ''}>
        <RoleChange />
        <div className="head_inner" style={{ overflowY: 'auto' }}>
          <UserProfile />
          <nav>
            <ul>
              {navList.map((cate, idx) => {
                return (
                  <li key={idx}>
                    <Link href={cate.href}>
                      <span>
                        {cate.icon}
                        {cate.title}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
      <div className="iconWrap bg-primary">
        <ModeToggle />
        <LogoutBtn />
        <MypageBtn />
        <WritingBtn />
      </div>
    </>
  )
}

export default Header

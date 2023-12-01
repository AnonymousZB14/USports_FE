import Avatar from "@/components/avatar";
import Link from "next/link";
import React from "react";
import { UserProfile } from "@/types/user";
import LogoutBtn from "@/components/logoutBtn";
import ModeToggle from "@/components/modeToggle";

const Header = () => {
  const navList = [
    {
      href: "/",
      title: "home",
    },
    {
      href: "/explore",
      title: "Explore",
    },
    {
      href: "/notifications",
      title: "Notifications",
    },
    {
      href: "/messages",
      title: "Messages",
    },
    {
      href: "/profile",
      title: "Profile",
    },
    {
      href: "/mypage",
      title: "Mypage",
    },
  ];
  return (
    <header id="header">
      <div className="head_inner">
        <Avatar width="100px" height="100px" />
        <nav>
          <ul>
            {navList.map((cate, idx) => {
              return (
                <li key={idx}>
                  <Link href={cate.href}>{cate.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="iconWrap">
          <ModeToggle />
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;

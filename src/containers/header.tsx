import Avatar from "@/components/avatar";
import Link from "next/link";
import React from "react";
import { UserProfile } from "@/types/user";
import LogoutBtn from "@/components/logoutBtn";
import ModeToggle from "@/components/modeToggle";

const Header = () => {
  return (
    <header id="header">
      <div className="head_inner">
        <Avatar width="100px" height="100px" />
        <nav>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/explore"}>Explore</Link>
            </li>
            <li>
              <Link href={"/notifications"}>Notifications</Link>
            </li>
            <li>
              <Link href={"/messages"}>Messages</Link>
            </li>
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/mypage"}>Mypage</Link>
            </li>
          </ul>
        </nav>
        <ModeToggle />
        <LogoutBtn />
      </div>
    </header>
  );
};

export default Header;

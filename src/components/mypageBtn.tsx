"use client";
import Link from "next/link";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
const MypageBtn = () => {
  return (
    <Link href={'/mypage'}>
      <FaRegUserCircle />
    </Link>
  );
};

export default MypageBtn;

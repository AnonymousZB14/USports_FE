"use client";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
const LogoutBtn = () => {
  const router = useRouter();
  const onLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃되었습니다");
      router.push("/login");
    }
  };
  return (
    <div onClick={onLogout}>
      <FiLogOut />
    </div>
  );
};

export default LogoutBtn;

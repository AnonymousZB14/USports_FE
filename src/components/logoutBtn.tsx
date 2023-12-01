"use client";
import React from "react";
import { FiLogOut } from "react-icons/fi";
const onLogout = () => {};
const LogoutBtn = () => {
  return (
    <div onClick={onLogout}>
      <FiLogOut />
    </div>
  );
};

export default LogoutBtn;

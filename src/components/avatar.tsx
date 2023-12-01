"use client";
import { checkUser } from "@/api/user";
import { useEffect, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { UserState, UserState as userstate } from "@/store/user";
const Avatar = ({ width, height }: { width?: string; height?: string }) => {
  const [user, setUser] = useRecoilState(UserState);
  useEffect(() => {
    checkUser().then((resp) => {
      setUser(resp);
    });
  }, [setUser]);
  return (
    <div style={{ width: width, height: height }}>
      <div className="avatar_img">
        <img src={user.profileImage} alt="profileImage" />
      </div>
    </div>
  );
};

export default Avatar;

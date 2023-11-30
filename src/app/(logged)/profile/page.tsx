"use client";
import Avatar from "@/components/avatar";
import CateUl from "@/components/cateUl";
import Records from "@/components/records";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [number, setNum] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const cateOnclick = (e: React.MouseEvent<HTMLUListElement>) => {
    const num = [...e.currentTarget.children].indexOf(
      e.target as HTMLLIElement
    );
    setNum(num);
  };
  useEffect(() => {
    [...(divRef.current as HTMLDivElement).children].forEach((div, idx) => {
      idx === number
        ? div.classList.add("active")
        : div.classList.remove("active");
    });
  }, [number]);
  return (
    <>
      <div className="profile_info">
        <div className="inner">
          <Avatar />
          <div className="user_info">
            <h3>username</h3>
            <p>@userId</p>
          </div>
        </div>
      </div>
      <div className="profile_contents">
        <CateUl onClick={cateOnclick} categories={["기록", "모집글"]} />
        <div className="contents" ref={divRef}>
          <div className="records"><Records /></div>
          <div className="recruits">recruits</div>
        </div>
      </div>
    </>
  );
};

export default Page;

"use client";
import Avatar from "@/components/avatar";
import CateUl from "@/components/cateUl";
import Records from "@/components/records";
import Recruits, { Recruit } from "@/components/recruits";
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
        <CateUl onClick={cateOnclick} categories={["Record", "Recruit"]} />
        <div className="tab_contents" ref={divRef}>
          <div className="records">
            <Records />
          </div>
          <div className="recruits">
            <Recruits />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

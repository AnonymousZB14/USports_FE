"use client";
import UserInfoSec from "@/components/userInfoSec";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { scrollHandler } from "@/func/scrollEvent";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegCommentAlt, FaHeart } from "react-icons/fa";
import Comment from "@/components/comment";
type PageParams = {
  id: string;
};
const page = ({ params }: { params: PageParams }) => {
  const router = useRouter();
  const pageRef = useRef(null);
  useLayoutEffect(() => {
    if (pageRef.current === null) return;
    scrollHandler(pageRef.current);
  }, [pageRef]);
  return (
    <section ref={pageRef} className="record_detail_sec">
      <div className="page_top">
        <button onClick={() => router.back()}>
          <IoArrowBackCircleOutline />
        </button>
        <UserInfoSec />
      </div>
      <div className="page_mid">
        <div className="record_img_sec">
          <ul>
            <li>
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f"
                  alt="img"
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="icon_wrap">
          <FaHeart />
          <FaRegCommentAlt />
        </div>
        <div className="record_contents">
          <span>username</span>
          <p>러닝 오운완</p>
        </div>
      </div>
      <div className="page_btm">
        <div className="comments">
          <Comment />
          <Comment />
        </div>
      </div>
    </section>
  );
};

export default page;

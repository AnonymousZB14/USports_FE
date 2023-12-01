import UserInfoSec from "@/components/userInfoSec";
import React from "react";
import { useRouter } from "next/navigation";
type PageParams = {
  id: string;
};
const page = ({ params }: { params: PageParams }) => {
  const router = useRouter();
  return (
    <section className="record_detail_sec">
      <div className="page_top">
        {/* <button onClick={() => router.back()}>뒤로가기</button> */}
        <UserInfoSec />
      </div>
      <div className="page_mid">
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
      <div className="page_btm">
        <div className="icon_wrap"></div>
        <div className="comments"></div>
      </div>
    </section>
  );
};

export default page;

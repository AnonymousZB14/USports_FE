import React from "react";
import Avatar from "./avatar";

const Comment = ({ depth }: { depth?: boolean }) => {
  return (
    <div className="comment">
      <div className="avatar_wrap" style={{ width: "35px", height: "35px" }}>
        <Avatar />
      </div>
      <div className="comment_body">
        <ul>
          <li>
            <span className="username">naraLee</span>
            <span className="userid">@userid</span>
          </li>
          <li>
            <p>운동 열심히 했ㄴㅔ</p>
          </li>
          <li>
            <button>답글 달기</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Comment;

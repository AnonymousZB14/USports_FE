import React from "react";
import Avatar from "./avatar";

const UserInfoSec = () => {
  return (
    <div className="userInfoSec">
      <Avatar width="60px" height="60px" />
      <div className="user_info">
        <h3>username</h3>
        <p>@userId</p>
      </div>
    </div>
  );
};

export default UserInfoSec;

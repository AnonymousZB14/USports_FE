import React from "react";
import UserInfoSec from "./userInfoSec";
import Link from "next/link";

const Recruits = () => {
  return (
    <ul>
      <Recruit id={"001"} />
      {/* <Recruit /> */}
      {/* <Recruit /> */}
    </ul>
  );
};

export const Recruit = ({ id }: { id: string }) => {
  return (
    <li>
      <Link href={`/detail/${id}`}>
        <UserInfoSec />
        <div className="recruit_body">
          <h4>Lorem ipsum dolor sit amet</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Link>
    </li>
  );
};
export default Recruits;

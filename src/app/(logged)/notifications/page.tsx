import Notifications from "@/components/notifications";
import Title from "@/components/title";
import React from "react";

const page = () => {
  return (
    <>
      <Title title="Notifications" />
      <div className="notifications">
        <Notifications />
      </div>
    </>
  );
};

export default page;

import Notifications from "@/components/notifications";
import Title from "@/components/title";
import React from "react";

const page = () => {
  return (
    <>
      <Title title="Notifications" />
      <section className="notifications">
        <Notifications />
      </section>
    </>
  );
};

export default page;

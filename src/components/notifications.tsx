import React from "react";
import { IoMdNotifications } from "react-icons/io";
const Notifications = () => {
  const list = [
    {
      id: 1,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
    {
      id: 2,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
    {
      id: 3,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
    {
      id: 4,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
    {
      id: 5,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
    {
      id: 6,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
    {
      id: 7,
      title: "New notification!",
      body: "Your application for recruitment has been accepted",
    },
  ];
  return (
    <ul>
      {list.map((item) => {
        return (
          <Notification key={item.id} title={item.title} body={item.body} />
        );
      })}
    </ul>
  );
};

export const Notification = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  return (
    <li>
      <div role="alert" className="alert shadow-lg">
        <IoMdNotifications />
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{body}</div>
        </div>
        <button className="btn btn-sm">DELETE</button>
      </div>
    </li>
  );
};
export default Notifications;

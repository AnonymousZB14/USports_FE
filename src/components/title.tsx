import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div id="title">
      <h2>{title}</h2>
    </div>
  );
};

export default Title;

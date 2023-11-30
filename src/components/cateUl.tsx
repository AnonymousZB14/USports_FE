"use client";
import React from "react";
import { useRef } from "react";
type cateUlProp = {
  categories: string[];
  onClick?: (e: React.MouseEvent<HTMLUListElement>) => void;
};
const CateUl = ({ categories, onClick }: cateUlProp) => {
  const spanRef = useRef(null);
  return (
    <div className="cate">
      <ul onClick={onClick}>
        {categories.map((category, idx) => (
          <li key={idx}>{category}</li>
        ))}
      </ul>
      <span ref={spanRef} className="border"></span>
    </div>
  );
};

export default CateUl;

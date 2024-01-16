"use client"
import BackBtn from '@/components/backBtn';
import React from 'react';

const ErrorComponent = () => {
  return (
    <div id="modal">
      <div className="modalInner">
        <BackBtn />
        <p>해당 채팅방을 이용하실 수 없습니다</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
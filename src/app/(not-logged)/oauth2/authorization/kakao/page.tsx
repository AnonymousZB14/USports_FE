import Auth2Redirect from '@/app/(not-logged)/_component/auth2Redirect';
import React from 'react';

const page = () => {
  return (
    <div>
      <p>카카오 로그인 페이지</p>
      <Auth2Redirect />
    </div>
  );
};

export default page;
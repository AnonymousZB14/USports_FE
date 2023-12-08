import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <h2>Log into USports</h2>
      <form>
        <input type="email" name="email" id="email" placeholder='email' required/>
        <input type="password" name="password" id="password" placeholder='password' required/>
        <input type="submit" value="Log in" />
      </form>
      <div className='LinkWrap'>
        <Link href={'/'}>비밀번호 찾기</Link>
        <Link href={'/'}>회원가입</Link>
      </div>
      <hr />
      <div className='kakaoLogBtn'></div>
    </div>
  );
};

export default page;
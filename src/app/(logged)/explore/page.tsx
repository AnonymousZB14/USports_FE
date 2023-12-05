
'use client'
import Title from '@/components/title';
import * as data from './data';
import FormAddress from "../../../components/addressForm";
import { useState } from 'react';
import { AddressType } from "../../../../types";

const explore = () => {
  const [addressData, setAddressData] = useState<AddressType | null>(null);
  
  return (
    <>
      <Title title="Explore" />
      <div className="explore-form">
        <h1>모집 글을 작성해주세요.</h1>
        <div className="explore-wrap">
          <h1>제목</h1>
          <input type="text" placeholder="제목을 입력해주세요.(50자 이내)" />
        </div>
        <div className="explore-wrap">
          <h1>카테고리</h1>
          <div className="select-wrap">
            <select className="select-box">
            {data.selectList1.map((item: { value: string; name: string }) => {
              return <option value={item.value} key={item.value}>
                {item.name}
              </option>;
            })}
            </select>
          </div>
          <div className="select-wrap">
            <select className="select-box">
            {data.selectList2.map((item: { value: string; name: string }) => {
              return <option value={item.value} key={item.value}>
                {item.name}
              </option>;
            })}
            </select>
          </div>
          <div className="select-wrap">
            <select className="select-box">
              {data.selectList3.map((item: { value: string; name: string }) => {
                return <option value={item.value} key={item.value}>
                  {item.name}
                </option>;
              })}
            </select>
          </div>
        </div>
        <div className="explore-wrap">
          <h1>레벨</h1>
          <div className="select-wrap">
            <select className="select-box">
              {data.selectList4.map((item: { value: string; name: string }) => {
                return <option value={item.value} key={item.value}>
                  {item.name}
                </option>;
              })}
            </select>
          </div>
          <div className="select-wrap">
            <select className="select-box">
              {data.selectList5.map((item: { value: string; name: string }) => {
                return <option value={item.value} key={item.value}>
                  {item.name}
                </option>;
              })}
            </select>
          </div>
        </div>
        <div className="explore-wrap">
          <h1>비용</h1>
          <div>
            <input type="text" placeholder="금액을 입력해주세요." />
            <p>원</p>
          </div>
        </div>
        <div className="explore-wrap">
          <h1>모집정원</h1>
          <div>
            <input type="text" placeholder="정원을 입력해주세요." />
            <p>명</p>
          </div>
        </div>
        <div className="explore-wrap">
          <h1>내용</h1>
          <div>
            <input type="text" placeholder="내용을 입력해주세요.(500자 이내)" />
          </div>
        </div>
        <div>
          <h1>위치</h1>
          <FormAddress
            addressData={addressData}
            setAddressData={setAddressData}
          />
        </div>
      </div>
    </>
  );
};

export default explore;
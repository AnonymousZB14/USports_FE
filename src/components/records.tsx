"use client";
import { getUsersRecords } from "@/api/records";
import { RecordsState } from "@/store/records";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const Records = () => {
  const [records, setRecords] = useRecoilState(RecordsState);
  useEffect(() => {
    getUsersRecords("user").then((resp) => {
      setRecords(resp.records);
    });
  }, [setRecords]);
  return (
    <ul>
      {records.map((record) => {
        return (
          <Record key={record.recordId} imageAddress={record.imageAddress} />
        );
      })}
    </ul>
  );
};

export default Records;

const Record = ({ imageAddress }: { imageAddress: string }) => {
  return (
    <li>
      <Link href={'/'}>
        <img src={imageAddress} alt="thumbnail" />
      </Link>
    </li>
  );
};

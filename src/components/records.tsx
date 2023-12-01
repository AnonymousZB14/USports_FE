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
          <Record
            key={record.recordId}
            imageAddress={record.imageAddress}
            recordId={record.recordId}
          />
        );
      })}
    </ul>
  );
};

export default Records;

const Record = ({
  imageAddress,
  recordId,
}: {
  imageAddress: string;
  recordId: number;
}) => {
  return (
    <li>
      <div className="thumbnail">
        <Link href={`/record/detail/${recordId}`}>
          <img src={imageAddress} alt="thumbnail" />
        </Link>
      </div>
    </li>
  );
};

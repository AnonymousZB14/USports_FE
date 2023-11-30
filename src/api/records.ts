// 로그인 유무 확인 API
import { API_USERS_RECORDS } from "@/constants/contant";

export const getUsersRecords = async (accessToken?: string) => {
  const res = await fetch(API_USERS_RECORDS);
  if (!res.ok) {
    throw new Error("Failed to fetch user data!");
  }
  return res.json();
};

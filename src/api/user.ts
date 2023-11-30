// 로그인 유무 확인 API
import { API_URL_USER } from "@/constants/contant";

export const checkUser = async (accessToken?: string) => {
  const res = await fetch(API_URL_USER);
  if (!res.ok) {
    throw new Error("Failed to fetch user data!");
  }
  return res.json();
};

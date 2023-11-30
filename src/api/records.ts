// 로그인 유무 확인 API
import { API_URL } from "@/constants/contant";

export const getUsersRecords = async (accountName?: string) => {
  const res = await fetch(`${API_URL}/${accountName}-records`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data!");
  }
  return res.json();
};

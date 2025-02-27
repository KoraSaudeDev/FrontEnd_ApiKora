import { getCookies } from "@/helper/getCookies";
import axios, { AxiosInstance } from "axios";

export const api = (): AxiosInstance => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const instance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookies("user")}`,
    },
  });

  return instance;
};

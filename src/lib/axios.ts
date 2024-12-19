import axios, { AxiosInstance } from "axios";




export const api = (): AxiosInstance => {;

  const instance = axios.create({
    baseURL: "http://10.27.254.153:3793/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

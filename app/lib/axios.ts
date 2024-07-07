import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://nizom-sale-open-api.vercel.app/api",
});

import axios from "axios";

const api = axios.create({
  baseURL: "https://financa-api-jefferson00.vercel.app/",
});

export default api;

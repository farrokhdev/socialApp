import axios from "axios";

export const castomAxios = axios.create({
  baseURL: "http://localhost:5001/",
  headers: { "Content-Type": "application/json" },
});

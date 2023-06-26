import axios from "axios";

export const castomAxios = axios.create({
  // baseURL: "http://localhost:5001/",
  baseURL: "https://socialapp-server.onrender.com/",
  headers: { "Content-Type": "application/json" },
});

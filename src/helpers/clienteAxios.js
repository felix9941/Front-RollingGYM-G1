import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || "";
const backendBaseUrl =
  import.meta.env.VITE_URL_BACK_DEPLOY ||
  import.meta.env.VITE_URL_BACK ||
  "http://localhost:3002";

const clienteAxios = axios.create({
  baseURL: `${backendBaseUrl.replace(/\/$/, "")}/api`,
});

export const config = {
  headers: {
    "content-type": "application/json",
    auth: `Bearer ${token}`,
  },
};

export default clienteAxios;

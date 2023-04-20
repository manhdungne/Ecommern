import axios from "axios";

const instance = axios.create({
  baseURL: "https://nhom13.onrender.com",
});

export default instance;

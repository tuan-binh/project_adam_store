import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});
instance.interceptors.response.use(
  (response) => response,
  (error) => error.response
);
export default instance;

import axios from "axios";
const publicFetch = axios.create({
  baseURL: "https://localhost:9443/",
});

export { publicFetch };

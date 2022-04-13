import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/1.0/users", body, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "tr",
    },
  });
}
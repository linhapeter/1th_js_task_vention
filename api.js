import axios from "axios";

export const apiPost = async (requestData) => {
  const response = await axios.post("https://httpbin.org/post", requestData);
  return response.data;
};

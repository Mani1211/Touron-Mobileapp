import axios from "axios";

export default axios.create({
  baseURL: "https://touron-api.herokuapp.com",
  // baseURL: "https://touronapi.herokuapp.com",
});

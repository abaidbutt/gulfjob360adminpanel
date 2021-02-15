import axios from "axios";
export const BaseUrl = "http://gulfjobs.nwsols.com/api";
export default axios.create({
  url: BaseUrl,
  headers: {
    "content-type": "application/json",
  },
});

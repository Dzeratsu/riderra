import axios from "axios";
import querystring from "querystring";
import ivcardo from "../includes/ivcardoAuth.js"
export default {
  async handler(req, res) {
    var req_data = JSON.parse (querystring.parse(decodeURIComponent(req.url).split('?')[1]).data);
    let { data } = await axios.post("https://api-ivcardobooking.azurewebsites.net/api/Booking/CancelBooking",req_data,ivcardo.headers);
    console.log(data)
    res.end(JSON.stringify(data));
  },
  path: "/api/cancelBooking"
};

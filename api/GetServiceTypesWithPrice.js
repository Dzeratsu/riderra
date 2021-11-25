import axios from "axios";
import querystring from "querystring";
import ivcardo from "../includes/ivcardoAuth.js"
export default {
  async handler(req, res) {
    let url = "https://api-ivcardobooking.azurewebsites.net/api/booking/GetServiceTypesWithPrice"
    var req_data = JSON.parse (querystring.parse(decodeURIComponent(req.url).split('?')[1]).data);
    req_data.CompanyGUID = ivcardo.auth.CompanyGUID;
    req_data.CustomerGUID = ivcardo.auth.CustomerGUID;
    console.log(req_data)
    try {
      let { data } = await axios.post(url,req_data,ivcardo.headers);
      res.end(JSON.stringify(data));
    }
    catch (e) {
      res.end("error");
    }
  },
  path: "/api/GetServiceTypesWithPrice"
};

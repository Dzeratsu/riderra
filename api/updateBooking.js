import axios from "axios";
import querystring from "querystring";
import ivcardo from "../includes/ivcardoAuth.js"
export default {
  async handler(req, res) {
    var req_data=null;
    var update = true;
    var resp="Error";

    var data = querystring.parse(req.url.split('?')[1]);
    if (data.paysera) {
      req_data = JSON.parse (decodeURIComponent(data.orderdata));
      var encoded = data.data.replace('_', '/').replace('-', '+');
      var decoded = Buffer.from(encoded, 'base64').toString('ascii');
      var paysera = querystring.parse(decoded);
      if (paysera.status==1) {
        req_data.ID=paysera.orderid;
        req_data.Extras = req_data.Extras.replace("21612;","21613;");
      }
      else update=false;
    }
    else {
      req_data = JSON.parse (decodeURIComponent(data.data));
    }
    try {
      Object.assign(req_data,ivcardo.auth);
      console.log(req_data);
      if (update) {
        let { data } = await axios.post("https://api-ivcardobooking.azurewebsites.net/api/Booking/UpdateBooking",req_data,ivcardo.headers);
        console.log(data)
        if (data.Success) resp="OK"
        else resp=data.Message;
      }
    }
    catch (err) {}
    res.end(resp);
  },
  path: "/api/updateBooking"
};

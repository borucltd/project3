import axios from "axios";

export default {
 
  login: function(data) {
    return axios.post("/api/auth/login", data, {withCredentials: true});
  },
  signup: function(data) {
    return axios.post("/api/auth/register", data, {withCredentials: true});
  },
  checklogin: function(data) {
    return axios.get("/api/auth/logged_in", {withCredentials: true});
  },
  logout: function(data) {
    return axios.delete("/api/auth/logout", {withCredentials: true});
  },
  addactivity: function(data) {
    return axios.post("/api/db/addactivity",data);
  },
  getactivities: function(id) {
    return axios.get("/api/db/getactivities" + id);
  },
  ggk: function(id) {
     return axios.get("/api/keys/google" + id);
  }
};

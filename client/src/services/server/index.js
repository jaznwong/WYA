import { ROOT_API } from "../../constants";
import axios from "axios";
axios.defaults.withCredentials = true;

export const post = function(route, body={}) {
  return new Promise(function(resolve, reject) {
    let url = ROOT_API + route;
    axios
      .post(url, body)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const get = function(route) {
  return new Promise(function(resolve, reject) {
    let url = ROOT_API + route;
    axios
      .get(url)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

import { AUTH_USER, LOGOUT } from "../actionTypes";
import { signup, login, logout as logUserOut } from "../../services/server/auth";
import {whoAmI} from '../../services/server/user'

function authUserAction(userData) {
  return {
    type: AUTH_USER,
    userData
  };
}

// Login or Register
export function loginUser(username, password) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      login(username, password)
        .then(res => {
          let { user } = res.data;
          dispatch(authUserAction(user));
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export function signupUser(firstname, lastName, username, password){
  return dispatch => {
    return new Promise((resolve, reject) => {
      signup(firstname, lastName, username, password)
        .then(res => {
          let { user } = res.data;
          dispatch(authUserAction(user));
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export function initiateUser() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      whoAmI()
      .then(user => {
          // console.log(user)
          dispatch(authUserAction(user));
          resolve();
        })
        .catch(err => {
          console.log("Unauthorized");
          reject();
        });
    });
  };
}

export function logout(){
  logUserOut().then(({ message }) => {
    console.log(message);
  });
  return {
    type: LOGOUT
  };
}

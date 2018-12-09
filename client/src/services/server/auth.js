import { get, post } from "./index";
const BASE = "/auth";

export async function signup(firstname, lastname, username, password) {
    try{
        return await post(`${BASE}/signup`, {
          firstname,
          lastname,
          username,
          password
        });
    }catch(error){
        throw `Error signing up`
    }
}

export async function login(username, password){
    try{
        return await post(`${BASE}/login`, {
          username,
          password,
        });
    }catch(error){
        throw `Error logging up`
    }
}

export async function logout(){
    try{
        let url = `${BASE}/logout`;
        return await post(url)
    }catch(error){
        throw `error logging out`
    }
}
import {AUTH_USER, LOGOUT} from '../actionTypes'
import {server} from '../../services/api'
import axios from 'axios'

function authUserAction(userData){
    return{
        type: AUTH_USER,
        userData
    }
}

// Login or Register
export function authUser(signup, username, password){
    let route = "/auth/" + (signup ? "signup" : "login");
    let data = {
        username,
        password
    }
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            server.post(route, data)
                .then(res=>{
                    let {user} = res.data
                    dispatch(authUserAction(user))
                    resolve()
                })       
                .catch(err=>{
                    reject(err)
                })
        })
    }
}

export function logout(){
    let url = "/auth/logout"
    server.post(url)
        .then(({message})=>{
            console.log(message)
        })
    return {
        type: LOGOUT
    }
}
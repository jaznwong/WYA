import {AUTH_USER, LOGOUT} from '../actionTypes'
import {server} from '../../services/api'

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

export function initiateUser() {
    console.log("Initiating user")
    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = "/user/who_am_i"
            server.get(url)
                .then((user) => {
                    dispatch(authUserAction(user))
                })
                .catch(err => {
                    console.log("Unauthorized")
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
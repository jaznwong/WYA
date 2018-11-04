import {AUTH_USER, LOGOUT} from '../actionTypes'
import {ROOT_API} from '../../const'
import axios from 'axios'

function authUserAction(userData){
    return{
        type: AUTH_USER,
        userData
    }
}

// Login or Register
export function authUser(signup, username, password){
    let url = ROOT_API + "/auth/" + (signup ? "signup" : "login");
    let data = {
        username,
        password
    }
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            axios.post(url, data)
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
    let url = ROOT_API + "/auth/logout"
    axios.post(url)
        .then(({message})=>{
            console.log(message)
        })
    return {
        type: LOGOUT
    }
}
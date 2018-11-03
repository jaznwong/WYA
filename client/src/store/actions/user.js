import axios from 'axios'
import {SEARCH_ROOMS, AUTH_USER} from '../actionTypes'
// TODO: Make this into an env variable
const apiRoute = "http://localhost:8000"

function searchRoomsAction(searchedRooms){
    return{
        type: SEARCH_ROOMS,
        searchedRooms
    }
}

function authUserAction(userData){
    return{
        type: AUTH_USER,
        userData
    }
}

// Login or Register
export function authUser(signup, username, password){
    let url = apiRoute + "/auth/" + (signup ? "signup" : "login");
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

export function searchRooms(query){
    return dispatch => {
        let url = apiRoute + "/rooms/" + query;
        return fetch(url)
            .then(res => res.json())
            .then(rooms => dispatch(searchRoomsAction(rooms.roomList)))
            .catch(err => console.log(`Error in fetching searchRooms from ${url}`))
    }
}

export function updateInterests(){

}

export function postInterests(interests){
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            let url = apiRoute + "/user/availability"
            axios.post(url, {interests})
                .then(res=>{
                    resolve()
                })
                .catch(err=> {
                    console.log(`Error posting interests`)
                    reject()
                })
        })
    }
}
import {SEARCH_ROOMS, AUTH_USER} from '../actionTypes'
// TODO: Make this into an env variable
const apiRoute = process.env.REACT_APP_API_URL || "/"

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
    let url = apiRoute + "users/" + signup ? "register" : "login";
    return new Promise((resolve, reject)=>{
      return dispatch => {
            return fetch(url)
                .then(res => res.json())
                .then(user => {
                    dispatch(authUserAction(user))
                    resolve()
                })
                .catch(err =>{
                    console.log("Error in authenticating user\n", err)
                    reject()
                })
      }
    })
}

export function searchRooms(query){
    return dispatch => {
        let url = apiRoute + "rooms/" + query;
        return fetch(url)
            .then(res => res.json())
            .then(rooms => dispatch(searchRoomsAction(rooms.roomList)))
            .catch(err => console.log(`Error in fetching searchRooms from ${apiRoute}`))
    }
}
import {SEARCH_ROOMS, SUGGEST_INTEREST} from '../actionTypes'
import {ROOT_API} from '../../const'
import axios from 'axios'
// TODO: Make this into an env variable
const apiRoute = ROOT_API

function searchRoomsAction(searchedRooms){
    return{
        type: SEARCH_ROOMS,
        searchedRooms
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

export function handleSuggestInterests(query){
    // TOOD: Create a dynamic interest section
    console.log("handleSuggestInterests called")
    const defaultInterests = [
            "art", "automotive", "beauty", "food", "drinks", "sports", "technology"
        ]
    let interests = defaultInterests.filter(interest=>(interest.includes(query)))
    return{
        type: SUGGEST_INTEREST,
        suggestedInterests: interests
    }
}

export function postAvailablity(availabilities){
    return dispatch=>{
        return Promise.resolve()
    }
}
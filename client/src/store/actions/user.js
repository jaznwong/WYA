import {SEARCH_ROOMS, SUGGEST_INTEREST} from '../actionTypes'
import {server} from '../../services/api'
import axios from 'axios'
// TODO: Make this into an env variable

function searchRoomsAction(searchedRooms){
    return{
        type: SEARCH_ROOMS,
        searchedRooms
    }
}

export function searchRooms(query){
    return dispatch => {
        let url = "/room/" + query;
        return server.get(url)
            .then(({roomList}) =>{
                console.log(roomList)
                dispatch(searchRoomsAction(roomList))
            })
            .catch(err => console.log(`Error in fetching searchRooms from ${url}`))
    }
}

export function updateInterests(){

}

export function postInterests(interests){
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            let url = "/user/interest"
            server.post(url, {interests})
                .then(res=>{
                    console.log(res)
                    resolve()
                })
                .catch(err=> {
                    console.log(err)
                    // console.log(`Error posting interests`)
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

export function postAvailablity(availability){
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            let url = "/user/availability"
            server.post(url, {availability})
                .then(res=>{
                    console.log(res)
                    resolve()
                })
                .catch(err=>{
                    console.error(err)
                    reject()
                })
        })
    }
}
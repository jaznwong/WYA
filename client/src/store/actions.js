export const SEARCH_ROOMS = "SEARCH_ROOMS"

// TODO: Make this into an env variable
const apiRoute = "/"

function searchRoomsAction(searchedRooms){
    return{
        type: SEARCH_ROOMS,
        searchedRooms
    }
}

export function searchRooms(query){
    return dispatch => {
        let url = apiRoute + "rooms/" + query;
        return fetch(url)
            .then(res => res.json())
            .then(rooms => dispatch(searchRoomsAction(rooms)))
            .catch(err => console.log("Error in fetching searchRooms"))
    }
}
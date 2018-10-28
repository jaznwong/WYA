export const SEARCH_ROOMS = "SEARCH_ROOMS"

// TODO: Make this into an env variable
const apiRoute = "/"

function searchRoomAction(searchedRooms){
    return{
        type: SEARCH_ROOMS,
        searchedRooms
    }
}

export function searchRoom(query){
    return dispatch => {
        let url = apiRoute + "rooms/" + query;
        fetch(url)
        .then(res => res.json())
        .then(rooms=> dispatch(searchRoomAction(rooms)))
    }
}


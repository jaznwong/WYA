import {SEARCH_ROOMS} from './actions'

const initialState = {
    searchedRooms: []
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case SEARCH_ROOMS:
            return{
                ...state,
                searchedRooms: action.searchedRooms
            }
        default:
            return state
    }
}
import {SEARCH_ROOMS, AUTH_USER, SUGGEST_INTEREST} from '../actionTypes'

const initialState = {
    searchedRooms: [],
    suggestedInterests: [],
    userData: {},
    // TODO: Should be false by default
    isAuthenticated: true,
    profile: {
        suggestedInterests: []
    }
}

export default (state=initialState, action)=>{
    switch(action.type){
        case SEARCH_ROOMS:
            return{
                ...state,
                searchedRooms: action.searchedRooms
            }
        case AUTH_USER:
            // TODO: authenticate based on other weather if userData is empty or not
            console.log(Object.keys(action.userData).length)
            return{
                ...state,
                isAuthenticated: Object.keys(action.userData).length > 0,
                userData: action.userData
            }
        case SUGGEST_INTEREST:
            return{
                ...state,
                profile: {
                    ...state.profile,
                    suggestedInterests: action.suggestedInterests
                }
            }
        default:
            return state
    }
}
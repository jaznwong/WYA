import {SEARCH_ROOMS, AUTH_USER, SUGGEST_INTEREST, LOGOUT} from '../actionTypes'

const initialState = {
    searchedRooms: [],
    suggestedInterests: [],
    userData: {},
    // TODO: Should be false by default
    isAuthenticated: false,
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
            return{
                ...state,
                isAuthenticated: Object.keys(action.userData).length > 0,
                userData: action.userData
            }
        case LOGOUT:
            // console.log(initialState)
            return initialState
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
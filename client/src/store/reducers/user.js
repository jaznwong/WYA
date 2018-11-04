import {SEARCH_ROOMS, AUTH_USER, SUGGEST_INTEREST, LOGOUT, SET_USER_INTEREST, SET_USER_AVAILABILITY} from '../actionTypes'

const initialState = {
    searchedRooms: [],
    suggestedInterests: [],
    userData: {},
    // TODO: Should be false by default
    isAuthenticated: false,
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
                suggestedInterests: action.suggestedInterests
            }
        case SET_USER_INTEREST:
            return{
                ...state,
                userData: {
                    ...state.userData,
                    interests: action.interests
                }   
            }
        case SET_USER_AVAILABILITY:
            return{
                ...state,
                userData: {
                    ...state.userData,
                    availability: action.availability
                }
            }
        default:
            return state
    }
}
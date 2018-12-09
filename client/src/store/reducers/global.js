import {CONNECT_TO_SOCKET} from '../actionTypes'

const initialState = {
    socket: null
}

export default (state=initialState, action)=>{
    switch(action.type){
        case CONNECT_TO_SOCKET:
            return {
                ...state,
                socket: action.socket
            }
        default:
            return state
    }
}
import {UPDATE_DISPLAY_ROOMS} from '../actionTypes'

const initialState = {
    displayRooms: [],
    upcomingEvent: {
        name: "Cross Country",
        time: "4:00 PM"
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_DISPLAY_ROOMS:
        return {
            ...state,
            displayRooms: action.rooms
        };
      default:
        return state
    }
}
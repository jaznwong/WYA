import { combineReducers } from "redux";
import user from './user.js'
import dashboard from './dashboard'
import room from './room'

const rootReducer = combineReducers({
    user, dashboard, room
})

export default rootReducer;

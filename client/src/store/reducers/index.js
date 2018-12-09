import { combineReducers } from "redux";
import user from './user.js'
import dashboard from './dashboard'
import room from './room'
import global from './global'

const rootReducer = combineReducers({
    user, dashboard, room, global
})

export default rootReducer;

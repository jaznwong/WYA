import {
  UPDATE_USERS_IN_ROOM,
  SET_ROOM_INFORMATION,
  SET_ROOM_STATUS
} from "../actionTypes";

const initialState = {
  users: [],
  name: "",
  description: "",
  creatorID: "",
  status: "",
  votes: "",
  userVoted: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERS_IN_ROOM:
      return {
        ...state,
        users: action.users
      };
    case SET_ROOM_INFORMATION:
      return{
          ...state,
          name: action.name,
          description: action.description,
          creatorID: action.creatorID
      }
    case SET_ROOM_STATUS:
      return{
          ...state,
          state: action.status
      }
    default:
      return state;
  }
};

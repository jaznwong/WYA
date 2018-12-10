import {
  UPDATE_USERS_IN_ROOM,
  SET_ROOM_INFORMATION,
  SET_ROOM_STATUS,
  SET_ROOM_SUGGESTION,
  VOTE_FOR_OPTION
} from "../actionTypes";

const initialState = {
  users: [],
  suggestion: {},
  name: "",
  description: "",
  creatorID: "",
  state: "",
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
    case VOTE_FOR_OPTION:
      return {
        ...state,
        userVoted: action.userVoted
      }
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
    case SET_ROOM_SUGGESTION:
      return{
          ...state,
          suggestion: action.suggestion
      }
    default:
      return state;
  }
};

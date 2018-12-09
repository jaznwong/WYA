import {
  searchRoom as search,
  getAllRooms as getAll
} from "../../services/server/room";
import { UPDATE_DISPLAY_ROOMS } from "../actionTypes";

export function searchRooms(query) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (query == "") {
        getAll()
        .then(rooms => {
          console.log("getting all rooms");
          console.log(rooms);
          dispatch({
            type: UPDATE_DISPLAY_ROOMS,
            rooms
          });
          resolve(rooms);
        })
        .catch(err => reject(err));
      } else {
        search(query)
          .then(({ rooms }) => {
            console.log(rooms);
            dispatch({
              type: UPDATE_DISPLAY_ROOMS,
              rooms
            });
            resolve(rooms);
          })
          .catch(err => reject(err));
      }
    });
  };
}
import {
  SEARCH_ROOMS,
  SUGGEST_INTEREST,
  SET_USER_INTEREST,
  SET_USER_AVAILABILITY
} from "../actionTypes";
import { server } from "../../services/api";
import axios from "axios";
// TODO: Make this into an env variable

function searchRoomsAction(searchedRooms) {
  return {
    type: SEARCH_ROOMS,
    searchedRooms
  };
}

function setUserInterest(interests) {
  return {
    type: SET_USER_INTEREST,
    interests
  };
}

export function searchRooms(query) {
  return dispatch => {
    let url = "/room/" + query;
    return server
      .get(url)
      .then(({ roomList }) => {
        console.log(roomList);
        if (roomList != undefined) {
          dispatch(searchRoomsAction(roomList));
        }
      })
      .catch(err => console.log(`Error in fetching searchRooms from ${url}`));
  };
}

export function postInterests(interests) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = "/user/interest";
      server
        .post(url, { interests })
        .then(({ interest }) => {
          console.log(interests);
          dispatch(setUserInterest(interest));
          resolve(interest);
        })
        .catch(err => {
          console.log(err);
          // console.log(`Error posting interests`)
          reject();
        });
    });
  };
}

export function handleSuggestInterests(query) {
  // TOOD: Create a dynamic interest section
  const defaultInterests = [
    "art",
    "automotive",
    "beauty",
    "food",
    "drinks",
    "sports",
    "technology"
  ];
  // let interests = defaultInterests.filter(interest=>(interest.includes(query)))
  let interests = defaultInterests;
  console.log("suggested: " + interests);
  return {
    type: SUGGEST_INTEREST,
    suggestedInterests: interests
  };
}

function setUserAvailability(availability) {
  return {
    type: SET_USER_AVAILABILITY,
    availability
  };
}

export function postAvailablity(availability) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = "/user/availability";
      server
        .post(url, { availability })
        .then(data => {
          let avail = data.avail;
          dispatch(setUserAvailability(avail));
          resolve(avail);
        })
        .catch(err => {
          console.error(err);
          reject();
        });
    });
  };
}

import { get, post } from "./index";

const BASE = "/room";

export async function createRoom(roomname, description) {
  let url = `${BASE}`;
  try {
    return await post(url, { roomname, description });
  } catch (error) {
      console.log("Error has occured: " + error.message)
    throw error;
  }
}

export async function searchRoom(query) {
  let url = `${BASE}/search/${query}`;
  try {
    return await get(url);
  } catch (error) {
    throw error;
  }
}

export async function getAllRooms() {
  let url = `${BASE}/`;
  try {
    return await get(url);
  } catch (error) {
    throw error;
  }
}

export async function getRoomById(id) {
  try {
    return await get(`${BASE}/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function getUsersInRoom(id) {
  try {
    let users = await get(`${BASE}/${id}/users`);
    let userArr = [];
    // console.log("server called getUsersInRoom" + users)
    for (let user of users) {
      // console.log(user)
      userArr.push({ name: `${user.firstname} ${user.lastname}` });
    }
    return userArr;
  } catch (error) {
    throw error;
  }
}

export async function getSuggestionForRoom(id) {
  try {
    return await get(`${BASE}/${id}/suggestion`);
  } catch (error) {
    throw error;
  }
}

export async function getRoomStatus(id) {
  try {
    return await get(`${BASE}/${id}/status`);
  } catch (error) {
    throw error;
  }
}

export async function joinRoom(id) {
  try {
    // console.log("called join")
    return await get(`${BASE}/join/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function initiateVote(id) {
  try {
    return await post(`${BASE}/${id}/initiate_vote`);
  } catch (error) {
    throw error;
  }
}

export async function vote(id, hasAccepted) {
  try {
    return await post(`${BASE}/${id}/vote`, { votedFor: hasAccepted });
  } catch (error) {
    throw error;
  }
}

export async function getVotes(id) {
  try {
    return await get(`${BASE}/${id}/votes`);
  } catch (error) {
    throw error;
  }
}

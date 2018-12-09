import { get, post } from "./index";

const BASE = "/room"

export async function createRoom(roomname, description){
    let url = `${BASE}`
    try{
        return await post(url, {roomname, description})
    }catch(error){
        throw `error creating room`
    }
}

export async function searchRoom(query) {
  let url = `${BASE}/search/${query}`;
  try{
    return await get(url)
  }catch(error){
    throw `Error in getting rooms`
  }
}

export async function getAllRooms(){
    let url = `${BASE}/`;
    try{
      return await get(url)
    }catch(error){
      throw `Error in getting all rooms`
    }
}

export async function getRoomById(id){
    try{
        return await get(`${BASE}/${id}`)
    }catch(error){
        throw `Error in getting room with roomid ${id}`
    }
}

export async function getUsersInRoom(id){
    try{
        let users = await get(`${BASE}/${id}/users`)
        let userArr = []
        // console.log("server called getUsersInRoom" + users)
        for(let user of users){
            // console.log(user)
            userArr.push({"name" : `${user.firstname} ${user.lastname}`})
        }
        return userArr
    }catch(error){
        throw `Error in getting users in room with roomid ${id}`
    }
}

export async function getSuggestionsFromRoom(id){
    try{
        return await get(`${BASE}/${id}/suggestion`)
    }catch(error){
        throw `Error in getting suggestions from room with roomid ${id}`
    }
}

export async function getRoomStatus(id){
    try{
        return await get(`${BASE}/${id}/status`)
    }catch(error){
        throw `Error in getting status for room with roomid ${id}`
    }
}

export async function joinRoom(id){
    try{
        console.log("called join")
        return await post(`${BASE}/join/${id}`)
    }catch(error){
        throw `Error in joining room with roomid ${id}`
    }
}

export async function initiateVote(id){
    try{
        return await post(`${BASE}/${id}/initiate_vote`)
    }catch(error){
        throw `Error initiating vote with roomid ${id}`
    }
}

export async function vote(id, hasAccepted){
    try{
        return await post(`${BASE}/${id}/vote`, {votedFor: hasAccepted})
    }catch(error){
        throw `Error initiating vote with roomid ${id}`
    }
}

export async function getVotes(id){
    try{
        return await get(`${BASE}/${id}/votes`)
    }catch(error){
        throw `Error in getting all votes`
    }
}
import socketIOClient from "socket.io-client";
import {CONNECT_TO_SOCKET} from '../actionTypes'
const ENDPOINT = "http://localhost:8000/"

export function connecToSocket(){
    let socket = socketIOClient(ENDPOINT)
    // console.log('called')
    return {
        type: CONNECT_TO_SOCKET,
        socket
    }
}


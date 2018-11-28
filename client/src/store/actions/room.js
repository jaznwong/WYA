import {server} from '../../services/api'
import {
    CREATE_ROOM
} from '../actionTypes'

export function createRoom(name, desc){
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            let url = '/room/create'
            server.post({
                name,
                desc
            }).then((room)=>{
                console.log("Room created")
                resolve(room)
            }).catch(err=>{reject(err)})
        });
    }
}

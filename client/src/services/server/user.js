import {get, post} from './index'

export async function whoAmI(){
    try{
        let url = "/user/who_am_i";
        return await get(url)
    }catch(error){
        throw `error getting who am i`
    }
}
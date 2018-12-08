import {ROOT_API} from '../constants'
import axios from 'axios'
axios.defaults.withCredentials = true;

export let server = {
    post: function(route, body){
        return new Promise(function(resolve, reject){
            let url = ROOT_API + route
            axios.post(url, body)
                .then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
        })
    },
    get: function(route){
        return new Promise(function(resolve, reject){
            let url = ROOT_API + route
            axios.get(url)
                .then(res=>{
                    resolve(res.data)
                }).catch(err=>{
                    reject(err)
                })
        })
    }
}

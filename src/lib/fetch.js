import Cookies from "js-cookie"
import { base_url } from "../utils/vars"

const token = Cookies.get('token')
console.log({base_url})
// const base_url = "http://localhost:8080"
export const postFetch = (url = "", body = {}) => {
    // if(!token) return Promise.reject('No token provided')
    return fetch(base_url + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export const getFetch = (url = '', params='') => {
    return fetch(base_url + url + '?' + params, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET',
    })
}
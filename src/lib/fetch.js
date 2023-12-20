import Cookies from "js-cookie"

const token = Cookies.get('token')
const base_url = "http://localhost:3001"

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
    return fetch(base_url + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET',
    })
}
import Cookies from "js-cookie"

const token = Cookies.get('token')
const base_url = "https://my-job-695ce6312b95.herokuapp.com"
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
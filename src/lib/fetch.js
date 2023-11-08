const base_url = "http://localhost:3001"

export const postFetch = (url = "", body = {}) => {
    return fetch(base_url + url,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export const getFetch = (url = '', params) => {
    return fetch(base_url + url)
}
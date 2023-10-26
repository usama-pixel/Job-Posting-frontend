export const postFetch = (url = "", body = {}) => {
    const base_url = "http://localhost:3001"
    return fetch(base_url + url,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body),
    })
}
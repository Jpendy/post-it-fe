const NONBODY_METHODS = ['GET', 'DELETE'];

const localUrl = 'http://localhost:3001'
//process.env.REACT_APP_API_URL

const request = ({ path, method, body, token } = {}) => {
    // eslint-disable-next-line no-undef
    return fetch(`${localUrl}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        // credentials: 'include',
        body: NONBODY_METHODS.includes(method) ? null : JSON.stringify(body)
    })
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([ok, json]) => {
            if (!ok) throw json;
            return json;
        });
};

export const post = (path, body, token) => request({ path, method: 'POST', body, token });
export const put = (path, body, token) => request({ path, method: 'PUT', body, token });
export const get = (path, token) => request({ path, method: 'GET', token });
export const del = (path, token) => request({ path, method: 'DELETE', token });
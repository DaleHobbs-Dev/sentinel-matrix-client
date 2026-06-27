// Config for API requests
export const API_BASE_URL = "http://localhost:8000/"
export const TOKEN_KEY = "sentinel_token"

// Helper AuthHeader function to include the token in the request headers
const getAuthHeader = () => {
    // Retrieve the stored token from localStorage (set during login) for authenticated requests
    const token = JSON.parse(localStorage.getItem(TOKEN_KEY))?.token
    return token ? { "Authorization": `Token ${token}` } : {}
}

// Helper function to check for errors in the response and parse JSON
const checkErrorJson = async (response) => {

    // Any 2xx status sets response.ok to true, regardless of HTTP method
    if (response.ok) {
        // For 204 No Content has no body on DELETE and PATCH
        // return null instead of calling .json()
        return response.status === 204 ? null : response.json()
    }

    // Non-2xx response: store the error details in an Error object and throw it for further handling
    const err = new Error(`Request to ${response.url} failed with status ${response.status}`)
    err.status = response.status
    try {
        err.body = await response.json()
    } catch {
        err.body = null
    }
    throw err
}

// request takes an endpoint (e.g. /instructors) and an optional options object.
// Properties might include method, body, custom headers. It defaults to {} if omitted
const request = (endpoint, options = {}) => {

    // Get the auth token header
    const authHeader = getAuthHeader()

    // Get any custom headers provided in the options object
    const customHeaders = options.headers || {}

    // Rebuild the headers field by merging the auth token header with any headers the caller provided
    const finalOptions = {
        ...options,
        headers: {
            ...authHeader,
            ...customHeaders
        }
    }

    // Calls fetch against API_BASE_URL + endpoint, using finalOptions
    // (carries over method/body from options, with the merged headers from above)
    return fetch(`${API_BASE_URL}${endpoint}`, finalOptions)
        // The resulting promise is piped through checkErrorJson, which returns parsed JSON on success
        // It could also throw an error (with .status/.body attached) on failure.
        .then(checkErrorJson)
}

// Exported fetchJSON for making API fetch requests
export const fetchJSON = (endpoint) => request(endpoint)

// Exported postJSON for making API POST requests with JSON body
export const postJSON = (endpoint, body) => request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
})

// Exported patchJSON for making API PATCH requests with JSON body
export const patchJSON = (endpoint, body) => request(endpoint, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
})

// Exported deleteJSON for making API DELETE requests
export const deleteJSON = (endpoint) => request(endpoint, { method: "DELETE" })

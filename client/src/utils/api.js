
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT

//----------------------------------------------------------------------------
const createApiURL = (uri) => {
    return 'http://' + SERVER_ADDRESS + ':' + SERVER_PORT + '/api/' + uri
}

//----------------------------------------------------------------------------
const createMessage = (content) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }
}

//----------------------------------------------------------------------------
export const getAutocomplete = async (textToAutocomplete) => {
    // Sends a request to backend with POST-method.
    let response = await fetch(createApiURL('getAutocomplete'),
        createMessage({
            textToAutocomplete: textToAutocomplete
        })
    )
    let data = await response.json()
    return data
}

//----------------------------------------------------------------------------
export const getRoutes = async (fromPlace, toPlace, currencyCode = 'SEK', extraParams = null) => {
    // Sends a request to backend with POST-method.
    let response = await fetch(createApiURL('getSearchResults'),
        createMessage({
            fromPlace,
            toPlace,
            currencyCode,
            languageCode: 'en',
            extraParams
        })
    )
    let data = await response.json()
    return data
}

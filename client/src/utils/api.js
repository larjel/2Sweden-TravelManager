
const SERVER_ADDRESS = 'localhost'
const SERVER_PORT = 5000

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
            fromPlace: fromPlace,
            toPlace: toPlace,
            currencyCode: currencyCode,
            languageCode: 'en',
            extraParams: extraParams
        })
    )
    let data = await response.json()
    return data
}

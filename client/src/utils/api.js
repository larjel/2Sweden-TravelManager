
const serverAddress = 'localhost'
const serverPort = 5000

//----------------------------------------------------------------------------
const getApiURL = (uri) => {
    return 'http://' + serverAddress + ':' + serverPort + '/api/' + uri
}

//----------------------------------------------------------------------------
export const getAutocomplete = async (textToAutocomplete) => {
    // Sends a request to backend with POST-method.
    let response = await fetch(getApiURL('getAutocomplete'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            textToAutocomplete: textToAutocomplete
        })
    })
    let data = await response.json()
    return data
}

//----------------------------------------------------------------------------
export const getRoutes = async (fromPlace, toPlace, currencyCode = 'SEK') => {
    // Sends a request to backend with POST-method.
    let response = await fetch(getApiURL('getSearchResults'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromPlace: fromPlace,
            toPlace: toPlace,
            currencyCode: currencyCode,
            languageCode: 'en'
        })
    })
    let data = await response.json()
    return data
}

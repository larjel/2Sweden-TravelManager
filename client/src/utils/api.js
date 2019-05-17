
const serverAddress = 'localhost'
const serverPort = 5000

const getApiURL = (uri) => {
    return 'http://' + serverAddress + ':' + serverPort + '/api/' + uri
}

/*
 Sends a request to backend with POST-method.
*/
export const getRoutes = async (fromPlace, toPlace, currencyCode = 'SEK') => {
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

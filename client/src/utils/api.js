/*
 Sends a request to backend with POST-method.
*/
export const getRoutes = async (fromPlace, toPlace) => {
    let response = await fetch('http://localhost:5000/api/getSearchResults/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        fromPlace: fromPlace, toPlace: toPlace + ',Sweden',
        currencyCode: 'SEK', languageCode: 'en'
        })
    })
    let data = await response.json()
    return data
}

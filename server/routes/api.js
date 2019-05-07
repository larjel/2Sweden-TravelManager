const express = require('express')
const router = express.Router()
const axios = require('axios')

//----------------------------------------------------------------------------
function getRome2RioGeocodeBaseUrl() {
  const key = process.env.ROME_2_RIO_KEY
  const url = `http://free.rome2rio.com/api/1.4/json/Geocode?key=${key}`
  return url;
}

//----------------------------------------------------------------------------
function getRome2RioSearchBaseUrl() {
  const key = process.env.ROME_2_RIO_KEY
  const url = `http://free.rome2rio.com/api/1.4/json/Search?key=${key}`
  return url;
}

//----------------------------------------------------------------------------
// Make a HTTP GET-Request
function httpGetRequest(url, res) {
  axios
    .get(url)
    .then(response => {
      console.log('axios repsonse => ', response.data)
      res.json(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send('Error from external API')
    })
}

//----------------------------------------------------------------------------
router.get('/test', (req, res) => {
  console.log('query params', req.query)

  // Send back the same query params
  // from the request as a response
  res.json(req.query)
})

//----------------------------------------------------------------------------
router.get('/newUser/:username', (req, res) => {
  const username = req.params.username
  console.log('req.params.username', username)
  /*
    Here should a new user be stored in the data base
    */
  res.send(`Welcome ${username}`)
})

//----------------------------------------------------------------------------
router.post('/getLocations', (req, res) => {
  const place = req.body.place

  const baseUrl = getRome2RioGeocodeBaseUrl()
  const url = `${baseUrl}&query=${place}`

  httpGetRequest(url, res);
})

//----------------------------------------------------------------------------
router.post('/getSearchResults', (req, res) => {
  const fromPlace = req.body.fromPlace
  const toPlace = req.body.toPlace

  const baseUrl = getRome2RioSearchBaseUrl()
  const url = `${baseUrl}&oName=${fromPlace}&dName=${toPlace}&noRideshare`

  httpGetRequest(url, res);
})

module.exports = router

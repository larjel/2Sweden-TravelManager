import React, { Component } from 'react'
import Tables from './components/Tables'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import * as utils from './utils/utils.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: {},
      searchPath: '',
      errorMsg: null
    }
  }

  /*
  Sends a request to backend with POST-method.
   */
  getRoutes = async (fromPlace, toPlace) => {
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

  handleSearchSubmit = (searchValue1, searchValue2) => {
    this.getRoutes(searchValue1, searchValue2)
      .then(data => {
        this.setState({
          searchResponse: data,
          searchPath: searchValue1 + ' -> ' + searchValue2
        })
      })
      .catch(err =>
        this.setState({
          errorMsg: err
        })
      )
  }

  render() {
    let routes = null;
    let searchPath = null;
    const searchResponse = this.state.searchResponse;
    if (Array.isArray(searchResponse.routes) && searchResponse.routes.length > 0) {
      searchPath = this.state.searchPath;
      routes = searchResponse.routes.map((route, i) => {
        const currencyCode = searchResponse.currencyCode;
        const totalDuration = utils.convertMinutesToDayHourMin(route.totalDuration);
        const prices = route.indicativePrices;
        let priceLow = 0;
        let priceHigh = 0;
        if (Array.isArray(prices)) {
          priceLow = prices[0].priceLow;
          priceHigh = prices[0].priceHigh;
        }
        return (
          <li key={`${i}-react-key`}>
            <h3>{route.name}</h3>
            <p>Distance: {route.distance} km</p>
            <p>Total duration: {totalDuration}</p>
            {prices ?
              (<p>Price: {priceLow} - {priceHigh} {currencyCode}</p>)
              : (<p>Price: Unknown</p>)
            }
          </li>
        )
      })
    }

    return (
      <div className='wrapper'>
        <Header />
        <Navbar />
        <Main handleSearchSubmit={this.handleSearchSubmit} routesList={routes} searchPath={searchPath} />
        {/* Todo: <Sidebar routeDetails={routeDetails} />*/}
        <Sidebar />
        <Footer />
      </div>
    )
  }
}

export default App

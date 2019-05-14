import React, { Component } from 'react'
import Tables from './components/Tables'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: {},
      currencyCode: '',
      errorMsg: null
    }
  }

  /*
  Sends a request to backend with POST-method.
   */
  getRoutes = async (fromPlace, toPlace) => {
    let response = await fetch('api/getSearchResults/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fromPlace: fromPlace, toPlace: toPlace + ',Sweden' })
    })
    let data = await response.json()
    return data
  }

  handleSearchSubmit = (searchValue1, searchValue2) => {
    this.getRoutes(searchValue1, searchValue2)
      .then(data => {
        this.setState({
          routes: data.routes,
          currencyCode: data.currencyCode
        })
      })
      .catch(err =>
        this.setState({
          errorMsg: err
        })
      )
  }

  render() {
    const routes = this.state.routes.length
      ? this.state.routes.map((route, i) => {
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
            <p>Total duration: {Math.floor(route.totalDuration / 60)}h {route.totalDuration % 60}min</p>
            {prices ?
              (<p>Price: {priceLow} - {priceHigh} {this.state.currencyCode}</p>)
              : (<p>Price: Unknown</p>)
            }
          </li>
        )
      })
      : null

    const data = this.state.routes;
    return (
      <div className='wrapper'>
        <Header />
        <Navbar />
        <Main handleSearchSubmit={this.handleSearchSubmit} />
        <Sidebar routesList={routes} />
        <Footer />
      </div>
    )
  }
}

export default App

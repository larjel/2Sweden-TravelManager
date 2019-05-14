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
      searchValue1: '',
      searchValue2: '',
      fromDate: '',
      toDate: '',
      routes: {},
      currencyCode: '',
      errorMsg: null,
      apiResult: null
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
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

  handleSearchSubmit = event => {
    event.preventDefault()
    var search1 = event.target.elements.search1.value;
    var search2 = event.target.elements.destination.value;
    this.getRoutes(this.state.searchValue1, this.state.searchValue2)
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

  refreshPage = () => {
    console.log("Refresh page");
    window.location.reload();
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
        <Header></Header>
        <Navbar></Navbar>
      <Main>
        <div>
          {/*<Tables routes={data.routes} />*/}
          <h2>Results</h2>
          <ul>{routes}</ul>
        </div>
        </Main>
        <Sidebar></Sidebar>
        <Footer></Footer>
      </div>  
    )
  }
}

export default App

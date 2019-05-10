import React, { Component } from 'react'
import Tables from './components/Tables'

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
      <div className='App'>
        <h3>Choose desired travel route!</h3>
        <form className="formLayout" onSubmit={this.handleSearchSubmit}>

          <input
            onChange={e => this.setState({ searchValue1: e.target.value })}
            className="input"
            type='text'
            name='search1'
            placeholder='From...'
            required="required"
          />
          <input
            onChange={e => this.setState({ searchValue2: e.target.value })}
            className="input"
            list="destinations"
            id="destination"
            name='destination'
            placeholder='To...'
            required="required"
          />
          <div className="inputFields">
            {/*
            <label className="label" htmlFor="fromDate">Departure date</label>
            <input
              onChange={e => this.setState({ fromDate: e.target.value })}
              className="input"
              id="fromDate"
              type="date"
              max="2025-01-01" min="2024-01-01"
              required="required">
            </input>
            <label className="label" htmlFor="toDate">Going home date</label>
            <input
              onChange={e => this.setState({ toDate: e.target.value })}
              className="input"
              id="toDate"
              type="date"
              max="2025-01-01" min="2024-01-01"
              required="required">
            </input>
            */}
            <button type="submit" style={{ margin: '0 0 0 190px' }}>Search</button>
            <button type="button" style={{ margin: '0 0 0 20px' }} onClick={this.refreshPage}>New search</button>
          </div>
        </form>
        <datalist id="destinations">
          <option>Stockholm</option>
          <option>Falun</option>
          <option>Are</option>
        </datalist>
        <div>
          {/*<Tables routes={data.routes} />*/}
          <h2>Results</h2>
          <ul>{routes}</ul>
        </div>
      </div>
    )
  }
}

export default App

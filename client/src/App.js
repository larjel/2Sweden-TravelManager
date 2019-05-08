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
      routes: [],
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
      body: JSON.stringify({ fromPlace: fromPlace, toPlace: toPlace })
    })
    let data = await response.json()
    return data
  }

  handleSearchSubmit = event => {
    event.preventDefault()

    this.getRoutes(this.state.searchValue1, this.state.searchValue2)
      .then(data => {
        let routes = data.routes
        this.setState({
          routes
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
        return (
          <li key={`${i}-react-key`}>
            <h3>{route.name}</h3>
            <p>Distance: {route.distance} km</p>
            <p>Total duration: {route.totalDuration} minutes</p>
          </li>
        )
      })
      : null

    const data = this.state.routes;
    return (
      <div className='App'>
        <h3>Enter your prerequisites! </h3>
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
            placeholder='Choose destination...'
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
            <button style={{ margin: '0 0 0 320px' }}>Sök</button>
          </div>
        </form>
        <datalist id="destinations">
          <option>Stockholm</option>
          <option>Falun</option>
          <option>Åre</option>
        </datalist>
        <div>
          <Tables routes={data.routes} />
          <h2>Results</h2>
          <ul>{routes}</ul>
        </div>
      </div>
    )
  }
}

export default App

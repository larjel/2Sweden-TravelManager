import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      places: [],
      errorMsg: null,
      apiResult: null
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  /*
  Sends a request to backend with POST-method.
   */
  getPlaces = async place => {
    let response = await fetch('api/getLocations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ place: place })
    })
    let data = await response.json()
    return data
  }

  handleSearchSubmit = event => {
    event.preventDefault()

    this.getPlaces(this.state.searchValue)
      .then(data => {
        let places = data.places
        this.setState({
          places
        })
      })
      .catch(err =>
        this.setState({
          errorMsg: err
        })
      )
  }

  render() {
    const places = this.state.places.length
      ? this.state.places.map((place, i) => {
          return (
            <li key={`${i}-react-key`}>
              <h3>{place.canonicalName}</h3>
              <p>{place.kind}</p>
              <p>
                {place.lat}, {place.lng}
              </p>
              <p>{place.longName}</p>
            </li>
          )
        })
      : null

    return (
      <div className='App'>
        <h3>Search places now!</h3>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            onChange={e => this.setState({ searchValue: e.target.value })}
            type='text'
            name='search'
          />
          <button style={{ margin: '0 0 0 20px' }}>Sök</button>
        </form>
        <div>
          <h1>Places</h1>
          <ul>{places}</ul>
        </div>
      </div>
    )
  }
}

export default App

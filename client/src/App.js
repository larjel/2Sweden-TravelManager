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
      places: [],
      errorMsg: null,
      apiResult: null
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  getPlaces = async (fromPlace, toPlace) => {
    let apiKey = process.env.REACT_APP_APIKEY
    let response = await fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${apiKey}&oName=${fromPlace}&dName=${toPlace}&noRideshare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fromPlace: fromPlace, toPlace: toPlace })
    })
    
    let data = await response.json()
    return data
  }

  handleSearchSubmit = event => {
    event.preventDefault()

    this.getPlaces(this.state.searchValue1, this.state.searchValue2)
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
              <h3>{place.name}</h3>
              <p>{place.kind}</p>
              <p>
                {place.lat}, {place.lng}
              </p>
              <p>{place.longName}</p>
            </li>
          )
        })
      : null

      


    const data = this.state.places;
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
          <button style={{ margin: '0 0 0 20px' }}>Sök</button>
          </div>
        </form>
        <datalist id="destinations">
        <option>Stockholm</option>
        <option>Falun</option> 
        <option>Åre</option>   
        </datalist>
        <div>
          <Tables places={data.places}/>
          <h2>Results</h2>
          <ul>{places}</ul>
        </div>
      </div>
    )
  }
}

export default App

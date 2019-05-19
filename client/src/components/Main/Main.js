import React from 'react';
import "./Main.css";
import EnhancedTable from './EnhancedTable';
import * as apiModule from '../../utils/api.js'
import * as utils from '../../utils/utils.js'
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';

class Main extends React.Component {

  //----------------------------------------------------------------------------
  constructor(props) {
    super(props)
    this.state = {
      searchValue1: null,
      searchValue2: null,
      searchResponse: {},
      searchPath: null,
      autocompletePlaces: [],
      autocompletePlacesInProgress: false,
      currencyCode: null,
      errorMsg: null
    }
  }

  //----------------------------------------------------------------------------
  handleSearchSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchValue1 && this.state.searchValue2 && this.state.currencyCode) {
      apiModule.getRoutes(this.state.searchValue1.value, this.state.searchValue2.value, this.state.currencyCode.value)
        .then(data => {
          this.setState({
            searchResponse: data,
            searchPath: this.state.searchValue1.label + ' -> ' + this.state.searchValue2.label
          })
        })
        .catch(err =>
          this.setState({
            errorMsg: err
          })
        )
    }
  }

  //----------------------------------------------------------------------------
  handleChangeSearch1inp = (searchValue1) => {
    console.log('Input change:', searchValue1);
    if (searchValue1) {
      this.setState({ searchValue1 });
    }
  }

  //----------------------------------------------------------------------------
  handleChangeSearch1chg = (searchValue1) => {
    console.log('Selection change:', searchValue1);
    this.setState({ searchValue1 });
  }

  //----------------------------------------------------------------------------
  handleChangeSearch2 = (searchValue2) => {
    this.setState({ searchValue2 });
    console.log('Destination selected:', searchValue2);
  }

  //----------------------------------------------------------------------------
  handleCurrency = (currencyCode) => {
    this.setState({ currencyCode });
    console.log('Currency code:', currencyCode);
  }

  //----------------------------------------------------------------------------
  loadPlaces = (inputValue) => {
    console.log('loadPlaces input: ' + inputValue);
    if (inputValue.length < 3) {
      this.setState({
        autocompletePlaces: [],
        autocompletePlacesInProgress: false
      })
    } else if (!this.state.autocompletePlacesInProgress) {
      this.setState({
        autocompletePlacesInProgress: true
      })
      apiModule.getAutocomplete(inputValue)
        .then(data => {
          if (Array.isArray(data.places)) {
            const matchingPlaces = data.places.map(e => {
              return { value: e.longName, label: e.longName }
            })
            this.setState({
              autocompletePlaces: matchingPlaces,
              autocompletePlacesInProgress: false
            })
          }
        })
        .catch(err =>
          this.setState({
            errorMsg: err,
            autocompletePlacesInProgress: false
          })
        )
    }
    console.log('AUTOLIST: ', this.state.autocompletePlaces);
    return this.state.autocompletePlaces;
  };

  //----------------------------------------------------------------------------
  loadOptions = (inputValue, callback) => {
    callback(this.loadPlaces(inputValue));
  };

  //----------------------------------------------------------------------------
  render() {
    const destinationOptions = utils.getDestinationList();
    const originOptions = utils.getOriginList();
    const currencyOptions = utils.getCurrencyList();

    return (
      <main className="content">
        <h3 className="searchHeader">Choose desired travel route!</h3>
        <div></div>
        <form className="formLayout" onSubmit={this.handleSearchSubmit}>
          <div className="searchContainer">
            <AsyncSelect
              className="searchBox"
              cacheOptions={true}
              isSearchable={true}
              loadOptions={this.loadOptions}
              defaultOptions={originOptions}
              onInputChange={this.handleChangeSearch1inp}
              onChange={this.handleChangeSearch1chg}
              escapeClearsValue={true}
              isClearable={true}
              placeholder='From...'
              value={this.state.searchValue1}
            />
            <Select
              className="searchBox"
              placeholder='To...'
              isSearchable={false}
              value={this.state.searchValue2}
              onChange={this.handleChangeSearch2}
              options={destinationOptions}
            />
            <button type="submit" style={{ float: 'right' }}>Search</button>
            <Select
              className="searchBox"
              placeholder='Currency'
              isSearchable={false}
              value={this.state.currencyCode}
              onChange={this.handleCurrency}
              options={currencyOptions}
            />
          </div>
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
            */}

          </div>
        </form>
        <EnhancedTable className="resultTable" searchResponse={this.state.searchResponse} searchPath={this.state.searchPath} />
      </main>
    )
  }
}

export default Main;
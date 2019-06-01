import React from 'react';
import "./Main.css";
import ResultTable from '../Table/ResultTable';
import * as apiModule from '../../utils/api.js'
import * as utils from '../../utils/utils.js'
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import sthlm from './sthlmnight.jpg'

const destinationOptions = utils.getDestinationList();
const originOptions = utils.getOriginList();
const currencyOptions = utils.getCurrencyList();

class Main extends React.Component {

  //----------------------------------------------------------------------------
  constructor(props) {
    super(props)
    this.state = {
      searchValue1: null,
      searchValue2: null,
      autocompletePlaces: [],
      autocompletePlacesInProgress: false,
      currencyCode: currencyOptions[0],
      errorMsg: null
    }
  }

  //----------------------------------------------------------------------------
  handleSearchSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchValue1 && this.state.searchValue2 && this.state.currencyCode) {
      // Clear previous search response in App, which will cause all components to clear their contents
      this.props.setSearchResponse(null);
      // Clear any search details from previous search
      this.props.setRouteArrIdxs(-1, -1);

      apiModule.getRoutes(this.state.searchValue1.value, this.state.searchValue2.value, this.state.currencyCode.value)
        .then(data => {
          // Set the search response in App so it is available to all components
          this.props.setSearchResponse(data);
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
    if (searchValue1) {
      this.setState({ searchValue1 });
    }
  }

  //----------------------------------------------------------------------------
  handleChangeSearch1chg = (searchValue1) => {
    this.setState({ searchValue1 });
  }

  //----------------------------------------------------------------------------
  handleChangeSearch2 = (searchValue2) => {
    this.setState({ searchValue2 });
  }

  //----------------------------------------------------------------------------
  handleCurrency = (currencyCode) => {
    this.setState({ currencyCode });
  }

  //----------------------------------------------------------------------------
  loadPlaces = (inputValue) => {
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
    return this.state.autocompletePlaces;
  };

  //----------------------------------------------------------------------------
  loadOptions = (inputValue, callback) => {
    callback(this.loadPlaces(inputValue));
  };

  //----------------------------------------------------------------------------
  render() {

    var sectionStyle = {
      width: "100%",
      height: "700px",
      backgroundImage: `url(${sthlm})`,
      gridArea: "content",
      color: "white",
      padding: "20px",
      borderBottom: "2px solid black",
    };

    return (
      <main style={sectionStyle}>
        <h3 className="searchHeader">Choose desired travel route</h3>
        <form className="formLayout" onSubmit={this.handleSearchSubmit}>
          <div className="search-container">
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
            />
            <Select
              className="searchBox"
              placeholder='To...'
              isSearchable={false}
              onChange={this.handleChangeSearch2}
              options={destinationOptions}
            />
            <Select
              className="currencyBox"
              isSearchable={false}
              defaultValue={currencyOptions[0]}
              onChange={this.handleCurrency}
              options={currencyOptions}
            />
            <button className="search-button" type="submit" style={{ float: 'right' }}>Search</button>
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
        <ResultTable className="resultTable"
          searchResponse={this.props.searchResponse}
          setRouteArrIdxs={this.props.setRouteArrIdxs}
        />
      </main>
    )
  }
}

export default Main;
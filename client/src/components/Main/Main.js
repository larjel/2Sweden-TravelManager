import React from 'react';
import "./Main.css";
import ResultTable from '../Table/ResultTable';
import * as apiModule from '../../utils/api.js'
import * as utils from '../../utils/utils.js'
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import sthlm from './sthlmnight.jpg'

const DESTINATION_OPTIONS = utils.getDestinationList();
const ORIGIN_OPTIONS = utils.getOriginList();
const CURRENCY_OPTIONS = utils.getCurrencyList();
const DEFAULT_CURRENCY_OPTION_IDX = 0;

class Main extends React.Component {

  //----------------------------------------------------------------------------
  constructor(props) {
    super(props)
    this.state = {
      searchValue1: null,
      searchValue2: null,
      autocompletePlaces: [],
      autocompletePlacesInProgress: false,
      currencyCode: CURRENCY_OPTIONS[DEFAULT_CURRENCY_OPTION_IDX],
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

      // Add some extra parameters to request to exclude response data that is not applicable and/or will not be used anyway
      const extraParams = '&noBikeshare&noRideshare&noTowncar&noSpecial&noStop&noAirLeg';
      apiModule.getRoutes(this.state.searchValue1.value, this.state.searchValue2.value,
        this.state.currencyCode.value, extraParams)
        .then(data => {
          // Remove data from response that will not be used
          utils.filterJsonResponse(data);
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
              defaultOptions={ORIGIN_OPTIONS}
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
              options={DESTINATION_OPTIONS}
            />
            <Select
              className="currencyBox"
              isSearchable={false}
              defaultValue={CURRENCY_OPTIONS[DEFAULT_CURRENCY_OPTION_IDX]}
              onChange={this.handleCurrency}
              options={CURRENCY_OPTIONS}
            />
            <button className="search-button" type="submit">Search</button>
          </div>
        </form>
        <ResultTable className="resultTable"
          searchResponse={this.props.searchResponse}
          setRouteArrIdxs={this.props.setRouteArrIdxs}
          routeDetailsArrIdx={this.props.routeDetailsArrIdx}
        />
      </main>
    )
  }
}

export default Main;
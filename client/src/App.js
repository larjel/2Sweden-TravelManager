import React, { Component } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Map from './components/Map/Map'
import MapContainer from './components/Map/MapContainer'

//------------------------------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: {},
      routeDetailsArrIdx: -1,
      searchPath: null,
      errorMsg: null
    }
  }

  //----------------------------------------------------------------------------
  setSearchResponse = (searchResponse) => {
    console.log('App: Search response set');
    this.setState({
      searchResponse: searchResponse
    });
  }

  //----------------------------------------------------------------------------
  setRouteDetailsArrIdx = (routeDetailsArrIdx) => {
    console.log('App: Route details set, Array index: ', routeDetailsArrIdx);
    this.setState({
      routeDetailsArrIdx: routeDetailsArrIdx
    });
  }

  //----------------------------------------------------------------------------
  render() {
    const searchResponse = this.state.searchResponse;
    const routeDetailsArrIdx = this.state.routeDetailsArrIdx;

    return (
      <div className='wrapper'>

        <Header />
        <Main setRouteDetailsArrIdx={this.setRouteDetailsArrIdx} setSearchResponse={this.setSearchResponse} />
        <Sidebar searchResponse={searchResponse} routeDetailsArrIdx={routeDetailsArrIdx} />
        <MapContainer />
        <Footer />

      </div>

    )
  }
}

export default App

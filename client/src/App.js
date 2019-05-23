import React, { Component } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import MapContainer from './components/Map/MapContainer';

//------------------------------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: {},
      routeDetailsArrIdx: -1,
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
        <Main searchResponse={searchResponse} setSearchResponse={this.setSearchResponse} setRouteDetailsArrIdx={this.setRouteDetailsArrIdx} />
        <Sidebar searchResponse={searchResponse} routeDetailsArrIdx={routeDetailsArrIdx} />
        <Footer />
        <MapContainer searchResponse={searchResponse} />
      </div>
    )
  }
}

export default App

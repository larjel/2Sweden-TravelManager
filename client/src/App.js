import React, { Component } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Map from './components/Map/Map'
import { MapContainer } from './components/Map/MapContainer'

//------------------------------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: {},
      routeArrayIndex: -1,
      searchPath: null,
      errorMsg: null
    }
  }

  //----------------------------------------------------------------------------
  routeDetails = (searchResponse, routeArrayIndex) => {
    console.log('Route details set, Array index: ', routeArrayIndex);
    this.setState({
      searchResponse: searchResponse,
      routeArrayIndex: routeArrayIndex
    });
  }

  //----------------------------------------------------------------------------
  render() {
    const searchResponse = this.state.searchResponse;
    const routeArrayIndex = this.state.routeArrayIndex;

    return (
      <div className='wrapper'>

        <Header />
        <Main routeDetails={this.routeDetails} />
        <Sidebar searchResponse={searchResponse} routeArrayIndex={routeArrayIndex} />
        <Footer />
      </div>

    )
  }
}

export default App

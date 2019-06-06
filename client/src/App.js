import React, { Component } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Are from './components/Places/Are/Are'
import Falun from './components/Places/Falun/Falun'
import Stockholm from './components/Places/Stockholm/Stockholm'
import { MENU_OPT } from './utils/utils.js'

//------------------------------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: null, // The response from the Rome2Rio API
      routeDetailsArrIdx: -1, // The array index for the currently selected route
      routeSegmentArrIdx: -1, // The array index for the currently selected route segment
      activePage: MENU_OPT.HOME, // The currently selected active page
      errorMsg: null
    }
  }

  //----------------------------------------------------------------------------
  setSearchResponse = (searchResponse) => {
    this.setState({
      searchResponse: searchResponse
    });
  }

  //----------------------------------------------------------------------------
  setRouteArrIdxs = (routeDetailsArrIdx, routeSegmentArrIdx) => {
    this.setState({
      routeDetailsArrIdx: routeDetailsArrIdx,
      routeSegmentArrIdx: routeSegmentArrIdx
    });
  }

  //----------------------------------------------------------------------------
  setActiveMainPage = (newMainPage) => {
    this.setState({
      activePage: newMainPage
    });
  }

  //----------------------------------------------------------------------------
  getActiveMainPage = () => {
    const searchResponse = this.state.searchResponse;
    const routeDetailsArrIdx = this.state.routeDetailsArrIdx;
    const routeSegmentArrIdx = this.state.routeSegmentArrIdx;

    switch (this.state.activePage) {
      case MENU_OPT.SEARCH:
        window.location.reload(); // Refresh page
        return (null);
      case MENU_OPT.HOME:
      case MENU_OPT.INFO:
      case MENU_OPT.RECOMMEND:
        return (
          <>
            <Main
              searchResponse={searchResponse}
              setSearchResponse={this.setSearchResponse}
              setRouteArrIdxs={this.setRouteArrIdxs}
              routeDetailsArrIdx={routeDetailsArrIdx}
            />
            <Sidebar
              searchResponse={searchResponse}
              setRouteArrIdxs={this.setRouteArrIdxs}
              routeDetailsArrIdx={routeDetailsArrIdx}
              routeSegmentArrIdx={routeSegmentArrIdx}
            />
          </>
        );
      case MENU_OPT.STOCKHOLM:
        return <Stockholm />;
      case MENU_OPT.FALUN:
        return <Falun />;
      case MENU_OPT.ARE:
        return <Are />;
      default:
        return null;
    }
  }

  //----------------------------------------------------------------------------
  render() {

    return (
      <div className='wrapper' data-test='wrapper'>
        <Header setActiveMainPage={this.setActiveMainPage} />
        {this.getActiveMainPage()}
        <Footer />
      </div>
    )
  }
}

export default App

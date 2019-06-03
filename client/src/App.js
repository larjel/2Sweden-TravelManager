import React, { Component } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Are from './components/Places/Are/Are'
import Falun from './components/Places/Falun/Falun'
import Stockholm from './components/Places/Stockholm/Stockholm'

//------------------------------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: null,
      routeDetailsArrIdx: -1,
      routeSegmentArrIdx: -1,
      activePage: 'home',
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
      case 'search':
        window.location.reload(); // Refresh page
        return (null);
      case 'home':
      case 'info':
      case 'recommend':
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
      case 'stockholm':
        return <Stockholm />;
      case 'falun':
        return <Falun />;
      case 'are':
        return <Are />;
      default:
        return null;
    }
  }

  //----------------------------------------------------------------------------
  render() {

    return (
      <div className='wrapper'>
        <Header setActiveMainPage={this.setActiveMainPage} />
        {this.getActiveMainPage()}
        <Footer />
      </div>
    )
  }
}

export default App

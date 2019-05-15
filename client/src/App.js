import React, { Component } from 'react'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResponse: {},
      searchPath: null,
      errorMsg: null
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <Header />
        <Navbar />
        <Main />
        {/* Todo: <Sidebar routeDetails={routeDetails} />*/}
        <Sidebar />
        <Footer />
      </div>
    )
  }
}

export default App

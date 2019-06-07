import React from 'react'
import logo from './projektlogga.png'
import "./Header.css"
import "./dropdown.css"
import { GoSearch, GoInfo, GoLocation, GoHome, GoThumbsup } from 'react-icons/go';
import Hamburgermenu from "./Hamburgermenu"
import Media from 'react-media';
import { MENU_OPT } from '../../utils/utils.js'

class Header extends React.Component {

  constructor() {
    super();
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e, val) {
    e.preventDefault();
    this.props.setActiveMainPage(val);
  }

  render() {
    return (
      <header className="main-head">

        <img className="logo" src={logo} alt="Logo" />
        <h1 className="header-text">
          WINTER OLYMPIC GAMES 2024
        </h1>
        <Media query="(max-width: 1199px)">
          {matches =>
            matches ? (
              <Hamburgermenu setActiveMainPage={this.props.setActiveMainPage} />
            ) : (
                <nav className="my-navbar">
                  <ul className="ul">
                    <li className="current li" ><a className="active" href="/" onClick={(e) => this.handleClick(e, MENU_OPT.HOME)}><GoHome /> Home</a></li>
                    <li className="li" ><a href="/" onClick={(e) => this.handleClick(e, MENU_OPT.SEARCH)}><GoSearch /> New search</a></li>
                    <li className="li" ><a href="/" onClick={(e) => this.handleClick(e, MENU_OPT.INFO)}><GoInfo /> Information</a></li>
                    <li className="li dropdown" >
                      <button className="dropbtn"><GoLocation /> Locations</button>
                      <div className="dropdown-content">
                        <a href="/" onClick={(e) => this.handleClick(e, MENU_OPT.STOCKHOLM)}>Stockholm</a>
                        <a href="/" onClick={(e) => this.handleClick(e, MENU_OPT.FALUN)}>Falun</a>
                        <a href="/" onClick={(e) => this.handleClick(e, MENU_OPT.ARE)}>Åre</a>
                      </div>
                    </li>
                    <li className="li" ><a href="/" onClick={(e) => this.handleClick(e, MENU_OPT.RECOMMEND)}><GoThumbsup /> Recommendations</a></li>
                  </ul>
                </nav>
              )
          }
        </Media>

      </header>
    )
  }
}

export default Header;
import React from 'react'
import logo from './projektlogga.png'
import twitter from './sweTwitter.jpg'
import "./Header.css"
import { GoSearch, GoInfo, GoLocation, GoHome, GoThumbsup } from 'react-icons/go';

class Header extends React.Component {
    render() {
        return (
            <header className="main-head">

                <img className="logo" src={logo} alt="Logo" />
                <h1 className="headerText">
                    WINTER OLYMPIC GAMES 2024
                </h1>
                <nav className="navbar">
                    <ul className="ul">
                        <li className="current li" ><a className="active" href="#"><GoHome /> Home</a></li>
                        <li className="li" ><a href="#"><GoSearch /> New trip</a></li>
                        <li className="li" ><a href="#"><GoInfo /> Information</a></li>
                        <li className="li" ><a href="#news"><GoLocation /> Locations</a></li>
                        <li className="li" ><a href="#news"><GoThumbsup /> Recommendations</a></li>
                    </ul>

                </nav>
            </header>
        )
    }
}

export default Header;
import React from 'react'
import logo from './projektlogga.png'
import twitter from './sweTwitter.jpg'
import "./Header.css"

class Header extends React.Component {
    render() {
        return (
            <header className="main-head">

                <img className="logo" src={logo} alt="Logo" />
                <h1 className="headerText">
                    WINTER OLYMPIC GAMES 2024
                </h1>
                <nav className="nav">
                    <ul className="ul">
                        <li className="current li" ><a href="/">New trip</a></li>
                        <li className="li"><a href="/">About</a></li>
                        <li className="li"><a href="/">Locations</a></li>
                        <li className="li"><a href="/">Recommendations</a></li>
                    </ul>
                </nav>
            </header>
        )
    }
}


export default Header;
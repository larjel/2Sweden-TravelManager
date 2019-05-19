import React from 'react'
import "./Header.css"
import logo from './projektlogga.png'
import twitter from './sweTwitter.jpg'

class Header extends React.Component {
    render() {
        return(
            <header className="main-head">
                <img className="logo" src={logo} alt="Logo"/>
                <img className="twitter2" src={twitter} alt="TwitterLogo"></img>
                <h1 className="headerText">
                    WELCOME 2 SWEDEN
                    <h4 className="underText">WINTER OLYMPIC GAMES 2024</h4>
                </h1>
            </header>
        )
    }
}


export default Header;
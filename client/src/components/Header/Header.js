import React from 'react'
import "./Header.css"
import logo from './projektlogga.png'

class Header extends React.Component {
    render() {
        return(
            <header className="main-head">
            <img className="logo" src={logo} alt="Logo"/>
            <p className="headerText">
            WELCOME 2 SWEDEN - OS 2024
            </p>
            </header>
        )
    }
}


export default Header;
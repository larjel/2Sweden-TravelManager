import React from 'react'
import "./Footer.css";
import logo from './projektlogga.png'
import twitter from './sweTwitter.jpg'

class Footer extends React.Component {
    render() {
        return (
            <footer className="main-footer">
                <img className="logo2" src={logo} alt="Logo"></img>
                <img className="twitter" src={twitter} alt="TwitterLogo"></img>
                <p className="footerText">
                    Christian Jigling | Lars Jelleryd | Stefan Ohlsson | Ida Maria Solli | Ahmed Ismail
                </p>
            </footer>
        )
    }
}


export default Footer;
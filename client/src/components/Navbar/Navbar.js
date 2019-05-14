import React from 'react'
import "./Navbar.css"

class Navbar extends React.Component {
    render() {
        return(
        <nav className="main-nav">
            <ul>
                <li><a href="">Search new trip</a></li>
                <li><a href="">Read about the event</a></li>
                <li><a href="">Read about our locations</a></li>
                <li><a href="">Check Recommendations</a></li>
            </ul>
        </nav>
        )
    }
}


export default Navbar;
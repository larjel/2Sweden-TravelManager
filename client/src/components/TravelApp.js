import React from "react";

class TravelApp extends React.Component {
    render() {
        return(
    <div>
    <form onSubmit={this.props.handleSearchSubmit}>
        <input type="text" name="fromLocation" placeholder="From..." />
        <input type="text" name="toLocation" placeholder="To..." />
        <button style={{ margin: '0 0 0 20px' }}>Sök</button>
        
    </form>
    </div>
        )
    }
}

export default TravelApp;

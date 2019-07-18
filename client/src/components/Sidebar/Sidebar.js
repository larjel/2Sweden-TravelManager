import React from 'react'
import "./Sidebar.css"
import DetailsTable from '../Table/DetailsTable';
import Map from '../Map/Map';
import OpenStreetMap from '../Map/OpenStreetMap';
import reactLogo from "./img/react.png"
import javascriptLogo from "./img/javascript.png"
import htmlLogo from "./img/html.png"
import romeLogo from "./img/romelogo.png"
import cssLogo from "./img/CSS3.png"
import openStreetMapLogo from "./img/openstreetmap.png"

class Sidebar extends React.Component {
    render() {
        var sectionStyle = {
            width: "100%",
            color: "white",
            padding: "10px",
            gridArea: "sidebar"
        };

        return (
            <aside style={sectionStyle}>
                <div className="wrapper">
                    <div className="icon-field">
                        <img src={reactLogo} alt="React logo"></img>
                        <img src={javascriptLogo} alt="Javascript logo"></img>
                        <img src={htmlLogo} alt="HTML logo"></img>
                        <img src={cssLogo} alt="CSS logo"></img>
                        <img src={romeLogo} alt="Rome 2 Rio logo"></img>
                        <img src={openStreetMapLogo} alt="Open street maps logo"></img>
                    </div>
                    <div className="sidebar-space"></div>
                    <div className="flex-container">
                        <DetailsTable
                            searchResponse={this.props.searchResponse}
                            routeDetailsArrIdx={this.props.routeDetailsArrIdx}
                            routeSegmentArrIdx={this.props.routeSegmentArrIdx}
                            setRouteArrIdxs={this.props.setRouteArrIdxs}
                        />
                        <OpenStreetMap
                            searchResponse={this.props.searchResponse}
                            routeDetailsArrIdx={this.props.routeDetailsArrIdx}
                            routeSegmentArrIdx={this.props.routeSegmentArrIdx}
                        />
                    </div>

                </div>
            </aside>
        )
    }
}


export default Sidebar;

import React from 'react'
import "./Sidebar.css"
import DetailsTable from '../Table/DetailsTable';
import Map from '../Map/Map';
import reactLogo from "./react.png"
import javascriptLogo from "./javascript.png"
import htmlLogo from "./html.png"
import romeLogo from "./romelogo.png"
import cssLogo from "./CSS3.png"
import googleLogo from "./googlem.png"

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
                        <img src={reactLogo} alt="reactlogo"></img>
                        <img src={javascriptLogo} alt="reactlogo"></img>
                        <img src={htmlLogo} alt="reactlogo"></img>
                        <img src={cssLogo} alt="reactlogo"></img>
                        <img src={romeLogo} alt="reactlogo"></img>
                        <img src={googleLogo} alt="reactlogo"></img>
                    </div>
                    <div className="sidebar-space"></div>
                    <div className="flex-container">
                        <DetailsTable
                            searchResponse={this.props.searchResponse}
                            routeDetailsArrIdx={this.props.routeDetailsArrIdx}
                            routeSegmentArrIdx={this.props.routeSegmentArrIdx}
                            setRouteArrIdxs={this.props.setRouteArrIdxs}
                        />
                        <Map
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

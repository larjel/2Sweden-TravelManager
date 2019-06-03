import React from 'react'
import "./Sidebar.css"
import DetailsTable from '../Table/DetailsTable';
import Map from '../Map/Map';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var sectionStyle = {
            width: "100%",
            gridArea: "content",
            color: "white",
            padding: "10px",
            gridArea: "sidebar",
        };

        return (
            <aside style={sectionStyle}>
                <div className="wrapper">
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
                    <div className="push"></div>
                </div>
            </aside>
        )
    }
}


export default Sidebar;
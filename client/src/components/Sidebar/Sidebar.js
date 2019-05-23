import React from 'react'
import "./Sidebar.css"
import DetailsTable from './DetailsTable';
import Map from '../Map/Map';
import { MapContainer } from '../Map/MapContainer';


class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var sectionStyle = {
            width: "100%",
            gridArea: "content",
            color: "white",
            padding: "20px",
            gridArea: "sidebar",
          };
      
        return (
            <aside style={sectionStyle}>
                <i className="fab fa-react"></i>
                <div className="wrapper">
                <i className="fab fa-react"></i>
                <DetailsTable className="resultTable"
                    searchResponse={this.props.searchResponse}
                    routeArrayIndex={this.props.routeArrayIndex}
                />
                <MapContainer/>
                <div className="push"></div>
                </div>
            </aside>
        )
    }
}


export default Sidebar;
import React from 'react'
import "./Sidebar.css"
import DetailsTable from './DetailsTable';
// import MapContainer from '../Map/MapContainer';


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
                        routeDetailsArrIdx={this.props.routeDetailsArrIdx}
                    />
                    {/* <MapContainer searchResponse={this.props.searchResponse} /> */}
                    <div className="push"></div>
                </div>
            </aside>
        )
    }
}


export default Sidebar;
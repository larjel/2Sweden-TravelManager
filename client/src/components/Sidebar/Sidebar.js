import React from 'react'
import "./Sidebar.css"
import DetailsTable from './DetailsTable';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <aside className="side">
                <h5 className="sidebarHeader">Detailed Route</h5>
                <DetailsTable className="resultTable"
                    searchResponse={this.props.searchResponse}
                    routeArrayIndex={this.props.routeArrayIndex}
                />
            </aside>
        )
    }
}


export default Sidebar;
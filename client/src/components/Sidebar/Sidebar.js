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
                <DetailsTable className="resultTable"
                    searchResponse={this.props.searchResponse}
                    routeArrayIndex={this.props.routeArrayIndex}
                />
            </aside>
        )
    }
}


export default Sidebar;
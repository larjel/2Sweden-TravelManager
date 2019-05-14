import React from 'react'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <aside className="side">{this.props.routesList}</aside>
        )
    }
}


export default Sidebar;
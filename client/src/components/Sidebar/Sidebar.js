import React from 'react'
import "./Sidebar.css"
import DetailsTable from './DetailsTable';
import 'font-awesome/css/font-awesome.min.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var sectionStyle = {
            width: "100%",
         /*   height: "700px",  */
           /* backgroundImage: `url(${sthlm2})`,*/
            gridArea: "content",
            color: "white",
            padding: "20px",
            gridArea: "sidebar",
            borderLeft: "2px ridge black",
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
                <div className="push"></div>
                </div>
            </aside>
        )
    }
}


export default Sidebar;
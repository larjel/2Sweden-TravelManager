import React from 'react'
import "./Sidebar.css"
import DetailsTable from './DetailsTable';
/*import sthlm2 from './sthlmnight2.jpg'*/

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
                <DetailsTable className="resultTable"
                    searchResponse={this.props.searchResponse}
                    routeArrayIndex={this.props.routeArrayIndex}
                />
            </aside>
        )
    }
}


export default Sidebar;
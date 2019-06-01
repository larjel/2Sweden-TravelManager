import React from "react";
import * as utils from '../../utils/utils.js'
import * as stylers from './stylers.js'

// Import React Table
import ReactTable from "react-table";
import "./react-table.css";
import "./DetailsTable.css";

class DetailsTable extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  //--------------------------------------------------------------------------
  parseInputDataForTable = (searchResponse, routeArrayIndex) => {
    const tableData = { parsed: false, data: [], tableTitle: null, currencyCode: null };

    if (routeArrayIndex >= 0 && searchResponse && Array.isArray(searchResponse.routes)
      && searchResponse.routes.length > 0) {

      const detailedRoute = searchResponse.routes[routeArrayIndex];

      tableData.currencyCode = ' (' + searchResponse.currencyCode + ')';

      const vehicles = Array.isArray(searchResponse.vehicles) ? searchResponse.vehicles : null;

      if (Array.isArray(detailedRoute.segments)) {
        tableData.data = detailedRoute.segments.map((segment, index) => {
          let transport = vehicles ? vehicles[segment.vehicle].name : segment.segmentKind;
          const transitDuration = utils.truncateDecimals(segment.transitDuration / 60, 1);
          const prices = segment.indicativePrices;
          const leg = index + 1;
          let priceLow = null;
          let priceHigh = null;
          let departure = '';
          let arrival = '';
          if (Array.isArray(prices)) {
            priceLow = prices[0].priceLow;
            priceHigh = prices[0].priceHigh;
          }

          if (Array.isArray(searchResponse.places) && searchResponse.places.length > 0) {
            const depPlaceIdx = segment.depPlace;
            const arrPlaceIdx = segment.arrPlace;

            const codeDepPlace = searchResponse.places[depPlaceIdx].code ? ', ' + searchResponse.places[depPlaceIdx].code : '';
            const codeArrPlace = searchResponse.places[arrPlaceIdx].code ? ', ' + searchResponse.places[arrPlaceIdx].code : '';

            departure = searchResponse.places[depPlaceIdx].shortName + codeDepPlace;
            arrival = searchResponse.places[arrPlaceIdx].shortName + codeArrPlace;
          }

          return {
            leg: leg,
            transport: transport,
            departure: departure,
            arrival: arrival,
            duration: transitDuration,
            priceLow: priceLow,
            priceHigh: priceHigh,
            segmentArrayIndex: index
          };
        })

        tableData.tableTitle = detailedRoute.name;

        tableData.parsed = true;
      }
    }

    return tableData;
  }

  //--------------------------------------------------------------------------
  handleRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {

        if (rowInfo && rowInfo.original && rowInfo.original.segmentArrayIndex >= 0) {
          const segmentArrayIndex = rowInfo.original.segmentArrayIndex;
          this.props.setRouteArrIdxs(this.props.routeDetailsArrIdx, segmentArrayIndex);
        } else { // Clicks on empty row will cause the whole route to load again
          this.props.setRouteArrIdxs(this.props.routeDetailsArrIdx, -1);
        }

        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        if (handleOriginal) {
          handleOriginal();
        }
      }
    }
  }

  //--------------------------------------------------------------------------
  render() {

    const { searchResponse, routeDetailsArrIdx } = this.props;
    const { parsed, data, tableTitle, currencyCode } = this.parseInputDataForTable(searchResponse, routeDetailsArrIdx);

    if (!parsed) {
      return (null);
    }

    return (
      <div>
        <ReactTable
          className="-striped -highlight details-table"
          getTdProps={this.handleRowClick}
          data={data}
          columns={[
            {
              Header: tableTitle,
              getHeaderProps: stylers.mainHeadingStyle,
              columns: [
                {
                  getHeaderProps: stylers.leftAlignHeadingStyle,
                  getProps: stylers.leftAlignStyle,
                  Header: "Leg",
                  accessor: "leg",
                },
                {
                  getHeaderProps: stylers.leftAlignHeadingStyle,
                  getProps: stylers.leftAlignStyle,
                  Header: "Transport",
                  accessor: "transport",
                },
                {
                  getHeaderProps: stylers.leftAlignHeadingStyle,
                  getProps: stylers.leftAlignStyle,
                  Header: "Departing",
                  accessor: "departure"
                },
                {
                  getHeaderProps: stylers.leftAlignHeadingStyle,
                  getProps: stylers.leftAlignStyle,
                  Header: "Arriving",
                  accessor: "arrival"
                },
                {
                  getHeaderProps: stylers.rightAlignHeadingStyle,
                  getProps: stylers.rightAlignStyle,
                  Header: "Time (h)",
                  accessor: "duration"
                },
                {
                  getHeaderProps: stylers.rightAlignHeadingStyle,
                  getProps: stylers.rightAlignStyle,
                  Header: "Min Price" + currencyCode,
                  accessor: "priceLow"
                },
                {
                  getHeaderProps: stylers.rightAlignHeadingStyle,
                  getProps: stylers.rightAlignStyle,
                  Header: "Max Price" + currencyCode,
                  accessor: "priceHigh"
                },
                {
                  Header: "",
                  accessor: "segmentArrayIndex",
                  show: false
                }
              ]
            },
          ]}
          defaultSorted={[
            {
              id: "leg",
              desc: false
            }
          ]}
          pageSizeOptions={[10, 15, 20, 25, 50, 100]}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default DetailsTable;

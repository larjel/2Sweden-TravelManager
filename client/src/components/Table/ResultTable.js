import React from "react";
import { animateScroll as scroll } from 'react-scroll'
import * as utils from '../../utils/utils.js'
import * as stylers from './stylers.js'
import ReactTable from "react-table";
import "./react-table.css";
import "./ResultTable.css";
import { FaArrowRight } from "react-icons/fa";

let selectedRowIndex = -1;

class ResultTable extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  //--------------------------------------------------------------------------
  parseInputDataForTable = (searchResponse) => {
    const tableData = { parsed: false, data: [], tableTitle: null, currencyCode: null };

    if (searchResponse && Array.isArray(searchResponse.routes) && searchResponse.routes.length > 0) {

      tableData.currencyCode = ' (' + searchResponse.currencyCode + ')';

      tableData.data = searchResponse.routes.map((route, index) => {
        const totalDurationHours = utils.truncDecAndRound(route.totalDuration / 60, 1);
        const prices = route.indicativePrices;
        let priceLow = null;
        let priceHigh = null;
        let transferCount = null;
        if (Array.isArray(prices)) {
          priceLow = prices[0].priceLow;
          priceHigh = prices[0].priceHigh;
        }
        if (Array.isArray(route.segments)) {
          transferCount = route.segments.length;
        }

        return {
          route: route.name,
          duration: totalDurationHours,
          transferCount: transferCount,
          priceLow: priceLow,
          priceHigh: priceHigh,
          routeArrayIndex: index
        };
      })

      // Set the departure and arrival destinations table header
      if (Array.isArray(searchResponse.places)) {
        if (searchResponse.places.length > 1) {
          tableData.tableTitle = (
            <div>
              {searchResponse.places[0].longName + ' '}
              <FaArrowRight />
              {' ' + searchResponse.places[1].longName}
            </div>);
        } else if (searchResponse.places.length === 1) { // Same departure & destination
          tableData.tableTitle = searchResponse.places[0].longName;
        }
      } else {
        tableData.tableTitle = 'Results';
      }

      tableData.parsed = true;
    }

    return tableData;
  }

  //--------------------------------------------------------------------------
  resetSelectedRowColor = (routeDetailsArrIdx) => {
    if (routeDetailsArrIdx === -1) {
      selectedRowIndex = -1;
    }
  }

  //--------------------------------------------------------------------------
  setSelectedRowColor = (state, rowInfo, column) => {
    if (rowInfo && selectedRowIndex === rowInfo.index) {
      return {
        style: {
          background: '#ccccce'
        }
      }
    }
    else {
      return {
        style: {}
      }
    }
  }

  //--------------------------------------------------------------------------
  handleRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {

        if (rowInfo && rowInfo.original && rowInfo.original.routeArrayIndex >= 0) {
          const routeArrayIndex = rowInfo.original.routeArrayIndex;
          this.props.setRouteArrIdxs(routeArrayIndex, -1);
          selectedRowIndex = rowInfo.index;
          scroll.scrollTo(800);
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
    const { parsed, data, tableTitle, currencyCode } = this.parseInputDataForTable(searchResponse);

    if (!parsed) {
      return (null);
    }

    this.resetSelectedRowColor(routeDetailsArrIdx);

    return (
      <div>
        <ReactTable
          className="-striped -highlight result-table"
          getTdProps={this.handleRowClick}
          getTrProps={this.setSelectedRowColor}
          data={data}
          columns={[
            {
              Header: tableTitle,
              getHeaderProps: stylers.mainHeadingStyle,
              columns: [
                {
                  getHeaderProps: stylers.leftAlignHeadingStyle,
                  getProps: stylers.leftAlignStyle,
                  Header: "Route",
                  accessor: "route"
                },
                {
                  getHeaderProps: stylers.rightAlignHeadingStyle,
                  getProps: stylers.rightAlignStyle,
                  Header: "Time (h)",
                  accessor: "duration",
                },
                {
                  getHeaderProps: stylers.rightAlignHeadingStyle,
                  getProps: stylers.rightAlignStyle,
                  Header: "Transfers",
                  accessor: "transferCount"
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
                  accessor: "routeArrayIndex",
                  show: false
                }
              ]
            },
          ]}
          defaultSorted={[
            {
              id: "duration",
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

export default ResultTable;

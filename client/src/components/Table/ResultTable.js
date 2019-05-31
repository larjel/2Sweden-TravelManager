import React from "react";
import * as utils from '../../utils/utils.js'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ResultTable.css";

class ResultTable extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  //--------------------------------------------------------------------------
  parseInputDataForTable = (searchResponse, searchPath) => {
    const tableData = { data: [], tableTitle: null };

    if (searchResponse && Array.isArray(searchResponse.routes) && searchResponse.routes.length > 0) {

      const currencyCode = ' (' + searchResponse.currencyCode + ')';

      tableData.data = searchResponse.routes.map((route, index) => {
        const totalDurationHours = utils.truncateDecimals(route.totalDuration / 60, 1);
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

      tableData.tableTitle = searchPath;
    }

    return tableData;
  }

  render() {

    const { searchResponse, searchPath } = this.props;
    const { data, tableTitle } = this.parseInputDataForTable(searchResponse, searchPath);

    if (!tableTitle) {
      return (null);
    }

    return (
      <div>
        <ReactTable
          className="-striped -highlight result-table"
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)

                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal()
                }
              }
            }
          }}
          data={data}
          columns={[
            {
              Header: tableTitle,
              columns: [
                {
                  Header: "Route",
                  accessor: "route"
                },
                {
                  Header: "Time",
                  accessor: "duration"
                },
                {
                  Header: "Transfers",
                  accessor: "transferCount"
                },
                {
                  Header: "Min Price",
                  accessor: "priceLow"
                },
                {
                  Header: "Max Price",
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
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default ResultTable;

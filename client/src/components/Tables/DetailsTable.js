import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../Main/Main.css";
import * as utils from '../../utils/utils.js'
import EnhancedTableHead from './Components/EnhancedTableHead';
import EnhancedTableToolbar from './Components/EnhancedTableToolbar';

//----------------------------------------------------------------------------
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//----------------------------------------------------------------------------
let counter = 0;
function createData(leg, transport, departure, arrival, duration, lowestprice, highestprice, routeArrayIndex) {
  counter += 1;
  return { id: counter, leg, transport, departure, arrival, duration, lowestprice, highestprice, routeArrayIndex };
}

//----------------------------------------------------------------------------
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 400,
    maxWidth: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

//----------------------------------------------------------------------------
class DetailsTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'leg',
      selected: [],
      page: 0,
      rowsPerPage: 5,
    }
  }

  //--------------------------------------------------------------------------
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'asc';

    if (this.state.orderBy === property && this.state.order === 'asc') {
      order = 'desc';
    }

    this.setState({ order, orderBy });
  };

  //--------------------------------------------------------------------------
  handleClick = (event, id, data) => {

    //this.setState(state => ({ selected: data.map(n => n.id) }));

    //const { selected } = this.state;
    //const selectedIndex = s.slicexOf(id);
    //let newSelected = [];

    console.log('ROW CLICKED!!!');
    console.log('Data: ', data);
    console.log('ID: ', id);

    //this.props.routeDetails(this.props.searchResponse, )

    //this.setState({ selected: newSelected });
  };

  //--------------------------------------------------------------------------
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  //--------------------------------------------------------------------------
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //--------------------------------------------------------------------------
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  //--------------------------------------------------------------------------
  parseInputDataForTable = (searchResponse, routeArrayIndex) => {
    const tableData = { rows: null, data: [], tableTitle: null };

    if (routeArrayIndex >= 0 && searchResponse && Array.isArray(searchResponse.routes)
      && searchResponse.routes.length > 0) {

      const detailedRoute = searchResponse.routes[routeArrayIndex];

      const currencyCode = ' (' + searchResponse.currencyCode + ')';

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

            const code = searchResponse.places[depPlaceIdx].code ? ', ' + searchResponse.places[depPlaceIdx].code : '';

            departure = searchResponse.places[depPlaceIdx].shortName + code;
            arrival = searchResponse.places[arrPlaceIdx].shortName + code;
          }

          return createData(leg, transport, departure, arrival, transitDuration, priceLow, priceHigh, index);
        })

        tableData.rows = [
          { id: 'leg', numeric: true, disablePadding: false, label: 'Leg' },
          { id: 'transport', numeric: false, disablePadding: false, label: 'Transport' },
          { id: 'departure', numeric: false, disablePadding: false, label: 'Departing' },
          { id: 'arrival', numeric: false, disablePadding: false, label: 'Arriving' },
          { id: 'duration', numeric: true, disablePadding: false, label: 'Time (hours)' },
          { id: 'lowestprice', numeric: true, disablePadding: false, label: 'Min Price' + currencyCode },
          { id: 'highestprice', numeric: true, disablePadding: false, label: 'Max Price' + currencyCode },
          { id: 'routeArrayIndex', numeric: true, disablePadding: false, label: 'Hidden', hidden: true }
        ];

        tableData.tableTitle = detailedRoute.name;
      }
    }

    return tableData;      
  }
  
  //--------------------------------------------------------------------------
  render() {

    const { classes, searchResponse, routeDetailsArrIdx } = this.props;
    const { rows, data, tableTitle } = this.parseInputDataForTable(searchResponse, routeDetailsArrIdx);

    if (!rows) {
      return (null);
    }
    
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className="searchContainer">
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length} tableTitle={tableTitle} />
          <div className={classes.tableWrapper} >
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                rows={rows}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {utils.stableSort(data, utils.getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id, data)}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell>{n.leg}</TableCell>
                        <TableCell>{n.transport}</TableCell>
                        <TableCell>{n.departure}</TableCell>
                        <TableCell>{n.arrival}</TableCell>
                        <TableCell align="right">{n.duration}</TableCell>
                        <TableCell align="right">{n.lowestprice}</TableCell>
                        <TableCell align="right" >{n.highestprice}</TableCell>
                        <TableCell align="right" hidden={true}>{n.routeArrayIndex}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            className="tableBlue"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

//----------------------------------------------------------------------------
DetailsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

//----------------------------------------------------------------------------
export default withStyles(styles)(DetailsTable);

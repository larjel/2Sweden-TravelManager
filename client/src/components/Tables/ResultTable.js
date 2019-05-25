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
import EnhancedTableHead from './Head/EnhancedTableHead';
import EnhancedTableToolbar from './Toolbar/EnhancedTableToolbar';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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
function createData(route, duration, transferCount, lowestprice, highestprice, routeArrayIndex) {
  counter += 1;
  return { id: counter, route, duration, transferCount, lowestprice, highestprice, routeArrayIndex };
}

//----------------------------------------------------------------------------
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 400,
    maxWidth: 400,
    margin: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

//----------------------------------------------------------------------------
class ResultTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'route',
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

    console.log('ROW CLICKED!!!');
    console.log('Data: ', data);
    console.log('ID: ', id);
    scroll.scrollTo(800);

    if (Array.isArray(data)) {
      console.log('data is Array');
      const clickedRow = data.find(n => n.id == id);
      console.log('clickedRow: ', clickedRow);
      this.props.setRouteDetailsArrIdx(clickedRow.routeArrayIndex);
    }
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
  parseInputDataForTable = (searchResponse, searchPath) => {
    const tableData = { rows: null, data: [], tableTitle: null };

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
        return createData(route.name, totalDurationHours, transferCount, priceLow, priceHigh, index);
      })

      tableData.rows = [
        { id: 'route', numeric: false, disablePadding: false, label: 'Route' },
        { id: 'duration', numeric: true, disablePadding: false, label: 'Time (hours)' },
        { id: 'transferCount', numeric: true, disablePadding: false, label: 'Transfers' },
        { id: 'lowestprice', numeric: true, disablePadding: false, label: 'Min Price' + currencyCode },
        { id: 'highestprice', numeric: true, disablePadding: false, label: 'Max Price' + currencyCode },
        { id: 'routeArrayIndex', numeric: true, disablePadding: false, label: 'Hidden', hidden: true }
      ];

      tableData.tableTitle = searchPath;
    }

    return tableData;      
  }

  //--------------------------------------------------------------------------
  render() {

    const { classes, searchResponse, searchPath} = this.props;
    const { rows, data, tableTitle } = this.parseInputDataForTable(searchResponse, searchPath);

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
                        <TableCell>{n.route}</TableCell>
                        <TableCell align="right">{n.duration}</TableCell>
                        <TableCell align="right">{n.transferCount}</TableCell>
                        <TableCell align="right">{n.lowestprice}</TableCell>
                        <TableCell align="right" >{n.highestprice}</TableCell>
                        <TableCell align="right" hidden={true}>{n.routeArrayIndex}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
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
ResultTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

//----------------------------------------------------------------------------
export default withStyles(styles)(ResultTable);

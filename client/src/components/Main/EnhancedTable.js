import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import "./Main.css";
import { blue } from '@material-ui/core/colors';
import * as utils from '../../utils/utils.js'
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
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { rows, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                className="tableHead"
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
                hidden={row.hidden}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

//----------------------------------------------------------------------------
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//----------------------------------------------------------------------------
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    // CHANGE THE TABLE HEAD COLOR
    backgroundImage: "linear-gradient(to right top, #315a9d, #295294, #204a8b, #174382, #0b3b79)"
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

//----------------------------------------------------------------------------
let EnhancedTableToolbar = props => {
  const { tableTitle, numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, classes.head, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {tableTitle}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      </div>
    </Toolbar>
  );
};

//----------------------------------------------------------------------------
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

//----------------------------------------------------------------------------
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
class EnhancedTable extends React.Component {

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
  render() {

    let rows = null;
    let data = null;
    let tableTitle = null;
    const searchResponse = this.props.searchResponse;
    if (searchResponse && Array.isArray(searchResponse.routes) && searchResponse.routes.length > 0) {

      const currencyCode = ' (' + searchResponse.currencyCode + ')';

      data = searchResponse.routes.map((route, index) => {
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

      rows = [
        { id: 'route', numeric: false, disablePadding: false, label: 'Route' },
        { id: 'duration', numeric: true, disablePadding: false, label: 'Time (hours)' },
        { id: 'transferCount', numeric: true, disablePadding: false, label: 'Transfers' },
        { id: 'lowestprice', numeric: true, disablePadding: false, label: 'Min Price' + currencyCode },
        { id: 'highestprice', numeric: true, disablePadding: false, label: 'Max Price' + currencyCode },
        { id: 'routeArrayIndex', numeric: true, disablePadding: false, label: 'Hidden', hidden: true }
      ];

      tableTitle = this.props.searchPath;

    } else {
      return (null);
    }

    const { classes } = this.props;
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
EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

//----------------------------------------------------------------------------
export default withStyles(styles)(EnhancedTable);

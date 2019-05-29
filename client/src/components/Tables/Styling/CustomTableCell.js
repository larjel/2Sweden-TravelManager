import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

//----------------------------------------------------------------------------
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
    padding: '0px 5px 0px 5px',
  },
}))(TableCell);

//----------------------------------------------------------------------------
export default CustomTableCell;

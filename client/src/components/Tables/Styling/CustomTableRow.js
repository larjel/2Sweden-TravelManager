import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

//----------------------------------------------------------------------------
const CustomTableRow = withStyles(theme => ({
  root: {
    height: '40px',
  },
}))(TableRow);

//----------------------------------------------------------------------------
export default CustomTableRow;

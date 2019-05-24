import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import "../../Main/Main.css";

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
export default withStyles(toolbarStyles)(EnhancedTableToolbar);

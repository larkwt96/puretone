import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, ListItem, Avatar, ListItemText, ListSubheader, List } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class ChordElement extends React.Component {
  getNoteAvatar = (note) => {
    if ("note" in note) {
      return note.note.letter;
    } else {
      return "Hz";
    }
  };

  zipIntervalsAndNotes = (chord) => {
    const { intervals, notes } = chord;
    return (
      <React.Fragment>
        {
          intervals.map((interval, id) => {
            return (
              <ListItem>
                <Avatar>{this.getNoteAvatar(notes[id])}</Avatar>
                <ListItemText primary={`${notes[id]}`} secondary={`${JSON.stringify(interval)}`} />
              </ListItem>
            )
          })
        }
      </React.Fragment>
    );
  };

  render() {
    const { classes, chord } = this.props;
    const { root, duration, soundType } = chord;

    return (
      <Paper className={classes.paper}>
        <List className={classes.list}>
          <ListSubheader className={classes.subHeader}>{`Note: ${root}`}</ListSubheader>
          <ListSubheader className={classes.subHeader}>{`Duration: ${duration}`}</ListSubheader>
          <ListSubheader className={classes.subHeader}>{`Sound Type: ${soundType}`}</ListSubheader>
          <ListSubheader className={classes.subHeader}>{`Intervals:`}</ListSubheader>
          {this.zipIntervalsAndNotes(chord)}
        </List>
      </Paper>
    );
  };
};

ChordElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChordElement);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, ListItem, Avatar, ListItemText, List, Divider, Typography } from '@material-ui/core';
import { SoundType } from '../model/sound';
import { IntervalType } from '../model/music/interval';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing.unit * 2}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing.unit * 9}px`,
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

class Chord extends React.Component {
  getNoteAvatar = (note) => {
    if ("note" in note) {
      return note.note.letter;
    } else {
      return "Hz";
    }
  };

  renderIntervalAvatar = (type) => {
    switch (type) {
      case IntervalType.BARE:
        return "BA"
      case IntervalType.ET:
        return "ET"
      case IntervalType.PURE:
        return "PR"
      case IntervalType.TET:
        return "12"
      default:
    }
  }

  zipIntervalsAndNotes = (classes, chord) => {
    const { intervals, notes } = chord;
    return (
      <React.Fragment>
        {
          intervals.map((interval, id) => {
            return (
              <ListItem divider={id !== intervals.length - 1} className={classes.dividerInset}>
                {/*<Avatar>{this.renderIntervalAvatar(interval.type)}</Avatar>*/}
                <ListItemText primary={`${notes[id]}`} secondary={`${interval}`} />
              </ListItem>
            )
          })
        }
      </React.Fragment>
    );
  };

  renderSoundType = (soundType) => {
    switch (soundType) {
      case SoundType.FLAT:
        return "";
      case SoundType.FADE:
        return "with fade ";
      default:
        return "special form ";
    }
  };

  renderIntervals = (classes, chord) => {
    if (chord.intervals.length === 0) {
      return null;
    }
    return (
      <React.Fragment>
        <Divider component="li" />
        <li>
          <Typography className={classes.dividerFullWidth} color="textSecondary" variant="caption">
            Intervals
          </Typography>
        </li>
        {this.zipIntervalsAndNotes(classes, chord)}
      </React.Fragment>
    );
  }

  render() {
    const { classes, chord } = this.props;
    const { root, duration, soundType } = chord;
    const details = `Plays ${this.renderSoundType(soundType)}for ${Number(duration.toFixed(2))} sec`;

    return (
      <Paper className={classes.paper}>
        <List className={classes.list}>
          <ListItem>
            <Avatar>{this.getNoteAvatar(root)}</Avatar>
            <ListItemText primary={`${root}`} secondary={details} />
          </ListItem>
          {this.renderIntervals(classes, chord)}
        </List >
      </Paper >
    );
  };
};

Chord.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chord);

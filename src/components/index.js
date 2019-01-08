import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Chord, NoteBuilder, Tone } from '../model/music';
import { PureInterval, EtInterval, TetInterval, IntervalEnum } from "../model/music/interval";
import Model from '../model/model';
import ChordElement from './chord';

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
});

class Index extends React.Component {
  state = {
    model: new Model()
  };

  componentDidMount() {
    this.buildFakeData();
  }

  buildFakeData = () => {
    const r440 /* raw 440 hz */ = new Tone(440);
    // chord 1
    const r440Chord = new Chord(r440);
    r440Chord.addInterval(new EtInterval(4));
    // chord 2
    const r440Chord2 = new Chord(r440);
    r440Chord2.addInterval(new PureInterval(3, 2));
    r440Chord2.addInterval(new PureInterval(54.588));

    const A440 /* A4 */ = NoteBuilder.getNoteByName('A4');
    const A440Chord = new Chord(A440);
    const tetInterval = new TetInterval();
    tetInterval.applyInterval(IntervalEnum.MAJOR_THIRD);
    A440Chord.addInterval(tetInterval);

    const C4 /* C4 */ = NoteBuilder.getNoteByName('C4');
    const C4Chord = new Chord(C4);

    const CMChord = new Chord(C4);
    CMChord.addInterval(new TetInterval(IntervalEnum.MAJOR_THIRD));
    CMChord.addInterval(new TetInterval(IntervalEnum.PERFECT_FIFTH));

    const model = new Model();
    model.add(r440Chord);
    model.add(r440Chord2);
    model.add(A440Chord);
    model.add(C4Chord);
    model.add(CMChord);

    this.setState({ model: model });
  };

  render() {
    const { classes } = this.props;
    const { model: { chords } } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Pure Tone v0.3.7
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <main className={classes.layout}>
          {chords.map(({ chord }, id) =>
            <ChordElement chord={chord} key={id} />
          )}
        </main>
      </React.Fragment >
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

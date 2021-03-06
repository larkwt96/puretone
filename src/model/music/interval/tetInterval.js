import {
  Interval,
  IntervalType,
  EtInterval,
  PureInterval,
  IntervalStepRatios,
  IntervalEnum,
  IntervalModEnum
} from '.';
import { Note } from '..';
import _ from 'lodash';

const MajorIntervals = [
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MAJOR_THIRD,
  IntervalEnum.MAJOR_SIXTH,
  IntervalEnum.MAJOR_SEVENTH,
];

const MinorIntervals = [
  IntervalEnum.MINOR_SECOND,
  IntervalEnum.MINOR_THIRD,
  IntervalEnum.MINOR_SIXTH,
  IntervalEnum.MINOR_SEVENTH,
];

class TetInterval extends Interval {
  constructor(intervals) {
    super();
    this.intervals = [];
    this.usePureInterval = false;
    this.type = IntervalType.TET;
    this._step = 0;
    if (Array.isArray(intervals)) {
      for (let idx in intervals) {
        this.applyInterval(intervals[idx]);
      }
    } else if (intervals !== undefined) {
      this.applyInterval(intervals);
    }
  }

  get step() {
    if (this._step === undefined) {
      this._step = 0;
      for (let idx in this.intervals) {
        const { type, mods, raise } = this.intervals[idx];
        this._step += this._calcStep(type, mods, raise);
      }
    }
    return this._step;
  }

  applyInterval = (type = IntervalEnum.UNISON, mods = [], raise = true) => {
    if (!Array.isArray(mods)) {
      mods = [mods];
    }
    this.intervals.push({ type: type, mods: mods, raise: raise });
    this._step = undefined;
  };

  removeInterval = (idx, deleteCount = 1) => {
    this.intervals.splice(idx, deleteCount);
    this._step = undefined;
  };

  generate = (root) => {
    let interval;
    if (this.usePureInterval) {
      interval = this.buildPureInterval();
    } else {
      interval = this.buildEtInterval();
    }
    const { freq } = interval.generate(root);
    return this._generateWithFreq(root, freq);
  };

  buildPureInterval = () => {
    let numTotal = 1;
    let denTotal = 1;
    for (let idx in this.intervals) {
      const { type, raise } = this.intervals[idx];
      let [num, den] = IntervalStepRatios[type]
      if (!raise) {
        [num, den] = [den, num];
      }
      numTotal *= num;
      denTotal *= den;
    }
    return new PureInterval(numTotal, denTotal);
  };

  buildEtInterval = () => {
    return new EtInterval(this.step);
  };

  _calcStep = (type, mods, raise) => {
    let step = 0;
    for (let idx in mods) {
      ({ type, step } = this._applyMod(type, step, mods[idx]));
    }
    step = type + step;
    if (!raise) {
      step = -step;
    }
    return step;
  };

  _applyMod = (type, step, mod) => {
    switch (mod) {
      case IntervalModEnum.AUGMENTED:
        step++;
        break;
      case IntervalModEnum.DIMINISHED:
        step--;
        break;
      case IntervalModEnum.MINOR:
        type = this._toMinor(type);
        break;
      case IntervalModEnum.MAJOR:
        type = this._toMajor(type);
        break;
      default:
    }
    return { type: type, step: step };
  };

  _generateWithFreq = (root, freq) => {
    const note = new Note(freq, undefined, root.key + this.step);
    let center = this._calcLetter(root.note.letter + root.note.octave);
    note.simplifyNote(undefined, center);
    return note;
  };

  _toMinor = (type) => {
    if (_.indexOf(MajorIntervals, type) !== -1) {
      type--;
    }
    return type;
  };

  _toMajor = (type) => {
    if (_.indexOf(MinorIntervals, type) !== -1) {
      type++;
    }
    return type;
  };

  _calcLetter = (note) => {
    for (let idx in this.intervals) {
      const { type, raise } = this.intervals[idx];
      note = this._raiseNote(note, type, raise);
    }
    return note;
  };

  _raiseNote = (letter, type, raise) => {
    let raiseBy;
    switch (type) {
      case IntervalEnum.UNISON:
        raiseBy = 0;
        break;
      case IntervalEnum.MINOR_SECOND:
      case IntervalEnum.MAJOR_SECOND:
        raiseBy = 1;
        break;
      case IntervalEnum.MINOR_THIRD:
      case IntervalEnum.MAJOR_THIRD:
        raiseBy = 2;
        break;
      case IntervalEnum.PERFECT_FOURTH:
        raiseBy = 3;
        break;
      case IntervalEnum.TRITONE:
      case IntervalEnum.PERFECT_FIFTH:
        raiseBy = 4;
        break;
      case IntervalEnum.MINOR_SIXTH:
      case IntervalEnum.MAJOR_SIXTH:
        raiseBy = 5;
        break;
      case IntervalEnum.MINOR_SEVENTH:
      case IntervalEnum.MAJOR_SEVENTH:
        raiseBy = 6;
        break;
      case IntervalEnum.OCTAVE:
        raiseBy = 7;
        break;
      default:
    }
    if (raise) {
      return this._raiseNoteBy(letter, raiseBy);
    } else {
      return this._lowerNoteBy(letter, raiseBy);
    }
  };

  _lowerNoteBy = (note, amount = 1) => {
    let letter = note[0];
    let octave = parseInt(note.substring(1));
    for (; amount > 0; amount--) {
      switch (letter) {
        case 'A':
          letter = 'G';
          break;
        case 'B':
          letter = 'A';
          break;
        case 'C':
          letter = 'B';
          octave--;
          break;
        case 'D':
          letter = 'C';
          break;
        case 'E':
          letter = 'D';
          break;
        case 'F':
          letter = 'E';
          break;
        case 'G':
          letter = 'F';
          break;
        default:
      }
    }
    return letter + octave;
  };

  _raiseNoteBy = (note, amount = 1) => {
    let letter = note[0];
    let octave = parseInt(note.substring(1));
    for (; amount > 0; amount--) {
      switch (letter) {
        case 'A':
          letter = 'B';
          break;
        case 'B':
          letter = 'C';
          octave++;
          break;
        case 'C':
          letter = 'D';
          break;
        case 'D':
          letter = 'E';
          break;
        case 'E':
          letter = 'F';
          break;
        case 'F':
          letter = 'G';
          break;
        case 'G':
          letter = 'A';
          break;
        default:
      }
    }
    return letter + octave;
  };

  toString = () => {
    return `12-ET: ${this.step} steps`;
  };
}

export default TetInterval;

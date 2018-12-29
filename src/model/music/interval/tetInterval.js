import { Interval, EtInterval, PureInterval, IntervalEnum, IntervalModEnum } from ".";
import { Note } from "..";

class TetInterval extends Interval {
  constructor() {
    super();
    this.intervals = [];
    this.usePureInterval = false;
    this._step = 0;
  }

  get step() {
    if (this._step === undefined) {
      this._step = 0;
      for (let idx in this.intervals) {
        const { type, mod, raise } = this.intervals[idx];
        this._step += this._calcStep(type, mod, raise);
      }
    }
    return this._step;
  }

  applyInterval = (type = IntervalEnum.UNISON, mods = [], raise = true) => {
    this.intervals.push({ type: type, mods: mods, raise: raise });
    this._step = undefined;
  };

  removeInterval = (idx, deleteCount = 1) => {
    this.intervals.splice(idx, deleteCount);
    this._step = undefined;
  };

  generate = (root) => {
    if (this.usePureInterval) {
      return this.generatePureInterval(root);
    } else {
      return this.generateEtInterval(root);
    }
  };

  buildPureInterval = () => {
    let numTotal = 1;
    let denTotal = 1;
    for (let idx in this.intervals) {
      const { type, raise } = this.intervals[idx];
      const [num, den] = IntervalStepRatios[type]
      if (!raise) {
        [num, den] = [den, num];
      }
      numTotal *= num;
      denTotal *= den;
    }
    return new PureInterval(numTotal, denTotal);
  };

  generatePureInterval = (root) => {
    const tone = this.buildPureInterval().generate(root);
    return this._generateWithFreq(root, tone.freq);
  };

  buildEtInterval = () => {
    return new EtInterval(this.step);
  };

  generateEtInterval = (root) => {
    const tone = this.buildEtInterval().generate(root);
    return this._generateWithFreq(root, tone.freq);
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
        type = this.toMinor(type);
        break;
      case IntervalModEnum.MAJOR:
        type = this.toMajor(type);
        break;
    }
    return { type: type, step: step };
  };

  _generateWithFreq = (root, freq) => {
    const note = new Note(freq, undefined, root.key + this.step);
    let center = this._raiseNote(root.note.letter + root.note.octave);
    note.simplifyNote(undefined, center);
    return note;
  };

  _toMinor = (type) => {
    switch (type) {
      case MAJOR_SECOND:
      case MAJOR_THIRD:
      case MAJOR_SIXTH:
      case MAJOR_SEVENTH:
        type--;
    }
    return type;
  };

  _toMajor = (type) => {
    switch (type) {
      case MINOR_SECOND:
      case MINOR_THIRD:
      case MINOR_SIXTH:
      case MINOR_SEVENTH:
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
      case UNISON:
        raiseBy = 0;
        break;
      case MINOR_SECOND:
      case MAJOR_SECOND:
        raiseBy = 1;
        break;
      case MINOR_THIRD:
      case MAJOR_THIRD:
        raiseBy = 2;
        break;
      case PERFECT_FOURTH:
        raiseBy = 3;
        break;
      case TRITONE:
      case PERFECT_FIFTH:
        raiseBy = 4;
        break;
      case MINOR_SIXTH:
      case MAJOR_SIXTH:
        raiseBy = 5;
        break;
      case MINOR_SEVENTH:
      case MAJOR_SEVENTH:
        raiseBy = 6;
        break;
      case OCTAVE:
        raiseBy = 7;
        break;
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
        case 'B':
          letter = 'A';
        case 'C':
          letter = 'B';
          octave--;
        case 'D':
          letter = 'C';
        case 'E':
          letter = 'D';
        case 'F':
          letter = 'E';
        case 'G':
          letter = 'F';
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
        case 'B':
          letter = 'C';
          octave++;
        case 'C':
          letter = 'D';
        case 'D':
          letter = 'E';
        case 'E':
          letter = 'F';
        case 'F':
          letter = 'G';
        case 'G':
          letter = 'A';
      }
    }
    return letter + octave;
  };
}

export default TetInterval;
import { Interval, EtInterval, PureInterval, IntervalEnum } from ".";
import IntervalModEnum from "./intervalModEnum";

class TetInterval extends Interval {
  constructor() {
    super();
    this.intervals = [];
    this.usePureInterval = false;
    this._step = 0;
  }

  applyInterval = (type = IntervalEnum.UNISON, mods = [], raise = true) => {
    this.intervals.push({ type: type, mods: mods, raise: raise });
  };

  removeInterval = (idx, deleteCount = 1) => {
    this.intervals.splice(idx, deleteCount);
  };

  generate = (root) => {
    if (this.usePureInterval) {
      return this.generatePureInterval(root);
    } else {
      return this.generateEtInterval(root);
    }
  };

  get step() {
    return this._step;
  }

  set step(step) {
    this._step = parseInt(step);
  }

  generatePureInterval = (root) => {
    let num = 1;
    let den = 1;
    for (let idx in this.intervals) {
      const { type, mod, raise } = this.intervals[idx];
      num *= IntervalStepRatios[type][0];
      den *= IntervalStepRatios[type][1];
    }
    return new PureInterval();
  };

  generateEtInterval = (root) => {
    let { freq, name, key } = root;
    for (let idx in this.intervals) {
      const { type, mod, raise } = this.intervals[idx];
      name = this.calculateName(type, mod, raise);
      key += this.calculateSteps(type, mod, raise);
      const interval = new EtInterval(steps);
      freq = interval.generate(root).freq;
    }
    return new Note(freq, name, key);
  };

  calculateName = (name, type, mod, raise) => {
    note = name[0];
    note = this.raiseNote(name[0], type);
    octave = name[name.length - 1];
  };

  raiseNote = (note, type) => {
    switch (type) {
      case UNISON:
        return note;
      case MINOR_SECOND:
      case MAJOR_SECOND:
        note = this.raiseNoteBy(note, 1);
        break;
      case MINOR_THIRD:
      case MAJOR_THIRD:
        note = this.raiseNoteBy(note, 2);
        break;
      case PERFECT_FOURTH:
        note = this.raiseNoteBy(note, 3);
        break;
      case TRITONE:
      case PERFECT_FIFTH:
        note = this.raiseNoteBy(note, 4);
        break;
      case MINOR_SIXTH:
      case MAJOR_SIXTH:
        note = this.raiseNoteBy(note, 5);
        break;
      case MINOR_SEVENTH:
      case MAJOR_SEVENTH:
        note = this.raiseNoteBy(note, 6);
        break;
      case OCTAVE:
        note = this.raiseNoteBy(note, 7);
        break;
    }
  };

  calculateSteps = (type, mods, raise) => {
    let steps = 0;
    for (let idx in mods) {
      const mod = mods[idx];
      [type, steps] = this.applyMod(type, steps, mod);
    }
    steps = type + steps;
    if (!raise) {
      steps = -steps;
    }
    return steps;
  };

  toMinor = (type) => {
    switch (type) {
      case MAJOR_SECOND:
      case MAJOR_THIRD:
      case MAJOR_SIXTH:
      case MAJOR_SEVENTH:
        type--;
    }
    return type;
  };

  toMajor = (type) => {
    switch (type) {
      case MINOR_SECOND:
      case MINOR_THIRD:
      case MINOR_SIXTH:
      case MINOR_SEVENTH:
        type++;
    }
    return type;
  };

  applyMod = (steps) => {
    return steps;
  };

  applyMod = (type, steps, mod) => {
    switch (mod) {
      case IntervalModEnum.AUGMENTED:
        steps++;
        break;
      case IntervalModEnum.DIMINISHED:
        steps--;
        break;
      case IntervalModEnum.MINOR:
        type = this.toMinor(type);
        break;
      case IntervalModEnum.MAJOR:
        type = this.toMajor(type);
        break;
    }
    return [type, steps];
  };
}

export default TetInterval;
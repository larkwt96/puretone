import SoundType from "./sound/soundType";

export default class Chord {
  constructor(root, duration = 1.0, soundType = undefined) {
    this.root = root;
    this.intervals = [];
    this.setDuration(duration);
    this.setSoundType(soundType);
    this.notes = undefined;
    this.sound = undefined;
  }

  setSoundType = (soundType) => {
    if (soundType === undefined) {
      soundType = SoundType.FLAT;
    }
    this.soundType = soundType;
  }

  addInterval = (interval) => {
    this.intervals.push(interval);
  }

  removeInterval = (idx, deleteCount = 1) => {
    this.intervals.splice(idx, deleteCount);
  }

  getIntervals = () => {
    return this.intervals;
  }

  setDuration = (duration) => {
    if (duration < 0) {
      duration = 0.0;
    } else if (duration > 1.0) {
      duration = 1.0;
    }
    this.duration = duration;
  }
  getNotes = () => {
    if (this.notes === undefined) {
      this.buildNotes();
    }
    return this.notes;
  }

  buildNotes = () => {
    this.notes = [this.root];
    for (idx in this.intervals) {
      const note = this.intervals[idx].generate(this.root);
      this.notes.push(note);
    }
  }

  generate = (sampleRate) => {
    // TODO
  }
}
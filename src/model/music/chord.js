import { SoundType, Sound } from '../sound';

class Chord {
  constructor(root, duration = 1.0, soundType = undefined) {
    this.root = root;
    this.intervals = [];
    this.duration = duration;
    this.soundType = soundType;
    this._notes = undefined;
    this._sound = undefined;
  }

  get soundType() {
    return this._soundType;
  };

  set soundType(soundType = SoundType.FLAT) {
    if (this._soundType !== soundType) {
      this._soundType = soundType;
      this._sound = undefined;
    }
  };

  get duration() {
    return this._duration;
  };

  set duration(duration) {
    if (duration < 0) {
      duration = 0.0;
    } else if (duration > 1.0) {
      duration = 1.0;
    }
    if (this._duration !== duration) {
      this._duration = duration;
      this._sound = undefined;
    }
  };

  get notes() {
    if (this._notes === undefined) {
      this._notes = [this.root];
      for (let idx in this.intervals) {
        const note = this.intervals[idx].generate(this.root);
        this._notes.push(note);
      }
    }
    return this._notes;
  };

  get sound() {
    return this._sound;
  };

  addInterval = (interval) => {
    this.intervals.push(interval);
    this.reset();
  };

  removeInterval = (idx, deleteCount = 1) => {
    this.intervals.splice(idx, deleteCount);
    this.reset();
  };

  reset = () => {
    this._notes = undefined;
    this._sound = undefined;
  };

  generate = (sampleRate = 44100 /* 44.1kHz */) => {
    if (this._sound === undefined) {
      this._sound = new Sound(this.duration, sampleRate);
      this._sound.addChord(this);
    }
    return this._sound;
  };
};

export default Chord;

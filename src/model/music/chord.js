class Chord {
  root = undefined;
  intervals = [];

  constructor(root) {
    this.intervals.push(root);
  }

  genChord = () => {
    const notes = [this.root];
    this.intervals.map(v => notes.push(v))
    return notes;
  };

  addInterval = (interval) => {
    this.intervals.push(interval);
  };

  removeInterval = (index, length = 1) => {
    this.intervals.splice(index, length)
  };
}

export default Chord;
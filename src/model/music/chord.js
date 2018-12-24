class Chord {
  root = undefined;
  intervals = [];

  constructor(root) {
    this.intervals.push(root);
  }

  getNotes = () => {
    const notes = [this.root];
    this.intervals.map(v => notes.push(v))
    return notes;
  };

  getWave = (

    addInterval = (interval) => {
      this.intervals.push(interval);
    };

  removeInterval = (index, length = 1) => {
    this.intervals.splice(index, length)
  };
}

export default Chord;
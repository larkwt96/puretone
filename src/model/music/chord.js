class Chord {
  root = undefined;
  intervals = new Array();

  constructor(root) {
    this.intervals.push(root);
  }

  genChord = () => {

  };

  addInterval = (interval) => {

  };

  removeInterval = (index, length = 1) => {
    this.intervals.splice(index, length)
  };
}

export default Chord;

/*
- root: Note
- intervals: Interval[]

+ genChord(): Note[]
+ addInterval(interval: Interval)
+ removeInterval(index: int)
*/
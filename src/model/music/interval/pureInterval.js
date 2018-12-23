class PureInterval {
  ratio = 1;
  num = undefined;
  den = undefined;

  setRatio = (num, den = 1) => {
    this.ratio = num / den;
  }

  getNote = (root) => {
    // TODO
  }
}

export default PureInterval;

/*
- ratio: float = 1
- num: int
- den: int

+ setRatio(ratio: float)
+ setRatio(num: int, den: int)
+ getNote(root: Note): Note
*/
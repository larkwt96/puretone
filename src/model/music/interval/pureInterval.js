import { Note } from "..";

class PureInterval {
  constructor(num, den) {
    this.set(num, den);
  }

  set ratio(ratio) {
    this.set(ratio[0], ratio[1]);
  }

  get ratio() {
    return this.num / this.den;
  };

  set = (num = 1, den = 1) => {
    if (Array.isArray(num)) {
      [this.num, this.den] = num;
    } else {
      this.num = num;
      this.den = den;
    }
  };

  generate = (root) => {
    return new Note(root.freq * this.num / this.den);
  };
};

export default PureInterval;
import Interval from "./interval";
import { Note } from "..";

class EtInterval extends Interval {
  constructor(step = 0, base = 12) {
    super();
    this.step = step;
    this.base = base;
  }

  generate = (root) => {
    const power = Math.pow(2, this.step / this.base);
    return new Note(root.freq * power);
  };
};

export default EtInterval;
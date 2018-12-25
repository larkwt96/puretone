import Note from "../note";
import IntervalEnum from "./intervalEnum";
import PureInterval from "./pureInterval";
import TetInterval from "./tetInterval";
import EtInterval from "./etInterval";

class Interval {
  generate = (root) => {
    // unison by default.
    const { freq, name, key } = root;
    return Note(freq, name, key);
  }
}

export {
  Interval as default,
  PureInterval,
  TetInterval,
  EtInterval,
  IntervalEnum,
};
import Note from "../note";
import IntervalEnum from "./intervalEnum"
import IntervalFactory from "./intervalFactory"

class Interval {
  getNote = (root) => {
    // unison by default.
    return Note(root.getFreq(), root.getName(), root.getKey());
  }
}

export {
  Interval as default,
  IntervalEnum,
  IntervalFactory,
};
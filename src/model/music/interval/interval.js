import { Note } from "..";

class Interval {
  generate = (root) => {
    // unison by default.
    const { freq, name, key } = root;
    return new Note(freq, name, key);
  }
};

export default Interval;
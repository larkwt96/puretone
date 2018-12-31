import { Tone } from "..";

class Interval {
  generate = (root) => {
    // unison by default.
    const { freq, name, key } = root;
    return new Tone(freq, name, key);
  }
};

export default Interval;

import { Tone } from '..';
import { IntervalType } from '.';

class Interval {
  type = IntervalType.BARE;

  generate = (root) => {
    // unison by default.
    const { freq, name, key } = root;
    return new Tone(freq, name, key);
  }

  toString = () => {
    return "Unison";
  }
};

export default Interval;

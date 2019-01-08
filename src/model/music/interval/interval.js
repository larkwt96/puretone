import { Tone } from '..';
import { IntervalType } from '.';

class Interval {
  type = IntervalType.BARE;

  generate = (root) => {
    // unison by default.
    const { freq } = root;
    return new Tone(freq);
  }

  toString = () => {
    return "Unison";
  }
};

export default Interval;

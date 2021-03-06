import { Interval, IntervalType } from '.';
import { Tone } from '..';

class EtInterval extends Interval {
  constructor(step = 0, base = 12) {
    super();
    this.type = IntervalType.ET;
    this.step = step;
    this.base = base;
  }

  generate = (root) => {
    const power = Math.pow(2, this.step / this.base);
    return new Tone(root.freq * power);
  };

  toString = () => {
    return `ET: ${this.step} steps (base: ${this.base})`;
  };
};

export default EtInterval;

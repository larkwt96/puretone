import { Interval, IntervalType } from '.';
import { Tone } from '..';

class PureInterval extends Interval {
  constructor(num, den) {
    super();
    this.set(num, den);
    this.type = IntervalType.PURE;
  }

  set ratio(ratio) {
    if (Array.isArray(ratio)) {
      this.num = ratio[0];
      this.den = ratio[1];
    } else {
      this.num = ratio;
      this.den = 1;
    }
  }

  get ratio() {
    return this.num / this.den;
  };

  set = (num = 1, den) => {
    if (den === undefined) {
      this.ratio = num;
    } else {
      this.ratio = [num, den];
    }
  }

  generate = (root) => {
    return new Tone(root.freq * this.num / this.den);
  };

  toString = () => {
    return `Pure: ${Number(this.num.toFixed(2))}/${Number(this.den.toFixed(2))} ratio`;
  };
};

export default PureInterval;

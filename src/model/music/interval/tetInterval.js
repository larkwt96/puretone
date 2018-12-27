import Interval from "./interval";
import { IntervalEnum } from ".";

class TetInterval extends Interval {
  // TODO
  constructor() {
    super();
    this.intervals = [];
    this.intervalMods = [];
    this.raise = [];
    this.usePureRatio = false;
    this.halfStep;
  }

  applyInterval = (intervalType = IntervalEnum.UNISON, intervalMods = [], raise = true) => {

  };

  generate = (root) => {

  };

  buildPureInterval = () => {
    const steps = this.key;

    return new PureInterval();
  };

  buildEtInterval = () => {

  };
}

export default TetInterval;
import PureInterval from "./pureInterval";
import EtInterval from "./etInterval";

class IntervalFactory {
  makeInterval(type) {
    switch (type) {
      case IntervalEnum.pure:
        return new PureInterval();
      case IntervalEnum.et:
        return new EtInterval();
    }
  }
}

export default IntervalFactory;
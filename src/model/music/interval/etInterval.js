class EtInterval extends Interval {
  base = 12;
  halfSteps = 0;
  relative = true;

  setBase = (base) => {
    this.base = base;
  }

  setHalfSteps = (halfSteps) => {
    this.halfSteps = halfSteps;
  }

  setRelative = (relative = true) => {
    this.relative = relative;
  }

  setAbsolute = (absolute = true) => {
    this.relative = !absolute;
  }

  getNote = (root) => {
    return undefined; // TODO
  }
}

export default EtInterval;
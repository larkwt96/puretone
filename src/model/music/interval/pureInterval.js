class PureInterval {
  ratio = 1.0;
  num = undefined;
  den = undefined;

  setRatio = (num, den = undefined) => {
    if (den !== undefined) {
      this.num = num;
      this.den = den;
    } else {
      den = 1.0;
    }
    this.ratio = num / den;
  }

  unison = () => {
    // do nothing
  }

  minorSecond = () => {
    this.ratio *= 16 / 15;
  }

  majorSecond = () => {
    this.ratio *= 9 / 8;
  }

  minorThird = () => {
    this.ratio *= 6 / 5;
  }

  majorThird = () => {
    this.ratio *= 5 / 4;
  }

  perfectFourth = () => {
    this.ratio *= 4 / 3;
  }

  tritone = () => {
    this.ratio *= 7 / 5;
  }

  perfectFifth = () => {
    this.ratio *= 3 / 2;
  }

  minorSixth = () => {
    this.ratio *= 8 / 5;
  }

  majorSixth = () => {
    this.ratio *= 5 / 3;
  }

  minorSeventh = () => {
    this.ratio *= 16 / 9;
  }

  majorSeventh = () => {
    this.ratio *= 15 / 8;
  }

  octave = () => {
    this.ratio *= 2;
  }

  getNote = (root) => {
    return Note(root.getFreq() * this.ratio, undefined, undefined);
  }
}

export default PureInterval;
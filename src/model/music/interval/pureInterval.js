import Note from "../note";

class PureInterval {
  constructor(num, den = 1) {
    this.setRatio(num, den);
  }

  setRatio = (num, den) => {
    this.num = num;
    this.den = den;
  };

  setNum = (num) => {
    this.num = num;
  };

  setDen = (den) => {
    this.den = den;
  };

  getRatio = () => {
    return this.num / this.den;
  };

  generate = (root) => {
    return Note(root.getFreq() * num / den);
  };

  static stepsToRatio = (steps) => {
    switch (steps) {
      case UNISON:
        return 1;
      case MINOR_SECOND:
        return 16 / 15;
      case MAJOR_SECOND:
        return 9 / 8;
      case MINOR_THIRD:
        return 6 / 5;
      case MAJOR_THIRD:
        return 5 / 4;
      case PERFECT_FOURTH:
        return 4 / 3;
      case TRITONE:
        return 7 / 5;
      case PERFECT_FIFTH:
        return 3 / 2;
      case MINOR_SIXTH:
        return 8 / 5;
      case MAJOR_SIXTH:
        return 5 / 3;
      case MINOR_SEVENTH:
        return 16 / 9;
      case MAJOR_SEVENTH:
        return 15 / 8;
      case OCTAVE:
        return 2;
    }
  }
};

export default PureInterval;
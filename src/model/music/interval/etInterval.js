import Note from "../note";

export default class EtInterval extends Interval {
  base = 12;
  step = 0;

  setBase = (base) => {
    this.base = base;
  }

  setStep = (step) => {
    this.step = step;
  }

  generate = (root) => {
    const power = Math.pow(2, this.step / this.base);
    return Note(root.getFreq() * power);
  }
};
import Note from "../note";

class EtInterval extends Interval {
  base = 12;
  halfSteps = 0;

  setBase = (base) => {
    this.base = base;
  }

  setHalfSteps = (halfSteps) => {
    this.halfSteps = halfSteps;
  }

  getNote = (root) => {
    let newKey = undefined;
    if (root.key !== undefined) {
      newKey = root.key + this.halfSteps;
    }
    const newFreq = root.getFreq() * Math.pow(2, this.halfSteps / this.base)
    const note = Note(newFreq, undefined, newKey);
    if (root.getName() !== undefined && this.base === 12) {
      note.genNameFromKey();
    }
    return note;
  }
}

export default EtInterval;
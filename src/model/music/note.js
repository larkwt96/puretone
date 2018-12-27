class Note {
  constructor(freq) {
    this.freq = freq;
  }

  toString = () => {
    return "(" + this.freq + " hz)";
  };
}

export default Note;
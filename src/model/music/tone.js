class Tone {
  constructor(freq) {
    this.freq = freq;
  }

  toString = () => {
    return "(" + this.freq + " hz)";
  };
}

export default Tone;
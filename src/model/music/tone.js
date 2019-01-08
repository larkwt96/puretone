class Tone {
  constructor(freq) {
    this.freq = freq;
  }

  toString = () => {
    const truncated = Number(this.freq.toFixed(2));
    return `${truncated} Hz`;
  };
}

export default Tone;

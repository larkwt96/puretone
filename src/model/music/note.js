class Note {
  constructor(freq, name, key) {
    this.freq = freq;
    this.name = name;
    this.key = key;
  }

  genKeyFromName = (name) => {
    // TODO
  }

  genNameFromKey = (key) => {
    // TODO
  }

  genFreqFromKey = () => {
    this.freq = 440 * Math.pow(2, (this.key - 49) / 12)
    return this;
  }

  toString = () => {
    return this.name !== undefined ? this.name : "(" + this.freq + " hz)";
  }

  simplifyName = (useSharp = true) => {
    // TODO simplifyName(useSharp: bool = true)
  }
}

export default Note;
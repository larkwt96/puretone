class Model {
  constructor(context) {
    this.chords = [];
    this.player = new Player();
    this.context = context;
  }

  add = (chord) => {
    this.chords.push({ chord: chord, enabled: true });
  }

  remove = (start, deleteCount = 1) => {
    this.cachedChords.splice(start, deleteCount);
  }

  enable = (idx) => {
    this.chords[idx].enable = true;
  }

  enableAll = () => {
    for (let idx in this.chords) {
      this.enable(idx);
    }
  }

  disable = (idx) => {
    this.chords[idx].enable = false;
  }

  disableAll = () => {
    for (let idx in this.chords) {
      this.disable(idx);
    }
  }

  getAll = () => {
    return this.chords;
  }

  play = (idx) => {
    const { chord, enabled } = this.chords[idx];
    if (enabled) {
      const sound = chord.getSound()
      this.player.play(sound); // TOOD: blocks?
    }
  }

  playAll = () => {
    for (let idx in this.chords) {
      this.play(idx);
    }
  }

  stop = () => {
    this.player.stop(); // TODO: starts next chord or stops them all?
  }
}

export default Model;
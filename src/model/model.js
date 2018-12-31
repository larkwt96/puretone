import { Player } from "./sound";

class Model {
  constructor(context) {
    this.chords = [];
    this.player = new Player();
    this.context = context;
    this.playing = false;
  }

  add = (chord) => {
    this.chords.push({ chord: chord, enabled: true });
  };

  remove = (start, deleteCount = 1) => {
    this.cachedChords.splice(start, deleteCount);
  };

  enable = (idx) => {
    this.chords[idx].enable = true;
  };

  enableAll = () => {
    for (let idx in this.chords) {
      this.enable(idx);
    }
  };

  disable = (idx) => {
    this.chords[idx].enable = false;
  };

  disableAll = () => {
    for (let idx in this.chords) {
      this.disable(idx);
    }
  };

  getAll = () => {
    return this.chords;
  };

  play = (idx) => {
    const { chord, enabled } = this.chords[idx];
    if (enabled) {
      const sound = chord.getSound()
      this.player.play(sound); // TODO: blocks?
    }
  };

  playAll = () => {
    this.playing = true;
    for (let idx in this.chords) {
      this.play(idx);
      if (!this.playing) {
        break;
      }
    }
  };

  stop = () => {
    this.player.stop();
    this.playing = false;
  };
};

export default Model;

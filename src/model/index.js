class Model {
  cachedChords = [];

  getChords = () => {
    return this.cachedChords;
  }

  addChord = (chord) => {
    this.cachedChords.push(new CachedChord(chord));
  }

  removeChord = (start, deleteCount = 1) => {
    this.cachedChords.splice(start, deleteCount);
  }

  playChords = () => {
    for (const i = 0; i < this.cachedChords.length; i++) {
      this.playChord(i);
    }
  }

  playChord = (index) => {
    if (this.cachedChords[index].enabled) {
      const wave = this.cachedChords[index].getWave();
      this.player.play(wave); // TOOD: blocks?
    }
  }

  stopChord = () => {
    this.player.stop(); // TODO: starts next chord or stops them all?
  }

  playChords = () => {
    for (const i = 0; i < this.cachedChords.length; i++) {
      this.playChord(i);
    }
  }

  reloadChord = (index) => {
    this.cachedChords[index].reload();
  }

  reloadChords = () => {
    for (const i = 0; i < this.cachedChords.length; i++) {
      this.reloadChord(i);
    }
  }
}

export default Model;
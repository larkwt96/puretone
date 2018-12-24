class Model {
  cachedChords = [];

  getChord = (index) => {
    return this.cachedChords[index];
  }

  getChords = () => {
    return this.cachedChords;
  }

  addChord = (chord) => {

  }

  removeChord = (index) => {
    this.cachedChords.splice(1, 1);
  }

  playChord = () => {
    // TODO
  }

  playChords = () => {
    this.cachedChords.map((v, i) => this.playChord(i))
  }

  reloadChord = (index) => {
    // TODO
  }

  reloadChords = () => {
    this.cachedChords.map((v, i) => this.reloadChord(i))
  }
}

export default Model;
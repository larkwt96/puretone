class CachedChord {
  constructor(chord) {
    this.chord = chord;
    this.notes = chord.getNotes();
    this.waves = Wave(this.notes.map(v => v.getWave()));
  }

  getChord = () => {
    return this.chord;
  };

  getNotes = () => {
    return this.notes;
  };

  getWaves = () => {
    return this.waves;
  };
}

export default CachedChord;

/*
 * chord: Chord
 * notes: Note[]
 * wave: Wave
 *
 * constructor(chord: Chord)
 * reload()
 * getChord(): chord
 * getNotes(): Note[]
 * getWave(): Wave
 */
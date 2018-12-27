class Sound {
  wave = undefined;

  constructor(duration, sampleRate) {
    const length = parseInt(duration * sampleRate);
    this.sampleRate = sampleRate;
    this.wave = new Float32Array(length);
  }

  addChord = (chord) => {
    const notes = chord.getNotes();
    for (let idx in notes) {
      this.addNote(notes[idx]);
    }
  }

  addSound = (sound) => {
    this.addArray(sound.getWave());
  }

  addNote = (note) => {
    this.addFreq(note.getFreq());
  }

  addFreq = (freq) => {
    for (let idx in this.wave) {
      this.wave[idx] += this.sin(idx, this.sampleRate, freq);
    }
  }

  addArray = (arr) => {
    for (let idx in arr) {
      if (idx < this.wave.length) {
        this.wave[idx] = arr[idx];
      } else {
        break;
      }
    }
  }

  getWave = () => {
    return this.wave;
  }

  sin(sample, sampleRate, freq) {
    return Math.sin(2 * Math.PI * freq * sample / sampleRate)
  }
};

export default Sound;